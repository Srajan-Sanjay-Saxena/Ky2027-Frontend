import { memo, type ReactNode } from "react";
import { MandalaRing } from "@/components/pages/home/sections/FestHighlights/common/MandlaRing";
import { COLORS } from "@/components/pages/home/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// FOOTER CARD — reusable ornate link card
// (gradient bg, gold border, boxShadow, rotating mandala watermark,
//  4 corner decorations, and a heading + children)
// ═══════════════════════════════════════════════════════════════════
export const FooterCard = memo(function FooterCard({
  heading,
  mandalaClassName,
  children,
}: {
  heading: string;
  mandalaClassName: string;
  children: ReactNode;
}) {
  return (
    <div
      className="text-center relative p-6 sm:p-8 rounded-lg overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(61,10,24,0.6) 0%, rgba(90,15,37,0.4) 50%, rgba(61,10,24,0.6) 100%)",
        border: "1px solid rgba(255,215,0,0.4)",
        boxShadow:
          "inset 0 0 50px rgba(255,215,0,0.08), 0 0 30px rgba(255,215,0,0.1), 0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      {/* Rotating mandala watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`w-[80%] h-[80%] ${mandalaClassName}`}>
          <MandalaRing className="w-full h-full text-[#FFD700] opacity-[0.35]" />
        </div>
      </div>
      {/* Corner decorations */}
      <div
        className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg"
        style={{ borderColor: COLORS.BRIGHT_GOLD, opacity: 0.7 }}
      />
      <div
        className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg"
        style={{ borderColor: COLORS.BRIGHT_GOLD, opacity: 0.7 }}
      />
      <div
        className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg"
        style={{ borderColor: COLORS.BRIGHT_GOLD, opacity: 0.7 }}
      />
      <div
        className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-lg"
        style={{ borderColor: COLORS.BRIGHT_GOLD, opacity: 0.7 }}
      />

      <h4
        className="mb-6 sm:mb-7 text-lg sm:text-xl relative z-10"
        style={{
          color: COLORS.BRIGHT_GOLD,
          fontFamily: "'Cinzel Decorative', serif",
          letterSpacing: "0.15em",
          textShadow: "0 0 20px rgba(255,215,0,0.5)",
        }}
      >
        {heading}
      </h4>
      {children}
    </div>
  );
});
