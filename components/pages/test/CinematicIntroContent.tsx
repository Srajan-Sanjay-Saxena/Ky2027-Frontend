"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";

import { PlayIcon } from "./components/PlayIcon";
import { RingProgress } from "./components/RingProgress";
import { useCinematicIntro } from "./hooks/useCinematicIntro";
import { useGangaCanvas } from "./hooks/useGangaCanvas";
import { useConcertEffects } from "./hooks/useConcertEffects";
import { useCrazyMode } from "./hooks/useCrazyMode";
import { useAudioSynthesis } from "./hooks/useAudioSynthesis";
import { CONCERT_IMAGE } from "./constants/config";

export function CinematicIntroContent() {
  const [isReady, setIsReady] = useState(false);
  const [isMain, setIsMain] = useState(false);

  // Refs for DOM elements
  const stageRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const gangaCanvasRef = useRef<HTMLCanvasElement>(null);
  const fxCanvasRef = useRef<HTMLCanvasElement>(null);
  const fx2CanvasRef = useRef<HTMLCanvasElement>(null);
  const hxCanvasRef = useRef<HTMLCanvasElement>(null);
  const ppCanvasRef = useRef<HTMLCanvasElement>(null);
  const holdButtonRef = useRef<HTMLButtonElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const enterContainerRef = useRef<HTMLDivElement>(null);
  const skipButtonRef = useRef<HTMLButtonElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const bandRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Main intro logic hook
  const { state, startHold, cancelHold, skipIntro, completeReveal, updateHoldProgress } =
    useCinematicIntro({
      holdButtonRef,
      ringRef,
      enterContainerRef,
      skipButtonRef,
      stageRef,
      dimRef,
      gangaCanvasRef,
      bandRefs,
      flashRef,
      onReady: () => setIsReady(true),
      onMain: () => setIsMain(true),
    });

  // Ganga scene canvas (Phase 1)
  useGangaCanvas({
    canvasRef: gangaCanvasRef,
    state,
  });

  // Concert effects (Phase 4)
  useConcertEffects({
    canvasRef: fxCanvasRef,
    stageRef,
    state,
  });

  // Crazy mode effects (Phase 5)
  useCrazyMode({
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
  });

  // Audio synthesis
  const { initAudio, toggleMute, isMuted } = useAudioSynthesis({
    state,
  });

  // Event handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      initAudio();
      try {
        holdButtonRef.current?.setPointerCapture(e.pointerId);
      } catch {
        // Ignore capture errors
      }
      startHold();
    },
    [initAudio, startHold]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      initAudio();
      startHold();
    },
    [initAudio, startHold]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === " " || e.key === "Enter") && !e.repeat) {
        e.preventDefault();
        initAudio();
        startHold();
      }
    },
    [initAudio, startHold]
  );

  const handleEnterMain = useCallback(() => {
    // For now, just show the main state
    setIsMain(true);
    window.dispatchEvent(new CustomEvent("kashiyatra:enter"));
  }, []);

  // Global event listeners
  useEffect(() => {
    const handleBlur = () => cancelHold();
    window.addEventListener("blur", handleBlur);
    return () => window.removeEventListener("blur", handleBlur);
  }, [cancelHold]);

  // Reduced motion check
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className={`cinematic-intro ${isReady ? "ready" : ""} ${isMain ? "main" : ""}`}>
      {/* Stage with concert image */}
      <div ref={stageRef} id="stage" className="cinematic-stage">
        <Image
          id="base"
          src={CONCERT_IMAGE}
          alt="Kashiyatra concert at IIT (BHU)"
          fill
          priority
          draggable={false}
          className="cinematic-base-image"
        />

        {/* Title bands - clipped layers for reveal animation */}
        {[0, 1, 2].map((i) => (
          <Image
            key={i}
            ref={(el) => {
              bandRefs.current[i] = el;
            }}
            src={CONCERT_IMAGE}
            alt=""
            fill
            draggable={false}
            className={`cinematic-band band-${i}`}
          />
        ))}

        <div ref={dimRef} id="dim" className="cinematic-dim" />
        <canvas ref={fxCanvasRef} id="fx" className="cinematic-fx" />
        <canvas ref={fx2CanvasRef} id="fx2" className="cinematic-fx2" />

        {/* Hotspots */}
        <button
          className="cinematic-hot"
          id="hotEnter"
          title="Enter Kashiyatra"
          style={{ left: "38%", top: "76%", width: "24%", height: "10%" }}
          onClick={handleEnterMain}
        />
        <button
          className="cinematic-hot"
          id="hotSkip"
          title="Enter"
          style={{ left: "86%", top: "4.5%", width: "11.5%", height: "3.4%" }}
          onClick={handleEnterMain}
        />
      </div>

      {/* Ganga canvas */}
      <canvas ref={gangaCanvasRef} id="g" className="cinematic-ganga" />

      {/* UI Layer */}
      <div id="ui" className="cinematic-ui">
        <button
          ref={skipButtonRef}
          id="skip"
          className="cinematic-skip"
          aria-label="Skip intro"
          onClick={skipIntro}
        >
          SKIP INTRO <span className="cinematic-skip-arrow">→</span>
        </button>

        <div
          ref={enterContainerRef}
          id="enter"
          className={`cinematic-enter ${state.shown ? "show" : ""} ${state.done ? "gone" : ""}`}
        >
          <button
            ref={holdButtonRef}
            id="hold"
            className={`cinematic-hold ${state.holding ? "holding" : ""}`}
            aria-label="Press and hold to enter Kashiyatra"
            onPointerDown={handlePointerDown}
            onPointerUp={cancelHold}
            onPointerCancel={cancelHold}
            onLostPointerCapture={cancelHold}
            onTouchStart={handleTouchStart}
            onTouchEnd={cancelHold}
            onTouchCancel={cancelHold}
            onContextMenu={(e) => e.preventDefault()}
            onKeyDown={handleKeyDown}
            onKeyUp={cancelHold}
          >
            <RingProgress ref={ringRef} />
            <PlayIcon />
          </button>
          <p className="cinematic-hold-text">HOLD TO ENTER</p>
        </div>
      </div>

      {/* Crazy mode canvases */}
      <canvas ref={ppCanvasRef} id="pp" className="cinematic-pp" />
      <canvas ref={hxCanvasRef} id="hx" className="cinematic-hx" />

      {/* Flash overlay */}
      <div ref={flashRef} id="flash" className="cinematic-flash" />

      {/* Sound toggle */}
      <button id="snd" className={`cinematic-sound ${isMain ? "hidden" : ""}`} onClick={toggleMute}>
        {isMuted ? "SOUND OFF" : "SOUND ON"}
      </button>

      {/* Main screen placeholder */}
      <div id="main" className="cinematic-main">
        MAIN WEBSITE — set MAIN_URL in the config to link your site
      </div>
    </div>
  );
}
