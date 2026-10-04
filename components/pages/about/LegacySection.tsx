"use client";

import Image from "next/image";
import { memo } from "react";
import { IMAGES } from "@/lib/images";
import { COLORS } from "@/components/pages/home/constants/palette";
import { CornerOrnaments } from "./CornerOrnaments";

// ═══════════════════════════════════════════════════════════════════
// LEGACY SECTION - IIT BHU Heritage
// ═══════════════════════════════════════════════════════════════════
export const LegacySection = memo(function LegacySection() {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src={IMAGES.about.bhuGate}
              alt="IIT BHU Gate"
              width={1200}
              height={800}
              className="w-full h-auto rounded-2xl"
              style={{
                boxShadow:
                  "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,215,0,0.1)",
              }}
            />
            {/* Overlay gradient */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                background:
                  "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.4) 100%)",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative p-6 sm:p-8">
            <CornerOrnaments />

            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6"
              style={{
                fontFamily: "Georgia, serif",
                color: COLORS.BRIGHT_GOLD,
                textShadow: "0 2px 20px rgba(255,215,0,0.3)",
              }}
            >
              The Legacy
            </h2>

            <div
              className="space-y-4 text-sm sm:text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              <p>
                <span style={{ color: COLORS.BRIGHT_GOLD, fontWeight: 600 }}>
                  Kashi Yatra
                </span>{" "}
                is the annual cultural festival of the{" "}
                <span style={{ color: COLORS.SAFFRON }}>
                  Indian Institute of Technology (BHU) Varanasi
                </span>
                , one of India&apos;s most prestigious institutions with a
                legacy spanning over a century.
              </p>
              <p>
                Founded in 1916 by the visionary{" "}
                <span style={{ color: COLORS.BRIGHT_GOLD }}>
                  Pandit Madan Mohan Malaviya
                </span>
                , IIT BHU stands at the confluence of ancient wisdom and modern
                excellence, much like the sacred city it calls home.
              </p>
              <p>
                What began as a humble celebration of culture has evolved into
                one of North India&apos;s most anticipated cultural
                extravaganzas, drawing thousands of participants from across the
                nation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
