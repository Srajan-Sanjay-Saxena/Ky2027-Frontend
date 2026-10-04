"use client";

// Custom Verify Error Icon - ID card with warning
function VerifyErrorIcon({ className }: { className?: string }) {
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
        fill="url(#cardErrorGradient)"
        stroke="#ef4444"
        strokeWidth="1"
      />
      
      {/* Photo area with question mark */}
      <rect x="6" y="9" width="6" height="7" rx="1" fill="#ef4444" opacity="0.2" />
      <text x="9" y="14" textAnchor="middle" fill="#ef4444" fontSize="6" fontWeight="bold" opacity="0.6">?</text>
      
      {/* Broken text lines */}
      <rect x="14" y="9" width="4" height="1.5" rx="0.5" fill="#ef4444" opacity="0.4" />
      <rect x="19" y="9" width="3" height="1.5" rx="0.5" fill="#ef4444" opacity="0.3" />
      <rect x="14" y="12" width="3" height="1.5" rx="0.5" fill="#ef4444" opacity="0.3" />
      <rect x="14" y="15" width="5" height="1.5" rx="0.5" fill="#ef4444" opacity="0.2" />
      
      {/* Warning badge */}
      <circle cx="24" cy="20" r="7" fill="#ef4444" />
      <path
        d="M24 16V20M24 23V23.01"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <defs>
        <linearGradient id="cardErrorGradient" x1="3" y1="6" x2="25" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4e1a1a" />
          <stop offset="1" stopColor="#2d0a12" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function AadhaarVerifyErrorToast() {
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
        <VerifyErrorIcon className="w-9 h-9 sm:w-10 sm:h-10" />
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
          Verification Failed
        </p>
        <p
          className="text-xs sm:text-sm mt-1 leading-relaxed"
          style={{ color: "rgba(255,200,200,0.7)" }}
        >
          Could not extract details. Ensure the image is clear and try again.
        </p>
        
        {/* Tips */}
        <div 
          className="mt-2 text-[10px] leading-relaxed"
          style={{ color: "rgba(239,68,68,0.6)" }}
        >
          Tip: Use a well-lit, high-quality image
        </div>
      </div>
    </div>
  );
}
