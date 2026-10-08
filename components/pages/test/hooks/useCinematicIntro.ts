"use client";

import { useState, useCallback, useRef, useEffect, RefObject } from "react";

import { HOLD_SEC, BANDS } from "@/components/pages/test/constants/config";
import { CinematicState } from "@/lib/api/helper/types/cinematic.types";

interface UseCinematicIntroProps {
  holdButtonRef: RefObject<HTMLButtonElement | null>;
  ringRef: RefObject<SVGCircleElement | null>;
  enterContainerRef: RefObject<HTMLDivElement | null>;
  skipButtonRef: RefObject<HTMLButtonElement | null>;
  stageRef: RefObject<HTMLDivElement | null>;
  dimRef: RefObject<HTMLDivElement | null>;
  gangaCanvasRef: RefObject<HTMLCanvasElement | null>;
  bandRefs: RefObject<(HTMLImageElement | null)[]>;
  flashRef: RefObject<HTMLDivElement | null>;
  onReady: () => void;
  onMain: () => void;
}

const initialState: CinematicState = {
  T: 0,
  sc: 0,
  p: 0,
  holding: false,
  skip: false,
  done: false,
  shown: false,
  nextRip: 0,
  fx: false,
};

const prefersReducedMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useCinematicIntro({
  holdButtonRef,
  ringRef,
  enterContainerRef,
  skipButtonRef,
  stageRef,
  dimRef,
  gangaCanvasRef,
  bandRefs,
  flashRef,
  onReady,
  onMain,
}: UseCinematicIntroProps) {
  const [state, setState] = useState<CinematicState>(initialState);
  const stateRef = useRef(state);
  const lastTimeRef = useRef(performance.now());
  const rafRef = useRef<number | undefined>(undefined);

  // Keep ref in sync with state
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const startHold = useCallback(() => {
    const s = stateRef.current;
    if (s.done || s.skip || s.holding || s.T < 3.4) return;
    if (prefersReducedMotion) {
      // Skip directly for reduced motion users
      setState((prev) => ({ ...prev, skip: true }));
      return;
    }
    setState((prev) => ({
      ...prev,
      holding: true,
      nextRip: 0,
    }));
    holdButtonRef.current?.classList.add("holding");
  }, [holdButtonRef]);

  const cancelHold = useCallback(() => {
    if (!stateRef.current.holding) return;
    setState((prev) => ({ ...prev, holding: false }));
    holdButtonRef.current?.classList.remove("holding");
  }, [holdButtonRef]);

  const skipIntro = useCallback(() => {
    const s = stateRef.current;
    if (s.done || s.skip) return;
    setState((prev) => ({
      ...prev,
      skip: true,
      nextRip: 0,
    }));
    cancelHold();
    enterContainerRef.current?.classList.add("gone");
  }, [cancelHold, enterContainerRef]);

  const completeReveal = useCallback(() => {
    setState((prev) => ({ ...prev, done: true }));
    cancelHold();
    enterContainerRef.current?.classList.add("gone");

    if (gangaCanvasRef.current) {
      gangaCanvasRef.current.style.display = "none";
    }
    if (dimRef.current) {
      dimRef.current.style.opacity = "0";
    }
    if (stageRef.current) {
      stageRef.current.style.setProperty("--s", "1");
    }
    if (skipButtonRef.current) {
      skipButtonRef.current.style.pointerEvents = "none";
      skipButtonRef.current.style.opacity = "0";
    }

    // Reveal title bands with stagger
    const s = stateRef.current;
    const delays = s.skip ? [0.1, 0.6, 1.1] : [0.5, 2.2, 3.6];

    bandRefs.current.forEach((el, i) => {
      if (el) {
        el.style.transitionDelay = `${delays[i]}s`;
        el.classList.add("on");
      }
    });

    // Push animation
    requestAnimationFrame(() => {
      stageRef.current?.classList.add("push");
    });

    // Enable hotspots after animation
    setTimeout(
      () => {
        onReady();
      },
      (delays[2] + 1.5) * 1000
    );
  }, [
    cancelHold,
    enterContainerRef,
    gangaCanvasRef,
    dimRef,
    stageRef,
    skipButtonRef,
    bandRefs,
    onReady,
  ]);

  const updateHoldProgress = useCallback(
    (dt: number) => {
      const s = stateRef.current;
      let newP = s.p;

      if (s.skip) {
        newP += dt / 1.5;
      } else if (s.holding) {
        newP += dt / HOLD_SEC;
      } else {
        newP = Math.max(0, newP - dt / 2.2);
      }
      newP = Math.min(1, newP);

      // Update ring progress
      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = String(1 - newP);
      }

      // Update glow
      if (holdButtonRef.current) {
        holdButtonRef.current.style.setProperty("--g", String(Math.max(newP, s.holding ? 0.5 : 0)));
      }

      setState((prev) => ({ ...prev, p: newP }));

      if (newP >= 1 && !s.done) {
        completeReveal();
      }

      return newP;
    },
    [ringRef, holdButtonRef, completeReveal]
  );

  const revealConcert = useCallback(
    (p: number) => {
      const smooth = (a: number, b: number, x: number) => {
        const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
        return t * t * (3 - 2 * t);
      };

      const m = smooth(0.5, 1, p);

      // Trigger FX at threshold
      if (m > 0.35 && !stateRef.current.fx) {
        setState((prev) => ({ ...prev, fx: true }));
      }

      // Apply mask to ganga canvas
      if (gangaCanvasRef.current) {
        const msk =
          m <= 0
            ? "none"
            : `radial-gradient(ellipse 120% 90% at 50% 50%,transparent ${-30 + m * 110}%,#000 ${m * 110}%)`;
        gangaCanvasRef.current.style.webkitMaskImage = msk;
        gangaCanvasRef.current.style.maskImage = msk;
        gangaCanvasRef.current.style.opacity = String(1 - smooth(0.92, 1, p));
      }

      // Fade dim layer
      if (dimRef.current) {
        dimRef.current.style.opacity = String(1 - (0.1 + 0.9 * m));
      }

      // Scale stage
      if (stageRef.current) {
        stageRef.current.style.setProperty("--s", String(1.07 - 0.07 * m));
      }

      // Fade skip button
      if (skipButtonRef.current) {
        skipButtonRef.current.style.opacity = String(0.8 * (1 - smooth(0.55, 0.85, p)));
      }
    },
    [gangaCanvasRef, dimRef, stageRef, skipButtonRef]
  );

  // Main animation loop
  useEffect(() => {
    const tick = (now: number) => {
      const s = stateRef.current;
      const dt = Math.min(0.05, (now - lastTimeRef.current) / 1000);
      lastTimeRef.current = now;

      // Update time
      const newT = s.T + dt;
      const newSc = Math.min(1, s.sc + dt / (s.skip ? 0.5 : 3.2));

      // Show enter button after 3.2s
      let newShown = s.shown;
      if (newT > 3.2 && !s.shown) {
        newShown = true;
        enterContainerRef.current?.classList.add("show");
      }

      setState((prev) => ({
        ...prev,
        T: newT,
        sc: newSc,
        shown: newShown,
      }));

      // Update hold progress
      const newP = updateHoldProgress(dt);

      // Reveal concert
      revealConcert(newP);

      if (!s.done) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateHoldProgress, revealConcert, enterContainerRef]);

  return {
    state,
    startHold,
    cancelHold,
    skipIntro,
    completeReveal,
    updateHoldProgress,
  };
}
