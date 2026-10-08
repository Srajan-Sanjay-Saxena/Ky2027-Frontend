"use client";

import { useEffect, useRef, useState, useCallback } from "react";

import {
  BPM,
  STEP_DURATION,
  ARP_PATTERN,
  SCALE_FREQUENCIES,
  ROOT_FREQUENCIES,
} from "@/components/pages/test/constants/config";
import { CinematicState } from "@/lib/api/helper/types/cinematic.types";

interface UseAudioSynthesisProps {
  state: CinematicState;
}

export function useAudioSynthesis({ state }: UseAudioSynthesisProps) {
  const [isMuted, setIsMuted] = useState(false);

  const acRef = useRef<AudioContext | null>(null);
  const mgRef = useRef<GainNode | null>(null);
  const nbRef = useRef<AudioBuffer | null>(null);
  const riserRef = useRef<{
    o: OscillatorNode;
    o2: OscillatorNode;
    fl: BiquadFilterNode;
    g: GainNode;
  } | null>(null);

  const stepRef = useRef(0);
  const nextStepRef = useRef(0);
  const loopOnRef = useRef(false);

  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Initialize audio context
  const initAudio = useCallback(() => {
    if (prefersReducedMotion) return;
    if (acRef.current) {
      if (acRef.current.state === "suspended") {
        acRef.current.resume();
      }
      return;
    }

    try {
      const AC = new (
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      )();

      const cp = AC.createDynamicsCompressor();
      const MG = AC.createGain();
      MG.gain.value = 0.8;
      MG.connect(cp);
      cp.connect(AC.destination);

      // Create noise buffer
      const NB = AC.createBuffer(1, AC.sampleRate, AC.sampleRate);
      const d = NB.getChannelData(0);
      for (let i = 0; i < d.length; i++) {
        d[i] = Math.random() * 2 - 1;
      }

      acRef.current = AC;
      mgRef.current = MG;
      nbRef.current = NB;
    } catch {
      acRef.current = null;
    }
  }, [prefersReducedMotion]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      if (mgRef.current) {
        mgRef.current.gain.value = newMuted ? 0 : 0.8;
      }
      return newMuted;
    });
  }, []);

  // Noise generator
  const noise = useCallback(
    (t: number, dur: number, type: BiquadFilterType, f: number, g: number, q = 1) => {
      const AC = acRef.current;
      const NB = nbRef.current;
      const MG = mgRef.current;
      if (!AC || !NB || !MG) return;

      const s = AC.createBufferSource();
      s.buffer = NB;
      s.loop = true;

      const fl = AC.createBiquadFilter();
      fl.type = type;
      fl.frequency.value = f;
      fl.Q.value = q;

      const ga = AC.createGain();
      ga.gain.setValueAtTime(g, t);
      ga.gain.exponentialRampToValueAtTime(0.001, t + dur);

      s.connect(fl);
      fl.connect(ga);
      ga.connect(MG);
      s.start(t);
      s.stop(t + dur + 0.05);
    },
    []
  );

  // Tone generator
  const tone = useCallback(
    (
      t: number,
      f0: number,
      f1: number,
      dur: number,
      g: number,
      type: OscillatorType = "sine",
      cut?: number
    ) => {
      const AC = acRef.current;
      const MG = mgRef.current;
      if (!AC || !MG) return;

      const o = AC.createOscillator();
      const ga = AC.createGain();

      o.type = type;
      o.frequency.setValueAtTime(f0, t);
      if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur);

      ga.gain.setValueAtTime(g, t);
      ga.gain.exponentialRampToValueAtTime(0.001, t + dur);

      let n: AudioNode = o;
      if (cut) {
        const fl = AC.createBiquadFilter();
        fl.type = "lowpass";
        fl.frequency.setValueAtTime(cut, t);
        fl.frequency.exponentialRampToValueAtTime(cut * 0.25, t + dur);
        o.connect(fl);
        n = fl;
      }

      n.connect(ga);
      ga.connect(MG);
      o.start(t);
      o.stop(t + dur + 0.05);
    },
    []
  );

  // Kick drum
  const kick = useCallback(
    (t: number, v = 1) => {
      tone(t, 150, 42, 0.32, 0.9 * v);
      noise(t, 0.03, "highpass", 3000, 0.15 * v);
    },
    [tone, noise]
  );

  // Update riser sound (while holding)
  const riserUpdate = useCallback((on: boolean, p: number) => {
    const AC = acRef.current;
    const MG = mgRef.current;
    if (!AC || !MG) return;

    if (on && !riserRef.current) {
      const o = AC.createOscillator();
      const o2 = AC.createOscillator();
      const fl = AC.createBiquadFilter();
      const g = AC.createGain();

      o.type = "sawtooth";
      o2.type = "square";
      fl.type = "lowpass";
      fl.Q.value = 6;
      g.gain.value = 0;

      o.connect(fl);
      o2.connect(fl);
      fl.connect(g);
      g.connect(MG);
      o.start();
      o2.start();

      riserRef.current = { o, o2, fl, g };
    }

    if (riserRef.current) {
      const t = AC.currentTime;
      const f = 70 * Math.pow(2, p * 3.6);

      riserRef.current.o.frequency.setTargetAtTime(f, t, 0.05);
      riserRef.current.o2.frequency.setTargetAtTime(f * 1.503, t, 0.05);
      riserRef.current.fl.frequency.setTargetAtTime(250 + p * p * 7000, t, 0.05);
      riserRef.current.g.gain.setTargetAtTime(on ? 0.03 + 0.1 * p : 0, t, on ? 0.08 : 0.12);

      if (!on) {
        const r = riserRef.current;
        riserRef.current = null;
        setTimeout(() => {
          try {
            r.o.stop();
            r.o2.stop();
          } catch {
            // Ignore
          }
        }, 800);
      }
    }
  }, []);

  // Schedule party loop
  const schedule = useCallback(() => {
    const AC = acRef.current;
    if (!AC || !loopOnRef.current) return;

    while (nextStepRef.current < AC.currentTime + 0.15) {
      const t = nextStepRef.current;
      const s = stepRef.current % 16;
      const bar = Math.floor(stepRef.current / 16) % 4;

      // Kick on quarter notes
      if (s % 4 === 0) kick(t);

      // Snare on offbeats
      if (s % 4 === 2) {
        noise(t, 0.09, "highpass", 7500, 0.2);
        tone(t, ROOT_FREQUENCIES[bar], ROOT_FREQUENCIES[bar], 0.22, 0.5, "sawtooth", 900);
      } else if (s % 2) {
        noise(t, 0.03, "highpass", 9000, 0.06);
      }

      // Clap
      if (s === 4 || s === 12) {
        noise(t, 0.14, "bandpass", 1600, 0.35, 0.8);
      }

      // Fill on bar 4
      if (bar === 3 && s >= 12) {
        noise(t, 0.08, "bandpass", 2200, 0.2);
      }

      // Arp
      tone(
        t,
        SCALE_FREQUENCIES[ARP_PATTERN[s]] * (bar >= 2 ? 1.5 : 1),
        SCALE_FREQUENCIES[ARP_PATTERN[s]] * (bar >= 2 ? 1.5 : 1),
        0.14,
        0.05,
        "sawtooth",
        3500
      );

      nextStepRef.current += STEP_DURATION;
      stepRef.current++;
    }
  }, [kick, noise, tone]);

  // Drop sound (when hold completes)
  const dropSound = useCallback(() => {
    const AC = acRef.current;
    if (!AC) return performance.now();

    const t = AC.currentTime + 0.02;

    // Big bass drop
    tone(t, 170, 28, 1.2, 1.4);
    noise(t, 2.4, "highpass", 1800, 0.5);
    noise(t, 0.6, "lowpass", 400, 0.9);

    // Start party loop
    nextStepRef.current = t + 0.3;
    stepRef.current = 0;
    loopOnRef.current = true;

    return performance.now() + 300;
  }, [tone, noise]);

  // Scheduler interval
  useEffect(() => {
    const interval = setInterval(schedule, 25);
    return () => clearInterval(interval);
  }, [schedule]);

  // Handle visibility change
  useEffect(() => {
    const handleVisibility = () => {
      const AC = acRef.current;
      if (!AC) return;
      if (document.hidden) {
        AC.suspend();
      } else {
        AC.resume();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Update riser based on state
  useEffect(() => {
    const { holding, skip, done, p } = state;
    const act = (holding || skip) && !done;
    riserUpdate(act, p);

    // Heartbeat kick while holding
    if (act && !isMuted && acRef.current) {
      // This is handled in useCrazyMode for proper timing
    }
  }, [state, isMuted, riserUpdate]);

  // Expose dropSound globally for completeReveal
  useEffect(() => {
    (window as unknown as { dropSound?: () => number }).dropSound = dropSound;
    return () => {
      delete (window as unknown as { dropSound?: () => number }).dropSound;
    };
  }, [dropSound]);

  return {
    initAudio,
    toggleMute,
    isMuted,
    kick,
    dropSound,
  };
}
