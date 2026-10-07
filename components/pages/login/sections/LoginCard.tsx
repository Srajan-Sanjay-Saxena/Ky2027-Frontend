"use client";

import { ROYAL_COLORS } from "@/components/pages/login/constants";

interface LoginCardProps {
  onGoogleLogin: () => void;
}

export function LoginCard({ onGoogleLogin }: LoginCardProps) {
  return (
    <div
      className="relative mx-auto w-full max-w-md lg:mx-0"
      style={{
        animation: "fadeInUp 0.6s ease-out",
      }}
    >
      {/* Ornate frame corners */}
      <div
        className="absolute -top-3 -left-3 h-12 w-12 rounded-tl-lg border-t-2 border-l-2"
        style={{ borderColor: ROYAL_COLORS.GOLD }}
      />
      <div
        className="absolute -top-3 -right-3 h-12 w-12 rounded-tr-lg border-t-2 border-r-2"
        style={{ borderColor: ROYAL_COLORS.GOLD }}
      />
      <div
        className="absolute -bottom-3 -left-3 h-12 w-12 rounded-bl-lg border-b-2 border-l-2"
        style={{ borderColor: ROYAL_COLORS.GOLD }}
      />
      <div
        className="absolute -right-3 -bottom-3 h-12 w-12 rounded-br-lg border-r-2 border-b-2"
        style={{ borderColor: ROYAL_COLORS.GOLD }}
      />

      {/* Card */}
      <div
        className="relative overflow-hidden rounded-2xl p-8 sm:p-10"
        style={{
          background: `linear-gradient(145deg, ${ROYAL_COLORS.BG_ROYAL}95 0%, ${ROYAL_COLORS.BG_WINE}90 50%, ${ROYAL_COLORS.BG_ROYAL}95 100%)`,
          border: `1px solid ${ROYAL_COLORS.GOLD}40`,
          boxShadow: `
            0 0 60px ${ROYAL_COLORS.GOLD}15,
            0 25px 50px rgba(0,0,0,0.5),
            inset 0 1px 0 ${ROYAL_COLORS.GOLD}20
          `,
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Inner glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${ROYAL_COLORS.GOLD}08 0%, transparent 50%)`,
          }}
        />

        {/* Header */}
        <CardHeader />

        {/* Meaningful Text Content */}
        <CardDescription />

        {/* Google Sign In Button */}
        <GoogleSignInButton onClick={onGoogleLogin} />

        {/* Bottom decorative element */}
        <CardFooter />
      </div>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="relative z-10 mb-8 text-center">
      {/* Om symbol */}
      <div
        className="mb-4 text-5xl"
        style={{
          color: ROYAL_COLORS.GOLD,
          textShadow: `0 0 30px ${ROYAL_COLORS.GOLD}60`,
          filter: `drop-shadow(0 0 15px ${ROYAL_COLORS.GOLD}40)`,
        }}
      >
        ॐ
      </div>

      {/* Title */}
      <h1
        className="mb-3 text-4xl font-bold sm:text-5xl"
        style={{
          fontFamily: "'Cinzel Decorative', Georgia, serif",
          background: `linear-gradient(135deg, ${ROYAL_COLORS.GOLD_LIGHT} 0%, ${ROYAL_COLORS.GOLD} 50%, ${ROYAL_COLORS.GOLD_DARK} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: `0 0 30px ${ROYAL_COLORS.GOLD}30`,
        }}
      >
        स्वागतम्
      </h1>

      <p
        className="mb-2 text-sm tracking-[0.3em] uppercase"
        style={{ color: `${ROYAL_COLORS.CREAM}70` }}
      >
        Welcome, Traveler
      </p>

      {/* Decorative line */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <div
          className="h-px w-16"
          style={{
            background: `linear-gradient(90deg, transparent, ${ROYAL_COLORS.GOLD})`,
          }}
        />
        <div
          className="h-2 w-2 rotate-45"
          style={{
            background: ROYAL_COLORS.GOLD,
            boxShadow: `0 0 10px ${ROYAL_COLORS.GOLD}`,
          }}
        />
        <div
          className="h-px w-16"
          style={{
            background: `linear-gradient(90deg, ${ROYAL_COLORS.GOLD}, transparent)`,
          }}
        />
      </div>
    </div>
  );
}

function CardDescription() {
  return (
    <div className="relative z-10 mb-8">
      <div
        className="space-y-4 rounded-xl p-6 text-center"
        style={{
          background: `${ROYAL_COLORS.BG_DEEP}40`,
          border: `1px solid ${ROYAL_COLORS.GOLD}15`,
        }}
      >
        <p
          className="text-base leading-relaxed"
          style={{
            color: `${ROYAL_COLORS.CREAM}90`,
            fontFamily: "Georgia, serif",
          }}
        >
          Embark upon a{" "}
          <span style={{ color: ROYAL_COLORS.GOLD, fontWeight: 600 }}>sacred journey</span> through
          the heart of India&apos;s oldest living city. Where ancient traditions dance with youthful
          spirits.
        </p>

        <div className="flex items-center justify-center gap-2">
          <span style={{ color: ROYAL_COLORS.GOLD }}>✦</span>
          <span style={{ color: ROYAL_COLORS.GOLD }}>✦</span>
          <span style={{ color: ROYAL_COLORS.GOLD }}>✦</span>
        </div>

        <p
          className="text-sm leading-relaxed"
          style={{
            color: `${ROYAL_COLORS.CREAM}70`,
          }}
        >
          Sign in to register for events, book passes, and become part of
          <span style={{ color: ROYAL_COLORS.GOLD }}> Kashi Yatra 2027</span> — North India&apos;s
          grandest cultural extravaganza.
        </p>
      </div>
    </div>
  );
}

interface GoogleSignInButtonProps {
  onClick: () => void;
}

function GoogleSignInButton({ onClick }: GoogleSignInButtonProps) {
  return (
    <div className="relative z-10 space-y-4">
      <button
        type="button"
        onClick={onClick}
        className="group relative flex w-full items-center justify-center gap-4 overflow-hidden rounded-xl py-4 font-semibold transition-all duration-300 hover:scale-[1.02]"
        style={{
          background: `linear-gradient(135deg, ${ROYAL_COLORS.GOLD} 0%, ${ROYAL_COLORS.GOLD_DARK} 50%, ${ROYAL_COLORS.GOLD} 100%)`,
          color: ROYAL_COLORS.BG_DEEP,
          boxShadow: `0 0 30px ${ROYAL_COLORS.GOLD}40, 0 4px 15px rgba(0,0,0,0.3)`,
          border: `1px solid ${ROYAL_COLORS.GOLD_LIGHT}`,
        }}
      >
        {/* Shimmer effect */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)`,
            animation: "shimmerSlide 2s ease-in-out infinite",
          }}
        />

        <span className="relative z-10 flex items-center gap-3 text-lg">
          <svg className="h-6 w-6" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </span>
      </button>

      {/* Security note */}
      <p className="text-center text-xs" style={{ color: `${ROYAL_COLORS.CREAM}50` }}>
        🔒 Secured by Google Authentication
      </p>
    </div>
  );
}

function CardFooter() {
  return (
    <div className="relative z-10 mt-8">
      <div className="flex items-center justify-center gap-3">
        <div
          className="h-px w-20"
          style={{
            background: `linear-gradient(90deg, transparent, ${ROYAL_COLORS.GOLD}40)`,
          }}
        />
        <span className="text-2xl">🪔</span>
        <div
          className="h-px w-20"
          style={{
            background: `linear-gradient(90deg, ${ROYAL_COLORS.GOLD}40, transparent)`,
          }}
        />
      </div>
      <p
        className="mt-3 text-center text-xs tracking-wider"
        style={{ color: `${ROYAL_COLORS.GOLD}60` }}
      >
        ॥ IIT (BHU) Varanasi ॥
      </p>
    </div>
  );
}
