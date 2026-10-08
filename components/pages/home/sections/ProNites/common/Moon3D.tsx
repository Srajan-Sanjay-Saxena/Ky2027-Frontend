"use client";

import { memo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// ============================================
// TUNABLE PARAMETERS - Adjust these values
// ============================================
const MOON_CONFIG = {
  // Model scale - increase to make moon bigger, decrease for smaller
  scale: 2.5,

  // Camera distance - increase to zoom out (moon smaller), decrease to zoom in (moon bigger)
  cameraZ: 100,

  // Camera field of view - increase for wider view (moon smaller), decrease for narrower (moon bigger)
  fov: 100,

  // Rotation speeds (radians per second)
  rotationSpeedY: 0.03, // Main spin speed - increase for faster rotation
  wobbleSpeedX: 0.1, // How fast the tilt wobbles
  wobbleSpeedZ: 0.08, // How fast the roll wobbles

  // Rotation amounts (radians)
  baseTiltX: 0.15, // Constant tilt angle (0 = no tilt, 0.3 = ~17°)
  wobbleAmountX: 0.1, // How much it wobbles on X axis
  wobbleAmountZ: 0.05, // How much it wobbles on Z axis

  // Lighting
  ambientIntensity: 0.4, // Overall brightness
  mainLightIntensity: 1.8, // Main directional light
  fillLightIntensity: 0.4, // Secondary fill light
};

/**
 * Rotating Moon Model
 */
function MoonModel() {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/Moon.glb");

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Main Y-axis rotation (spin)
      meshRef.current.rotation.y += delta * MOON_CONFIG.rotationSpeedY;

      // Wobble on X and Z for 3D depth feel
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x =
        Math.sin(time * MOON_CONFIG.wobbleSpeedX) * MOON_CONFIG.wobbleAmountX +
        MOON_CONFIG.baseTiltX;
      meshRef.current.rotation.z =
        Math.cos(time * MOON_CONFIG.wobbleSpeedZ) * MOON_CONFIG.wobbleAmountZ;
    }
  });

  return (
    <group ref={meshRef}>
      <primitive object={scene} scale={MOON_CONFIG.scale} />
    </group>
  );
}

// Preload the model
useGLTF.preload("/models/Moon.glb");

/**
 * Moon3D - WebGL canvas with rotating moon model
 */
export const Moon3D = memo(function Moon3D() {
  return (
    <Canvas
      camera={{
        position: [0, 0, MOON_CONFIG.cameraZ],
        fov: MOON_CONFIG.fov,
      }}
      style={{ background: "transparent" }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      {/* Lighting */}
      <ambientLight intensity={MOON_CONFIG.ambientIntensity} />
      <directionalLight
        position={[5, 3, 5]}
        intensity={MOON_CONFIG.mainLightIntensity}
        color="#ffffff"
      />
      <directionalLight
        position={[-3, -1, 2]}
        intensity={MOON_CONFIG.fillLightIntensity}
        color="#aaaaff"
      />

      <Suspense fallback={null}>
        <MoonModel />
      </Suspense>
    </Canvas>
  );
});
