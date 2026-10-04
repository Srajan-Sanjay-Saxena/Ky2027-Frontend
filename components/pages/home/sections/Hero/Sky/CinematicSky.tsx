"use client";

import { memo, useEffect, useRef, useState } from "react";

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  speed: number;
  length: number;
  delay: number;
}

export const CinematicSky = memo(function CinematicSky({ className = "" }: { className?: string }) {
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Generate shooting stars randomly - Desktop only
  useEffect(() => {
    if (isMobile) return; // Skip on mobile

    const createShootingStar = () => {
      const star: ShootingStar = {
        id: Date.now() + Math.random(),
        startX: Math.random() * 70 + 5,
        startY: Math.random() * 20 + 5,
        angle: Math.random() * 25 + 20,
        speed: Math.random() * 1.2 + 1.3,
        length: Math.random() * 60 + 80,
        delay: 0,
      };
      setShootingStars(prev => [...prev, star]);
      
      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== star.id));
      }, (star.speed * 1000) + 500);
    };

    const initialTimeout = setTimeout(() => {
      createShootingStar();
    }, 3000);

    const interval = setInterval(() => {
      if (Math.random() > 0.5) createShootingStar();
    }, 6000 + Math.random() * 4000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isMobile]);

  // Atmospheric clouds canvas - Desktop only
  useEffect(() => {
    if (isMobile) return; // Skip on mobile

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.5;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.0003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 3; i++) {
        const y = canvas.height * (0.2 + i * 0.25);
        const offset = Math.sin(time + i) * 50;
        
        ctx.beginPath();
        ctx.ellipse(
          canvas.width * 0.3 + offset + i * 100,
          y,
          200 + i * 50,
          30 + i * 10,
          0, 0, Math.PI * 2
        );
        ctx.fillStyle = `rgba(100, 100, 140, ${0.03 - i * 0.008})`;
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(
          canvas.width * 0.7 - offset - i * 80,
          y + 30,
          180 + i * 40,
          25 + i * 8,
          0, 0, Math.PI * 2
        );
        ctx.fillStyle = `rgba(80, 80, 120, ${0.025 - i * 0.006})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [isMobile]);

  // Generate varied stars on client only to avoid hydration mismatch
  const [stars, setStars] = useState<any[]>([]);

  useEffect(() => {
    const starCount = isMobile ? 40 : 120;
    const generatedStars = Array.from({ length: starCount }, (_, i) => {
      const size = i < 10 ? 2.5 + Math.random() * 1.5 : i < 30 ? 1.5 + Math.random() : 0.8 + Math.random() * 0.8;
      const brightness = i < 10 ? 0.9 : i < 30 ? 0.6 + Math.random() * 0.3 : 0.3 + Math.random() * 0.4;
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 45,
        size,
        brightness,
        duration: 3 + Math.random() * 5,
        delay: Math.random() * 8,
        isBright: i < 10,
      };
    });
    setStars(generatedStars);
  }, [isMobile]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Atmospheric gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 60% at 50% 0%, rgba(30, 30, 80, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse 80% 40% at 20% 20%, rgba(40, 30, 70, 0.2) 0%, transparent 40%),
            radial-gradient(ellipse 80% 40% at 80% 15%, rgba(35, 25, 65, 0.2) 0%, transparent 40%)
          `,
        }}
      />

      {/* Subtle cloud canvas - Desktop only */}
      {!isMobile && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full opacity-60" />
      )}

      {/* Stars with varied sizes and twinkle */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            background: star.isBright 
              ? `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(200,220,255,0.8) 40%, transparent 70%)`
              : 'white',
            boxShadow: star.isBright 
              ? `0 0 ${star.size * 3}px rgba(200,220,255,0.6), 0 0 ${star.size * 6}px rgba(150,180,255,0.3)`
              : 'none',
            // Disable animation on mobile for performance
            animation: isMobile ? 'none' : `starTwinkle${star.isBright ? 'Bright' : ''} ${star.duration}s ease-in-out infinite`,
            animationDelay: isMobile ? '0s' : `${star.delay}s`,
            opacity: star.brightness,
          }}
        />
      ))}

      {/* Shooting stars - Desktop only */}
      {!isMobile && shootingStars.map((star) => (
        <div
          key={star.id}
          className="absolute shooting-star"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            width: `${star.length}px`,
            height: '2px',
            transform: `rotate(${star.angle}deg)`,
            opacity: 0,
            ['--travel-distance' as string]: `${150 + star.length}px`,
            animation: `shootingStarMove ${star.speed}s ease-out forwards`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 10%, rgba(200,220,255,0.3) 50%, rgba(255,255,255,0.9) 100%)`,
              borderRadius: '2px',
            }}
          />
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2"
            style={{
              width: '4px',
              height: '4px',
              background: 'white',
              borderRadius: '50%',
              boxShadow: '0 0 6px 2px rgba(255,255,255,0.9), 0 0 12px 4px rgba(200,220,255,0.6)',
            }}
          />
        </div>
      ))}
    </div>
  );
});
