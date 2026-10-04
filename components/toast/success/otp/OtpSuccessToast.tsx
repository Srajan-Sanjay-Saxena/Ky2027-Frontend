"use client";

// Custom SMS Sent Icon - Animated paper plane with signal waves
function SmsSentIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Signal waves */}
      <path
        d="M24 6C26 8 27 11 27 14"
        stroke="url(#waveGradient1)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M22 8C23.5 9.5 24.5 12 24.5 14"
        stroke="url(#waveGradient2)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      
      {/* Phone body */}
      <rect
        x="6"
        y="4"
        width="14"
        height="24"
        rx="2"
        fill="url(#phoneGradient)"
        stroke="#22c55e"
        strokeWidth="1"
      />
      
      {/* Phone screen */}
      <rect
        x="8"
        y="7"
        width="10"
        height="15"
        rx="1"
        fill="#0a1a12"
      />
      
      {/* Message bubble on screen */}
      <path
        d="M10 11H16C16.5 11 17 11.5 17 12V14C17 14.5 16.5 15 16 15H14L12 17V15H10C9.5 15 9 14.5 9 14V12C9 11.5 9.5 11 10 11Z"
        fill="#22c55e"
      />
      
      {/* OTP dots on message */}
      <circle cx="11" cy="13" r="0.7" fill="#0a1a12" />
      <circle cx="13" cy="13" r="0.7" fill="#0a1a12" />
      <circle cx="15" cy="13" r="0.7" fill="#0a1a12" />
      
      {/* Phone speaker */}
      <rect x="11" y="5" width="4" height="1" rx="0.5" fill="#16a34a" />
      
      {/* Phone home button */}
      <circle cx="13" cy="25" r="1.5" stroke="#22c55e" strokeWidth="0.8" fill="none" />
      
      {/* Checkmark badge */}
      <circle cx="22" cy="20" r="5" fill="#22c55e" />
      <path
        d="M19.5 20L21 21.5L24.5 18"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <defs>
        <linearGradient id="phoneGradient" x1="6" y1="4" x2="20" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#134e2a" />
          <stop offset="1" stopColor="#0a2d18" />
        </linearGradient>
        <linearGradient id="waveGradient1" x1="24" y1="6" x2="27" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22c55e" />
          <stop offset="1" stopColor="#4ade80" />
        </linearGradient>
        <linearGradient id="waveGradient2" x1="22" y1="8" x2="24.5" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22c55e" />
          <stop offset="1" stopColor="#4ade80" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Decorative pattern
function OtpPattern({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 6 digit boxes representing OTP */}
      <rect x="1" y="9" width="3" height="6" rx="0.5" fill="#22c55e" opacity="0.3" />
      <rect x="5" y="9" width="3" height="6" rx="0.5" fill="#22c55e" opacity="0.4" />
      <rect x="9" y="9" width="3" height="6" rx="0.5" fill="#22c55e" opacity="0.5" />
      <rect x="13" y="9" width="3" height="6" rx="0.5" fill="#22c55e" opacity="0.6" />
      <rect x="17" y="9" width="3" height="6" rx="0.5" fill="#22c55e" opacity="0.7" />
      <rect x="21" y="9" width="3" height="6" rx="0.5" fill="#22c55e" opacity="0.8" />
    </svg>
  );
}

export function OtpSuccessToast() {
  return (
    <div
      className="flex items-start gap-3 sm:gap-4 px-3 sm:px-5 py-3 sm:py-4 rounded-xl w-[calc(100vw-32px)] sm:w-auto sm:min-w-[340px] sm:max-w-[440px] mx-auto relative overflow-hidden"
      style={{
        background: `linear-gradient(145deg, #0a1a12 0%, #0d2818 40%, #0a1a12 100%)`,
        border: `1px solid rgba(34, 197, 94, 0.5)`,
        boxShadow: `
          0 0 30px rgba(34, 197, 94, 0.15),
          0 10px 40px rgba(0,0,0,0.5),
          inset 0 1px 0 rgba(34,197,94,0.15)
        `,
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #22c55e 1px, transparent 0)`,
            backgroundSize: '16px 16px',
          }}
        />
      </div>

      {/* Icon */}
      <div
        className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center relative z-10"
        style={{
          background: `linear-gradient(145deg, #134e2a 0%, #0a2d18 100%)`,
          border: `1px solid rgba(34,197,94,0.4)`,
          boxShadow: `0 4px 20px rgba(34,197,94,0.2)`,
        }}
      >
        <SmsSentIcon className="w-8 h-8 sm:w-9 sm:h-9" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pt-1 relative z-10">
        <p
          className="text-sm sm:text-base font-bold tracking-wide"
          style={{
            color: "#4ade80",
            textShadow: "0 0 20px rgba(74,222,128,0.4)",
          }}
        >
          OTP Sent Successfully
        </p>
        <p
          className="text-xs sm:text-sm mt-1 leading-relaxed"
          style={{ color: "rgba(200,255,200,0.7)" }}
        >
          Check your phone for the 6-digit verification code
        </p>
        
        {/* Timer hint */}
        <div 
          className="mt-2 flex items-center gap-2"
          style={{ color: "rgba(34,197,94,0.6)" }}
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
          </svg>
          <span className="text-[10px] sm:text-xs">Valid for 60 seconds</span>
        </div>
      </div>

      {/* Decorative OTP pattern */}
      <OtpPattern className="hidden sm:block w-6 h-6 flex-shrink-0 opacity-50 self-center" />
      
      {/* Glow effect */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)`,
          transform: 'translate(30%, -30%)',
        }}
      />
    </div>
  );
}
