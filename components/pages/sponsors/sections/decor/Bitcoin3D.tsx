"use client";

import { memo, useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLORS } from "../../constants/palette";

gsap.registerPlugin(ScrollTrigger);

// ============================================
// BITCOIN 3D CONFIGURATION
// ============================================
const BITCOIN_CONFIG = {
  // Model
  modelPath: "/sponsors/bitcoin.glb",

  // Scale - changes during scroll (big at start, small at end)
  startScale: 4, // Size at start
  endScale: 2.6, // Size at end

  // Camera
  cameraZ: 12,
  fov: 50,

  // Diagonal motion: Mid-Right to Bottom-Left (avoiding navbar)
  startX: 5.7, // Start more right
  endX: -3, // End left
  startY: 1.1, // Start slightly above middle
  endY: -4, // End bottom

  // Scroll-controlled rotation (Y axis only)
  rotationY: Math.PI * 8, // Total Y rotation during scroll

  // Position
  positionZ: 0,

  // Lighting
  ambientIntensity: 0.5,
  mainLightIntensity: 2.5,
  rimLightIntensity: 2,

  // Vibrant gold-orange color
  coinColor: "#FFA500", // Bright orange-gold
};

// Global scroll progress (0 to 1)
let scrollProgress = 0;

/**
 * Bitcoin Model - fully controlled by scroll
 */
function BitcoinModel() {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(BITCOIN_CONFIG.modelPath);

  // Clone scene and apply bright golden material
  const clonedScene = scene.clone();

  // Apply bright shiny gold material
  clonedScene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#FFD700"), // Bright gold
        metalness: 1,
        roughness: 0.15,
        envMapIntensity: 2,
      });
    }
  });

  useFrame(() => {
    if (!meshRef.current) return;

    // ═══════════════════════════════════════════════════════════════
    // DIAGONAL MOTION: Top-Right → Bottom-Left with scale change
    // ═══════════════════════════════════════════════════════════════

    // X Position: Right to Left
    const xPos = THREE.MathUtils.lerp(BITCOIN_CONFIG.startX, BITCOIN_CONFIG.endX, scrollProgress);
    meshRef.current.position.x = xPos;

    // Y Position: Top to Bottom (diagonal)
    const yPos = THREE.MathUtils.lerp(BITCOIN_CONFIG.startY, BITCOIN_CONFIG.endY, scrollProgress);
    meshRef.current.position.y = yPos;

    // Scale: Large at top-right, small at bottom-left
    const currentScale = THREE.MathUtils.lerp(
      BITCOIN_CONFIG.startScale,
      BITCOIN_CONFIG.endScale,
      scrollProgress
    );
    meshRef.current.scale.setScalar(currentScale);

    // Rotation Y only: Spin based on scroll (vertical axis)
    meshRef.current.rotation.y = scrollProgress * BITCOIN_CONFIG.rotationY;
  });

  return (
    <group
      ref={meshRef}
      position={[BITCOIN_CONFIG.startX, BITCOIN_CONFIG.startY, BITCOIN_CONFIG.positionZ]}
      scale={BITCOIN_CONFIG.startScale}
    >
      <primitive object={clonedScene} />
    </group>
  );
}

// Preload the model
useGLTF.preload(BITCOIN_CONFIG.modelPath);

/**
 * Bitcoin3D - WebGL canvas with scroll-controlled Bitcoin
 */
export const Bitcoin3D = memo(function Bitcoin3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Setup ScrollTrigger
  useEffect(() => {
    if (!isClient) return;

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5, // Smooth scrubbing
      onUpdate: (self) => {
        scrollProgress = self.progress;
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 hidden lg:block"
      style={{ opacity: 0.85 }}
    >
      <Canvas
        camera={{
          position: [0, 0, BITCOIN_CONFIG.cameraZ],
          fov: BITCOIN_CONFIG.fov,
        }}
        style={{ background: "transparent" }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        {/* Lighting Setup */}
        <ambientLight intensity={0.6} color="#ffffff" />

        {/* Main light - bright white */}
        <directionalLight position={[5, 5, 5]} intensity={3} color="#ffffff" />

        {/* Back fill light */}
        <directionalLight position={[-3, -2, -5]} intensity={1.5} color="#ffffff" />

        {/* Colored rim lights matching theme */}
        <pointLight
          position={[-5, 0, 5]}
          intensity={BITCOIN_CONFIG.rimLightIntensity}
          color={COLORS.NEON_CYAN}
          distance={20}
        />

        <pointLight position={[5, -3, 3]} intensity={1} color={COLORS.NEON_PINK} distance={20} />

        <pointLight
          position={[0, 5, -3]}
          intensity={0.8}
          color={COLORS.NEON_PURPLE}
          distance={20}
        />

        {/* Gold accent light */}
        <pointLight position={[0, 0, 8]} intensity={0.6} color="#FFD700" distance={15} />

        <Suspense fallback={null}>
          <BitcoinModel />
        </Suspense>
      </Canvas>
    </div>
  );
});
