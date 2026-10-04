"use client";

import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Phone, ArrowLeft, Loader2, CheckCircle2, Send } from "lucide-react";
import { isValidPhoneNumber } from "react-phone-number-input";
import type { E164Number } from "libphonenumber-js/core";
import { useSendOtp, useVerifyOtp } from "@/lib/api/hooks";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";
import { useCountdown } from "./hooks";
import { PhoneInput, OtpInput, OTP_LENGTH, ResendTimer, VerificationError } from "./components";

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════

const RESEND_COOLDOWN = 60; // seconds

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface PhoneVerificationStepProps {
  onVerified: (phone: string) => void;
  onBack: () => void;
  existingPhone?: string;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function PhoneVerificationStep({
  onVerified,
  onBack,
  existingPhone,
}: PhoneVerificationStepProps) {
  const { data: session } = useSession();
  const [phoneNumber, setPhoneNumber] = useState<E164Number | undefined>(
    existingPhone as E164Number | undefined
  );
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [error, setError] = useState<string | null>(null);

  const { countdown, startCountdown, resetCountdown } = useCountdown();

  // API hooks
  const { sendOtp, isPending: isSending } = useSendOtp();
  const { verifyOtp, isPending: isVerifying } = useVerifyOtp(session?.user?.id);

  const isPhoneValid = phoneNumber ? isValidPhoneNumber(phoneNumber) : false;

  // Handle phone submit
  const handleSendOtp = useCallback(() => {
    if (!phoneNumber || !isPhoneValid) {
      setError("Please enter a valid phone number");
      return;
    }

    setError(null);

    sendOtp(
      { body: { phoneNumber } },
      {
        onSuccess: () => {
          setStep("otp");
          startCountdown(RESEND_COOLDOWN);
        },
        onError: (err: Error) => {
          setError(err.message || "Failed to send OTP");
        },
      }
    );
  }, [phoneNumber, isPhoneValid, sendOtp, startCountdown]);

  // Handle OTP verify
  const handleVerifyOtp = useCallback(() => {
    if (otp.length !== OTP_LENGTH) {
      setError("Please enter the complete OTP");
      return;
    }

    if (!phoneNumber) return;

    setError(null);

    verifyOtp(
      { body: { phoneNumber, otp } },
      {
        onSuccess: () => {
          onVerified(phoneNumber);
        },
        onError: (err: Error) => {
          setError(err.message || "Invalid OTP");
          setOtp("");
        },
      }
    );
  }, [otp, phoneNumber, verifyOtp, onVerified]);

  // Handle resend
  const handleResend = useCallback(() => {
    if (countdown > 0 || !phoneNumber) return;

    setOtp("");
    setError(null);

    sendOtp(
      { body: { phoneNumber } },
      {
        onSuccess: () => {
          startCountdown(RESEND_COOLDOWN);
        },
        onError: (err: Error) => {
          setError(err.message || "Failed to resend OTP");
        },
      }
    );
  }, [countdown, phoneNumber, sendOtp, startCountdown]);

  // Handle edit phone
  const handleEditPhone = () => {
    setStep("phone");
    setOtp("");
    setError(null);
    resetCountdown();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
          style={{
            background: `linear-gradient(135deg, ${COLORS.GOLD}20 0%, ${COLORS.GOLD_DARK}10 100%)`,
            border: `1px solid ${COLORS.GOLD}30`,
          }}
        >
          <Phone className="h-8 w-8" style={{ color: COLORS.GOLD }} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: COLORS.CREAM }}>
          {step === "phone" ? "Verify Your Phone" : "Enter OTP"}
        </h2>
        <p style={{ color: `${COLORS.CREAM}60` }}>
          {step === "phone"
            ? "We'll send a verification code to your phone"
            : `We've sent a 6-digit code to ${phoneNumber}`}
        </p>
      </div>

      {/* Phone Input Step */}
      {step === "phone" && (
        <div className="space-y-6">
          <PhoneInput
            value={phoneNumber}
            onChange={(value) => {
              setPhoneNumber(value);
              setError(null);
            }}
            disabled={isSending}
          />

          {/* Send OTP Button */}
          <button
            onClick={handleSendOtp}
            disabled={!isPhoneValid || isSending}
            className={`
              w-full py-4 rounded-xl font-semibold text-lg
              transition-all duration-300 flex items-center justify-center gap-2
              ${isPhoneValid && !isSending ? "hover:scale-[1.02] hover:shadow-lg" : "opacity-50 cursor-not-allowed"}
            `}
            style={{
              background: isPhoneValid
                ? `linear-gradient(135deg, ${COLORS.GOLD} 0%, ${COLORS.GOLD_DARK} 100%)`
                : `${COLORS.GOLD}30`,
              color: isPhoneValid ? COLORS.BG_DEEP : `${COLORS.CREAM}50`,
              boxShadow: isPhoneValid ? `0 10px 40px ${COLORS.GOLD}30` : "none",
            }}
          >
            {isSending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Send OTP
              </>
            )}
          </button>
        </div>
      )}

      {/* OTP Input Step */}
      {step === "otp" && (
        <div className="space-y-6">
          <OtpInput value={otp} onChange={setOtp} disabled={isVerifying} />

          {/* Resend Timer / Button */}
          <div className="text-center">
            <ResendTimer countdown={countdown} onResend={handleResend} isLoading={isSending} />
          </div>

          {/* Edit Phone */}
          <button
            onClick={handleEditPhone}
            className="block mx-auto text-sm underline"
            style={{ color: `${COLORS.CREAM}50` }}
          >
            Change phone number
          </button>

          {/* Verify Button */}
          <button
            onClick={handleVerifyOtp}
            disabled={otp.length !== OTP_LENGTH || isVerifying}
            className={`
              w-full py-4 rounded-xl font-semibold text-lg
              transition-all duration-300 flex items-center justify-center gap-2
              ${otp.length === OTP_LENGTH && !isVerifying ? "hover:scale-[1.02] hover:shadow-lg" : "opacity-50 cursor-not-allowed"}
            `}
            style={{
              background:
                otp.length === OTP_LENGTH
                  ? `linear-gradient(135deg, ${COLORS.SUCCESS}, #16a34a)`
                  : `${COLORS.GOLD}30`,
              color: otp.length === OTP_LENGTH ? "#fff" : `${COLORS.CREAM}50`,
              boxShadow: otp.length === OTP_LENGTH ? `0 10px 40px ${COLORS.SUCCESS}30` : "none",
            }}
          >
            {isVerifying ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-5 w-5" />
                Verify & Complete
              </>
            )}
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && <VerificationError message={error} />}

      {/* Back Button (only in phone step) */}
      {step === "phone" && (
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 mx-auto px-6 py-3 rounded-xl font-medium transition-all hover:scale-[1.02]"
          style={{
            background: COLORS.BG_ROYAL,
            border: `1px solid ${COLORS.GOLD}30`,
            color: COLORS.CREAM,
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      )}
    </div>
  );
}
