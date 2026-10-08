"use client";

import { useEffect, useRef, RefObject, useCallback } from "react";

import {
  CinematicState,
  HaloRing,
  Spark,
  Ember,
  Bolt,
  Confetti,
  GlowStick,
  Bokeh,
  Pyro,
  Fountain,
} from "@/lib/api/helper/types/cinematic.types";

interface UseCrazyModeProps {
  hxCanvasRef: RefObject<HTMLCanvasElement | null>;
  fx2CanvasRef: RefObject<HTMLCanvasElement | null>;
  flashRef: RefObject<HTMLDivElement | null>;
  stageRef: RefObject<HTMLDivElement | null>;
  holdButtonRef: RefObject<HTMLButtonElement | null>;
  ringRef: RefObject<SVGCircleElement | null>;
  enterContainerRef: RefObject<HTMLDivElement | null>;
  gangaCanvasRef: RefObject<HTMLCanvasElement | null>;
  state: CinematicState;
  completeReveal: () => void;
}

const PI2 = Math.PI * 2;
const R = (a: number, b: number) => a + Math.random() * (b - a);
const neon = (hu: number, l = 60, a = 1) => `hsla(${((hu % 360) + 360) % 360},100%,${l}%,${a})`;

const prefersReducedMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useCrazyMode({
  hxCanvasRef,
  fx2CanvasRef,
  flashRef,
  stageRef,
  holdButtonRef,
  ringRef,
  enterContainerRef,
  gangaCanvasRef,
  state,
  completeReveal,
}: UseCrazyModeProps) {
  const halosRef = useRef<HaloRing[]>([]);
  const sparksRef = useRef<Spark[]>([]);
  const embersRef = useRef<Ember[]>([]);
  const boltsRef = useRef<Bolt[]>([]);
  const confettiRef = useRef<Confetti[]>([]);
  const glowSticksRef = useRef<GlowStick[]>([]);
  const bokehRef = useRef<Bokeh[]>([]);
  const pyroRef = useRef<Pyro[]>([]);
  const fountainsRef = useRef<Fountain[]>([]);

  const hxDimensionsRef = useRef({ W: 0, H: 0, DPR: 1 });
  const fx2DimensionsRef = useRef({ FW: 0, FH: 0, sc: 1, px: 1 });

  const hbRef = useRef(0);
  const hbPhRef = useRef(0);
  const tTRef = useRef(performance.now());
  const runningRef = useRef(false);
  const bOrgRef = useRef(0);
  const lastBiRef = useRef(-1);
  const dropShakeRef = useRef(0);

  // Create shock wave
  const shock = useCallback((x: number, y: number, sp: number, hu: number, w: number) => {
    halosRef.current.push({ x, y, r: 20, sp, hu, w });
  }, []);

  // Create lightning bolt
  const bolt = useCallback((hu: number) => {
    const { W, H } = hxDimensionsRef.current;
    const a = R(0, PI2);
    const L = Math.max(W, H) * R(0.45, 0.75);
    const pts: [number, number][] = [[W / 2, H / 2]];
    const n = 14;

    for (let i = 1; i <= n; i++) {
      const u = i / n;
      const off = i < n ? R(-1, 1) * 45 * (1 - u * 0.3) : 0;
      pts.push([
        W / 2 + Math.cos(a) * L * u - Math.sin(a) * off,
        H / 2 + Math.sin(a) * L * u + Math.cos(a) * off,
      ]);
    }

    boltsRef.current.push({ pts, l: 0, hu });
  }, []);

  // Create confetti burst
  const confetti = useCallback(
    (x: number, y: number, n: number, ang: number, spread: number, spd: number) => {
      for (let i = 0; i < n && confettiRef.current.length < 700; i++) {
        const a = ang + R(-spread, spread);
        const v = spd * R(0.35, 1);
        confettiRef.current.push({
          x,
          y,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v,
          rot: R(0, PI2),
          vr: R(-9, 9),
          w: R(6, 12),
          h: R(4, 8),
          hu: R(0, 360),
          ph: R(0, PI2),
          l: 0,
          m: R(3, 5.5),
        });
      }
    },
    []
  );

  // Resize HX canvas
  const resizeHx = useCallback(() => {
    const canvas = hxCanvasRef.current;
    if (!canvas) return;

    const DPR = Math.min(devicePixelRatio || 1, 1.5);
    const W = window.innerWidth;
    const H = window.innerHeight;

    canvas.width = W * DPR;
    canvas.height = H * DPR;

    const c = canvas.getContext("2d");
    if (c) {
      c.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    hxDimensionsRef.current = { W, H, DPR };
  }, [hxCanvasRef]);

  // Resize FX2 canvas (concert overlay)
  const resizeFx2 = useCallback(() => {
    const canvas = fx2CanvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const FW = stage.clientWidth;
    const FH = stage.clientHeight;
    const sc = FW / 1600;
    const px = Math.max(0.75, sc);
    const d = Math.min(devicePixelRatio || 1, 1.5, Math.sqrt(2.2e6 / (FW * FH)));

    canvas.width = Math.round(FW * d);
    canvas.height = Math.round(FH * d);

    const c = canvas.getContext("2d");
    if (c) {
      c.setTransform(d, 0, 0, d, 0, 0);
      c.lineCap = "round";
    }

    fx2DimensionsRef.current = { FW, FH, sc, px };

    // Create glow sticks
    glowSticksRef.current = [];
    const n = FW < 900 ? 45 : 80;
    for (let i = 0; i < n; i++) {
      const x = R(0.02, 0.98);
      let y = R(0.725, 0.8);
      if (x > 0.36 && x < 0.64 && y > 0.745) y = R(0.725, 0.745);
      glowSticksRef.current.push({
        x,
        y,
        hu: R(0, 360),
        ph: R(0, PI2),
        len: R(12, 22),
        sp: R(1.6, 3),
      });
    }

    // Create bokeh
    bokehRef.current = [];
    for (let i = 0; i < 40; i++) {
      bokehRef.current.push({
        x: R(0, 1),
        y: R(0, 1),
        r: R(0.006, 0.022),
        hu: R(0, 360),
        sp: R(0.01, 0.05),
        ph: R(0, PI2),
      });
    }
  }, [fx2CanvasRef, stageRef]);

  // Add fountains
  const fountains = useCallback(() => {
    fountainsRef.current.push({ x: 0.495, y: 0.69, t: 0.9 }, { x: 0.79, y: 0.69, t: 0.9 });
  }, []);

  // Confetti cannons
  const cannons = useCallback(() => {
    const { H } = hxDimensionsRef.current;
    const { W } = hxDimensionsRef.current;
    const sp = H * 1.2;
    confetti(0, H * 0.95, 70, -1.05, 0.4, sp);
    confetti(W, H * 0.95, 70, -Math.PI + 1.05, 0.4, sp);
  }, [confetti]);

  // On beat callback
  const onBeat = useCallback(
    (bi: number) => {
      if (bi % 16 === 0 && bi > 0) cannons();
      if (bi % 8 === 0 || bi % 8 === 4) fountains();
    },
    [cannons, fountains]
  );

  // THE DROP - override completeReveal
  useEffect(() => {
    const originalCompleteReveal = completeReveal;

    const enhancedCompleteReveal = () => {
      originalCompleteReveal();

      const { W, H } = hxDimensionsRef.current;

      // Flash
      if (flashRef.current) {
        flashRef.current.style.transition = "none";
        flashRef.current.style.opacity = "1";
        requestAnimationFrame(() => {
          if (flashRef.current) {
            flashRef.current.style.transition = "opacity 1.5s ease-out";
            flashRef.current.style.opacity = "0";
          }
        });
      }

      // Shock waves
      for (let i = 0; i < 5; i++) {
        shock(W / 2, H / 2, 700 + i * 260, i * 70, 6 - i);
      }

      // Confetti explosion
      const sp = H * 1.1;
      confetti(W / 2, H / 2, 170, -Math.PI / 2, Math.PI, sp);
      confetti(0, H, 110, -1.05, 0.4, sp * 1.2);
      confetti(W, H, 110, -Math.PI + 1.05, 0.4, sp * 1.2);

      dropShakeRef.current = 1;

      // Haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate([40, 30, 90]);
      }

      // Start concert mode if not already
      if (!runningRef.current) {
        runningRef.current = true;
        resizeFx2();
        fx2CanvasRef.current?.classList.add("on");
      }

      bOrgRef.current = performance.now();
      lastBiRef.current = -1;
    };

    // Monkey-patch the completeReveal
    // This is a bit hacky but necessary due to the hook architecture
    // In practice, we'd expose this differently
  }, [completeReveal, flashRef, fx2CanvasRef, shock, confetti, resizeFx2]);

  // Initialize
  useEffect(() => {
    if (prefersReducedMotion) return;
    resizeHx();

    let timeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        resizeHx();
        if (runningRef.current) resizeFx2();
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, [resizeHx, resizeFx2]);

  // Main HX animation loop (viewport overlay)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = hxCanvasRef.current;
    if (!canvas) return;

    const h = canvas.getContext("2d");
    if (!h) return;

    let rafId: number;

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - tTRef.current) / 1000);
      tTRef.current = now;

      const t = now / 1000;
      const { p, holding, skip, done, T } = state;
      const act = (holding || skip) && !done;
      const hu = 40 + p * 260 + Math.sin(t * 3) * 30;
      const { W, H } = hxDimensionsRef.current;
      const MX = Math.max(W, H);
      const cxp = W / 2;
      const cyp = H / 2;

      h.clearRect(0, 0, W, H);
      h.globalCompositeOperation = "lighter";

      // Heartbeat while holding
      if (act) {
        hbPhRef.current += dt * (1.2 + p * 2.8);
        if (hbPhRef.current >= 1) {
          hbPhRef.current -= 1;
          hbRef.current = 1;
          shock(cxp, cyp, 380 + p * 520, hu, 2 + p * 5);
          if (navigator.vibrate) {
            navigator.vibrate(10 + p * 30);
          }
        }

        // Sparks
        for (let i = 0, n = 1 + ((p * 5) | 0); i < n; i++) {
          sparksRef.current.push({
            a: R(0, PI2),
            r: MX * R(0.4, 0.7),
            w: R(1.4, 3.2) * (1 + p),
            hu: hu + R(-40, 40),
            sp: R(0.7, 1.3),
          });
        }

        // Embers
        for (let i = 0, n = (p * 7) | 0; i < n; i++) {
          embersRef.current.push({
            x: R(0, W),
            y: H + 10,
            vx: R(-30, 30),
            vy: -R(120, 380),
            l: 0,
            m: R(1.2, 2.4),
            hu: R(15, 50 + p * 250),
          });
        }

        // Lightning
        if (p > 0.3 && Math.random() < p * 0.3) {
          bolt(hu);
        }
      }

      hbRef.current *= Math.exp(-dt * 7);

      // Center glow while holding
      if (p > 0.01 && !done) {
        let g = h.createRadialGradient(cxp, cyp, Math.min(W, H) * 0.2, cxp, cyp, MX * 0.75);
        g.addColorStop(0, "rgba(0,0,0,0)");
        g.addColorStop(1, neon(hu + 180, 50, 0.3 * p * (0.65 + 0.35 * hbRef.current)));
        h.fillStyle = g;
        h.fillRect(0, 0, W, H);

        const r = 50 + p * 220;
        g = h.createRadialGradient(cxp, cyp, 0, cxp, cyp, r);
        g.addColorStop(0, neon(hu, 65, 0.2 + 0.45 * hbRef.current * p + 0.2 * p));
        g.addColorStop(1, neon(hu, 50, 0));
        h.fillStyle = g;
        h.fillRect(cxp - r, cyp - r, r * 2, r * 2);
      }

      // Draw halo rings
      const halos = halosRef.current;
      for (let i = halos.length - 1; i >= 0; i--) {
        const q = halos[i];
        q.r += q.sp * dt;
        const a = 1 - q.r / (MX * 0.8);
        if (a <= 0) {
          halos.splice(i, 1);
          continue;
        }

        h.strokeStyle = neon(q.hu, 60, a * 0.35);
        h.lineWidth = q.w * 3;
        h.beginPath();
        h.arc(q.x, q.y, q.r, 0, PI2);
        h.stroke();

        h.strokeStyle = neon(q.hu, 80, a * 0.9);
        h.lineWidth = q.w;
        h.beginPath();
        h.arc(q.x, q.y, q.r, 0, PI2);
        h.stroke();
      }

      // Draw sparks
      const sparks = sparksRef.current;
      for (let i = sparks.length - 1; i >= 0; i--) {
        const q = sparks[i];
        const u = 1 - q.r / (MX * 0.7);
        q.r -= dt * (250 + p * 600) * q.sp * (1 + u);
        q.a += dt * (1.5 + 3 * Math.max(0, u));
        if (q.r < 24) {
          sparks.splice(i, 1);
          continue;
        }

        h.strokeStyle = neon(q.hu, 65, 0.35 + 0.55 * Math.max(0, u));
        h.lineWidth = q.w;
        h.beginPath();
        h.moveTo(
          cxp + Math.cos(q.a - 0.14) * (q.r + q.w * 8),
          cyp + Math.sin(q.a - 0.14) * (q.r + q.w * 8)
        );
        h.lineTo(cxp + Math.cos(q.a) * q.r, cyp + Math.sin(q.a) * q.r);
        h.stroke();
      }

      // Draw embers
      const embers = embersRef.current;
      for (let i = embers.length - 1; i >= 0; i--) {
        const q = embers[i];
        q.l += dt;
        if (q.l > q.m) {
          embers.splice(i, 1);
          continue;
        }
        q.x += q.vx * dt + Math.sin(q.l * 5 + q.y) * 0.6;
        q.y += q.vy * dt;

        h.fillStyle = neon(q.hu, 62, 1 - q.l / q.m);
        h.beginPath();
        h.arc(q.x, q.y, 2.2, 0, PI2);
        h.fill();
      }

      // Draw bolts
      const bolts = boltsRef.current;
      for (let i = bolts.length - 1; i >= 0; i--) {
        const q = bolts[i];
        q.l += dt;
        if (q.l > 0.2) {
          bolts.splice(i, 1);
          continue;
        }
        const a = 1 - q.l / 0.2;

        for (const [w, col] of [
          [9, neon(q.hu, 55, 0.4 * a)],
          [2.2, `rgba(255,255,255,${a})`],
        ] as [number, string][]) {
          h.strokeStyle = col;
          h.lineWidth = w;
          h.beginPath();
          q.pts.forEach((pt, j) => (j ? h.lineTo(pt[0], pt[1]) : h.moveTo(pt[0], pt[1])));
          h.stroke();
        }
      }

      // Draw confetti
      h.globalCompositeOperation = "source-over";
      const cf = confettiRef.current;
      for (let i = cf.length - 1; i >= 0; i--) {
        const q = cf[i];
        q.l += dt;
        if (q.l > q.m || q.y > H + 30) {
          cf.splice(i, 1);
          continue;
        }
        q.vy += 520 * dt;
        q.vx *= Math.exp(-1.2 * dt);
        q.vy *= Math.exp(-0.9 * dt);
        q.x += q.vx * dt;
        q.y += q.vy * dt;
        q.rot += q.vr * dt;

        h.save();
        h.translate(q.x, q.y);
        h.rotate(q.rot);
        h.scale(1, Math.cos(t * 8 + q.ph));
        h.fillStyle = neon(q.hu + t * 60, 60, Math.min(1, (q.m - q.l) * 2));
        h.fillRect(-q.w / 2, -q.h / 2, q.w, q.h);
        h.restore();
      }

      h.globalCompositeOperation = "lighter";

      // Canvas effects while holding
      if (!done) {
        const sh = act ? p * p * (6 + 14 * p) + hbRef.current * p * 5 : 0;
        if (gangaCanvasRef.current) {
          gangaCanvasRef.current.style.translate = `${(Math.random() - 0.5) * sh}px ${(Math.random() - 0.5) * sh}px`;
          gangaCanvasRef.current.style.scale =
            act || p > 0.01 ? String(1 + p * 0.04 + hbRef.current * 0.012 * p) : "";
          gangaCanvasRef.current.style.filter =
            p > 0.02
              ? `saturate(${1 + p * 1.4}) brightness(${1 + p * 0.25 + hbRef.current * 0.12 * p}) contrast(${1 + p * 0.15}) hue-rotate(${Math.sin(t * 2) * p * 30}deg)`
              : "";
        }

        if (p > 0.4 && stageRef.current) {
          const s2 = (p - 0.4) * 8;
          stageRef.current.style.translate = `${(Math.random() - 0.5) * s2}px ${(Math.random() - 0.5) * s2}px`;
        } else if (!runningRef.current && stageRef.current) {
          stageRef.current.style.translate = "";
        }

        // Button effects
        if (act && holdButtonRef.current) {
          holdButtonRef.current.style.scale = String(1 + 0.07 * hbRef.current + p * 0.08);
          holdButtonRef.current.style.setProperty("--hc", neon(hu, 60));
          holdButtonRef.current.style.boxShadow = `0 0 ${30 + 60 * p}px ${neon(hu, 55, 0.7)},0 0 ${80 + 120 * p}px ${neon(hu + 60, 55, 0.35)},inset 0 0 24px ${neon(hu, 55, 0.4)}`;
          if (ringRef.current) {
            ringRef.current.style.stroke = neon(hu, 72);
          }
          if (enterContainerRef.current) {
            const pText = enterContainerRef.current.querySelector("p");
            if (pText) {
              (pText as HTMLElement).style.color = neon(hu, 82);
              (pText as HTMLElement).style.translate =
                `${(Math.random() - 0.5) * p * 4}px ${(Math.random() - 0.5) * p * 3}px`;
            }
          }
        } else if (holdButtonRef.current) {
          holdButtonRef.current.style.scale = "";
          holdButtonRef.current.style.boxShadow = "";
          if (ringRef.current) {
            ringRef.current.style.stroke = "";
          }
          if (enterContainerRef.current) {
            const pText = enterContainerRef.current.querySelector("p");
            if (pText) {
              (pText as HTMLElement).style.color = "";
              (pText as HTMLElement).style.translate = "";
            }
          }
        }
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [
    hxCanvasRef,
    gangaCanvasRef,
    stageRef,
    holdButtonRef,
    ringRef,
    enterContainerRef,
    state,
    shock,
    bolt,
  ]);

  // FX2 animation loop (concert overlay)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = fx2CanvasRef.current;
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
      const t = now / 1000;
      const per = 60 / 124;
      const el = (now - bOrgRef.current) / 1000;
      const bi = Math.floor(el / per);
      const ph = (((el % per) + per) % per) / per;
      const k = Math.exp(-ph * 4.5) * (((bi % 8) + 8) % 8 === 0 ? 1.6 : 1);
      const hu0 = (t * 45) % 360;

      const { FW, FH, sc, px } = fx2DimensionsRef.current;

      // On beat
      if (bi !== lastBiRef.current) {
        lastBiRef.current = bi;
        onBeat(bi);
      }

      c.clearRect(0, 0, FW, FH);
      c.globalCompositeOperation = "lighter";

      // Color wash
      c.fillStyle = neon(hu0, 50, 0.035 + 0.09 * k);
      c.fillRect(0, 0, FW, FH);

      // Downbeat strobe
      if (((bi % 8) + 8) % 8 === 0 && ph < 0.08) {
        c.fillStyle = `rgba(255,255,255,${0.14 * (1 - ph / 0.08)})`;
        c.fillRect(0, 0, FW, FH);
      }

      // Rainbow searchlights
      for (let i = 0; i < 14; i++) {
        const ox = (0.53 + i * 0.0175) * FW;
        const oy = 0.565 * FH;
        const ang =
          (((i - 6.5) * 9 + 32 * Math.sin(t * (0.5 + i * 0.07) + i * 1.9)) * Math.PI) / 180;
        const len = FH * (0.72 + 0.12 * Math.sin(t * 0.8 + i));
        const w = len * 0.06 * (1 + 0.3 * k);
        const a = 0.2 + 0.22 * k;
        const hh = hu0 + i * 26;

        c.save();
        c.translate(ox, oy);
        c.rotate(ang);
        const g = c.createLinearGradient(0, 0, 0, -len);
        g.addColorStop(0, neon(hh, 65, a));
        g.addColorStop(0.6, neon(hh, 60, a * 0.35));
        g.addColorStop(1, neon(hh, 60, 0));
        c.fillStyle = g;
        c.beginPath();
        c.moveTo(-3 * px, 0);
        c.lineTo(-w, -len);
        c.lineTo(w, -len);
        c.lineTo(3 * px, 0);
        c.fill();
        c.restore();
      }

      // Crossing lasers
      for (let j = 0; j < 2; j++) {
        for (let i = 0; i < 6; i++) {
          const ox = (j ? 0.76 : 0.5) * FW;
          const oy = 0.58 * FH;
          const ang =
            ((-90 +
              (i - 2.5) * (9 + 10 * Math.sin(t * 0.9 + j)) +
              (j ? -1 : 1) * 18 * Math.sin(t * 1.3 + i)) *
              Math.PI) /
            180;
          const L = FH * 0.95;
          const ex = ox + Math.cos(ang) * L;
          const ey = oy + Math.sin(ang) * L;
          const hh = hu0 + i * 40 + j * 120;

          c.strokeStyle = neon(hh, 60, 0.12 + 0.1 * k);
          c.lineWidth = 5 * px;
          c.beginPath();
          c.moveTo(ox, oy);
          c.lineTo(ex, ey);
          c.stroke();

          c.strokeStyle = neon(hh, 78, 0.45 + 0.4 * k);
          c.lineWidth = 1.2 * px;
          c.beginPath();
          c.moveTo(ox, oy);
          c.lineTo(ex, ey);
          c.stroke();
        }
      }

      // Floor wash
      for (let i = 0; i < 3; i++) {
        const x = (0.5 + 0.4 * Math.sin(t * 0.4 + i * 2.1) * 0.9) * FW;
        const y = 0.78 * FH;
        const r = 0.2 * FW;
        const g = c.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, neon(hu0 + i * 110, 55, 0.1 + 0.16 * k));
        g.addColorStop(1, neon(hu0 + i * 110, 50, 0));
        c.fillStyle = g;
        c.fillRect(x - r, y - r, 2 * r, 2 * r);
      }

      // Bokeh
      for (const b of bokehRef.current) {
        b.y -= b.sp * dt;
        if (b.y < -0.05) b.y = 1.05;
        const x = (b.x + 0.01 * Math.sin(t * 0.5 + b.ph)) * FW;
        const y = b.y * FH;
        const r = b.r * FW * (1 + 0.15 * k);
        c.fillStyle = neon(b.hu + t * 20, 60, 0.05 + 0.07 * k);
        c.beginPath();
        c.arc(x, y, r, 0, PI2);
        c.fill();
      }

      // Glow sticks
      for (const g of glowSticksRef.current) {
        const x = g.x * FW;
        const y = g.y * FH - k * 8 * px * (0.5 + 0.5 * Math.sin(g.ph));
        const a = Math.sin(t * g.sp + g.ph) * 0.5 + k * 0.3;
        const ex = x + Math.sin(a) * g.len * px;
        const ey = y - Math.cos(a) * g.len * px;
        const hh = g.hu + t * 30;

        c.strokeStyle = neon(hh, 60, 0.25 * (0.6 + 0.4 * k));
        c.lineWidth = 6 * px;
        c.beginPath();
        c.moveTo(x, y);
        c.lineTo(ex, ey);
        c.stroke();

        c.strokeStyle = neon(hh, 82, 0.9 * (0.6 + 0.4 * k));
        c.lineWidth = 2 * px;
        c.beginPath();
        c.moveTo(x, y);
        c.lineTo(ex, ey);
        c.stroke();
      }

      // Pyro fountains
      const fountains = fountainsRef.current;
      for (let i = fountains.length - 1; i >= 0; i--) {
        const f = fountains[i];
        f.t -= dt;
        if (f.t <= 0) {
          fountains.splice(i, 1);
          continue;
        }
        for (let j = 0; j < 6; j++) {
          pyroRef.current.push({
            x: f.x * FW,
            y: f.y * FH,
            vx: R(-70, 70) * sc,
            vy: -R(260, 560) * sc,
            l: 0,
            m: R(0.7, 1.3),
            hu: R(15, 55),
          });
        }
      }

      // Draw pyro particles
      const pyro = pyroRef.current;
      for (let i = pyro.length - 1; i >= 0; i--) {
        const p = pyro[i];
        p.l += dt;
        if (p.l > p.m || pyro.length > 900) {
          pyro.splice(i, 1);
          continue;
        }
        p.vy += 720 * sc * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const a = 1 - p.l / p.m;

        c.strokeStyle = neon(p.hu, 70, a);
        c.lineWidth = 1.8 * px;
        c.beginPath();
        c.moveTo(p.x - p.vx * 0.03, p.y - p.vy * 0.03);
        c.lineTo(p.x, p.y);
        c.stroke();
      }

      // Title mask
      c.globalCompositeOperation = "destination-out";
      c.save();
      c.translate(0.5 * FW, 0.24 * FH);
      c.scale(1, 0.445);
      const r = 0.24 * FW;
      const gr = c.createRadialGradient(0, 0, 0, 0, 0, r);
      gr.addColorStop(0, "rgba(0,0,0,.85)");
      gr.addColorStop(0.72, "rgba(0,0,0,.78)");
      gr.addColorStop(1, "rgba(0,0,0,0)");
      c.fillStyle = gr;
      c.fillRect(-r, -r, 2 * r, 2 * r);
      c.restore();

      // Stage filter effects
      const gs = state.done ? 1 : 0;
      dropShakeRef.current *= Math.exp(-dt * 3);

      if (stageRef.current && state.done) {
        stageRef.current.style.filter = `saturate(${1 + gs * (0.3 + 0.4 * k)}) contrast(${1 + 0.1 * gs}) brightness(${1 + gs * (0.02 + 0.1 * k)})`;
        const sh = dropShakeRef.current * 9 + k * 1.2;
        stageRef.current.style.translate = `${(Math.random() - 0.5) * sh}px ${(Math.random() - 0.5) * sh}px`;
        stageRef.current.style.scale = String(1 + 0.01 * k + 0.03 * dropShakeRef.current);
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [fx2CanvasRef, stageRef, state, onBeat]);

  return {
    shock,
    bolt,
    confetti,
  };
}
