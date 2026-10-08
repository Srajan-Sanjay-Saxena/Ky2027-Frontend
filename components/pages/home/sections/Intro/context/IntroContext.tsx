"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

/**
 * Intro phases:
 * - idle: Show stage background with Enter button
 * - loading: User is holding the Enter button (audio loading)
 * - blasting: Explosion effect playing
 * - video: Video playing with Continue button visible
 * - complete: Intro done, show Hero and rest of site
 */
type IntroPhase = "idle" | "loading" | "blasting" | "video" | "complete";

interface IntroContextType {
  phase: IntroPhase;
  loadProgress: number; // 0-100 for the hold-to-enter loading
  isIntroComplete: boolean;
  hasSeenIntro: boolean; // Tracks if user has completed intro this session
  isMuted: boolean;
  audioRef: React.RefObject<HTMLAudioElement | null>; // Exposed for audio analysis (FirePot)
  startLoading: () => void;
  cancelLoading: () => void;
  startBlast: () => void;
  startVideo: () => void;
  completeIntro: () => void;
  skipIntro: () => void;
  setLoadProgress: (progress: number) => void;
  toggleMute: () => void;
}

const IntroContext = createContext<IntroContextType | null>(null);

// Global flag - persists across client-side navigations but resets on full page refresh
let globalHasSeenIntro = false;

export function IntroProvider({ children }: { children: ReactNode }) {
  // If user has already seen intro (client-side nav), start at complete
  const [phase, setPhase] = useState<IntroPhase>(globalHasSeenIntro ? "complete" : "idle");
  const [loadProgress, setLoadProgress] = useState(0);
  const [hasSeenIntro, setHasSeenIntro] = useState(globalHasSeenIntro);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/intro/PortalSong.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle mute state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const startLoading = useCallback(() => {
    setPhase("loading");
    setLoadProgress(0);

    // Start playing audio
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  const cancelLoading = useCallback(() => {
    setPhase("idle");
    setLoadProgress(0);

    // Stop and reset audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const startBlast = useCallback(() => {
    setPhase("blasting");
    setLoadProgress(0);
    // Keep audio playing through blast
  }, []);

  const startVideo = useCallback(() => {
    setPhase("video");
    // Keep audio playing during video
  }, []);

  const completeIntro = useCallback(() => {
    setPhase("complete");

    // Mark intro as seen globally (persists across client-side navigations)
    globalHasSeenIntro = true;
    setHasSeenIntro(true);

    // Stop audio when intro completes
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const skipIntro = useCallback(() => {
    setPhase("complete");

    // Mark intro as seen globally
    globalHasSeenIntro = true;
    setHasSeenIntro(true);

    // Stop audio when skipping
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const isIntroComplete = phase === "complete";

  return (
    <IntroContext.Provider
      value={{
        phase,
        loadProgress,
        isIntroComplete,
        hasSeenIntro,
        isMuted,
        audioRef,
        startLoading,
        cancelLoading,
        startBlast,
        startVideo,
        completeIntro,
        skipIntro,
        setLoadProgress,
        toggleMute,
      }}
    >
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const context = useContext(IntroContext);
  if (!context) {
    throw new Error("useIntro must be used within an IntroProvider");
  }
  return context;
}
