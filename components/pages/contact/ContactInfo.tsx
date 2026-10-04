"use client";

import Image from "next/image";
import { memo, type ReactNode } from "react";
import { IMAGES } from "@/lib/images";
import { COLORS, JAZZ_COLORS } from "@/components/pages/home/constants/palette";
import { CornerOrnaments } from "./CornerOrnaments";

// ═══════════════════════════════════════════════════════════════════
// ROYAL GOLD LINE ICONS
// ═══════════════════════════════════════════════════════════════════
const iconProps = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: COLORS.BRIGHT_GOLD,
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const EmailIcon = (
  <svg {...iconProps}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="M3 6l9 6 9-6" />
  </svg>
);

const PhoneIcon = (
  <svg {...iconProps}>
    <path d="M6.5 3.5c.5 0 .9.3 1.1.8l1.3 3c.2.5.1 1-.3 1.4L7.4 10c1 2 2.6 3.6 4.6 4.6l1.3-1.2c.4-.4.9-.5 1.4-.3l3 1.3c.5.2.8.6.8 1.1v3c0 .8-.7 1.5-1.5 1.4C9.6 19.4 4.6 14.4 4.1 6.5 4 5.2 4.7 4.5 5.5 4.5z" />
  </svg>
);

const PinIcon = (
  <svg {...iconProps}>
    <path d="M12 21c4-4.5 7-8 7-11a7 7 0 10-14 0c0 3 3 6.5 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const infoCards: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
}[] = [
  {
    icon: EmailIcon,
    label: "Email",
    value: "contact@kashiyatra.org.in",
    href: "mailto:contact@kashiyatra.org.in",
  },
  {
    icon: PhoneIcon,
    label: "Call Us",
    value: "+91 79069 49235",
    href: "tel:+917906949235",
  },
  {
    icon: PinIcon,
    label: "Find Us",
    value: "IIT (BHU) Varanasi, Uttar Pradesh 221005",
    href: "https://maps.google.com/?q=IIT+BHU+Varanasi",
  },
];

// ═══════════════════════════════════════════════════════════════════
// CONTACT INFO SECTION
// ═══════════════════════════════════════════════════════════════════
export const ContactInfo = memo(function ContactInfo() {
  return (
    <section className="relative py-14 sm:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Royal letter scroll - Desktop only, top-right flourish */}
      <div className="hidden lg:block absolute -right-16 -top-10 w-[28rem] h-[28rem] opacity-75 pointer-events-none rotate-6 lg:animate-[floatOm_7s_ease-in-out_infinite]">
        <Image
          src={IMAGES.contact.envelopeScroll}
          alt=""
          fill
          className="object-contain"
          style={{ filter: "drop-shadow(0 12px 36px rgba(0,0,0,0.45))" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-12 text-center"
          style={{
            fontFamily: "Georgia, serif",
            color: COLORS.BRIGHT_GOLD,
            textShadow: "0 2px 20px rgba(255,215,0,0.3)",
          }}
        >
          Reach The Yatra
        </h2>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {infoCards.map((card) => (
            <a
              key={card.label}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={
                card.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="relative p-6 sm:p-8 rounded-2xl text-center group transition-transform duration-300 hover:-translate-y-1"
              style={{
                background: `linear-gradient(160deg, ${JAZZ_COLORS.BG_ROYAL} 0%, ${JAZZ_COLORS.BG_WINE}80 100%)`,
                border: `2px solid ${COLORS.BRIGHT_GOLD}25`,
                boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              }}
            >
              <CornerOrnaments />

              {/* Icon in a gold-ringed medallion */}
              <div className="flex justify-center mb-4">
                <div
                  className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${COLORS.DEEP_MAROON} 0%, ${COLORS.DARK_MAROON} 100%)`,
                    border: `1.5px solid ${COLORS.BRIGHT_GOLD}70`,
                    boxShadow: `inset 0 0 12px rgba(0,0,0,0.5), 0 0 16px ${COLORS.BRIGHT_GOLD}30`,
                  }}
                >
                  {card.icon}
                </div>
              </div>

              <h3
                className="text-lg sm:text-xl font-bold mb-2"
                style={{
                  color: COLORS.BRIGHT_GOLD,
                  fontFamily: "Georgia, serif",
                }}
              >
                {card.label}
              </h3>
              <p
                className="text-sm leading-relaxed break-words"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                {card.value}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
});
