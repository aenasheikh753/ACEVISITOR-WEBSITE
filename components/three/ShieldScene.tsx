"use client";

import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { InkOutline } from "./InkOutline";
import { getToonRamp, readPalette, type Palette } from "./palette";

function shieldShape(scale = 1) {
  const s = new THREE.Shape();
  s.moveTo(0, 1.55 * scale);
  s.bezierCurveTo(0.55 * scale, 1.3 * scale, 1.05 * scale, 1.2 * scale, 1.25 * scale, 1.18 * scale);
  s.lineTo(1.25 * scale, 0.1 * scale);
  s.bezierCurveTo(1.25 * scale, -0.85 * scale, 0.6 * scale, -1.35 * scale, 0, -1.65 * scale);
  s.bezierCurveTo(-0.6 * scale, -1.35 * scale, -1.25 * scale, -0.85 * scale, -1.25 * scale, 0.1 * scale);
  s.lineTo(-1.25 * scale, 1.18 * scale);
  s.bezierCurveTo(-1.05 * scale, 1.2 * scale, -0.55 * scale, 1.3 * scale, 0, 1.55 * scale);
  return s;
}

function useShieldGeometry(scale: number, depth: number) {
  return useMemo(() => {
    const g = new THREE.ExtrudeGeometry(shieldShape(scale), {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.08,
      bevelSegments: 3,
      curveSegments: 24,
    });
    g.center();
    return g;
  }, [scale, depth]);
}

function Shield({ p }: { p: Palette }) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);
  const ramp = getToonRamp();
  const outer = useShieldGeometry(1.12, 0.28);
  const inner = useShieldGeometry(0.92, 0.3);
  const check = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      [new THREE.Vector3(-0.55, 0.05, 0), new THREE.Vector3(-0.15, -0.38, 0), new THREE.Vector3(0.62, 0.48, 0)],
      false,
      "catmullrom",
      0.05,
    );
    return new THREE.TubeGeometry(curve, 32, 0.13, 12, false);
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (g) {
      const t = state.clock.elapsedTime;
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.5 + Math.sin(t * 0.5) * 0.25, 3, delta);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.25, 3, delta);
    }
    if (ring.current) ring.current.rotation.z += delta * 0.4;
  });

  return (
    <group ref={group}>
      <mesh geometry={outer} position={[0, 0, -0.12]}>
        <meshToonMaterial color={p.accent} gradientMap={ramp} />
        <InkOutline t={0.05} color={p.ink} />
      </mesh>
      <mesh geometry={inner} position={[0, 0, 0.06]}>
        <meshToonMaterial color={p.primary} gradientMap={ramp} />
      </mesh>
      <mesh geometry={check} position={[0, 0, 0.32]}>
        <meshToonMaterial color={p.paper} gradientMap={ramp} />
      </mesh>
      <group rotation={[1.2, 0.2, 0]}>
        <group ref={ring}>
          <mesh>
            <torusGeometry args={[2.35, 0.025, 8, 90]} />
            <meshBasicMaterial color={p.accent} />
          </mesh>
          <mesh position={[2.35, 0, 0]}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshToonMaterial color={p.pop} gradientMap={ramp} />
            <InkOutline t={0.025} color={p.ink} />
          </mesh>
          <mesh position={[-2.35, 0, 0]}>
            <boxGeometry args={[0.26, 0.22, 0.16]} />
            <meshToonMaterial color={p.accent} gradientMap={ramp} />
            <InkOutline t={0.025} color={p.ink} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default function ShieldScene({ active, onReady }: { active: boolean; onReady?: () => void }) {
  // Rendered client-only (next/dynamic ssr:false), so the DOM is available here.
  const [palette] = useState<Palette>(() => readPalette());
  return (
    <Canvas
      flat
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 7.4], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <ambientLight intensity={1.6} />
      <directionalLight position={[3, 4, 6]} intensity={1.4} />
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.6}>
        <Shield p={palette} />
      </Float>
    </Canvas>
  );
}
