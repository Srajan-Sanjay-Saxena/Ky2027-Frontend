import { Search, X } from "lucide-react";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";

interface CollegeSearchInputProps {
  ref?: React.Ref<HTMLInputElement>;
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onClear: () => void;
  isDropdownOpen: boolean;
}

export function CollegeSearchInput({
  ref,
  value,
  onChange,
  onFocus,
  onClear,
  isDropdownOpen,
}: CollegeSearchInputProps) {
  return (
    <div
      className="relative rounded-xl overflow-hidden"
      style={{
        background: `linear-gradient(145deg, ${COLORS.BG_DEEP}80 0%, ${COLORS.BG_ROYAL}80 100%)`,
        border: `1px solid ${isDropdownOpen ? COLORS.GOLD : `${COLORS.GOLD}30`}`,
      }}
    >
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5"
        style={{ color: `${COLORS.GOLD}60` }}
      />
      <input
        ref={ref}
        type="text"
        placeholder="Search for your college..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        className="w-full pl-12 pr-12 py-4 bg-transparent outline-none text-base"
        style={{ color: COLORS.CREAM }}
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10"
        >
          <X className="h-4 w-4" style={{ color: `${COLORS.CREAM}60` }} />
        </button>
      )}
    </div>
  );
}
