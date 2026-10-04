"use client";

import Image from "next/image";
import { NavbarDesign as Navbar } from "@/components/navbar/Design";
import { IMAGES } from "@/lib/images";
import {
  SPONSORS_2026,
  TIER_CONFIG,
  CARD_SIZES,
  groupSponsorsByTier,
  type Sponsor,
  type SponsorTier,
} from "./sponsors.config";

// Theme colors
const COLORS = {
  BG_DEEP: "#0a0a12",
  BG_WINE: "#1a0a12",
  GOLD: "#FFD700",
  GOLD_DARK: "#B8860B",
  CREAM: "#FDF6E3",
};

// Sponsor Card Component
function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const tierConfig = TIER_CONFIG[sponsor.tier];
  const size = CARD_SIZES[tierConfig.cardSize];

  return (
    <div
      className="relative group transition-all duration-500 hover:scale-[1.05] hover:-translate-y-1"
      style={{
        width: size.width,
        height: size.height,
      }}
    >
      {/* Outer glow on hover */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
        style={{
          background: `linear-gradient(135deg, ${tierConfig.glowColor}, transparent, ${tierConfig.glowColor})`,
        }}
      />

      {/* Card background */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          background: `linear-gradient(145deg, rgba(30,15,25,0.95) 0%, rgba(20,10,18,0.98) 100%)`,
          boxShadow: `
            0 8px 32px rgba(0,0,0,0.5), 
            0 0 40px ${tierConfig.glowColor}
          `,
        }}
      >
        {/* Inner shimmer */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${tierConfig.glowColor} 0%, transparent 60%)`,
          }}
        />

        {/* Decorative frame overlay */}
        <Image
          src={IMAGES.sponsors.rectangularFrame}
          alt=""
          fill
          className="object-fill opacity-70 group-hover:opacity-90 transition-opacity pointer-events-none"
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center p-14 z-10">
        {/* Logo container with white background for visibility */}
        <div
          className="relative flex items-center justify-center rounded-xl overflow-hidden bg-white/95 p-3 shadow-lg"
          style={{
            width: size.logoSize,
            height: size.logoSize * 0.65,
          }}
        >
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            fill
            className="object-contain p-2"
            sizes={`${size.logoSize}px`}
          />
        </div>

        {/* Category label with better styling */}
        <div 
          className="mt-4 px-4 py-1.5 rounded-full"
          style={{
            background: `linear-gradient(135deg, rgba(255,215,0,0.15), rgba(184,134,11,0.1))`,
            border: `1px solid rgba(255,215,0,0.25)`,
          }}
        >
          <p
            className="text-center text-[11px] tracking-wider uppercase font-medium"
            style={{ color: COLORS.GOLD }}
          >
            {sponsor.category}
          </p>
        </div>
      </div>
    </div>
  );
}

// Tier Section Component
function TierSection({
  title,
  sponsors,
  tier,
}: {
  title: string;
  sponsors: Sponsor[];
  tier: SponsorTier;
}) {
  if (sponsors.length === 0) return null;

  const tierConfig = TIER_CONFIG[tier];

  return (
    <div className="mb-12">
      {/* Tier title */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="flex-1 max-w-[120px] h-8 opacity-60">
          <Image
            src={IMAGES.sponsors.ornamentalDivider}
            alt=""
            width={120}
            height={32}
            className="w-full h-full object-contain scale-x-[-1]"
          />
        </div>
        <h3
          className="text-lg sm:text-xl font-bold tracking-[0.2em] uppercase shrink-0"
          style={{
            fontFamily: "'Cinzel', serif",
            color: COLORS.GOLD,
            textShadow: `0 0 20px ${tierConfig.glowColor}`,
          }}
        >
          {title}
        </h3>
        <div className="flex-1 max-w-[120px] h-8 opacity-60">
          <Image
            src={IMAGES.sponsors.ornamentalDivider}
            alt=""
            width={120}
            height={32}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Sponsors grid */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
    </div>
  );
}

export function SponsorsPageContent() {
  const groupedSponsors = groupSponsorsByTier(SPONSORS_2026);

  return (
    <>
      {/* Navbar */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <Navbar position="relative" topOffset={18} />
      </div>

      <main
        className="min-h-screen pt-28 sm:pt-32 pb-16 px-4"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(139,21,56,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(184,134,11,0.1) 0%, transparent 50%),
            linear-gradient(180deg, ${COLORS.BG_DEEP} 0%, ${COLORS.BG_WINE} 50%, ${COLORS.BG_DEEP} 100%)
          `,
        }}
      >
        {/* Background mandala */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%23FFD700' stroke-width='0.5'%3E%3Ccircle cx='100' cy='100' r='95'/%3E%3Ccircle cx='100' cy='100' r='75'/%3E%3Ccircle cx='100' cy='100' r='55'/%3E%3Ccircle cx='100' cy='100' r='35'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "400px 400px",
            backgroundPosition: "center",
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12 sm:mb-16">
            {/* Om symbol */}
            <div
              className="text-4xl sm:text-5xl mb-4"
              style={{
                color: COLORS.GOLD,
                textShadow: `0 0 30px rgba(255,215,0,0.5)`,
              }}
            >
              ॐ
            </div>

            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                background: `linear-gradient(135deg, #FFF3C4 0%, ${COLORS.GOLD} 50%, ${COLORS.GOLD_DARK} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Our Partners
            </h1>

            {/* Decorative ornamental divider */}
            <div className="flex items-center justify-center mb-6">
              <Image
                src={IMAGES.sponsors.ornamentalDivider}
                alt=""
                width={280}
                height={40}
                className="opacity-80"
              />
            </div>

            {/* Subtitle */}
            <p
              className="text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
              style={{ color: `${COLORS.CREAM}90` }}
            >
              Kashi Yatra 2027 partners will be announced soon. Below are the
              esteemed partners who supported our previous edition and helped
              make it a grand success.
            </p>

            {/* Coming soon badge */}
            <div
              className="inline-block mt-6 px-4 py-2 rounded-full"
              style={{
                background: "rgba(255,215,0,0.1)",
                border: "1px solid rgba(255,215,0,0.3)",
              }}
            >
              <span
                className="text-xs tracking-[0.2em] uppercase"
                style={{ color: COLORS.GOLD }}
              >
                2027 Partners Coming Soon
              </span>
            </div>
          </div>

          {/* Previous Edition Section */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-10">
              <span
                className="h-px w-20 sm:w-32"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(255,215,0,0.4))`,
                }}
              />
              <h2
                className="text-sm tracking-[0.3em] uppercase"
                style={{ color: `${COLORS.GOLD}80` }}
              >
                Previous Edition Partners
              </h2>
              <span
                className="h-px w-20 sm:w-32"
                style={{
                  background: `linear-gradient(90deg, rgba(255,215,0,0.4), transparent)`,
                }}
              />
            </div>

            {/* Tier Sections */}
            <TierSection
              title="Title Sponsor"
              sponsors={groupedSponsors["title"]}
              tier="title"
            />
            <TierSection
              title="Major Sponsor"
              sponsors={groupedSponsors["major"]}
              tier="major"
            />
            <TierSection
              title="Co-Title"
              sponsors={groupedSponsors["co-title"]}
              tier="co-title"
            />
            <TierSection
              title="Powered By"
              sponsors={groupedSponsors["powered-by"]}
              tier="powered-by"
            />
            <TierSection
              title="Co-Powered By"
              sponsors={groupedSponsors["co-powered-by"]}
              tier="co-powered-by"
            />
            <TierSection
              title="Partners"
              sponsors={groupedSponsors["partner"]}
              tier="partner"
            />
          </div>

          {/* Bottom decorative element */}
          <div className="flex items-center justify-center gap-3 mt-16">
            <span
              className="h-px w-20"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(255,215,0,0.3))`,
              }}
            />
            <span className="text-2xl">🪔</span>
            <span
              className="h-px w-20"
              style={{
                background: `linear-gradient(90deg, rgba(255,215,0,0.3), transparent)`,
              }}
            />
          </div>

          {/* Footer text */}
          <p
            className="text-center text-xs mt-4 tracking-wider"
            style={{ color: `${COLORS.GOLD}50` }}
          >
            ॥ IIT (BHU) Varanasi ॥
          </p>
        </div>
      </main>
    </>
  );
}
