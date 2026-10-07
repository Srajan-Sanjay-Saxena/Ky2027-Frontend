// ═══════════════════════════════════════════════════════════════════
// AADHAAR TYPES
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
