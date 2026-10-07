// ═══════════════════════════════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════════════════════════════

export { useContact } from "./useContactForm";

// ═══════════════════════════════════════════════════════════════════
// PROFILE - College Update
// ═══════════════════════════════════════════════════════════════════

export { useUpdateCollege, type UpdateCollegeData } from "./profile/useProfile";

// ═══════════════════════════════════════════════════════════════════
// PROFILE - Aadhaar Verification
// ═══════════════════════════════════════════════════════════════════

export {
  useAadhaarUpload,
  useAadhaarVerify,
  type AadhaarExtractedData,
} from "./profile/useAadhaar";

// ═══════════════════════════════════════════════════════════════════
// PROFILE - Phone Update
// ═══════════════════════════════════════════════════════════════════

export { useUpdatePhone } from "./usePhoneUpdate";

// ═══════════════════════════════════════════════════════════════════
// PROFILE - College Search
// ═══════════════════════════════════════════════════════════════════

export { useCollegeSearch, type College } from "./profile/useCollegeSearch";

// ═══════════════════════════════════════════════════════════════════
// AUTH - Sign In / Sign Out
// ═══════════════════════════════════════════════════════════════════

export { useSignIn } from "./profile/useGoogleSignIn";
export { useSignOut } from "./profile/useSessionSignOut";

// ═══════════════════════════════════════════════════════════════════
// GRAPHQL HOOKS - Account & Profile Queries
// ═══════════════════════════════════════════════════════════════════

// Full account data (profile + progress) - for settings & dashboard
export { useFullAccount } from "./profile/useFullAccount";

// Profile with avatar + completion status - for navbar & greeting
export { useProfileCompletionStatus } from "./profile/useProfileCompletionStatus";

// Account status only (most lightweight) - for feature gating
export { useAccountAccessStatus } from "./profile/useAccountAccessStatus";

// ═══════════════════════════════════════════════════════════════════
// PASSES
// ═══════════════════════════════════════════════════════════════════

export { usePasses, type Pass, type PassBenefit, type PassDetail } from "./passes/usePasses";
