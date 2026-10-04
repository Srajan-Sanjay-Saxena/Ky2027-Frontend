import { COLORS } from "../../constants/palette";

export interface InfoCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

export function InfoCard({ icon: Icon, label, value }: InfoCardProps) {
  return (
    <div
      className="rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: `linear-gradient(145deg, ${COLORS.BG_DEEP}80 0%, ${COLORS.BG_ROYAL}80 100%)`,
        border: `1px solid ${COLORS.GOLD}20`,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="p-2.5 rounded-lg shrink-0"
          style={{
            background: `${COLORS.GOLD}15`,
            border: `1px solid ${COLORS.GOLD}25`,
          }}
        >
          <Icon className="h-5 w-5" style={{ color: COLORS.GOLD }} />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="text-xs uppercase tracking-wider mb-1"
            style={{ color: `${COLORS.GOLD}70` }}
          >
            {label}
          </p>
          <p
            className="text-base font-semibold truncate"
            style={{ color: COLORS.CREAM }}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
