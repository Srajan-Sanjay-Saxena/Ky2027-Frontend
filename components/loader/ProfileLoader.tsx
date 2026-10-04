"use client";

// ═══════════════════════════════════════════════════════════════════
// PROFILE PAGE LOADER
// Themed loader for Kashi Yatra profile page
// ═══════════════════════════════════════════════════════════════════

const COLORS = {
  BG_DEEP: "#0a0612",
  BG_ROYAL: "#1a0a20",
  GOLD: "#d4a853",
  CREAM: "#fdf6e3",
};

export function ProfileLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      {/* Loader Container */}
      <div className="relative flex flex-col items-center">
        {/* Outer rotating ring */}
        <div className="relative w-32 h-32">
          {/* Spinning outer ring */}
          <div
            className="absolute inset-0 rounded-full animate-spin"
            style={{
              background: `conic-gradient(from 0deg, transparent, ${COLORS.GOLD}, transparent)`,
              animationDuration: "2s",
            }}
          />

          {/* Inner dark circle */}
          <div
            className="absolute inset-2 rounded-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, ${COLORS.BG_ROYAL} 0%, ${COLORS.BG_DEEP} 100%)`,
              boxShadow: `0 0 40px ${COLORS.GOLD}20, inset 0 0 30px ${COLORS.GOLD}10`,
            }}
          >
            {/* Om symbol */}
            <span
              className="text-4xl animate-pulse"
              style={{
                color: COLORS.GOLD,
                textShadow: `0 0 20px ${COLORS.GOLD}60`,
                animationDuration: "1.5s",
              }}
            >
              ॐ
            </span>
          </div>

          {/* Floating dots */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: COLORS.GOLD,
                boxShadow: `0 0 10px ${COLORS.GOLD}`,
                top: "50%",
                left: "50%",
                transform: `rotate(${i * 90}deg) translateY(-60px)`,
                animation: `pulse 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <div className="mt-8 text-center">
          <p
            className="text-lg font-medium tracking-wide"
            style={{
              color: COLORS.CREAM,
              fontFamily: "var(--font-ethereal), serif",
            }}
          >
            Loading Your Profile
          </p>
          <div className="flex items-center justify-center gap-1 mt-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full animate-bounce"
                style={{
                  background: COLORS.GOLD,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: "0.8s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Decorative diyas */}
        <div className="absolute -left-16 top-1/2 -translate-y-1/2 text-2xl opacity-40 animate-pulse">
          🪔
        </div>
        <div
          className="absolute -right-16 top-1/2 -translate-y-1/2 text-2xl opacity-40 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        >
          🪔
        </div>
      </div>
    </div>
  );
}
