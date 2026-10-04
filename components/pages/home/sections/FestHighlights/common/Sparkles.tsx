import { memo } from "react";

// Confetti/Sparkle component for fest vibe - Desktop only for performance
export const FestSparkles = memo(function FestSparkles() {
  const sparkleColors = ["#FF6B00", "#FFD700", "#FF4500", "#FFA500"];
  
  return (
    <div className="hidden sm:block absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${10 + i * 11}%`,
            top: `${15 + (i % 4) * 20}%`,
            width: 4 + (i % 3) * 2,
            height: 4 + (i % 3) * 2,
            background: sparkleColors[i % sparkleColors.length],
            borderRadius: i % 2 === 0 ? "50%" : "2px",
            transform: `rotate(${i * 45}deg)`,
            animation: `sparkleFloat ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  );
});
