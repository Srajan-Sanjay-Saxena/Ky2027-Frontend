import { Building2 } from "lucide-react";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";

interface ManualInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function ManualInput({ value, onChange }: ManualInputProps) {
  return (
    <div>
      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          background: `linear-gradient(145deg, ${COLORS.BG_DEEP}80 0%, ${COLORS.BG_ROYAL}80 100%)`,
          border: `1px solid ${COLORS.GOLD}30`,
        }}
      >
        <Building2
          className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5"
          style={{ color: `${COLORS.GOLD}60` }}
        />
        <input
          type="text"
          placeholder="Enter your college name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-base"
          style={{ color: COLORS.CREAM }}
        />
      </div>
      <p className="mt-2 text-xs" style={{ color: `${COLORS.CREAM}40` }}>
        Enter the full name of your college/university
      </p>
    </div>
  );
}
