"use client";

import { useEffect, useRef, RefObject, useCallback } from "react";

import { CinematicState, Diya, Ripple } from "@/lib/api/helper/types/cinematic.types";

interface UseGangaCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  state: CinematicState;
}

// Seeded random generator
const rnd = (s: number) => () => (s = (s * 16807) % 2147483647) / 2147483647;

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const smooth = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export function useGangaCanvas({ canvasRef, state }: UseGangaCanvasProps) {
  const skyCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const diyasRef = useRef<Diya[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const dimensionsRef = useRef({ W: 0, H: 0, HZ: 0, DPR: 1 });
  const nextRipRef = useRef(0);

  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Build sky canvas (Varanasi ghats skyline)
  const buildSky = useCallback(() => {
    const { W, HZ, DPR } = dimensionsRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = W * DPR;
    canvas.height = HZ * DPR;
    const c = canvas.getContext("2d");
    if (!c) return canvas;

    c.scale(DPR, DPR);
    const R = rnd(11);

    // Sky gradient
    let g = c.createLinearGradient(0, 0, 0, HZ);
    g.addColorStop(0, "#02040a");
    g.addColorStop(0.55, "#08111f");
    g.addColorStop(0.88, "#17192a");
    g.addColorStop(1, "#33241f");
    c.fillStyle = g;
    c.fillRect(0, 0, W, HZ);

    // Stars
    for (let i = 0; i < 80; i++) {
      c.fillStyle = `rgba(255,240,220,${R() * 0.4})`;
      c.fillRect(R() * W, R() * HZ * 0.65, 1, 1);
    }

    // Moon
    const mx = W * 0.78,
      my = HZ * 0.3,
      mr = Math.max(8, W * 0.009);
    g = c.createRadialGradient(mx, my, 0, mx, my, mr * 9);
    g.addColorStop(0, "rgba(200,210,235,.22)");
    g.addColorStop(1, "rgba(200,210,235,0)");
    c.fillStyle = g;
    c.fillRect(mx - mr * 9, my - mr * 9, mr * 18, mr * 18);
    c.fillStyle = "#e8e2cf";
    c.beginPath();
    c.arc(mx, my, mr, 0, 7);
    c.fill();

    // Warm distant glows
    c.globalCompositeOperation = "lighter";
    for (let i = 0; i < 9; i++) {
      const x = R() * W,
        r = W * (0.05 + R() * 0.07);
      g = c.createRadialGradient(x, HZ, 0, x, HZ, r);
      g.addColorStop(0, "rgba(255,150,60,.16)");
      g.addColorStop(1, "rgba(255,120,40,0)");
      c.fillStyle = g;
      c.fillRect(x - r, HZ - r, r * 2, r);
    }
    c.globalCompositeOperation = "source-over";

    // Draw ghats layers
    const hs = Math.max(40, dimensionsRef.current.H * 0.11);
    drawGhatsLayer(c, R, "#121622", hs * 0.6, 0.0, false, W, HZ);
    drawGhatsLayer(c, R, "#070a11", hs, 0.14, true, W, HZ);

    // Atmospheric haze
    g = c.createLinearGradient(0, HZ - hs * 0.5, 0, HZ);
    g.addColorStop(0, "rgba(60,40,30,0)");
    g.addColorStop(1, "rgba(70,45,30,.28)");
    c.fillStyle = g;
    c.fillRect(0, HZ - hs * 0.5, W, hs * 0.5);

    skyCanvasRef.current = canvas;
    return canvas;
  }, []);

  // Draw ghats layer
  const drawGhatsLayer = (
    c: CanvasRenderingContext2D,
    R: () => number,
    col: string,
    hm: number,
    templeP: number,
    lit: boolean,
    W: number,
    HZ: number
  ) => {
    let x = -10;
    const lamps: [number, number, number, number][] = [];

    while (x < W + 10) {
      const w = 14 + R() * 44,
        h = hm * (0.25 + R() * 0.5);
      c.fillStyle = col;
      c.fillRect(x, HZ - h, w, h + 1);

      // Temple spires
      if (templeP && R() < templeP) {
        const th = hm * (0.7 + R() * 0.9),
          tw = 7 + R() * 9,
          m = x + w / 2;
        c.beginPath();
        c.moveTo(m - tw, HZ - h);
        c.bezierCurveTo(
          m - tw * 0.9,
          HZ - h - th * 0.5,
          m - tw * 0.25,
          HZ - h - th * 0.8,
          m,
          HZ - h - th
        );
        c.bezierCurveTo(
          m + tw * 0.25,
          HZ - h - th * 0.8,
          m + tw * 0.9,
          HZ - h - th * 0.5,
          m + tw,
          HZ - h
        );
        c.fill();
        c.fillRect(m - 0.6, HZ - h - th - 6, 1.2, 7);
      } else if (R() < 0.2) {
        // Dome
        const m = x + w / 2,
          r = w * 0.3;
        c.beginPath();
        c.ellipse(m, HZ - h, r, r * 0.9, 0, Math.PI, 0);
        c.fill();
      }

      // Lamps
      if (lit) {
        for (let k = 0; k < w / 9; k++) {
          if (R() < 0.45) {
            lamps.push([x + R() * w, HZ - R() * h * 0.85, 0.4 + R() * 0.6, 1]);
          }
        }
      }
      x += w + R() * 5;
    }

    // Waterfront lights
    if (lit) {
      for (let x = 0; x < W; x += 5 + R() * 9) {
        lamps.push([x, HZ - 1 - R() * 3, 0.5 + R() * 0.5, 2]);
      }

      c.globalCompositeOperation = "lighter";
      for (const [a, b, v, s] of lamps) {
        const r = s * 5;
        const g = c.createRadialGradient(a, b, 0, a, b, r);
        g.addColorStop(0, `rgba(255,190,100,${0.75 * v})`);
        g.addColorStop(1, "rgba(255,130,40,0)");
        c.fillStyle = g;
        c.fillRect(a - r, b - r, r * 2, r * 2);
      }
      c.globalCompositeOperation = "source-over";
    }
  };

  // Create diyas
  const createDiyas = useCallback(() => {
    const { W, H, HZ } = dimensionsRef.current;
    const n = W < 700 ? 30 : 48;
    const R = rnd(42);
    const diyas: Diya[] = [];

    for (let i = 0; i < n; i++) {
      const d = Math.pow(R(), 0.85);
      const by = HZ + (H - HZ) * (0.07 + 0.86 * d);
      const bx = W * (0.04 + 0.92 * R());
      const sc = (0.42 + d * 1.1) * (0.85 + R() * 0.3);
      const ang = Math.atan2((by - H / 2) * 2.4, bx - W / 2) + (R() - 0.5) * 1.3;

      diyas.push({
        bx,
        by,
        sc,
        b: 0.6 + R() * 0.4,
        ph: R() * 6.28,
        sp: 0.6 + R() * 0.8,
        dl: R() * 0.55,
        dist: (0.3 + R() * 0.9) * Math.max(W, 520) * 0.6,
        dir: ang,
        rot: (R() - 0.5) * 2.2,
      });
    }

    diyas.sort((a, b) => a.by - b.by);
    diyasRef.current = diyas;
  }, []);

  // Calculate ripple bump effect
  const ripBump = useCallback((x: number, y: number) => {
    const { W } = dimensionsRef.current;
    let k = 0;
    for (const r of ripplesRef.current) {
      const R_ = r.age * 150;
      const dx = x - r.x;
      const dy = (y - r.y) / 0.3;
      const e = (Math.hypot(dx, dy) - R_) / 26;
      k += Math.exp(-e * e) * r.a * (1 - R_ / (W * 0.8));
    }
    return k;
  }, []);

  // Draw single diya
  const drawDiya = useCallback(
    (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      s: number,
      rot: number,
      fl: number,
      al: number,
      b: number,
      T: number
    ) => {
      c.save();
      c.globalAlpha = al;
      c.globalCompositeOperation = "lighter";

      // Reflection
      c.save();
      c.translate(x + Math.sin(x + T * 2) * 1.2 * s, y + 4 * s);
      c.scale(1, 2.8);
      let g = c.createRadialGradient(0, 0, 0, 0, 0, 15 * s);
      g.addColorStop(0, `rgba(255,160,60,${0.4 * b * fl})`);
      g.addColorStop(1, "rgba(255,110,30,0)");
      c.fillStyle = g;
      c.fillRect(-15 * s, -15 * s, 30 * s, 30 * s);
      c.restore();

      // Glow
      g = c.createRadialGradient(x, y - 3 * s, 0, x, y - 3 * s, 30 * s);
      g.addColorStop(0, `rgba(255,150,60,${0.2 * b * fl})`);
      g.addColorStop(1, "rgba(255,110,30,0)");
      c.fillStyle = g;
      c.fillRect(x - 30 * s, y - 33 * s, 60 * s, 60 * s);

      c.globalCompositeOperation = "source-over";
      c.translate(x, y);
      c.rotate(rot * 0.2);

      // Diya base
      c.fillStyle = "#24120a";
      c.beginPath();
      c.ellipse(0, 0, 6.5 * s, 2.8 * s, 0, 0, 7);
      c.fill();

      c.fillStyle = "#8a4a1c";
      c.beginPath();
      c.ellipse(0, -0.5 * s, 5.6 * s, 2 * s, 0, 0, 7);
      c.fill();

      // Oil
      c.fillStyle = `rgba(255,176,74,${b})`;
      c.beginPath();
      c.ellipse(0, -1 * s, 3.2 * s, 1 * s, 0, 0, 7);
      c.fill();

      // Flame
      const h = 9 * s * fl,
        w = 2.3 * s,
        sw = Math.sin(T * 5 + x) * 0.5 * s;
      c.translate(0, -1.3 * s);
      g = c.createLinearGradient(0, 0, 0, -h);
      g.addColorStop(0, "#fff4c0");
      g.addColorStop(0.45, "#ffbd48");
      g.addColorStop(1, "rgba(255,110,20,.8)");
      c.fillStyle = g;
      c.beginPath();
      c.moveTo(0, 0);
      c.bezierCurveTo(w * 1.3, -h * 0.3, w * 0.5, -h * 0.75, sw, -h);
      c.bezierCurveTo(-w * 0.5, -h * 0.75, -w * 1.3, -h * 0.3, 0, 0);
      c.fill();

      // Flame glow
      c.globalCompositeOperation = "lighter";
      g = c.createRadialGradient(0, -h * 0.45, 0, 0, -h * 0.45, 10 * s);
      g.addColorStop(0, `rgba(255,200,110,${0.5 * b})`);
      g.addColorStop(1, "rgba(255,140,40,0)");
      c.fillStyle = g;
      c.fillRect(-10 * s, -h * 0.45 - 10 * s, 20 * s, 20 * s);

      c.restore();
    },
    []
  );

  // Animate diyas
  const animateDiyas = useCallback(
    (c: CanvasRenderingContext2D, T: number, sc: number, p: number) => {
      for (const d of diyasRef.current) {
        const q = clamp((p - 0.04 - d.dl * 0.3) / 0.75);
        const e = Math.pow(q, 1.7);
        const bump = ripBump(
          d.bx + Math.cos(d.dir) * d.dist * e,
          d.by + Math.sin(d.dir) * d.dist * e * 0.42
        );
        const x =
          d.bx + Math.cos(d.dir) * d.dist * e + Math.sin(T * 0.5 * d.sp + d.ph) * 2.5 * d.sc;
        const y =
          d.by +
          Math.sin(d.dir) * d.dist * e * 0.42 +
          Math.sin(T * 0.8 * d.sp + d.ph) * 1.2 * d.sc +
          bump * 3.5 * d.sc;
        const fl =
          (0.88 + 0.12 * Math.sin(T * 7 * d.sp + d.ph) * Math.sin(T * 3.1 + d.ph * 2)) *
          (0.9 + 0.1 * d.b);
        const { W } = dimensionsRef.current;
        const al = sc * sc * (1 - smooth(0.7, 1, q)) * (x < -40 || x > W + 40 ? 0 : 1);

        drawDiya(
          c,
          x,
          y,
          d.sc,
          d.rot * e * 2 + Math.sin(T * 0.7 + d.ph) * 0.15 + bump * 0.5,
          fl,
          al,
          d.b,
          T
        );
      }
    },
    [ripBump, drawDiya]
  );

  // Draw ripple ring
  const drawRing = useCallback(
    (c: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number, ph: number) => {
      c.beginPath();
      for (let i = 0; i <= 56; i++) {
        const th = (i / 56) * 6.2832;
        const m = 1 + 0.025 * Math.sin(3 * th + ph) + 0.015 * Math.sin(5 * th - ph * 2);
        const px = x + Math.cos(th) * rx * m;
        const py = y + Math.sin(th) * ry * m;
        i ? c.lineTo(px, py) : c.moveTo(px, py);
      }
    },
    []
  );

  // Animate ripples
  const animateRipples = useCallback(
    (c: CanvasRenderingContext2D, dt: number) => {
      const { W } = dimensionsRef.current;
      const ripples = ripplesRef.current;

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.age += dt;
        const Rr = r.age * 150;
        const Rmax = W * 0.8;

        if (Rr > Rmax) {
          ripples.splice(i, 1);
          continue;
        }

        const f = Math.pow(1 - Rr / Rmax, 1.6) * r.a * smooth(0, 0.4, r.age);

        for (let k = 0; k < 4; k++) {
          const rr = Rr - k * (16 + Rr * 0.03);
          if (rr < 3) continue;

          const a = f * (1 - k * 0.25);
          const ry = rr * 0.3;

          c.lineWidth = 2.8 + k;
          c.strokeStyle = `rgba(0,0,0,${a * 0.6})`;
          drawRing(c, r.x, r.y + 1.5, rr, ry, r.ph);
          c.stroke();

          c.lineWidth = 1.1;
          c.strokeStyle = `rgba(190,208,232,${a * 0.5})`;
          drawRing(c, r.x, r.y - 1, rr, ry, r.ph);
          c.stroke();

          c.lineWidth = 1.6;
          c.strokeStyle = `rgba(255,170,90,${a * 0.1})`;
          drawRing(c, r.x, r.y + 4, rr * 0.99, ry, r.ph);
          c.stroke();
        }
      }
    },
    [drawRing]
  );

  // Create ripple
  const createRipple = useCallback((x: number, y: number, a: number) => {
    ripplesRef.current.push({ x, y, a, age: 0, ph: Math.random() * 6.28 });
  }, []);

  // Main draw frame
  const drawFrame = useCallback(
    (c: CanvasRenderingContext2D, T: number, dt: number, sc: number, p: number, h: number) => {
      const { W, H, HZ } = dimensionsRef.current;
      const wh = H - HZ;
      const amp = 1.1 + h * 4.5;

      c.globalAlpha = 1;

      // Water gradient background
      let g = c.createLinearGradient(0, HZ, 0, H);
      g.addColorStop(0, "#0c1626");
      g.addColorStop(1, "#03060c");
      c.fillStyle = g;
      c.fillRect(0, 0, W, H);

      // Draw sky
      if (skyCanvasRef.current) {
        c.drawImage(skyCanvasRef.current, 0, 0, W, HZ);

        // Water reflections
        const DPR = dimensionsRef.current.DPR;
        for (let y = 0; y < wh; y += 2) {
          const sy = HZ - y * 0.9;
          if (sy < 2) break;
          const dx =
            Math.sin(y * 0.07 + T * 1.1) * amp * (0.4 + y / wh) +
            Math.sin(y * 0.19 - T * 1.7) * amp * 0.4;
          c.globalAlpha = 0.5 * (1 - (y / wh) * 0.7);
          c.drawImage(
            skyCanvasRef.current,
            0,
            (sy - 2) * DPR,
            skyCanvasRef.current.width,
            2 * DPR,
            dx,
            HZ + y,
            W,
            2
          );
        }
        c.globalAlpha = 1;
      }

      // Moon reflection on water
      const mx = W * 0.78;
      for (let i = 0; i < 16; i++) {
        const y = HZ + 4 + ((i * wh) / 16) * 0.9;
        const w = (14 + i * 5) * (0.6 + 0.4 * Math.sin(T * 1.3 + i * 2));
        c.fillStyle = `rgba(190,205,235,${0.07 * (1 - i / 18)})`;
        c.fillRect(mx - w / 2 + Math.sin(T + i) * 6, y, w, 1.4);
      }

      // Clip to water area for diyas and ripples
      c.save();
      c.beginPath();
      c.rect(0, HZ, W, wh);
      c.clip();

      if (!prefersReducedMotion) {
        animateRipples(c, dt);
      }
      animateDiyas(c, T, sc, p);

      c.restore();

      // Atmospheric haze over water
      g = c.createLinearGradient(0, HZ, 0, HZ + wh * 0.12);
      g.addColorStop(0, "rgba(70,45,30,.18)");
      g.addColorStop(1, "rgba(70,45,30,0)");
      c.fillStyle = g;
      c.fillRect(0, HZ, W, wh * 0.12);

      // Vignette
      g = c.createRadialGradient(
        W / 2,
        H / 2,
        Math.min(W, H) * 0.3,
        W / 2,
        H / 2,
        Math.max(W, H) * 0.75
      );
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(1, "rgba(0,0,0,.6)");
      c.fillStyle = g;
      c.fillRect(0, 0, W, H);

      // Fade from darkness
      c.fillStyle = `rgba(2,3,6,${1 - sc * sc * (3 - 2 * sc)})`;
      c.fillRect(0, 0, W, H);
    },
    [animateDiyas, animateRipples, prefersReducedMotion]
  );

  // Resize handler
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const DPR = Math.min(devicePixelRatio || 1, 1.5);
    const W = window.innerWidth;
    const H = window.innerHeight;
    const HZ = Math.round(H * 0.42);

    canvas.width = W * DPR;
    canvas.height = H * DPR;

    const c = canvas.getContext("2d");
    if (c) {
      c.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    dimensionsRef.current = { W, H, HZ, DPR };
    buildSky();
    createDiyas();
  }, [canvasRef, buildSky, createDiyas]);

  // Initialize
  useEffect(() => {
    resize();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
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

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const { holding, skip, p, T, sc, done } = state;
      const h = smooth(0, 1, p);

      // Create ripples while holding
      if ((holding || skip) && !prefersReducedMotion && T >= nextRipRef.current) {
        createRipple(window.innerWidth / 2, window.innerHeight / 2, 0.5 + 0.5 * p);
        nextRipRef.current = T + (skip ? 0.3 : (0.95 - 0.6 * p) * (0.85 + Math.random() * 0.3));
      }

      drawFrame(c, T, dt, sc, p, h);

      if (!done) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [canvasRef, state, createRipple, drawFrame, prefersReducedMotion]);

  return {
    createRipple,
  };
}
