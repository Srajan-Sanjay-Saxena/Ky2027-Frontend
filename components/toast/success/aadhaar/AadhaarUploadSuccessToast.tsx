"use client";

// Custom Upload Icon - Document with upload arrow
function UploadDocIcon({ className }: { className?: string }) {
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
        fill="url(#docGradient)"
        stroke="#22c55e"
        strokeWidth="1"
      />
      
      {/* Folded corner */}
      <path
        d="M18 2V8H24"
        fill="#134e2a"
        stroke="#22c55e"
        strokeWidth="1"
      />
      
      {/* ID photo placeholder */}
      <rect x="11" y="12" width="6" height="7" rx="1" fill="#22c55e" opacity="0.3" />
      
      {/* Text lines */}
      <rect x="11" y="21" width="10" height="1.5" rx="0.5" fill="#22c55e" opacity="0.5" />
      <rect x="11" y="24" width="7" height="1.5" rx="0.5" fill="#22c55e" opacity="0.4" />
      
      {/* Upload arrow badge */}
      <circle cx="22" cy="22" r="6" fill="#22c55e" />
      <path
        d="M22 18V25M22 18L19 21M22 18L25 21"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <defs>
        <linearGradient id="docGradient" x1="8" y1="2" x2="24" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0d2818" />
          <stop offset="1" stopColor="#0a1a12" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function AadhaarUploadSuccessToast() {
  return (
    <div
      className="flex items-start gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 rounded-xl w-[calc(100vw-32px)] sm:w-auto sm:min-w-[340px] sm:max-w-[440px] mx-auto relative overflow-hidden"
      style={{
        background: `linear-gradient(145deg, #0a1a12 0%, #0d2818 40%, #0a1a12 100%)`,
        border: `1px solid rgba(34, 197, 94, 0.5)`,
        boxShadow: `
          0 0 30px rgba(34, 197, 94, 0.15),
          0 10px 40px rgba(0,0,0,0.5),
          inset 0 1px 0 rgba(34,197,94,0.15)
        `,
      }}
    >
      {/* Icon */}
      <div
        className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center"
        style={{
          background: `linear-gradient(145deg, #134e2a 0%, #0a2d18 100%)`,
          border: `1px solid rgba(34,197,94,0.4)`,
        }}
      >
        <UploadDocIcon className="w-8 h-8 sm:w-9 sm:h-9" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pt-1">
        <p
          className="text-sm sm:text-base font-bold tracking-wide"
          style={{
            color: "#4ade80",
            textShadow: "0 0 20px rgba(74,222,128,0.4)",
          }}
        >
          Document Uploaded
        </p>
        <p
          className="text-xs sm:text-sm mt-1 leading-relaxed"
          style={{ color: "rgba(200,255,200,0.7)" }}
        >
          Your Aadhaar is being processed securely
        </p>
      </div>

      {/* Glow effect */}
      <div 
        className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(34,197,94,0.2) 0%, transparent 70%)`,
          transform: 'translate(30%, -30%)',
        }}
      />
    </div>
  );
}
