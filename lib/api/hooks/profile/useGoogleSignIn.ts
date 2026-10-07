"use client";

import { useState, useCallback } from "react";
import { signIn } from "next-auth/react";

type Provider = "google";

interface UseSignInOptions {
  provider?: Provider;
  callbackUrl?: string;
}

/**
 * Hook for handling OAuth sign in with loading state.
 *
 * For OAuth providers (Google, etc.), the browser MUST redirect to the
 * provider's auth page. The loader shows briefly before the redirect happens,
 * giving visual feedback that the sign-in process has started.
 *
 * On success: NextAuth redirects to callbackUrl (/?auth=success)
 * On error: NextAuth redirects to /?error=<code>
 */
export function useSignIn(options: UseSignInOptions = {}) {
  const { provider = "google", callbackUrl = "/?auth=success" } = options;
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = useCallback(async () => {
    if (isSigningIn) return; // Prevent multiple clicks

    setIsSigningIn(true);

    // For OAuth, this will redirect the browser to the provider's auth page.
    // The loader stays visible until the browser navigates away.
    await signIn(provider, { callbackUrl });

    // This line is only reached if signIn somehow fails without redirecting
    setIsSigningIn(false);
  }, [isSigningIn, provider, callbackUrl]);

  return {
    isSigningIn,
    handleSignIn,
  };
}
