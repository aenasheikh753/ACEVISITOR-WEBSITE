"use client";

import { InkOutline } from "./InkOutline";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { getToonRamp, readPalette, type Palette } from "./palette";

function Toon({ color }: { color: string }) {
  return <meshToonMaterial color={color} gradientMap={getToonRamp()} />;
}

function Block({
  size,
  position,
  color,
  ink,
  children,
}: {
  size: [number, number, number];
  position: [number, number, number];
  color: string;
  ink: string;
  children?: ReactNode;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <Toon color={color} />
      <InkOutline t={0.025} color={ink} />
      {children}
    </mesh>
  );
}

/** Horizontal window bands wrapped around a building. */
function Bands({ w, d, ys, color }: { w: number; d: number; ys: number[]; color: string }) {
  return (
    <>
      {ys.map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <boxGeometry args={[w + 0.03, 0.09, d + 0.03]} />
          <Toon color={color} />
        </mesh>
      ))}
    </>
  );
}

function Pin({ position, color, ink, offset }: { position: [number, number, number]; color: string; ink: string; offset: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + offset) * 0.12;
  });
  return (
    <group ref={ref} position={position}>
      <mesh position={[0, 0.22, 0]}>
        <sphereGeometry args={[0.17, 18, 18]} />
        <Toon color={color} />
        <InkOutline t={0.02} color={ink} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.12, 0.3, 14]} />
        <Toon color={color} />
        <InkOutline t={0.02} color={ink} />
      </mesh>
    </group>
  );
}

function Tree({ position, color, ink }: { position: [number, number, number]; color: string; ink: string }) {
  return (
    <mesh position={position}>
      <coneGeometry args={[0.22, 0.6, 7]} />
      <Toon color={color} />
      <InkOutline t={0.02} color={ink} />
    </mesh>
  );
}

function Campus({ p }: { p: Palette }) {
  const group = useRef<THREE.Group>(null);
  const smoke = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.18;
    if (smoke.current) {
      smoke.current.children.forEach((c, i) => {
        const t = (state.clock.elapsedTime * 0.5 + i / 3) % 1;
        c.position.y = 1.15 + t * 0.9;
        c.scale.setScalar(0.6 + t * 0.8);
      });
    }
  });

  return (
    <group ref={group} position={[0, -0.9, 0]}>
      {/* platform */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[3.3, 3.3, 0.3, 48]} />
        <Toon color={p.tint} />
        <InkOutline t={0.03} color={p.ink} />
      </mesh>
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.95, 2.05, 64]} />
        <meshBasicMaterial color={p.paper} />
      </mesh>

      {/* HQ tower */}
      <Block size={[0.95, 2.5, 0.95]} position={[0, 1.25, 0]} color={p.primary} ink={p.ink}>
        <Bands w={0.95} d={0.95} ys={[-0.7, -0.25, 0.2, 0.65]} color={p.paper} />
      </Block>
      <Block size={[0.4, 0.3, 0.4]} position={[0, 2.65, 0]} color={p.accent} ink={p.ink} />

      {/* plant + chimney */}
      <Block size={[1.2, 0.75, 0.85]} position={[-1.9, 0.38, 0.7]} color={p.accent} ink={p.ink}>
        <Bands w={1.2} d={0.85} ys={[0.05]} color={p.paper} />
      </Block>
      <mesh position={[-2.25, 0.95, 0.55]}>
        <cylinderGeometry args={[0.12, 0.14, 0.9, 14]} />
        <Toon color={p.paper} />
        <InkOutline t={0.02} color={p.ink} />
      </mesh>
      <group ref={smoke} position={[-2.25, 0, 0.55]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.13, 12, 12]} />
            <Toon color={p.paper} />
          </mesh>
        ))}
      </group>

      {/* clinic */}
      <Block size={[0.95, 0.95, 0.95]} position={[1.75, 0.48, 1]} color={p.paper} ink={p.ink} />
      <mesh position={[1.75, 0.6, 1.49]}>
        <boxGeometry args={[0.42, 0.13, 0.04]} />
        <Toon color={p.pop} />
      </mesh>
      <mesh position={[1.75, 0.6, 1.49]}>
        <boxGeometry args={[0.13, 0.42, 0.04]} />
        <Toon color={p.pop} />
      </mesh>

      {/* school */}
      <Block size={[1.05, 0.7, 0.8]} position={[-1.35, 0.35, -1.5]} color={p.pop} ink={p.ink} />
      <mesh position={[-1.35, 0.95, -1.5]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.8, 0.5, 4]} />
        <Toon color={p.primary} />
        <InkOutline t={0.02} color={p.ink} />
      </mesh>
      <mesh position={[-1.35, 1.45, -1.5]}>
        <cylinderGeometry args={[0.025, 0.025, 0.55, 8]} />
        <Toon color={p.ink} />
      </mesh>
      <mesh position={[-1.22, 1.62, -1.5]}>
        <boxGeometry args={[0.24, 0.15, 0.02]} />
        <Toon color={p.accent} />
      </mesh>

      {/* data centre */}
      <Block size={[1.15, 0.6, 0.75]} position={[1.5, 0.3, -1.35]} color={p.ink} ink={p.ink}>
        <Bands w={1.15} d={0.75} ys={[-0.12, 0.08]} color={p.accent} />
      </Block>

      <Tree position={[0.9, 0.3, 2.1]} color={p.success} ink={p.ink} />
      <Tree position={[-0.6, 0.3, 2.3]} color={p.success} ink={p.ink} />
      <Tree position={[2.6, 0.3, -0.2]} color={p.success} ink={p.ink} />

      <Pin position={[0, 3.25, 0]} color={p.pop} ink={p.ink} offset={0} />
      <Pin position={[-1.9, 1.35, 0.7]} color={p.paper} ink={p.ink} offset={1} />
      <Pin position={[1.75, 1.5, 1]} color={p.accent} ink={p.ink} offset={2} />
      <Pin position={[-1.35, 2.05, -1.5]} color={p.paper} ink={p.ink} offset={3} />
      <Pin position={[1.5, 1.2, -1.35]} color={p.pop} ink={p.ink} offset={4} />
    </group>
  );
}

export default function SitesScene({ active, onReady }: { active: boolean; onReady?: () => void }) {
  // Rendered client-only (next/dynamic ssr:false), so the DOM is available here.
  const [palette] = useState<Palette>(() => readPalette());
  return (
    <Canvas
      flat
      dpr={[1, 1.6]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [6, 4.9, 7.4], fov: 36 }}
      onCreated={({ camera }) => {
        camera.lookAt(0, 0.45, 0);
        onReady?.();
      }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      aria-hidden="true"
    >
      <ambientLight intensity={1.6} />
      <directionalLight position={[4, 6, 3]} intensity={1.3} />
      <Campus p={palette} />
    </Canvas>
  );
}
