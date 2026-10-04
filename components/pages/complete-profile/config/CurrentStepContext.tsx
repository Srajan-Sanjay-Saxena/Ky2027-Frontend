"use client";

import { createContext, useContext, ReactNode, useMemo, useCallback } from "react";
import { useQuery, useLazyQuery } from "@apollo/client/react";
import { useSession } from "next-auth/react";
import {
  MyProfileWithAccountProgressQuery,
  MyAccountProgressQuery,
  type MyAccountResponseType,
  type MyAccountProgressResponseType,
  type UserProfile,
  type AccountProgress,
} from "@/lib/api/graphql/queries/user.queries";
import { STEPS } from "./data";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface CurrentStepContextValue {
  // Current step (1 = Aadhaar, 2 = College, 3 = Phone)
  currentStep: number;
  
  // Profile data
  profile: UserProfile | null;
  
  // Progress data
  progress: AccountProgress | null;
  
  // Loading states
  profileLoading: boolean;
  progressLoading: boolean;
  
  // Error state
  isError: boolean;
  
  // Refetch only account progress (lightweight)
  refetchAccountProgress: () => void;
}

// ═══════════════════════════════════════════════════════════════════
// CONTEXT
// ═══════════════════════════════════════════════════════════════════

const CurrentStepContext = createContext<CurrentStepContextValue | null>(null);

// ═══════════════════════════════════════════════════════════════════
// PROVIDER
// ═══════════════════════════════════════════════════════════════════

interface CurrentStepProviderProps {
  children: ReactNode;
}

export function CurrentStepProvider({ children }: CurrentStepProviderProps) {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  // Initial fetch - profile + progress
  const { data, loading, error } = useQuery<MyAccountResponseType>(
    MyProfileWithAccountProgressQuery,
    {
      skip: !isAuthenticated,
      fetchPolicy: "cache-first",
    }
  );

  // Lazy query for refetching only progress
  const [fetchProgress, { loading: progressLoading }] = useLazyQuery<MyAccountProgressResponseType>(
    MyAccountProgressQuery,
    {
      fetchPolicy: "network-only",
    }
  );

  // Refetch only account progress
  const refetchAccountProgress = useCallback(() => {
    if (isAuthenticated) {
      fetchProgress();
    }
  }, [isAuthenticated, fetchProgress]);

  // Compute current step (first incomplete step)
  const currentStep = useMemo(() => {
    const progress = data?.myAccount?.progress;

    if (!progress) return 1;

    for (const step of STEPS) {
      if (!progress.steps[step.key]) {
        return step.id;
      }
    }

    return STEPS.length; // All complete
  }, [data?.myAccount?.progress]);

  const value: CurrentStepContextValue = {
    currentStep,
    profile: data?.myAccount?.profile ?? null,
    progress: data?.myAccount?.progress ?? null,
    profileLoading: loading,
    progressLoading: progressLoading,
    isError: !!error,
    refetchAccountProgress,
  };

  return (
    <CurrentStepContext.Provider value={value}>
      {children}
    </CurrentStepContext.Provider>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HOOK
// ═══════════════════════════════════════════════════════════════════

export function useCurrentStep() {
  const context = useContext(CurrentStepContext);
  
  if (!context) {
    throw new Error("useCurrentStep must be used within a CurrentStepProvider");
  }
  
  return context;
}
