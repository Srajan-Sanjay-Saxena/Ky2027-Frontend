"use client";

// Custom OTP Error Icon - Phone with X
function OtpErrorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Phone body */}
      <rect
        x="6"
        y="4"
        width="14"
        height="24"
        rx="2"
        fill="url(#phoneErrorGradient)"
        stroke="#ef4444"
        strokeWidth="1"
      />
      
      {/* Phone screen */}
      <rect
        x="8"
        y="7"
        width="10"
        height="15"
        rx="1"
        fill="#1a0a0e"
      />
      
      {/* Failed message on screen */}
      <rect x="9.5" y="10" width="7" height="5" rx="0.5" fill="#ef4444" opacity="0.3" />
      <path
        d="M11 12.5L15 12.5M13 10.5V14.5"
        stroke="#ef4444"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.6"
        transform="rotate(45 13 12.5)"
      />
      
      {/* Phone speaker */}
      <rect x="11" y="5" width="4" height="1" rx="0.5" fill="#ef4444" opacity="0.5" />
      
      {/* Phone home button */}
      <circle cx="13" cy="25" r="1.5" stroke="#ef4444" strokeWidth="0.8" fill="none" opacity="0.5" />
      
      {/* Error badge */}
      <circle cx="22" cy="20" r="6" fill="#ef4444" />
      <path
        d="M19.5 17.5L24.5 22.5M24.5 17.5L19.5 22.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <defs>
        <linearGradient id="phoneErrorGradient" x1="6" y1="4" x2="20" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4e1a1a" />
          <stop offset="1" stopColor="#2d0a12" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function OtpErrorToast() {
  return (
    <div
      className="flex items-start gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 rounded-xl w-[calc(100vw-32px)] sm:w-auto sm:min-w-[340px] sm:max-w-[440px] mx-auto relative overflow-hidden"
      style={{
        background: `linear-gradient(145deg, #1a0a0e 0%, #2d0a12 40%, #1a0a0e 100%)`,
        border: `1px solid rgba(239, 68, 68, 0.5)`,
        boxShadow: `
          0 0 30px rgba(239, 68, 68, 0.15),
          0 10px 40px rgba(0,0,0,0.5),
          inset 0 1px 0 rgba(239,68,68,0.15)
        `,
      }}
    >
      {/* Icon */}
      <div
        className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center"
        style={{
          background: `linear-gradient(145deg, #4e1a1a 0%, #2d0a12 100%)`,
          border: `1px solid rgba(239,68,68,0.4)`,
        }}
      >
        <OtpErrorIcon className="w-8 h-8 sm:w-9 sm:h-9" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pt-1">
        <p
          className="text-sm sm:text-base font-bold tracking-wide"
          style={{
            color: "#f87171",
            textShadow: "0 0 20px rgba(248,113,113,0.4)",
          }}
        >
          OTP Verification Failed
        </p>
        <p
          className="text-xs sm:text-sm mt-1 leading-relaxed"
          style={{ color: "rgba(255,200,200,0.7)" }}
        >
          Invalid or expired code. Please try again.
        </p>
      </div>
    </div>
  );
}
