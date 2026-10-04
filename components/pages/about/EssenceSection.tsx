"use client";

import Image from "next/image";
import { memo } from "react";
import { IMAGES } from "@/lib/images";
import { COLORS, JAZZ_COLORS } from "@/components/pages/home/constants/palette";
import { MysticDivider } from "./MysticDivider";

// ═══════════════════════════════════════════════════════════════════
// ESSENCE OF KASHI SECTION
// ═══════════════════════════════════════════════════════════════════
export const EssenceSection = memo(function EssenceSection() {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
      {/* Ghats Background - Full width */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={IMAGES.about.ghatsSilhouette}
          alt=""
          fill
          className="object-cover object-center opacity-40"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${JAZZ_COLORS.BG_DEEP} 0%, transparent 30%, transparent 70%, ${JAZZ_COLORS.BG_DEEP} 100%)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Om Lotus */}
        <div className="flex justify-center mb-8">
          <Image
            src={IMAGES.about.omLotus}
            alt=""
            width={150}
            height={150}
            className="w-24 sm:w-32 h-auto"
            style={{ filter: "drop-shadow(0 0 30px rgba(255,100,150,0.4))" }}
          />
        </div>

        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6"
          style={{
            fontFamily: "Georgia, serif",
            color: COLORS.BRIGHT_GOLD,
            textShadow: "0 2px 20px rgba(255,215,0,0.3)",
          }}
        >
          The Essence of Kashi
        </h2>

        <div
          className="space-y-4 text-sm sm:text-base md:text-lg leading-relaxed"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          <p>
            <span style={{ color: COLORS.BRIGHT_GOLD, fontStyle: "italic" }}>
              &quot;Kashi&quot;
            </span>{" "}
            — the ancient name of Varanasi, the spiritual capital of India. A
            city where time flows differently, where the sacred Ganges witnesses
            the eternal dance of life and liberation.
          </p>
          <p>
            <span style={{ color: COLORS.SAFFRON, fontStyle: "italic" }}>
              &quot;Yatra&quot;
            </span>{" "}
            — a journey, a pilgrimage. Not just of the body, but of the soul. A
            voyage of discovery through art, music, dance, and drama.
          </p>
          <p style={{ color: COLORS.CREAM, fontWeight: 500 }}>
            Together,{" "}
            <span style={{ color: COLORS.BRIGHT_GOLD }}>Kashi Yatra</span>{" "}
            represents a sacred journey through culture — a celebration that
            honors our roots while embracing the energy of youth.
          </p>
        </div>

        <MysticDivider className="mt-10" />
      </div>
    </section>
  );
});
