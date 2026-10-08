/**
 * Cinematic Intro Type Definitions
 * Shared types for the cinematic intro hooks (state, canvas entities,
 * concert effects and crazy-mode particles).
 */

// ═══════════════════════════════════════════════════════════════════
// CORE STATE
// Shared animation state used by useCinematicIntro, useGangaCanvas,
// useConcertEffects, useCrazyMode and useAudioSynthesis.
// ═══════════════════════════════════════════════════════════════════

export interface CinematicState {
  T: number; // Time
  sc: number; // Scene progress (0-1)
  p: number; // Hold progress (0-1)
  holding: boolean;
  skip: boolean;
  done: boolean;
  shown: boolean;
  nextRip: number;
  fx: boolean;
}

// ═══════════════════════════════════════════════════════════════════
// GANGA CANVAS ENTITIES (useGangaCanvas)
// ═══════════════════════════════════════════════════════════════════

export interface Diya {
  bx: number;
  by: number;
  sc: number;
  b: number;
  ph: number;
  sp: number;
  dl: number;
  dist: number;
  dir: number;
  rot: number;
}

export interface Ripple {
  x: number;
  y: number;
  a: number;
  age: number;
  ph: number;
}

// ═══════════════════════════════════════════════════════════════════
// CONCERT EFFECTS ENTITIES (useConcertEffects)
// ═══════════════════════════════════════════════════════════════════

export interface CrowdLight {
  x: number;
  y: number;
  k: "cool" | "warm" | "pink" | "blue";
  s: number;
  ph: number;
  sp: number;
  f: number;
  sway: number;
}

export interface StringLight {
  x: number;
  y: number;
  s: number;
  ph: number;
  sp: number;
  sp2: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  c: readonly number[];
  drag: number;
  grav: number;
  size: number;
  ks: number;
  tw: boolean;
  cr: boolean;
  ph: number;
}

export interface Rocket {
  sx: number;
  sy: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  s: number;
  t: number;
  dur: number;
}

export interface Glow {
  x: number;
  y: number;
  r: number;
  c: string;
  t: number;
  max: number;
}

// ═══════════════════════════════════════════════════════════════════
// CRAZY MODE ENTITIES (useCrazyMode)
// ═══════════════════════════════════════════════════════════════════

export interface HaloRing {
  x: number;
  y: number;
  r: number;
  sp: number;
  hu: number;
  w: number;
}

export interface Spark {
  a: number;
  r: number;
  w: number;
  hu: number;
  sp: number;
}

export interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  l: number;
  m: number;
  hu: number;
}

export interface Bolt {
  pts: [number, number][];
  l: number;
  hu: number;
}

export interface Confetti {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  w: number;
  h: number;
  hu: number;
  ph: number;
  l: number;
  m: number;
}

export interface GlowStick {
  x: number;
  y: number;
  hu: number;
  ph: number;
  len: number;
  sp: number;
}

export interface Bokeh {
  x: number;
  y: number;
  r: number;
  hu: number;
  sp: number;
  ph: number;
}

export interface Pyro {
  x: number;
  y: number;
  vx: number;
  vy: number;
  l: number;
  m: number;
  hu: number;
}

export interface Fountain {
  x: number;
  y: number;
  t: number;
}
