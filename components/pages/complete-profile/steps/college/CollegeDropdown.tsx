import { Building2, MapPin, Loader2, AlertCircle } from "lucide-react";
import { type College } from "@/lib/api/hooks";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";

interface CollegeDropdownProps {
  ref?: React.Ref<HTMLDivElement>;
  colleges: College[];
  isSearching: boolean;
  onSelect: (college: College) => void;
  onManualMode: () => void;
}

export function CollegeDropdown({
  ref,
  colleges,
  isSearching,
  onSelect,
  onManualMode,
}: CollegeDropdownProps) {
  return (
    <div
      ref={ref}
      className="absolute z-50 w-full mt-2 rounded-xl overflow-hidden max-h-64 overflow-y-auto"
      style={{
        background: COLORS.BG_ROYAL,
        border: `1px solid ${COLORS.GOLD}30`,
        boxShadow: `0 10px 40px rgba(0,0,0,0.5)`,
      }}
    >
      {isSearching ? (
        <div className="flex items-center justify-center gap-3 p-6">
          <Loader2 className="h-5 w-5 animate-spin" style={{ color: COLORS.GOLD }} />
          <span style={{ color: `${COLORS.CREAM}60` }}>Searching...</span>
        </div>
      ) : colleges.length > 0 ? (
        colleges.map((college: College) => (
          <button
            key={college.aicteId}
            onClick={() => onSelect(college)}
            className="w-full text-left px-4 py-3 transition-all hover:bg-white/5"
            style={{
              borderBottom: `1px solid ${COLORS.GOLD}10`,
            }}
          >
            <div className="flex items-start gap-3">
              <Building2
                className="h-5 w-5 mt-0.5 shrink-0"
                style={{ color: COLORS.GOLD }}
              />
              <div className="min-w-0 flex-1">
                <p
                  className="font-medium text-sm truncate"
                  style={{ color: COLORS.CREAM }}
                >
                  {college.name}
                </p>
                {college.district && (
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin
                      className="h-3 w-3"
                      style={{ color: `${COLORS.CREAM}40` }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: `${COLORS.CREAM}50` }}
                    >
                      {college.district}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))
      ) : (
        <div className="p-6 text-center">
          <AlertCircle
            className="h-8 w-8 mx-auto mb-2"
            style={{ color: `${COLORS.CREAM}40` }}
          />
          <p style={{ color: `${COLORS.CREAM}60` }}>No colleges found</p>
          <button
            onClick={onManualMode}
            className="mt-3 text-sm underline"
            style={{ color: COLORS.GOLD }}
          >
            Enter college name manually
          </button>
        </div>
      )}
    </div>
  );
}
