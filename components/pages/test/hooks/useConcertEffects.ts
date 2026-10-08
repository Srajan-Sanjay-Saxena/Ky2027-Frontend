"use client";

import { useEffect, useRef, RefObject, useCallback } from "react";

import { PHONE_LIGHTS, STRING_LIGHTS, LANTERNS } from "@/components/pages/test/constants/config";
import { FIREWORK_PALETTE, LIGHT_PALETTE } from "@/components/pages/test/constants/palette";
import {
  CinematicState,
  CrowdLight,
  StringLight,
  Particle,
  Rocket,
  Glow,
} from "@/lib/api/helper/types/cinematic.types";

interface UseConcertEffectsProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  stageRef: RefObject<HTMLDivElement | null>;
  state: CinematicState;
}

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const rr = (a: number, b: number) => a + Math.random() * (b - a);

// Color interpolation for rainbow lights
function pc(T: number, i: number, spd = 0.22) {
  const n = LIGHT_PALETTE.length;
  const p = (((T * spd + i * 0.41) % n) + n) % n;
  const f0 = Math.floor(p);
  const a = LIGHT_PALETTE[f0];
  const b = LIGHT_PALETTE[(f0 + 1) % n];
  const f = p - f0;
  const s = f * f * (3 - 2 * f);
  return (
    Math.round(a[0] + (b[0] - a[0]) * s) +
    "," +
    Math.round(a[1] + (b[1] - a[1]) * s) +
    "," +
    Math.round(a[2] + (b[2] - a[2]) * s)
  );
}

// Create sprite for lights
function createSprite(rgb: string): HTMLCanvasElement {
  const s = document.createElement("canvas");
  s.width = s.height = 64;
  const g = s.getContext("2d");
  if (!g) return s;

  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, `rgba(${rgb},1)`);
  gr.addColorStop(0.16, `rgba(${rgb},.6)`);
  gr.addColorStop(0.45, `rgba(${rgb},.14)`);
  gr.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = gr;
  g.fillRect(0, 0, 64, 64);
  return s;
}

export function useConcertEffects({ canvasRef, stageRef, state }: UseConcertEffectsProps) {
  const crowdRef = useRef<CrowdLight[]>([]);
  const stringRef = useRef<StringLight[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const rocketsRef = useRef<Rocket[]>([]);
  const glowsRef = useRef<Glow[]>([]);
  const spritesRef = useRef<Record<string, HTMLCanvasElement>>({});
  const dimensionsRef = useRef({ FW: 0, FH: 0, sc: 1, px: 1 });
  const timeRef = useRef(0);
  const nextBurstRef = useRef(1.2);
  const nextFinaleRef = useRef(18);
  const runningRef = useRef(false);

  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Initialize sprites
  useEffect(() => {
    spritesRef.current = {
      cool: createSprite("214,228,255"),
      warm: createSprite("255,196,110"),
      pink: createSprite("255,135,190"),
      blue: createSprite("120,190,255"),
      white: createSprite("255,250,240"),
    };
  }, []);

  // Build crowd and string lights
  const build = useCallback(() => {
    const { FW } = dimensionsRef.current;

    // Crowd lights from photo positions
    const crowd: CrowdLight[] = PHONE_LIGHTS.map(([x, y, k]) => ({
      x,
      y,
      k: (["cool", "warm", "blue"] as const)[k],
      s: (0.85 + 0.5 * clamp((y - 0.715) / 0.09)) * rr(0.8, 1.3),
      ph: rr(0, 6.28),
      sp: rr(0.4, 1.5),
      f: rr(9, 20),
      sway: 0,
    }));

    // Additional crowd lights
    const ex = FW < 900 ? 45 : 80;
    for (let i = 0; i < ex; i++) {
      const base = PHONE_LIGHTS[Math.floor(Math.random() * PHONE_LIGHTS.length)];
      const z = Math.random();
      const x = base[0] + rr(-0.014, 0.014);
      let y = clamp(base[1] + rr(-0.012, 0.016), 0.722, 0.79);
      if (x > 0.38 && x < 0.62 && y > 0.75) continue;

      crowd.push({
        x,
        y,
        k: z < 0.6 ? "cool" : z < 0.78 ? "warm" : z < 0.9 ? "pink" : "blue",
        s: rr(0.55, 0.9) * (0.85 + 0.5 * clamp((y - 0.715) / 0.09)),
        ph: rr(0, 6.28),
        sp: rr(0.5, 1.8),
        f: rr(9, 20),
        sway: 1,
      });
    }

    crowdRef.current = crowd;

    // String lights
    stringRef.current = STRING_LIGHTS.map(([x, y]) => ({
      x,
      y,
      s: rr(0.8, 1.25),
      ph: rr(0, 6.28),
      sp: rr(1.5, 4),
      sp2: rr(3, 8),
    }));
  }, []);

  // Resize handler
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const FW = stage.clientWidth;
    const FH = stage.clientHeight;
    const sc = FW / 1600;
    const px = Math.max(0.75, sc);
    const d = Math.min(devicePixelRatio || 1, 2, Math.sqrt(2.6e6 / (FW * FH)));

    canvas.width = Math.round(FW * d);
    canvas.height = Math.round(FH * d);

    const c = canvas.getContext("2d");
    if (c) {
      c.setTransform(d, 0, 0, d, 0, 0);
      c.lineCap = "round";
    }

    dimensionsRef.current = { FW, FH, sc, px };
    build();
  }, [canvasRef, stageRef, build]);

  // Beat calculation
  const beat = useCallback(() => {
    const per = 60 / 124;
    const ph = (timeRef.current % per) / per;
    const bar = Math.floor(timeRef.current / per) % 8 === 0;
    return Math.exp(-ph * 5) * (bar ? 1.5 : 1);
  }, []);

  // Get visible span for fireworks targeting
  const visSpan = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return [0.03, 0.97, 0.02];
    const r = stage.getBoundingClientRect();
    return [
      Math.max(0.03, -r.left / r.width),
      Math.min(0.97, (window.innerWidth - r.left) / r.width),
      Math.max(0.02, -r.top / r.height),
    ];
  }, [stageRef]);

  // Check if position is in title area
  const inTitle = useCallback((x: number, y: number) => {
    const a = (x - 0.5) / 0.26;
    const b = (y - 0.245) / 0.21;
    return a * a + b * b < 1;
  }, []);

  // Pick firework target
  const pickTarget = useCallback(() => {
    const [vl, vr, vt] = visSpan();
    const { FW, FH } = dimensionsRef.current;
    let x = 0,
      y = 0,
      s = 1;

    for (let i = 0; i < 16; i++) {
      x = rr(vl + 0.02, Math.max(vl + 0.03, vr - 0.02));
      y = rr(Math.max(0.06, vt + 0.04), 0.45);
      if (!inTitle(x, y)) break;
    }

    if (inTitle(x, y)) {
      y = rr(0.43, 0.5);
      s = 0.8;
    }

    return { x: x * FW, y: y * FH, s };
  }, [visSpan, inTitle]);

  // Launch rocket
  const launch = useCallback(
    (delay = 0, t?: { x: number; y: number; s?: number }) => {
      const { FW, FH } = dimensionsRef.current;
      const target = t || pickTarget();
      const sx = rr(0.44, 0.62) * FW;
      const sy = 0.6 * FH;

      rocketsRef.current.push({
        sx,
        sy,
        x: sx,
        y: sy,
        tx: target.x,
        ty: target.y,
        s: target.s || 1,
        t: -delay,
        dur: rr(0.85, 1.25),
      });
    },
    [pickTarget]
  );

  // Burst effect
  const burst = useCallback((x: number, y: number, s: number) => {
    const { FW, sc } = dimensionsRef.current;
    const col = FIREWORK_PALETTE[Math.floor(Math.random() * FIREWORK_PALETTE.length)];
    const col2 = FIREWORK_PALETTE[Math.floor(Math.random() * FIREWORK_PALETTE.length)];
    const type = Math.floor(Math.random() * 5);
    const n = Math.round(100 * (FW < 900 ? 0.7 : 1));
    const k = Math.max(sc, 0.55) * s;
    const tilt = rr(-0.6, 0.6);

    for (let i = 0; i < n; i++) {
      const a = (i / n) * 6.2832 + rr(-0.04, 0.04);
      let sp: number,
        c1 = col,
        life: number,
        drag = 1.3,
        grav = 65 * k,
        size = 1.6,
        ks = 0.035,
        tw = false,
        cr = false,
        vx: number,
        vy: number;

      if (type === 1) {
        // Ring
        sp = 235 * k;
        vx = Math.cos(a) * sp;
        vy = Math.sin(a) * sp * 0.45;
        const ca = Math.cos(tilt),
          sa = Math.sin(tilt);
        const rx = vx * ca - vy * sa,
          ry = vx * sa + vy * ca;
        vx = rx;
        vy = ry;
        life = rr(1.3, 1.7);
        drag = 1.5;
      } else {
        if (type === 2) {
          // Willow
          sp = rr(90, 230) * k;
          c1 = [255, 190, 80] as unknown as (typeof FIREWORK_PALETTE)[number];
          life = rr(2.2, 3.2);
          drag = 0.9;
          grav = 115 * k;
          ks = 0.06;
          tw = true;
          size = 1.3;
        } else if (type === 3) {
          // Double ring
          const inner = i % 2;
          sp = (inner ? 125 : 250) * rr(0.9, 1.05) * k;
          c1 = inner ? col2 : col;
          life = rr(1.3, 1.8);
        } else {
          sp = rr(150, 270) * k;
          life = rr(1.2, 1.8);
          if (type === 4) {
            c1 = [255, 235, 190] as unknown as (typeof FIREWORK_PALETTE)[number];
            cr = true;
          }
        }
        vx = Math.cos(a) * sp;
        vy = Math.sin(a) * sp;
      }

      particlesRef.current.push({
        x,
        y,
        vx,
        vy,
        life: 0,
        max: life,
        c: c1,
        drag,
        grav,
        size,
        ks,
        tw,
        cr,
        ph: rr(0, 6.28),
      });
    }

    glowsRef.current.push({
      x,
      y,
      r: rr(230, 330) * k,
      c: col.join(","),
      t: 0,
      max: 0.9,
    });
  }, []);

  // Draw beams
  const drawBeams = useCallback((c: CanvasRenderingContext2D, T: number, k: number) => {
    const { FW, FH, px } = dimensionsRef.current;

    for (let i = 0; i < 6; i++) {
      const ox = (0.55 + i * 0.034) * FW;
      const oy = 0.565 * FH;
      const ang =
        (((i - 2.5) * 13 + 26 * Math.sin(T * (0.45 + i * 0.11) + i * 1.7)) * Math.PI) / 180;
      const len = FH * (0.64 + 0.1 * Math.sin(T * 0.7 + i));
      const w = len * 0.05;
      const col = pc(T, i);
      const a = 0.15 + 0.13 * k;

      c.save();
      c.translate(ox, oy);
      c.rotate(ang);

      // Outer beam
      let g = c.createLinearGradient(0, 0, 0, -len);
      g.addColorStop(0, `rgba(${col},${a})`);
      g.addColorStop(0.6, `rgba(${col},${a * 0.35})`);
      g.addColorStop(1, `rgba(${col},0)`);
      c.fillStyle = g;
      c.beginPath();
      c.moveTo(-3 * px, 0);
      c.lineTo(-w, -len);
      c.lineTo(w, -len);
      c.lineTo(3 * px, 0);
      c.closePath();
      c.fill();

      // Inner beam
      g = c.createLinearGradient(0, 0, 0, -len);
      g.addColorStop(0, `rgba(255,250,235,${a * 0.9})`);
      g.addColorStop(0.5, `rgba(${col},${a * 0.25})`);
      g.addColorStop(1, `rgba(${col},0)`);
      c.fillStyle = g;
      c.beginPath();
      c.moveTo(-2 * px, 0);
      c.lineTo(-w * 0.3, -len);
      c.lineTo(w * 0.3, -len);
      c.lineTo(2 * px, 0);
      c.closePath();
      c.fill();

      c.restore();
    }
  }, []);

  // Draw stage lights
  const drawStageLights = useCallback((c: CanvasRenderingContext2D, T: number, k: number) => {
    const { FW, FH } = dimensionsRef.current;

    // Truss lights
    for (let i = 0; i < 7; i++) {
      const x = (0.545 + i * 0.03) * FW;
      const y = 0.565 * FH;
      const r = 0.05 * FW * (1 + 0.25 * k);
      const col = pc(T, i, 0.3);
      const a = 0.16 + 0.2 * k * (0.55 + 0.45 * Math.sin(T * 5 + i * 1.3));

      const g = c.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${col},${a})`);
      g.addColorStop(1, `rgba(${col},0)`);
      c.fillStyle = g;
      c.fillRect(x - r, y - r, 2 * r, 2 * r);
    }

    // Stage wash
    const wx = 0.63 * FW;
    const wy = 0.62 * FH;
    const wr = 0.17 * FW;
    const wc = pc(T, 2, 0.18);
    const wg = c.createRadialGradient(wx, wy, 0, wx, wy, wr);
    wg.addColorStop(0, `rgba(${wc},${0.1 + 0.16 * k})`);
    wg.addColorStop(1, `rgba(${wc},0)`);
    c.fillStyle = wg;
    c.fillRect(wx - wr, wy - wr, 2 * wr, 2 * wr);

    // LED screens
    const screens = [
      [0.476, 0.6, 0.036, 0.09, 0],
      [0.762, 0.574, 0.05, 0.106, 1.7],
    ];
    for (const [sx, sy, sw, sh, ph] of screens) {
      const col = pc(T, ph * 2 + 1, 0.5);
      const a = 0.1 + 0.14 * (0.5 + 0.5 * Math.sin(T * 9 + ph)) * (0.6 + 0.4 * k) + 0.1 * k;
      c.fillStyle = `rgba(${col},${a})`;
      c.fillRect(sx * FW, sy * FH, sw * FW, sh * FH);
    }

    // Haze
    for (let i = 0; i < 2; i++) {
      const x = (0.6 + 0.14 * Math.sin(T * 0.18 + i * 3)) * FW;
      const y = (0.5 + 0.02 * Math.sin(T * 0.3 + i)) * FH;
      const r = 0.22 * FW;
      const col = pc(T, i + 3, 0.1);
      const g = c.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${col},.07)`);
      g.addColorStop(1, `rgba(${col},0)`);
      c.fillStyle = g;
      c.fillRect(x - r, y - r, 2 * r, 2 * r);
    }
  }, []);

  // Draw crowd
  const drawCrowd = useCallback((c: CanvasRenderingContext2D, T: number, k: number) => {
    const { FW, FH, px } = dimensionsRef.current;
    const sprites = spritesRef.current;
    if (!sprites.white) return;

    // Phone lights
    for (const d of crowdRef.current) {
      let a = 0.5 + 0.5 * Math.sin(T * d.sp + d.ph);
      a = a * a * (3 - 2 * a);
      const wave = 0.5 + 0.5 * Math.sin(d.x * 6 - T * 1.7);
      a =
        (0.3 + 0.7 * a) *
        (0.8 + 0.2 * Math.sin(T * d.f + d.ph * 3)) *
        (0.72 + 0.28 * wave) *
        (1 + 0.18 * k);

      const x = d.x * FW + (d.sway ? Math.sin(T * 1.9 + d.ph) * 2.2 * px : 0);
      const y = d.y * FH + (d.sway ? Math.sin(T * 2.6 + d.ph) * 1.4 * px : 0);
      const r = 3.6 * px * d.s;

      c.globalAlpha = Math.min(1, a * 0.6);
      c.drawImage(sprites[d.k], x - r, y - r, 2 * r, 2 * r);
      c.globalAlpha = Math.min(1, a);
      c.drawImage(sprites.white, x - r * 0.3, y - r * 0.3, r * 0.6, r * 0.6);
    }

    // String lights
    for (const d of stringRef.current) {
      const fl = 0.62 + 0.38 * Math.sin(T * d.sp + d.ph) * Math.sin(T * d.sp2 + d.ph * 1.7);
      const x = d.x * FW;
      const y = d.y * FH;
      const r = 5.5 * px * d.s;

      c.globalAlpha = 0.42 * fl;
      c.drawImage(sprites.warm, x - r, y - r, 2 * r, 2 * r);
      c.globalAlpha = 0.5 * fl;
      c.drawImage(sprites.white, x - r * 0.3, y - r * 0.3, r * 0.6, r * 0.6);
    }

    c.globalAlpha = 1;

    // Lanterns
    LANTERNS.forEach(([lx, ly], i) => {
      const a = 0.28 + 0.2 * Math.sin(T * 7 + i * 2) * Math.sin(T * 11.3 + i);
      const r = 0.03 * FW;
      c.globalAlpha = Math.max(0, a);
      c.drawImage(sprites.warm, lx * FW - r, ly * FH - r, 2 * r, 2 * r);
    });

    c.globalAlpha = 1;
  }, []);

  // Draw fireworks
  const drawFireworks = useCallback(
    (c: CanvasRenderingContext2D, dt: number, T: number) => {
      const { px } = dimensionsRef.current;
      const rockets = rocketsRef.current;
      const particles = particlesRef.current;
      const glows = glowsRef.current;

      // Update and draw rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const k = rockets[i];
        k.t += dt;
        if (k.t < 0) continue;

        const u = Math.min(1, k.t / k.dur);
        const e = 1 - Math.pow(1 - u, 2.4);
        k.x = k.sx + (k.tx - k.sx) * e + Math.sin(k.t * 16) * 2 * px;
        k.y = k.sy + (k.ty - k.sy) * e;

        // Trail particles
        if (particles.length < 1500) {
          for (let j = 0; j < 2; j++) {
            particles.push({
              x: k.x,
              y: k.y,
              vx: rr(-14, 14),
              vy: rr(10, 45),
              life: 0,
              max: rr(0.3, 0.55),
              c: [255, 185, 100],
              drag: 1,
              grav: 25,
              size: 1.3,
              ks: 0.02,
              tw: false,
              cr: false,
              ph: 0,
            });
          }
        }

        c.fillStyle = "rgba(255,236,190,.95)";
        c.beginPath();
        c.arc(k.x, k.y, 2.2 * px, 0, 6.2832);
        c.fill();

        if (u >= 1) {
          burst(k.tx, k.ty, k.s);
          rockets.splice(i, 1);
        }
      }

      // Update and draw glows
      for (let i = glows.length - 1; i >= 0; i--) {
        const g = glows[i];
        g.t += dt;
        if (g.t > g.max) {
          glows.splice(i, 1);
          continue;
        }
        const a = 0.28 * Math.pow(1 - g.t / g.max, 2);
        const gr = c.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r);
        gr.addColorStop(0, `rgba(${g.c},${a})`);
        gr.addColorStop(1, `rgba(${g.c},0)`);
        c.fillStyle = gr;
        c.fillRect(g.x - g.r, g.y - g.r, g.r * 2, g.r * 2);
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        if (p.life >= p.max) {
          // Crackle effect
          if (p.cr) {
            for (let j = 0; j < 3; j++) {
              particles.push({
                x: p.x,
                y: p.y,
                vx: rr(-90, 90),
                vy: rr(-90, 90),
                life: 0,
                max: rr(0.2, 0.4),
                c: [255, 250, 230],
                drag: 2,
                grav: 0,
                size: 1.4,
                ks: 0.03,
                tw: true,
                cr: false,
                ph: rr(0, 6),
              });
            }
          }
          particles.splice(i, 1);
          continue;
        }

        const f = Math.exp(-p.drag * dt);
        p.vx *= f;
        p.vy = p.vy * f + p.grav * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        let a = Math.pow(1 - p.life / p.max, 1.15);
        if (p.tw) a *= 0.55 + 0.45 * Math.sin(T * 38 + p.ph);

        c.strokeStyle = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},${a.toFixed(3)})`;
        c.lineWidth = Math.max(1, p.size * px) * (0.6 + 0.6 * a);
        c.beginPath();
        c.moveTo(p.x - p.vx * p.ks, p.y - p.vy * p.ks);
        c.lineTo(p.x, p.y);
        c.stroke();
      }
    },
    [burst]
  );

  // Title mask
  const drawTitleMask = useCallback((c: CanvasRenderingContext2D) => {
    const { FW, FH } = dimensionsRef.current;
    c.save();
    c.globalCompositeOperation = "destination-out";
    c.translate(0.5 * FW, 0.24 * FH);
    c.scale(1, 0.445);
    const r = 0.24 * FW;
    const g = c.createRadialGradient(0, 0, 0, 0, 0, r);
    g.addColorStop(0, "rgba(0,0,0,.92)");
    g.addColorStop(0.72, "rgba(0,0,0,.85)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    c.fillStyle = g;
    c.fillRect(-r, -r, 2 * r, 2 * r);
    c.restore();
  }, []);

  // Start effects
  const startFx = useCallback(() => {
    if (runningRef.current || prefersReducedMotion) return;
    runningRef.current = true;
    resize();

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.classList.add("on");
    }

    // Initial fireworks
    launch(0);
    launch(0.35);
  }, [resize, canvasRef, launch, prefersReducedMotion]);

  // Expose startFx globally
  useEffect(() => {
    (window as unknown as { startFx?: () => void }).startFx = startFx;
    return () => {
      delete (window as unknown as { startFx?: () => void }).startFx;
    };
  }, [startFx]);

  // Resize listener
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (runningRef.current) resize();
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, [resize]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const c = canvas.getContext("2d");
    if (!c) return;

    let lastTime = performance.now();
    let rafId: number;

    const loop = (now: number) => {
      if (!runningRef.current) {
        rafId = requestAnimationFrame(loop);
        return;
      }

      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      timeRef.current += dt;
      const T = timeRef.current;

      const { FW, FH } = dimensionsRef.current;
      c.clearRect(0, 0, FW, FH);
      c.globalCompositeOperation = "lighter";

      const k = beat();

      drawBeams(c, T, k);
      drawStageLights(c, T, k);
      drawCrowd(c, T, k);

      // Fireworks timing
      nextBurstRef.current -= dt;
      if (nextBurstRef.current <= 0) {
        launch();
        if (Math.random() < 0.25) launch(0.3);
        nextBurstRef.current = rr(2.2, 4.2);
      }

      nextFinaleRef.current -= dt;
      if (nextFinaleRef.current <= 0) {
        for (let i = 0; i < 8; i++) launch(i * 0.16);
        nextFinaleRef.current = rr(20, 28);
      }

      drawFireworks(c, dt, T);
      drawTitleMask(c);

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [
    canvasRef,
    beat,
    drawBeams,
    drawStageLights,
    drawCrowd,
    drawFireworks,
    drawTitleMask,
    launch,
  ]);

  // Start when fx flag is set
  useEffect(() => {
    if (state.fx && !runningRef.current) {
      startFx();
    }
  }, [state.fx, startFx]);

  // Click to launch firework
  useEffect(() => {
    const handleClick = (e: PointerEvent) => {
      if (!runningRef.current || !state.done) return;
      const target = e.target as HTMLElement;
      if (target.closest?.(".cinematic-hot, #skip, #hold")) return;

      const stage = stageRef.current;
      if (!stage) return;

      const r = stage.getBoundingClientRect();
      const { FW, FH } = dimensionsRef.current;
      launch(0, {
        x: ((e.clientX - r.left) / r.width) * FW,
        y: Math.min((e.clientY - r.top) / r.height, 0.5) * FH,
        s: 1,
      });
    };

    document.addEventListener("pointerdown", handleClick);
    return () => document.removeEventListener("pointerdown", handleClick);
  }, [state.done, stageRef, launch]);

  return { startFx, launch };
}
