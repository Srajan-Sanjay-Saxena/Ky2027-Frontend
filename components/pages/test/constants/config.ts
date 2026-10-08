// Configuration for the cinematic intro
export const MAIN_URL = ""; // e.g. 'https://kashiyatra.in/' — where "Enter" leads
export const HOLD_SEC = 6; // seconds of holding needed

// Concert image - replace with your actual concert image path
export const CONCERT_IMAGE = "/intro/Stage.png";

// Title bands configuration (x0, x1, y0, y1 in % of image)
// These define the clipping regions for the title reveal animation
export const BANDS = [
  [31.5, 69, 9.3, 30.3], // Main title
  [31.5, 69, 30.3, 33.3], // Subtitle (IIT BHU)
  [31.5, 69, 36.4, 39.7], // Tagline
] as const;

// Phone lights positions in the crowd (x%, y%, color index)
// color index: 0=cool, 1=warm, 2=blue
export const PHONE_LIGHTS = [
  [0.678, 0.715, 2],
  [0.569, 0.717, 2],
  [0.58, 0.718, 0],
  [0.206, 0.719, 0],
  [0.531, 0.721, 0],
  [0.546, 0.721, 0],
  [0.577, 0.721, 2],
  [0.66, 0.721, 2],
  [0.527, 0.722, 0],
  [0.779, 0.722, 0],
  [0.541, 0.723, 1],
  [0.199, 0.724, 2],
  [0.558, 0.724, 2],
  [0.772, 0.724, 2],
  [0.989, 0.724, 0],
  [0.208, 0.725, 0],
  [0.768, 0.725, 2],
  [0.553, 0.726, 0],
  [0.147, 0.727, 2],
  [0.156, 0.727, 0],
  [0.203, 0.727, 2],
  [0.223, 0.727, 2],
  [0.592, 0.727, 0],
  [0.696, 0.727, 2],
  [0.801, 0.727, 2],
  [0.115, 0.728, 2],
  [0.132, 0.728, 2],
  [0.151, 0.728, 0],
  [0.16, 0.728, 2],
  [0.17, 0.728, 2],
  [0.24, 0.728, 2],
  [0.572, 0.728, 0],
  [0.166, 0.729, 2],
  [0.679, 0.729, 0],
  [0.706, 0.729, 2],
  [0.649, 0.731, 0],
  [0.126, 0.732, 0],
  [0.496, 0.732, 0],
  [0.617, 0.732, 0],
  [0.753, 0.732, 0],
  [0.658, 0.733, 2],
  [0.766, 0.733, 2],
  [0.809, 0.733, 0],
  [0.417, 0.735, 2],
  [0.602, 0.735, 2],
  [0.794, 0.735, 2],
  [0.817, 0.735, 2],
  [0.687, 0.737, 2],
  [0.27, 0.738, 2],
  [0.743, 0.738, 2],
] as const;

// String lights positions
export const STRING_LIGHTS = [
  [0.325, 0.673],
  [0.959, 0.673],
  [0.169, 0.674],
  [0.172, 0.674],
  [0.955, 0.675],
  [0.99, 0.675],
  [0.882, 0.676],
  [0.828, 0.677],
  [0.983, 0.677],
  [0.993, 0.677],
  [0.162, 0.678],
  [0.812, 0.678],
  [0.993, 0.678],
  [0.998, 0.678],
  [0.803, 0.679],
  [0.222, 0.68],
  [0.864, 0.68],
  [0.959, 0.68],
  [0.974, 0.68],
  [0.987, 0.68],
] as const;

// Lantern positions
export const LANTERNS = [
  [0.091, 0.831],
  [0.21, 0.834],
  [0.808, 0.834],
  [0.961, 0.834],
] as const;

// Audio config
export const BPM = 124;
export const STEP_DURATION = 60 / BPM / 4;

// Arpeggio pattern for the party loop
export const ARP_PATTERN = [0, 2, 4, 2, 5, 4, 2, 1, 0, 2, 4, 5, 7, 5, 4, 2];
export const SCALE_FREQUENCIES = [293.66, 311.13, 369.99, 392, 440, 466.16, 523.25, 587.33];
export const ROOT_FREQUENCIES = [73.42, 73.42, 87.31, 77.78];
