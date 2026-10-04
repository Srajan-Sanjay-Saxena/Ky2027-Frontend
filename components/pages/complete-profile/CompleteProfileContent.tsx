"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { NavbarDesign as Navbar } from "@/components/navbar/Design";
import { AadhaarStep } from "./steps/adhaar/AadhaarStep";
import { CollegeDetailsStep } from "./steps/college/CollegeDetailsStep";
import { PhoneVerificationStep } from "./steps/phone/PhoneVerificationStep";
import { StepperIndicator } from "./StepperIndicator";
import { COLORS } from "./constants/palette";
import { STEPS } from "./config/data";
import type { AadhaarExtractedData } from "@/lib/api/hooks";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════
interface CompleteProfileContentProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════
export function CompleteProfileContent({ user }: CompleteProfileContentProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  // Shared state across steps
  const [aadhaarData, setAadhaarData] = useState<AadhaarExtractedData | null>(
    null,
  );
  const [selectedCollege, setSelectedCollege] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  // Step navigation
  const goToNextStep = useCallback(() => {
    setCompletedSteps((prev) => new Set(prev).add(currentStep));
    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep]);

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleComplete = useCallback(() => {
    setCompletedSteps((prev) => new Set(prev).add(currentStep));
    router.push("/profile");
  }, [currentStep, router]);

  // Handle Aadhaar complete - step 1 done, move to step 2
  const handleAadhaarComplete = useCallback(
    (data: AadhaarExtractedData) => {
      setAadhaarData(data);
      goToNextStep();
    },
    [goToNextStep],
  );

  // Handle College selection from Step 2
  const handleCollegeSubmit = useCallback(
    (college: string) => {
      setSelectedCollege(college);
      goToNextStep();
    },
    [goToNextStep],
  );

  // Handle Phone verification from Step 3
  const handlePhoneVerified = useCallback(
    (phone: string) => {
      setPhoneNumber(phone);
      handleComplete();
    },
    [handleComplete],
  );

  return (
    <>
      {/* Fixed navbar */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <Navbar position="relative" topOffset={18} />
      </div>

      <main
        className="min-h-screen pt-28 sm:pt-32 pb-12 px-4"
        style={{
          background: `
            radial-gradient(ellipse at 20% 0%, rgba(212,168,83,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(139,21,56,0.08) 0%, transparent 50%),
            linear-gradient(180deg, ${COLORS.BG_DEEP} 0%, ${COLORS.BG_ROYAL} 50%, ${COLORS.BG_DEEP} 100%)
          `,
        }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3"
              style={{
                background: `linear-gradient(135deg, ${COLORS.CREAM} 0%, ${COLORS.GOLD_LIGHT} 50%, ${COLORS.GOLD} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Complete Your Profile
            </h1>
            <p style={{ color: `${COLORS.CREAM}60` }}>
              Just a few steps to unlock the full Kashi Yatra experience
            </p>
          </div>

          {/* Stepper Indicator */}
          <div className="mb-10">
            <StepperIndicator
              steps={STEPS}
              currentStep={currentStep}
              completedSteps={completedSteps}
            />
          </div>

          {/* Step Content Card */}
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: `linear-gradient(145deg, ${COLORS.BG_WINE}60 0%, ${COLORS.BG_ROYAL}80 100%)`,
              border: `1px solid ${COLORS.GOLD}20`,
              boxShadow: `0 0 60px ${COLORS.GOLD}05, 0 25px 50px rgba(0,0,0,0.4)`,
            }}
          >
            {/* Decorative top border */}
            <div
              className="h-1"
              style={{
                background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}60, transparent)`,
              }}
            />

            <div className="p-6 sm:p-10">
              {/* Step Content */}
              {currentStep === 1 && (
                <AadhaarStep onComplete={handleAadhaarComplete} />
              )}

              {currentStep === 2 && (
                <CollegeDetailsStep
                  onSubmit={handleCollegeSubmit}
                  onBack={goToPreviousStep}
                  existingCollege={selectedCollege}
                />
              )}

              {currentStep === 3 && (
                <PhoneVerificationStep
                  onVerified={handlePhoneVerified}
                  onBack={goToPreviousStep}
                  existingPhone={phoneNumber}
                />
              )}
            </div>
          </div>

          {/* Footer Decoration */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <div
              className="h-px w-20"
              style={{
                background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}40)`,
              }}
            />
            <span className="text-2xl">🪔</span>
            <div
              className="h-px w-20"
              style={{
                background: `linear-gradient(90deg, ${COLORS.GOLD}40, transparent)`,
              }}
            />
          </div>
          <p
            className="text-center text-xs mt-3 tracking-widest uppercase"
            style={{ color: `${COLORS.GOLD}50` }}
          >
            Your data is secure and encrypted
          </p>
        </div>
      </main>
    </>
  );
}
