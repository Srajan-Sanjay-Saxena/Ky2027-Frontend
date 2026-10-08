"use client";

interface PlayIconProps {
  className?: string;
}

export function PlayIcon({ className }: PlayIconProps) {
  return (
    <i
      className={`cinematic-play-icon ${className || ""}`}
      style={{
        width: 0,
        height: 0,
        borderLeft: "15px solid var(--cinematic-gold)",
        borderTop: "9px solid transparent",
        borderBottom: "9px solid transparent",
        marginLeft: "5px",
        opacity: 0.9,
      }}
    />
  );
}
