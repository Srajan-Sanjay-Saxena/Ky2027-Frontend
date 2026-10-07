import { query, types, optional } from "typed-graphqlify";
import { gql } from "@apollo/client/core";

// ═══════════════════════════════════════════════════════════════════
// QUERY 1: FULL ACCOUNT
// Returns complete user profile (Prisma) + full account progress (MongoDB)
// Use for: Account settings page, profile editing, user dashboard
// ═══════════════════════════════════════════════════════════════════

const fullAccountQueryDef = query("GetFullAccount", {
  myAccount: optional({
    profile: {
      id: types.string,
      email: types.string,
      firstName: optional(types.string),
      lastName: optional(types.string),
      slugName: types.string,
      candidatePhotoUrl: optional(types.string),
      googleAvatarUrl: optional(types.string),
      phone: optional(types.string),
      gender: optional(types.constant<"MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY">("MALE")),
      college: optional(types.string),
      dob: optional(types.string),
      joinedAt: types.string,
      aadhaarNumber: optional(types.string),
      isFromIITBhu: types.boolean,
      role: optional({
        level: types.constant<"MASTER_ADMIN" | "MANAGER" | "OPERATOR" | "USER">("USER"),
      }),
    },
    progress: {
      steps: {
        aadhaarUploaded: types.boolean,
        aadhaarVerified: types.boolean,
        college: types.boolean,
        phone: types.boolean,
      },
      completedSteps: types.number,
      totalSteps: types.number,
      completionPercentage: types.number,
      currentStep: types.number,
      isProfileComplete: types.boolean,
      accountStatus: types.constant<"ACTIVE" | "SUSPENDED">("ACTIVE"),
    },
  }),
});

// ═══════════════════════════════════════════════════════════════════
// QUERY 2: ACCOUNT PROGRESS WITH STEPS
// Returns detailed progress including individual step completion
// Use for: Profile completion wizard, progress bars, step navigation
// ═══════════════════════════════════════════════════════════════════

const accountProgressWithStepsQueryDef = query("GetAccountProgressWithSteps", {
  myAccount: optional({
    progress: {
      steps: {
        aadhaarUploaded: types.boolean,
        aadhaarVerified: types.boolean,
        college: types.boolean,
        phone: types.boolean,
      },
      currentStep: types.number,
      completedSteps: types.number,
      totalSteps: types.number,
      completionPercentage: types.number,
      isProfileComplete: types.boolean,
      accountStatus: types.constant<"ACTIVE" | "SUSPENDED">("ACTIVE"),
    },
  }),
});

// ═══════════════════════════════════════════════════════════════════
// QUERY 3: USER NAVBAR DISPLAY
// Returns minimal profile info (name, avatar) + completion status
// Use for: Navbar avatar, user greeting, profile dropdown display
// ═══════════════════════════════════════════════════════════════════

const userNavbarDisplayQueryDef = query("GetUserNavbarDisplay", {
  myAccount: optional({
    profile: {
      id: types.string,
      firstName: optional(types.string),
      lastName: optional(types.string),
      candidatePhotoUrl: optional(types.string),
      googleAvatarUrl: optional(types.string),
    },
    progress: {
      isProfileComplete: types.boolean,
      completionPercentage: types.number,
      accountStatus: types.constant<"ACTIVE" | "SUSPENDED">("ACTIVE"),
    },
  }),
});

// ═══════════════════════════════════════════════════════════════════
// QUERY 4: ACCOUNT ACCESS STATUS
// Returns only isProfileComplete and accountStatus - most lightweight
// Use for: Feature gating, access control checks, quick eligibility
// ═══════════════════════════════════════════════════════════════════

const accountAccessStatusQueryDef = query("GetAccountAccessStatus", {
  myAccount: optional({
    progress: {
      isProfileComplete: types.boolean,
      accountStatus: types.constant<"ACTIVE" | "SUSPENDED">("ACTIVE"),
    },
  }),
});

// ═══════════════════════════════════════════════════════════════════
// EXPORTED GQL QUERIES
// ═══════════════════════════════════════════════════════════════════

/** Full account with profile + progress - for account settings & dashboard */
export const FULL_ACCOUNT_QUERY = gql`
  ${fullAccountQueryDef.toString()}
`;

/** Progress with steps - for profile completion wizard & progress tracking */
export const ACCOUNT_PROGRESS_WITH_STEPS_QUERY = gql`
  ${accountProgressWithStepsQueryDef.toString()}
`;

/** User navbar display - for navbar avatar & user greeting */
export const USER_NAVBAR_DISPLAY_QUERY = gql`
  ${userNavbarDisplayQueryDef.toString()}
`;

/** Account access status - for feature gating & access control */
export const ACCOUNT_ACCESS_STATUS_QUERY = gql`
  ${accountAccessStatusQueryDef.toString()}
`;

// ═══════════════════════════════════════════════════════════════════
// TYPES - Full Account
// ═══════════════════════════════════════════════════════════════════

export type FullAccountQueryResponse = typeof fullAccountQueryDef.data;
export type FullAccountData = NonNullable<FullAccountQueryResponse["myAccount"]>;
export type UserProfile = FullAccountData["profile"];
export type UserAccountProgress = FullAccountData["progress"];

// ═══════════════════════════════════════════════════════════════════
// TYPES - Account Progress With Steps
// ═══════════════════════════════════════════════════════════════════

export type AccountProgressWithStepsQueryResponse = typeof accountProgressWithStepsQueryDef.data;
export type AccountProgressWithStepsData = NonNullable<
  AccountProgressWithStepsQueryResponse["myAccount"]
>;
export type ProgressSteps = AccountProgressWithStepsData["progress"]["steps"];

// ═══════════════════════════════════════════════════════════════════
// TYPES - User Navbar Display
// ═══════════════════════════════════════════════════════════════════

export type UserNavbarDisplayQueryResponse = typeof userNavbarDisplayQueryDef.data;
export type UserNavbarDisplayData = NonNullable<UserNavbarDisplayQueryResponse["myAccount"]>;

// ═══════════════════════════════════════════════════════════════════
// TYPES - Account Access Status
// ═══════════════════════════════════════════════════════════════════

export type AccountAccessStatusQueryResponse = typeof accountAccessStatusQueryDef.data;
export type AccountAccessStatusData = NonNullable<AccountAccessStatusQueryResponse["myAccount"]>;
