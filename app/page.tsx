import { Suspense } from "react";
import {
  HeroSection,
  ProNitesSection,
  TheExperience,
  BanarasiVibesSection,
  FooterSection,
  FestHighlightsSection,
} from "@/components/pages/home/sections";
import { Navbar } from "@/components/navbar/Navbar";
import { AuthToastHandler } from "@/components/auth";

export default function Home() {
  return (
    <main>
      {/* Centralized auth toast handler - handles sign-in/sign-out toasts
          Must be wrapped in Suspense because it uses useSearchParams */}
      <Suspense fallback={null}>
        <AuthToastHandler />
      </Suspense>

      {/* Page-level navbar: hidden over the Hero, revealed for every section
          below it. Sits above all section wrappers so nothing paints over it. */}
      <Navbar />

      <div className="sticky top-0 h-screen z-0">
        <HeroSection />
      </div>
      <div className="relative z-10">
        <ProNitesSection />
      </div>
      <div className="relative z-15">
        <TheExperience />
      </div>
      <div className="sticky top-0 z-20">
        <BanarasiVibesSection />
      </div>
      <div className="sticky top-0 z-30">
        <FestHighlightsSection />
      </div>
      <div className="relative z-70">
        <FooterSection />
      </div>
    </main>
  );
}
