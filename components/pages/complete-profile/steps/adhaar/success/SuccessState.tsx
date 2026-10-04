import {
  UserCheck,
  User,
  Calendar,
  Users,
  CreditCard,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { type AadhaarExtractedData } from "@/lib/api/hooks";
import { COLORS } from "../../../constants/palette";
import { InfoCard } from "../InfoCard";

interface SuccessStateProps {
  data: AadhaarExtractedData;
  onReupload: () => void;
  onConfirm: () => void;
}

export function SuccessState({
  data,
  onReupload,
  onConfirm,
}: SuccessStateProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
          style={{
            background: `${COLORS.SUCCESS}20`,
            border: `1px solid ${COLORS.SUCCESS}30`,
          }}
        >
          <UserCheck className="h-8 w-8" style={{ color: COLORS.SUCCESS }} />
        </div>
        <h2
          className="text-2xl sm:text-3xl font-bold mb-2"
          style={{ color: COLORS.CREAM }}
        >
          Details Extracted Successfully
        </h2>
        <p style={{ color: `${COLORS.CREAM}60` }}>
          Please verify the information below is correct
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard icon={User} label="Full Name" value={data.name} />
        <InfoCard
          icon={Calendar}
          label="Date of Birth"
          value={data.dateOfBirth}
        />
        <InfoCard icon={Users} label="Gender" value={data.gender} />
        <InfoCard
          icon={CreditCard}
          label="Aadhaar (Last 4)"
          value={`XXXX XXXX ${data.aadhaarLast4}`}
        />
      </div>

      <div
        className="flex items-center justify-center gap-3 p-4 rounded-xl"
        style={{
          background: `${COLORS.SUCCESS}10`,
          border: `1px solid ${COLORS.SUCCESS}25`,
        }}
      >
        <CheckCircle2 className="h-5 w-5" style={{ color: COLORS.SUCCESS }} />
        <p className="text-sm font-medium" style={{ color: COLORS.SUCCESS }}>
          Aadhaar verified successfully
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onReupload}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-[1.02]"
          style={{
            background: COLORS.BG_ROYAL,
            border: `1px solid ${COLORS.GOLD}30`,
            color: COLORS.CREAM,
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          Re-upload
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-3 rounded-xl font-semibold text-lg transition-all hover:scale-[1.02] hover:shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${COLORS.GOLD} 0%, ${COLORS.GOLD_DARK} 100%)`,
            color: COLORS.BG_DEEP,
            boxShadow: `0 10px 40px ${COLORS.GOLD}30`,
          }}
        >
          Confirm & Continue
        </button>
      </div>
    </div>
  );
}
