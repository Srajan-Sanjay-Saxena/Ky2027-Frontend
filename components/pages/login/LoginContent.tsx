"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { NavbarDesign as Navbar } from "@/components/navbar/Design";
import { PageLoader } from "@/components/loader";
import { useSignIn } from "@/lib/api/hooks";
import { ROYAL_COLORS } from "./constants";
import { BackgroundEffects } from "./BackgroundEffects";
import { MysticGateSection } from "./MysticGateSection";
import { LoginCard } from "./LoginCard";

export function LoginContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isSigningIn, handleSignIn } = useSignIn({
    callbackUrl: "/?auth=success",
  });

  // Redirect to home if already logged in
  useEffect(() => {
    if (status === "authenticated" && session) {
      router.replace("/?info=already-logged-in");
      router.refresh();
    }
  }, [status, session, router]);

  // Show loader while checking session or if already authenticated (redirecting)
  if (status === "loading" || (status === "authenticated" && session)) {
    return <PageLoader />;
  }

  return (
    <>
      {/* Full page loader when signing in */}
      {isSigningIn && <PageLoader />}

      {/* Fixed navbar */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <Navbar position="relative" topOffset={18} />
      </div>

      <main
        className="min-h-screen pt-28 sm:pt-32 pb-12 px-4 flex items-center justify-center"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, ${ROYAL_COLORS.ROYAL_PURPLE}15 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, ${ROYAL_COLORS.DEEP_MAGENTA}12 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, ${ROYAL_COLORS.HOT_PINK}08 0%, transparent 60%),
            linear-gradient(180deg, ${ROYAL_COLORS.BG_DEEP} 0%, ${ROYAL_COLORS.BG_ROYAL} 30%, ${ROYAL_COLORS.BG_WINE} 70%, ${ROYAL_COLORS.BG_DEEP} 100%)
          `,
        }}
      >
        <BackgroundEffects />

        {/* Main Content Container */}
        <div className="relative w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <MysticGateSection />
          <LoginCard onGoogleLogin={handleSignIn} />
        </div>

        {/* Bottom decorative text - Desktop only */}
        <div className="hidden sm:block fixed bottom-6 left-1/2 -translate-x-1/2 text-center">
          <p
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: `${ROYAL_COLORS.GOLD}40` }}
          >
            14th–17th January 2027 • Varanasi
          </p>
        </div>
      </main>
    </>
  );
}
