"use client";

import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { Upload, X, FileImage, Shield } from "lucide-react";
import { Dropzone, useDropzoneState } from "@/components/ui/dropzone";
import { useAadhaarFlow, type AadhaarExtractedData } from "@/lib/api/hooks";
import { COLORS } from "../../constants/palette";
import { AadhaarVerificationLoader } from "@/components/loader";
import { VerificationError, UploadError } from "./error";
import { SuccessState } from "./success/SuccessState";

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
};

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface AadhaarStepProps {
  onComplete: (data: AadhaarExtractedData) => void;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function AadhaarStep({ onComplete }: AadhaarStepProps) {
  const { data: session } = useSession();

  // Dropzone state
  const {
    file,
    preview,
    error: uploadError,
    handleFilesSelected,
    handleFilesRejected,
    reset: resetDropzone,
  } = useDropzoneState();

  // Aadhaar flow hook - all state managed here
  const {
    processAadhaar,
    isLoading,
    errorMessage,
    extractedData,
    reset: resetAadhaarFlow,
  } = useAadhaarFlow(session?.user?.id);

  // ─── Handlers ──────────────────────────────────────────────────────

  const handleRemove = useCallback(() => {
    resetDropzone();
    resetAadhaarFlow();
  }, [resetDropzone, resetAadhaarFlow]);

  const handleVerify = useCallback(async () => {
    if (!file) return;
    await processAadhaar(file);
  }, [file, processAadhaar]);

  const handleRetry = useCallback(() => {
    resetAadhaarFlow();
    handleVerify();
  }, [resetAadhaarFlow, handleVerify]);

  const handleConfirm = useCallback(() => {
    if (extractedData) onComplete(extractedData.data);
  }, [extractedData, onComplete]);

  // ─── Render: Loading ───────────────────────────────────────────────

  if (isLoading) {
    return <AadhaarVerificationLoader />;
  }

  // ─── Render: Verification Error ────────────────────────────────────

  if (errorMessage) {
    return (
      <VerificationError
        error={errorMessage}
        onUploadDifferent={handleRemove}
        onRetry={handleRetry}
      />
    );
  }

  // ─── Render: Verification Success ──────────────────────────────────

  if (extractedData) {
    return (
      <SuccessState
        data={extractedData.data}
        onReupload={handleRemove}
        onConfirm={handleConfirm}
      />
    );
  }

  // ─── Render: Upload ────────────────────────────────────────────────

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
          style={{
            background: `linear-gradient(135deg, ${COLORS.GOLD}20 0%, ${COLORS.GOLD_DARK}10 100%)`,
            border: `1px solid ${COLORS.GOLD}30`,
          }}
        >
          <FileImage className="h-8 w-8" style={{ color: COLORS.GOLD }} />
        </div>
        <h2
          className="text-2xl sm:text-3xl font-bold mb-2"
          style={{ color: COLORS.CREAM }}
        >
          Upload Your Aadhaar Card
        </h2>
        <p style={{ color: `${COLORS.CREAM}60` }}>
          We&apos;ll extract your details automatically using AI
        </p>
      </div>

      {/* Dropzone or Preview */}
      {!file ? (
        <Dropzone
          accept={ACCEPTED_TYPES}
          maxSize={MAX_FILE_SIZE}
          multiple={false}
          onFilesSelected={handleFilesSelected}
          onFilesRejected={handleFilesRejected}
          className="p-8 sm:p-12 rounded-2xl"
          style={{
            background: `linear-gradient(145deg, ${COLORS.BG_DEEP}50 0%, ${COLORS.BG_ROYAL}50 100%)`,
            borderColor: `${COLORS.GOLD}40`,
          }}
        >
          <div className="text-center">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
              style={{
                background: `linear-gradient(135deg, ${COLORS.GOLD}15 0%, ${COLORS.GOLD_DARK}10 100%)`,
                border: `2px solid ${COLORS.GOLD}30`,
              }}
            >
              <Upload className="h-10 w-10" style={{ color: COLORS.GOLD }} />
            </div>
            <p
              className="text-lg font-medium mb-2"
              style={{ color: COLORS.CREAM }}
            >
              Drag and drop your Aadhaar image here
            </p>
            <p style={{ color: `${COLORS.CREAM}50` }}>
              or{" "}
              <span
                className="underline cursor-pointer hover:no-underline"
                style={{ color: COLORS.GOLD }}
              >
                browse files
              </span>
            </p>
            <div
              className="mt-6 flex items-center justify-center gap-4 text-xs"
              style={{ color: `${COLORS.CREAM}40` }}
            >
              <span>JPG, PNG</span>
              <span className="w-1 h-1 rounded-full bg-current" />
              <span>Max 5MB</span>
            </div>
          </div>
        </Dropzone>
      ) : (
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: `linear-gradient(145deg, ${COLORS.BG_DEEP}80 0%, ${COLORS.BG_ROYAL}80 100%)`,
            border: `1px solid ${COLORS.GOLD}30`,
          }}
        >
          <div className="relative aspect-[16/10] max-h-[400px] flex items-center justify-center">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Aadhaar Preview"
                className="max-w-full max-h-full object-contain p-4"
              />
            ) : (
              <div className="flex items-center justify-center py-20">
                <FileImage
                  className="h-12 w-12"
                  style={{ color: `${COLORS.GOLD}50` }}
                />
              </div>
            )}
            <button
              onClick={handleRemove}
              className="absolute top-4 right-4 p-2 rounded-full transition-all hover:scale-110"
              style={{
                background: `${COLORS.ERROR}20`,
                border: `1px solid ${COLORS.ERROR}40`,
              }}
            >
              <X className="h-5 w-5" style={{ color: COLORS.ERROR }} />
            </button>
          </div>
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{
              background: COLORS.BG_ROYAL,
              borderTop: `1px solid ${COLORS.GOLD}20`,
            }}
          >
            <div className="flex items-center gap-3">
              <FileImage className="h-5 w-5" style={{ color: COLORS.GOLD }} />
              <div>
                <p
                  className="text-sm font-medium truncate max-w-[200px]"
                  style={{ color: COLORS.CREAM }}
                >
                  {file.name}
                </p>
                <p className="text-xs" style={{ color: `${COLORS.CREAM}50` }}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: `${COLORS.SUCCESS}20`,
                border: `1px solid ${COLORS.SUCCESS}40`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: COLORS.SUCCESS }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: COLORS.SUCCESS }}
              >
                Ready
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Upload Error */}
      {uploadError && <UploadError message={uploadError} />}

      {/* Privacy Note */}
      <div
        className="flex items-start gap-3 p-4 rounded-xl"
        style={{
          background: `${COLORS.GOLD}08`,
          border: `1px solid ${COLORS.GOLD}20`,
        }}
      >
        <Shield
          className="h-5 w-5 shrink-0 mt-0.5"
          style={{ color: COLORS.GOLD }}
        />
        <div>
          <p
            className="text-sm font-medium mb-1"
            style={{ color: COLORS.GOLD }}
          >
            Your privacy is protected
          </p>
          <p className="text-xs" style={{ color: `${COLORS.CREAM}50` }}>
            Your Aadhaar image is processed securely and deleted immediately
            after verification. We only store the last 4 digits of your Aadhaar
            number.
          </p>
        </div>
      </div>

      {/* Verify Button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={handleVerify}
          disabled={!file}
          className={`group relative w-full max-w-sm py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 overflow-hidden ${
            file
              ? "hover:scale-[1.02] active:scale-[0.98]"
              : "opacity-50 cursor-not-allowed"
          }`}
          style={{
            background: file
              ? `linear-gradient(135deg, ${COLORS.GOLD} 0%, ${COLORS.GOLD_DARK} 100%)`
              : `${COLORS.GOLD}20`,
            color: file ? COLORS.BG_DEEP : `${COLORS.CREAM}40`,
            boxShadow: file
              ? `0 8px 24px ${COLORS.GOLD}40, inset 0 1px 0 ${COLORS.GOLD_LIGHT}50`
              : "none",
          }}
        >
          {/* Shine effect on hover */}
          {file && (
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(105deg, transparent 40%, ${COLORS.GOLD_LIGHT}30 45%, ${COLORS.GOLD_LIGHT}40 50%, ${COLORS.GOLD_LIGHT}30 55%, transparent 60%)`,
              }}
            />
          )}
          <span className="relative flex items-center justify-center gap-2">
            <Shield className="h-5 w-5" />
            Verify Aadhaar
          </span>
        </button>
      </div>
    </div>
  );
}
