// Apollo Client
export { apolloClient } from "./apollo";

// ═══════════════════════════════════════════════════════════════════
// QUERIES
// ═══════════════════════════════════════════════════════════════════

export {
  FULL_ACCOUNT_QUERY,
  ACCOUNT_PROGRESS_WITH_STEPS_QUERY,
  USER_NAVBAR_DISPLAY_QUERY,
  ACCOUNT_ACCESS_STATUS_QUERY,
} from "./queries/user.queries";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

export type {
  // Full Account
  FullAccountQueryResponse,
  FullAccountData,
  UserProfile,
  UserAccountProgress,
  // Account Progress With Steps
  AccountProgressWithStepsQueryResponse,
  AccountProgressWithStepsData,
  ProgressSteps,
  // User Navbar Display
  UserNavbarDisplayQueryResponse,
  UserNavbarDisplayData,
  // Account Access Status
  AccountAccessStatusQueryResponse,
  AccountAccessStatusData,
} from "../helper/types";
