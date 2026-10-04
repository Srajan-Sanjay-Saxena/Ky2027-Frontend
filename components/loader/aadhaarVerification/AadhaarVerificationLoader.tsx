"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";

const LOADING_TEXTS = [
  "Uploading your document...",
  "Processing with AI...",
  "Extracting information...",
  "Verifying details...",
];

export function AadhaarVerificationLoader() {
  const [loadingText, setLoadingText] = useState(LOADING_TEXTS[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % LOADING_TEXTS.length;
      setLoadingText(LOADING_TEXTS[index]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-12">
      <div className="relative inline-flex items-center justify-center mb-6">
        <div
          className="absolute w-24 h-24 rounded-full animate-spin"
          style={{
            background: `conic-gradient(from 0deg, ${COLORS.GOLD}, transparent, ${COLORS.GOLD})`,
            animationDuration: "2s",
          }}
        />
        <div
          className="relative w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: COLORS.BG_DEEP }}
        >
          <Loader2 className="h-10 w-10 animate-spin" style={{ color: COLORS.GOLD }} />
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2" style={{ color: COLORS.CREAM }}>
        {loadingText}
      </h3>
      <p style={{ color: `${COLORS.CREAM}50` }}>This may take a few moments</p>
    </div>
  );
}
