"use client";

// Custom Verified ID Icon - ID card with checkmark
function VerifiedIdIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Card body */}
      <rect
        x="3"
        y="6"
        width="22"
        height="16"
        rx="2"
        fill="url(#cardGradient)"
        stroke="#22c55e"
        strokeWidth="1"
      />
      
      {/* Photo area */}
      <rect x="6" y="9" width="6" height="7" rx="1" fill="#22c55e" opacity="0.4" />
      
      {/* Person silhouette in photo */}
      <circle cx="9" cy="11.5" r="1.5" fill="#22c55e" opacity="0.6" />
      <path d="M6.5 16C6.5 14 7.5 13 9 13C10.5 13 11.5 14 11.5 16" fill="#22c55e" opacity="0.6" />
      
      {/* Text lines */}
      <rect x="14" y="9" width="8" height="1.5" rx="0.5" fill="#22c55e" opacity="0.6" />
      <rect x="14" y="12" width="6" height="1.5" rx="0.5" fill="#22c55e" opacity="0.4" />
      <rect x="14" y="15" width="7" height="1.5" rx="0.5" fill="#22c55e" opacity="0.3" />
      
      {/* Aadhaar-style pattern at bottom */}
      <rect x="6" y="19" width="16" height="1" rx="0.5" fill="#22c55e" opacity="0.2" />
      
      {/* Verification badge */}
      <circle cx="24" cy="20" r="7" fill="#22c55e" />
      <path
        d="M20.5 20L23 22.5L27.5 18"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Shine effect */}
      <path
        d="M5 8L7 6"
        stroke="#4ade80"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.5"
      />

      <defs>
        <linearGradient id="cardGradient" x1="3" y1="6" x2="25" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#134e2a" />
          <stop offset="1" stopColor="#0a2d18" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function AadhaarVerifySuccessToast() {
  return (
    <div
      className="flex items-start gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 rounded-xl w-[calc(100vw-32px)] sm:w-auto sm:min-w-[340px] sm:max-w-[440px] mx-auto relative overflow-hidden"
      style={{
        background: `linear-gradient(145deg, #0a1a12 0%, #0d2818 40%, #0a1a12 100%)`,
        border: `1px solid rgba(34, 197, 94, 0.6)`,
        boxShadow: `
          0 0 40px rgba(34, 197, 94, 0.2),
          0 10px 40px rgba(0,0,0,0.5),
          inset 0 1px 0 rgba(34,197,94,0.2)
        `,
      }}
    >
      {/* Icon */}
      <div
        className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center"
        style={{
          background: `linear-gradient(145deg, #134e2a 0%, #0a2d18 100%)`,
          border: `1px solid rgba(34,197,94,0.5)`,
          boxShadow: `0 0 20px rgba(34,197,94,0.3)`,
        }}
      >
        <VerifiedIdIcon className="w-9 h-9 sm:w-10 sm:h-10" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pt-1">
        <p
          className="text-sm sm:text-base font-bold tracking-wide"
          style={{
            color: "#4ade80",
            textShadow: "0 0 20px rgba(74,222,128,0.5)",
          }}
        >
          Aadhaar Verified
        </p>
        <p
          className="text-xs sm:text-sm mt-1 leading-relaxed"
          style={{ color: "rgba(200,255,200,0.8)" }}
        >
          Your identity has been successfully verified
        </p>
        
        {/* Security badge */}
        <div 
          className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full"
          style={{ 
            background: "rgba(34,197,94,0.15)",
            border: "1px solid rgba(34,197,94,0.3)",
          }}
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#22c55e">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
          </svg>
          <span className="text-[10px] font-medium" style={{ color: "#4ade80" }}>
            Securely Processed
          </span>
        </div>
      </div>

      {/* Celebration particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-1 h-1 rounded-full"
          style={{ 
            background: "#4ade80",
            top: "20%",
            left: "80%",
            boxShadow: "0 0 4px #4ade80",
          }}
        />
        <div 
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ 
            background: "#22c55e",
            top: "70%",
            left: "85%",
            boxShadow: "0 0 6px #22c55e",
          }}
        />
      </div>
    </div>
  );
}
