/**
 * Data payload for updating a user's college
 */
export interface UpdateCollegeData {
  college: string;
}

/**
 * Full user account data for the profile page
 */
export interface UserData {
  id?: string;
  firstName?: string | null;
  email?: string | null;
  phone?: string | null;
  college?: string | null;
  gender?: string | null;
  aadhaarNumber?: string | null;
  candidatePhotoUrl?: string | null;
  googleAvatarUrl?: string | null;
  isFromIITBhu?: boolean;
  joinedAt?: string | null;
  role?: {
    level: "MASTER_ADMIN" | "MANAGER" | "OPERATOR" | "USER";
  } | null;
}

/**
 * Profile completion progress data
 */
export interface ProgressData {
  isProfileComplete: boolean;
  completionPercentage: number;
  steps: {
    aadhaarUploaded: boolean;
    aadhaarVerified: boolean;
    college: boolean;
    phone: boolean;
  };
}

/**
 * Minimal authenticated user info (session-derived)
 */
export interface ProfileUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
