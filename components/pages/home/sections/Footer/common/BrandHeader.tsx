import { memo } from "react";
import { COLORS } from "@/components/pages/home/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// BRAND HEADER — centered brand title / 2027 / tagline with royal styling
// ═══════════════════════════════════════════════════════════════════
export const BrandHeader = memo(function BrandHeader() {
  return (
    <div className="text-center mb-12 sm:mb-14 md:mb-16">
      {/* Royal decorative top element */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <span
          className="h-[1px] w-16 sm:w-24"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.6))",
          }}
        />
        <span style={{ color: COLORS.BRIGHT_GOLD, fontSize: "1.5rem" }}>✦</span>
        <span
          className="h-[1px] w-16 sm:w-24"
          style={{
            background: "linear-gradient(90deg, rgba(255,215,0,0.6), transparent)",
          }}
        />
      </div>

      {/* Main Title */}
      <h3
        className="text-5xl sm:text-6xl md:text-7xl font-bold mb-3 sm:mb-4"
        style={{
          color: COLORS.BRIGHT_GOLD,
          textShadow: "0 0 40px rgba(255,215,0,0.5), 0 4px 8px rgba(0,0,0,0.5)",
          fontFamily: "'Cinzel Decorative', serif",
        }}
      >
        काशी यात्रा
      </h3>
      
      {/* Year with ornate styling */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span
          className="h-[1px] w-8 sm:w-12"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,0,0.5))" }}
        />
        <p
          className="text-2xl sm:text-3xl md:text-4xl tracking-[0.5em] uppercase"
          style={{
            color: COLORS.BRIGHT_GOLD,
            fontFamily: "'Cinzel', serif",
            textShadow: "0 0 20px rgba(255,215,0,0.4)",
          }}
        >
          2027
        </p>
        <span
          className="h-[1px] w-8 sm:w-12"
          style={{ background: "linear-gradient(90deg, rgba(255,107,0,0.5), transparent)" }}
        />
      </div>

      {/* Royal divider */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="text-xs" style={{ color: COLORS.SAFFRON }}>◆</span>
        <span className="text-lg" style={{ color: COLORS.BRIGHT_GOLD }}>༺</span>
        <span className="text-xs" style={{ color: COLORS.SAFFRON }}>✦</span>
        <span className="text-lg" style={{ color: COLORS.BRIGHT_GOLD }}>༻</span>
        <span className="text-xs" style={{ color: COLORS.SAFFRON }}>◆</span>
      </div>

      {/* Tagline with royal border */}
      <div
        className="relative max-w-2xl mx-auto px-6 py-4 sm:px-8 sm:py-5"
        style={{
          background: "linear-gradient(135deg, rgba(255,215,0,0.05) 0%, rgba(139,69,19,0.08) 50%, rgba(255,215,0,0.05) 100%)",
          border: "1px solid rgba(255,215,0,0.2)",
          borderRadius: "4px",
        }}
      >
        {/* Corner ornaments */}
        <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: COLORS.BRIGHT_GOLD, opacity: 0.6 }} />
        <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: COLORS.BRIGHT_GOLD, opacity: 0.6 }} />
        <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: COLORS.BRIGHT_GOLD, opacity: 0.6 }} />
        <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: COLORS.BRIGHT_GOLD, opacity: 0.6 }} />
        
        <p
          className="text-base sm:text-lg md:text-xl leading-relaxed"
          style={{
            color: COLORS.CREAM,
            fontFamily: "'Cinzel', serif",
            letterSpacing: "0.08em",
            lineHeight: "1.9",
          }}
        >
          The grand annual cultural festival of{" "}
          <span style={{ color: COLORS.BRIGHT_GOLD, fontWeight: 600 }}>IIT (BHU) Varanasi</span>
          {" "}— where the sacred traditions of Kashi blend with youthful exuberance, celebrating art, music, dance, and the timeless spirit of Banaras.
        </p>
      </div>
      
      {/* Sanskrit shloka / tagline */}
      <p
        className="mt-8 text-sm sm:text-base"
        style={{
          color: COLORS.SAFFRON,
          fontFamily: "'Cinzel', serif",
          letterSpacing: "0.15em",
          fontStyle: "italic",
        }}
      >
        ॥ संस्कृति • कला • उत्सव ॥
      </p>
      <p
        className="mt-2 text-xs sm:text-sm opacity-70"
        style={{
          color: COLORS.CREAM,
          letterSpacing: "0.2em",
        }}
      >
        CULTURE • ART • CELEBRATION
      </p>
    </div>
  );
});
