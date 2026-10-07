"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useProfileCompletionStatus } from "@/lib/api/hooks";
import { AnimatedRocket } from "@/components/pages/ca/components/AnimatedRocket";
import { ProfileIncompleteToast } from "@/components/pages/ca/toasts/error/ProfileIncompleteToast";
import { CA_FORM_URL, CA_LOGIN_CALLBACK } from "@/components/pages/ca/config/ca.config";

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════════
// CTA SECTION
// Final call to action with custom rocket
// ═══════════════════════════════════════════════════════════════════

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showModal, setShowModal] = useState(false);

  const { status } = useSession();
  const { isProfileComplete, isLoading, completionPercentage, displayName } =
    useProfileCompletionStatus();

  const isAuthenticated = status === "authenticated";
  const isAuthLoading = status === "loading";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Walking character - static, no animation
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      window.location.href = CA_LOGIN_CALLBACK;
      return;
    }

    if (!isProfileComplete) {
      setShowModal(true);
      return;
    }

    window.open(CA_FORM_URL, "_blank");
  };

  return (
    <section ref={sectionRef} className="relative min-h-[700px] overflow-hidden px-4 py-24">
      {/* Centered content wrapper - TRUE CENTER */}
      <div className="cta-content relative z-20 flex w-full flex-col items-center text-center">
        {/* Custom Animated Rocket */}
        <div className="relative mb-8 inline-block">
          <div
            className="absolute inset-0 opacity-30 blur-3xl"
            style={{
              background: "radial-gradient(ellipse, rgba(236, 72, 153, 0.5) 0%, transparent 70%)",
            }}
          />
          <AnimatedRocket size={100} />
        </div>

        {/* Headline */}
        <h2 className="mb-6 text-4xl font-black text-white sm:text-5xl md:text-6xl">
          Ready to <span className="ca-gradient-text">Lead</span>?
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400">
          Join the elite squad of Campus Ambassadors and make your mark at{" "}
          <span className="font-semibold text-white">Kashi Yatra 2027</span>. Limited spots
          available!
        </p>

        {/* CTA Button */}
        <button
          onClick={handleApplyClick}
          disabled={isLoading || isAuthLoading}
          className="group relative inline-flex items-center gap-3 rounded-full px-8 py-4 text-lg font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #06b6d4 100%)",
            backgroundSize: "200% 200%",
            animation: "caGradientShift 4s ease infinite",
          }}
        >
          <span
            className="absolute inset-0 rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
            }}
          />

          <span className="relative text-white">
            {isLoading || isAuthLoading
              ? "Loading..."
              : !isAuthenticated
                ? "Sign In to Apply"
                : isProfileComplete
                  ? "Apply Now"
                  : "Complete Profile to Apply"}
          </span>

          <svg
            className="relative h-5 w-5 transform text-white transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>

        {/* Status indicator */}
        {isAuthenticated && !isLoading && (
          <div className="mt-6 flex items-center justify-center gap-2 text-sm">
            {isProfileComplete ? (
              <>
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-green-400">Profile verified • Ready to apply</span>
              </>
            ) : (
              <>
                <span className="h-2 w-2 rounded-full bg-yellow-500" />
                <span className="text-yellow-400">Profile {completionPercentage}% complete</span>
              </>
            )}
          </div>
        )}

        {/* Secondary links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <Link href="/about" className="transition-colors hover:text-white">
            Learn about Kashi Yatra →
          </Link>
          <Link href="/contact" className="transition-colors hover:text-white">
            Have questions? Contact us →
          </Link>
        </div>
      </div>

      {/* Incomplete Profile Modal */}
      {showModal && (
        <ProfileIncompleteToast
          completionPercentage={completionPercentage}
          displayName={displayName}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
}
