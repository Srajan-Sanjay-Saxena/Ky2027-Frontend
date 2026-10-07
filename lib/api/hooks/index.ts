// ═══════════════════════════════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════════════════════════════

export { useContact } from "./useContact";

// ═══════════════════════════════════════════════════════════════════
// PROFILE - College Update
// ═══════════════════════════════════════════════════════════════════

export { useUpdateCollege } from "./profile/useProfile";
export type { UpdateCollegeData } from "@/lib/api/helper/types/profile.types";

// ═══════════════════════════════════════════════════════════════════
// PROFILE - Aadhaar Verification
// ═══════════════════════════════════════════════════════════════════

export { useAadhaarUpload, useAadhaarVerify } from "./profile/useAadhaar";
export type { AadhaarExtractedData } from "@/lib/api/helper/types/aadhaar.types";

// ═══════════════════════════════════════════════════════════════════
// PROFILE - Phone Update
// ═══════════════════════════════════════════════════════════════════

export { useUpdatePhone } from "./usePhoneUpdate";

// ═══════════════════════════════════════════════════════════════════
// PROFILE - College Search
// ═══════════════════════════════════════════════════════════════════

export { useCollegeSearch } from "./profile/useCollegeSearch";
export type { College } from "@/components/pages/complete-profile/steps/college/data/config";

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

export { usePasses } from "./passes/usePasses";
export type { Pass, PassBenefit, PassDetail } from "@/lib/api/helper/types";
