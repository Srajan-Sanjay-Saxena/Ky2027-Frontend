import { AlertTriangle, RefreshCw, ImagePlus, Camera, Sun, CreditCard } from "lucide-react";
import { COLORS } from "../../../constants/palette";

interface VerificationErrorProps {
  error: string;
  onUploadDifferent: () => void;
  onRetry: () => void;
}

const tips = [
  { icon: Camera, text: "Use a clear, high-resolution image" },
  { icon: Sun, text: "Ensure good lighting without shadows" },
  { icon: CreditCard, text: "Capture the front side of your Aadhaar" },
];

export function VerificationError({
  error,
  onUploadDifferent,
  onRetry,
}: VerificationErrorProps) {
  return (
    <div className="space-y-8">
      {/* Error Icon & Message */}
      <div className="text-center">
        <div
          className="relative inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
          style={{
            background: `radial-gradient(circle, ${COLORS.ERROR}15 0%, transparent 70%)`,
          }}
        >
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ background: COLORS.ERROR }}
          />
          <div
            className="relative flex items-center justify-center w-16 h-16 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${COLORS.ERROR}20 0%, ${COLORS.ERROR}10 100%)`,
              border: `2px solid ${COLORS.ERROR}40`,
            }}
          >
            <AlertTriangle className="h-8 w-8" style={{ color: COLORS.ERROR }} />
          </div>
        </div>
        
        <h2
          className="text-2xl sm:text-3xl font-bold mb-3"
          style={{ color: COLORS.CREAM }}
        >
          Verification Failed
        </h2>
        
        <p
          className="text-base max-w-md mx-auto leading-relaxed"
          style={{ color: `${COLORS.CREAM}70` }}
        >
          {error}
        </p>
      </div>

      {/* Tips Card */}
      <div
        className="p-6 rounded-2xl"
        style={{
          background: `linear-gradient(145deg, ${COLORS.BG_ROYAL}80 0%, ${COLORS.BG_DEEP}80 100%)`,
          border: `1px solid ${COLORS.GOLD}20`,
        }}
      >
        <h3
          className="text-sm font-semibold uppercase tracking-wider mb-4"
          style={{ color: COLORS.GOLD }}
        >
          Tips for better results
        </h3>
        
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                style={{
                  background: `${COLORS.GOLD}10`,
                  border: `1px solid ${COLORS.GOLD}20`,
                }}
              >
                <tip.icon className="h-4 w-4" style={{ color: COLORS.GOLD }} />
              </div>
              <p className="text-sm" style={{ color: `${COLORS.CREAM}80` }}>
                {tip.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onUploadDifferent}
          className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.02]"
          style={{
            background: `linear-gradient(145deg, ${COLORS.BG_ROYAL} 0%, ${COLORS.BG_DEEP} 100%)`,
            border: `1px solid ${COLORS.GOLD}30`,
            color: COLORS.CREAM,
          }}
        >
          <ImagePlus className="h-5 w-5" style={{ color: COLORS.GOLD }} />
          <span>Upload Different Image</span>
        </button>
        
        <button
          onClick={onRetry}
          className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${COLORS.GOLD} 0%, ${COLORS.GOLD_DARK} 100%)`,
            color: COLORS.BG_DEEP,
            boxShadow: `0 8px 32px ${COLORS.GOLD}25`,
          }}
        >
          <RefreshCw className="h-5 w-5" />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
}
