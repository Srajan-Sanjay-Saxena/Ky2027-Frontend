import { Metadata } from "next";
import { SponsorsPageContent } from "@/components/pages/sponsors/sections/SponsorsPageContent";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Our valued sponsors & partners powering Kashi Yatra 2027. Join top brands supporting IIT BHU's biggest cultural festival.",
  openGraph: {
    title: "Sponsors | Kashi Yatra 2027",
    description: "Meet the brands powering IIT BHU's biggest cultural fest.",
  },
};

export default function SponsorsPage() {
  return <SponsorsPageContent />;
}
