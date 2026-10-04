import { CheckCircle2 } from "lucide-react";
import { type College } from "@/lib/api/hooks";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";

interface SelectedCollegeCardProps {
  college: College;
}

export function SelectedCollegeCard({ college }: SelectedCollegeCardProps) {
  return (
    <div
      className="mt-4 p-4 rounded-xl flex items-center gap-3"
      style={{
        background: `${COLORS.SUCCESS}10`,
        border: `1px solid ${COLORS.SUCCESS}25`,
      }}
    >
      <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: COLORS.SUCCESS }} />
      <div className="min-w-0 flex-1">
        <p className="font-medium text-sm" style={{ color: COLORS.CREAM }}>
          {college.name}
        </p>
        {college.district && (
          <p className="text-xs" style={{ color: `${COLORS.CREAM}50` }}>
            {college.district} • {college.institutionType}
          </p>
        )}
      </div>
    </div>
  );
}
