"use client";

import { memo } from "react";
import Image from "next/image";
import { CONCERT_COLORS, Artist } from "../constants";
import { EqualizerBars } from "./EqualizerBars";

// ═══════════════════════════════════════════════════════════════════
// MYSTERY SILHOUETTE - Animated question mark
// ═══════════════════════════════════════════════════════════════════
const MysterySilhouette = memo(function MysterySilhouette({ 
  accentColor,
  isHeadliner 
}: { 
  accentColor: string;
  isHeadliner: boolean;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Pulsing glow rings - desktop only */}
      <div
        className="hidden sm:block absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full"
        style={{
          background: `radial-gradient(circle, ${accentColor}20 0%, transparent 70%)`,
          animation: "pulseSlow 2s ease-in-out infinite",
          willChange: "transform, opacity",
        }}
      />
      
      {/* Glowing question mark */}
      <span
        className={`font-black ${isHeadliner ? "text-5xl sm:text-6xl" : "text-3xl sm:text-4xl"}`}
        style={{
          color: accentColor,
          textShadow: `0 0 20px ${accentColor}, 0 0 40px ${accentColor}80`,
        }}
      >
        ?
      </span>
      
      {/* Corner accents */}
      <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2" style={{ borderColor: `${accentColor}60` }} />
      <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2" style={{ borderColor: `${accentColor}60` }} />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2" style={{ borderColor: `${accentColor}60` }} />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2" style={{ borderColor: `${accentColor}60` }} />
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════
// REVEALED ARTIST IMAGE - Shows actual artist photo
// ═══════════════════════════════════════════════════════════════════
const RevealedArtist = memo(function RevealedArtist({
  image,
  name,
  accentColor,
  isHeadliner,
}: {
  image: string;
  name: string;
  accentColor: string;
  isHeadliner: boolean;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, rgba(10,5,20,0.9) 0%, rgba(10,5,20,0.3) 40%, transparent 100%)`,
        }}
      />
      {/* Accent glow at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3"
        style={{
          background: `linear-gradient(to top, ${accentColor}30, transparent)`,
        }}
      />
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════
// HEADLINER CARD - Premium large card
// ═══════════════════════════════════════════════════════════════════
export const HeadlinerCard = memo(function HeadlinerCard({ 
  artist, 
  index 
}: { 
  artist: Artist; 
  index: number;
}) {
  const accentColor = artist.accentColor || CONCERT_COLORS.NEON_GOLD;
  
  return (
    <div className="relative group" style={{ animationDelay: `${index * 0.15}s` }}>
      {/* Border glow - desktop only */}
      <div
        className="hidden sm:block absolute -inset-[2px] rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${accentColor} 0%, ${CONCERT_COLORS.NEON_PURPLE} 50%, ${accentColor} 100%)`,
          filter: "blur(2px)",
        }}
      />
      
      {/* Card */}
      <div
        className="relative overflow-hidden rounded-3xl p-5 sm:p-6"
        style={{
          background: `linear-gradient(160deg, rgba(20,10,40,0.95) 0%, rgba(10,5,20,0.98) 100%)`,
          border: `1px solid ${accentColor}30`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${accentColor}15`,
        }}
      >
        {/* Genre tag */}
        <div className="flex justify-center mb-4">
          <div
            className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{
              background: `${accentColor}20`,
              color: accentColor,
              border: `1px solid ${accentColor}50`,
            }}
          >
            ★ {artist.genre} ★
          </div>
        </div>
        
        {/* Silhouette or Image */}
        <div
          className="relative mx-auto mb-4 w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${CONCERT_COLORS.STAGE_PURPLE} 0%, ${CONCERT_COLORS.STAGE_DARK} 100%)`,
            border: `2px solid ${accentColor}30`,
          }}
        >
          {artist.isRevealed && artist.image ? (
            <RevealedArtist image={artist.image} name={artist.name} accentColor={accentColor} isHeadliner={true} />
          ) : (
            <MysterySilhouette accentColor={accentColor} isHeadliner={true} />
          )}
        </div>
        
        {/* Name */}
        <h3
          className="text-center text-xl sm:text-2xl font-black tracking-wide mb-3"
          style={{ color: accentColor, textShadow: `0 0 20px ${accentColor}` }}
        >
          {artist.name}
        </h3>
        
        <div className="hidden sm:flex justify-center">
          <EqualizerBars color={accentColor} size="lg" />
        </div>
        
        {!artist.isRevealed && (
          <p className="text-center text-xs mt-3 uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
            Reveal Coming Soon
          </p>
        )}
      </div>
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════
// FEATURING CARD - Smaller supporting card (Previous Lineups)
// ═══════════════════════════════════════════════════════════════════
export const FeaturingCard = memo(function FeaturingCard({ 
  artist, 
  index 
}: { 
  artist: Artist; 
  index: number;
}) {
  const accentColor = artist.accentColor || CONCERT_COLORS.NEON_PURPLE;
  
  return (
    <div className="relative group" style={{ animationDelay: `${index * 0.1}s` }}>
      {/* Hover glow - desktop only */}
      <div
        className="hidden sm:block absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, ${accentColor}60 0%, ${CONCERT_COLORS.NEON_PURPLE}40 100%)`,
          filter: "blur(1px)",
        }}
      />
      
      {/* Card */}
      <div
        className="relative overflow-hidden rounded-2xl p-4 sm:transition-transform sm:duration-300 sm:group-hover:scale-[1.02]"
        style={{
          background: `linear-gradient(160deg, rgba(18,8,32,0.9) 0%, rgba(10,5,18,0.95) 100%)`,
          border: `1px solid ${accentColor}25`,
          boxShadow: `0 10px 30px rgba(0,0,0,0.4)`,
        }}
      >
        {/* Genre tag */}
        <div
          className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider z-10"
          style={{ background: `${accentColor}20`, color: accentColor, border: `1px solid ${accentColor}40` }}
        >
          {artist.isRevealed ? "PREVIOUS" : artist.genre}
        </div>
        
        {/* Image or Silhouette */}
        <div
          className="relative mx-auto mb-3 w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${accentColor}15 0%, ${CONCERT_COLORS.STAGE_DARK} 100%)`,
            border: `1px solid ${accentColor}20`,
          }}
        >
          {artist.isRevealed && artist.image ? (
            <RevealedArtist image={artist.image} name={artist.name} accentColor={accentColor} isHeadliner={false} />
          ) : (
            <MysterySilhouette accentColor={accentColor} isHeadliner={false} />
          )}
        </div>
        
        {/* Name */}
        <h4 className="text-center text-sm font-bold" style={{ color: accentColor }}>
          {artist.name}
        </h4>
        
        <div className="hidden sm:flex justify-center mt-2 opacity-60 sm:group-hover:opacity-100 sm:transition-opacity">
          <EqualizerBars color={accentColor} size="sm" />
        </div>
      </div>
    </div>
  );
});
