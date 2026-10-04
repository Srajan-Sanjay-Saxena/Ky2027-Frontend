import { GraduationCap, Phone, Shield } from "lucide-react";

interface StepConfig {
  id: number;
  key: "aadhaar" | "college" | "phone";
  title: string;
  description: string;
  icon: React.ElementType;
}

// 3 main steps for profile completion
export const STEPS: StepConfig[] = [
  {
    id: 1,
    key: "aadhaar",
    title: "Aadhaar Verification",
    description: "Identity verification",
    icon: Shield,
  },
  {
    id: 2,
    key: "college",
    title: "College Details",
    description: "Academic information",
    icon: GraduationCap,
  },
  {
    id: 3,
    key: "phone",
    title: "Phone Verification",
    description: "Contact verification",
    icon: Phone,
  },
];

export type { StepConfig };
