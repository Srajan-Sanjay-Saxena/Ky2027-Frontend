"use client";

// Custom Upload Error Icon - Document with X
function UploadErrorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Document base */}
      <path
        d="M8 4C8 2.9 8.9 2 10 2H18L24 8V28C24 29.1 23.1 30 22 30H10C8.9 30 8 29.1 8 28V4Z"
        fill="url(#docErrorGradient)"
        stroke="#ef4444"
        strokeWidth="1"
      />
      
      {/* Folded corner */}
      <path
        d="M18 2V8H24"
        fill="#2d0a12"
        stroke="#ef4444"
        strokeWidth="1"
      />
      
      {/* Broken/dashed lines */}
      <rect x="11" y="12" width="3" height="1.5" rx="0.5" fill="#ef4444" opacity="0.4" />
      <rect x="16" y="12" width="3" height="1.5" rx="0.5" fill="#ef4444" opacity="0.4" />
      <rect x="11" y="16" width="4" height="1.5" rx="0.5" fill="#ef4444" opacity="0.3" />
      <rect x="11" y="20" width="6" height="1.5" rx="0.5" fill="#ef4444" opacity="0.3" />
      
      {/* Error badge */}
      <circle cx="22" cy="22" r="6" fill="#ef4444" />
      <path
        d="M19.5 19.5L24.5 24.5M24.5 19.5L19.5 24.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <defs>
        <linearGradient id="docErrorGradient" x1="8" y1="2" x2="24" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2d0a12" />
          <stop offset="1" stopColor="#1a0a0e" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function AadhaarUploadErrorToast() {
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
        <UploadErrorIcon className="w-8 h-8 sm:w-9 sm:h-9" />
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
          Upload Failed
        </p>
        <p
          className="text-xs sm:text-sm mt-1 leading-relaxed"
          style={{ color: "rgba(255,200,200,0.7)" }}
        >
          Unable to upload document. Please try again.
        </p>
      </div>
    </div>
  );
}
