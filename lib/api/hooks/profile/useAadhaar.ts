"use client";

import { useApiMutation } from "wire-axon/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { z } from "zod";
import { BACKEND_URL, sharedFeatureConfig } from "../../constants";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

/** Response from /aadhaar/upload-url endpoint */
export interface AadhaarUploadUrlData {
  uploadUrl: string;
  s3Key: string;
  expiresAt: string;
}

/** Response from /aadhaar/extract-details endpoint */
export interface AadhaarExtractedData {
  aadhaarLast4: string;
  name: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  dateOfBirth: string;
}

// ═══════════════════════════════════════════════════════════════════
// SCHEMAS
// ═══════════════════════════════════════════════════════════════════

// Note: Browsers report JPEG as "image/jpeg", not "image/jpg"
const AadhaarUploadUrlSchema = z.object({
  fileType: z.enum(["image/jpeg", "image/png"]),
});

// ═══════════════════════════════════════════════════════════════════
// HELPER - Extract error message from Axios error
// ═══════════════════════════════════════════════════════════════════

/**
 * Extracts a user-friendly error message from an Axios error.
 * Checks response.data.info, response.data.message, then falls back to error.message
 */
function extractErrorMessage(error: unknown, fallback: string): string {
  if (!error) return fallback;

  // Check for Axios error structure
  const axiosError = error as {
    response?: { data?: { info?: string; message?: string } };
    message?: string;
  };

  // Priority: info > message > error.message > fallback
  if (axiosError.response?.data?.info) {
    return axiosError.response.data.info;
  }
  if (axiosError.response?.data?.message) {
    return axiosError.response.data.message;
  }
  if (axiosError.message) {
    return axiosError.message;
  }

  return fallback;
}

// ═══════════════════════════════════════════════════════════════════
// INDIVIDUAL HOOKS
// ═══════════════════════════════════════════════════════════════════

/**
 * Hook for getting pre-signed S3 upload URL.
 * Returns a promisified mutate function for async/await usage.
 */
function useAadhaarUploadUrl() {
  const { mutate, data, isPending, isSuccess, isError, error, reset } =
    useApiMutation<AadhaarUploadUrlData>({
      url: "/aadhaar/upload-url",
      method: "post",
      baseURL: BACKEND_URL,
      featureConfig: sharedFeatureConfig,
      bodyValidator: { bodySchema: AadhaarUploadUrlSchema },
      mutationOptions: { retry: false },
    });

  /**
   * Promisified wrapper around mutate.
   * Allows using async/await: const data = await getUploadUrl("image/jpeg")
   */
  const getUploadUrl = useCallback(
    (fileType: "image/jpeg" | "image/png"): Promise<AadhaarUploadUrlData> => {
      return new Promise((resolve, reject) => {
        mutate(
          { fileType },
          {
            onSuccess: (response) => resolve(response.data),
            onError: (err) => reject(err),
          },
        );
      });
    },
    [mutate],
  );

  return {
    getUploadUrl,
    uploadUrlData: data,
    isPending,
    isSuccess,
    isError,
    error,
    reset,
  };
}

/**
 * Hook for verifying Aadhaar after S3 upload.
 * Calls Textract to extract details from the uploaded image.
 */
function useAadhaarVerify() {
  const { mutate, data, isPending, isSuccess, isError, error, reset } =
    useApiMutation<AadhaarExtractedData>({
      url: "/aadhaar/extract-details",
      method: "post",
      baseURL: BACKEND_URL,
      featureConfig: sharedFeatureConfig,
      bodyValidator: { bodySchema: z.object({}) },
      mutationOptions: { retry: false },
    });

  /**
   * Promisified wrapper around mutate.
   * Allows using async/await: const data = await verifyAadhaar()
   */
  const verifyAadhaar = useCallback((): Promise<AadhaarExtractedData> => {
    return new Promise((resolve, reject) => {
      mutate(
        {},
        {
          onSuccess: (response) => resolve(response.data),
          onError: (err) => reject(err),
        },
      );
    });
  }, [mutate]);

  return {
    verifyAadhaar,
    extractedData: data,
    isPending,
    isSuccess,
    isError,
    error,
    reset,
  };
}

// ═══════════════════════════════════════════════════════════════════
// MAIN FLOW HOOK
// ═══════════════════════════════════════════════════════════════════

/**
 * Orchestrates the complete Aadhaar verification flow:
 *
 * 1. Get pre-signed URL from backend
 * 2. Upload image directly to S3 using the pre-signed URL
 * 3. Call extract-details endpoint to verify via Textract
 * 4. Invalidate cache on success
 *
 * Each step must complete before the next begins (sequential flow).
 * Uses promisified mutations to enable async/await.
 */
export function useAadhaarFlow(userId?: string) {
  const queryClient = useQueryClient();

  // Local error state - aggregates errors from all steps
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Step 1: Get upload URL hook
  const { getUploadUrl, isPending: isGettingUrl, reset: resetUploadUrl } = useAadhaarUploadUrl();

  // Step 3: Verify Aadhaar hook
  const { verifyAadhaar, extractedData, isPending: isVerifying, reset: resetVerify } =
    useAadhaarVerify();

  // Combined loading state
  const isLoading = isGettingUrl || isVerifying;

  /**
   * Main process function - executes the full Aadhaar verification flow.
   *
   * Flow:
   * 1. Validate file type (must be JPEG or PNG)
   * 2. Get pre-signed S3 URL from backend
   * 3. Upload file to S3 using PUT request
   * 4. Call verify endpoint to extract details via Textract
   * 5. Invalidate account-progress cache on success
   *
   * Any error at any step stops the flow and sets errorMessage.
   */
  const processAadhaar = useCallback(
    async (file: File) => {
      // Reset error state before starting
      setErrorMessage(null);

      // ─── Validation ────────────────────────────────────────────────
      if (!file) {
        setErrorMessage("No file provided");
        return;
      }

      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setErrorMessage(
          `Invalid file type (${file.type}). Please upload a JPG or PNG image.`,
        );
        return;
      }

      try {
        // ─── Step 1: Get pre-signed URL ──────────────────────────────
        // Backend generates a URL that allows direct upload to S3
        const uploadUrlData = await getUploadUrl(
          file.type as "image/jpeg" | "image/png",
        );

        // ─── Step 2: Upload to S3 ────────────────────────────────────
        // Direct upload to S3 using the pre-signed URL
        // This bypasses the backend for large file transfers
        console.log("Uploading to S3 with URL:", uploadUrlData);
        const s3Response = await fetch(uploadUrlData.uploadUrl, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });

        if (!s3Response.ok) {
          setErrorMessage("Failed to upload image. Please try again.");
          return;
        }

        // ─── Step 3: Extract & verify details ────────────────────────
        // Backend uses AWS Textract to extract Aadhaar details
        // The s3Key was stored in user record during Step 1
        await verifyAadhaar();

        // ─── Step 4: Invalidate cache ────────────────────────────────
        // Refresh account progress to reflect verified status
        if (userId) {
          queryClient.invalidateQueries({
            queryKey: ["account-progress", userId],
          });
        }
      } catch (error) {
        // Extract meaningful error message from the error object
        const message = extractErrorMessage(error, "Aadhaar verification failed");
        setErrorMessage(message);
      }
    },
    [getUploadUrl, verifyAadhaar, queryClient, userId],
  );

  /**
   * Resets all state - error message and mutation data.
   * Call this when user wants to retry or upload a different image.
   */
  const reset = useCallback(() => {
    setErrorMessage(null);
    resetUploadUrl();
    resetVerify();
  }, [resetUploadUrl, resetVerify]);

  return {
    // Actions
    processAadhaar,
    reset,
    // State
    isLoading,
    errorMessage,
    extractedData,
  };
}
