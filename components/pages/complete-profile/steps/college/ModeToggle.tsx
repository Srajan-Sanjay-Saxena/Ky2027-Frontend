import { COLORS } from "@/components/pages/complete-profile/constants/palette";

interface ModeToggleProps {
  isManualMode: boolean;
  onSearchMode: () => void;
  onManualMode: () => void;
}

export function ModeToggle({ isManualMode, onSearchMode, onManualMode }: ModeToggleProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <button
        onClick={onSearchMode}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          !isManualMode ? "scale-105" : "opacity-70 hover:opacity-100"
        }`}
        style={{
          background: !isManualMode ? `${COLORS.GOLD}20` : "transparent",
          border: `1px solid ${!isManualMode ? COLORS.GOLD : `${COLORS.GOLD}30`}`,
          color: !isManualMode ? COLORS.GOLD : `${COLORS.CREAM}70`,
        }}
      >
        Search College
      </button>
      <button
        onClick={onManualMode}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          isManualMode ? "scale-105" : "opacity-70 hover:opacity-100"
        }`}
        style={{
          background: isManualMode ? `${COLORS.GOLD}20` : "transparent",
          border: `1px solid ${isManualMode ? COLORS.GOLD : `${COLORS.GOLD}30`}`,
          color: isManualMode ? COLORS.GOLD : `${COLORS.CREAM}70`,
        }}
      >
        Enter Manually
      </button>
    </div>
  );
}
