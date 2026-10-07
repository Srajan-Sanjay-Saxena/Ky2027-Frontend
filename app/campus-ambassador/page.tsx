import { Metadata } from "next";
import { CAPageContent } from "@/components/pages/ca/CAPageContent";

export const metadata: Metadata = {
  title: "Campus Ambassador",
  description:
    "Become a Campus Ambassador for Kashi Yatra 2027 - IIT BHU's grandest cultural festival. Lead, inspire, and represent your college at the biggest fest of North India.",
  openGraph: {
    title: "Campus Ambassador | Kashi Yatra 2027",
    description:
      "Join the elite CA program. Represent your college, unlock exclusive perks, and be part of something legendary.",
  },
};

export default function CAPage() {
  return <CAPageContent />;
}
