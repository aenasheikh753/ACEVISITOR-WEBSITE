"use client";

import { Float, RoundedBox } from "@react-three/drei";
import { InkOutline } from "./InkOutline";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { initials, qrCells } from "@/lib/art";
import type { BadgeContent } from "@/lib/types";
import { getToonRamp, readPalette, type Palette } from "./palette";

const W = 512;
const H = 736;

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/** Paint the badge face onto a canvas so the 3D card shows real content. */
function paintBadge(badge: BadgeContent, p: Palette) {
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;
  const display = p.display;
  const body = p.body;

  ctx.fillStyle = p.paper;
  roundRect(ctx, 0, 0, W, H, 40);
  ctx.fill();

  // header band
  ctx.fillStyle = p.primary;
  ctx.beginPath();
  ctx.roundRect(0, 0, W, 150, [40, 40, 0, 0]);
  ctx.fill();
  ctx.fillStyle = p.paper;
  roundRect(ctx, W / 2 - 46, 30, 92, 18, 9);
  ctx.fill();
  ctx.font = `800 40px ${display}`;
  ctx.fillText(badge.brand, 40, 112);
  ctx.fillStyle = p.accent;
  roundRect(ctx, W - 186, 76, 150, 48, 24);
  ctx.fill();
  ctx.strokeStyle = p.ink;
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.fillStyle = p.ink;
  ctx.font = `800 24px ${display}`;
  ctx.textAlign = "center";
  ctx.fillText(badge.label.toUpperCase(), W - 111, 109);

  // avatar
  ctx.fillStyle = p.pop;
  ctx.beginPath();
  ctx.arc(W / 2, 250, 66, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.fillStyle = p.ink;
  ctx.font = `800 52px ${display}`;
  ctx.fillText(initials(badge.name), W / 2, 268);

  ctx.font = `800 50px ${display}`;
  ctx.fillText(badge.name, W / 2, 390);
  ctx.font = `500 30px ${body}`;
  ctx.fillStyle = p.inkSoft;
  ctx.fillText(badge.company, W / 2, 434);
  ctx.fillStyle = p.ink;
  ctx.font = `600 27px ${body}`;
  ctx.fillText(badge.host, W / 2, 476);
  ctx.fillText(badge.site, W / 2, 512);

  ctx.setLineDash([12, 12]);
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(40, 548);
  ctx.lineTo(W - 40, 548);
  ctx.stroke();
  ctx.setLineDash([]);

  // QR
  const q = 12;
  const ox = 40;
  const oy = 572;
  ctx.fillStyle = "#ffffff";
  roundRect(ctx, ox - 10, oy - 10, 11 * q + 20, 11 * q + 20, 12);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = p.ink;
  for (const [x, y] of qrCells(11, 11)) ctx.fillRect(ox + x * q, oy + y * q, q, q);
  for (const [fx, fy] of [[0, 0], [7, 0], [0, 7]]) {
    ctx.fillStyle = p.ink;
    ctx.fillRect(ox + fx * q, oy + fy * q, 4 * q, 4 * q);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(ox + fx * q + 8, oy + fy * q + 8, 4 * q - 16, 4 * q - 16);
    ctx.fillStyle = p.ink;
    ctx.fillRect(ox + fx * q + 16, oy + fy * q + 16, 4 * q - 32, 4 * q - 32);
  }

  ctx.textAlign = "left";
  ctx.fillStyle = p.ink;
  ctx.font = `800 30px ${display}`;
  ctx.fillText(badge.badgeId, 200, 604);
  ctx.font = `500 25px ${body}`;
  ctx.fillStyle = p.inkSoft;
  ctx.fillText(badge.valid, 200, 642);
  ctx.fillStyle = p.tint;
  roundRect(ctx, 200, 660, 270, 40, 20);
  ctx.fill();
  ctx.strokeStyle = p.ink;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = p.ink;
  ctx.font = `700 21px ${body}`;
  ctx.textAlign = "center";
  ctx.fillText(badge.escort, 335, 687);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function Lanyard({ color, side }: { color: string; side: 1 | -1 }) {
  const geom = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.22 * side, 1.95, -0.02),
      new THREE.Vector3(0.75 * side, 3.2, -0.25),
      new THREE.Vector3(1.05 * side, 4.6, -0.6),
      new THREE.Vector3(1.15 * side, 6.2, -0.9),
    ]);
    return new THREE.TubeGeometry(curve, 40, 0.07, 10, false);
  }, [side]);
  return (
    <mesh geometry={geom}>
      <meshToonMaterial color={color} gradientMap={getToonRamp()} />
    </mesh>
  );
}

function Badge({ badge, palette }: { badge: BadgeContent; palette: Palette }) {
  const group = useRef<THREE.Group>(null);
  const texture = useMemo(() => paintBadge(badge, palette), [badge, palette]);
  const ramp = getToonRamp();

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const targetY = state.pointer.x * 0.45 + Math.sin(t * 0.6) * 0.12;
    const targetX = -state.pointer.y * 0.2;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 3, delta);
    g.rotation.z = Math.sin(t * 0.8) * 0.04;
  });

  return (
    <group ref={group} position={[0, -0.35, 0]}>
      <Lanyard color={palette.pop} side={-1} />
      <Lanyard color={palette.pop} side={1} />
      {/* clip */}
      <RoundedBox args={[0.7, 0.42, 0.18]} radius={0.08} position={[0, 1.88, 0]}>
        <meshToonMaterial color={palette.accent} gradientMap={ramp} />
        <InkOutline t={0.035} color={palette.ink} />
      </RoundedBox>
      <mesh position={[0, 2.12, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.2, 0.05, 10, 28]} />
        <meshToonMaterial color={palette.tint} gradientMap={ramp} />
      </mesh>
      {/* card */}
      <RoundedBox args={[2.5, 3.6, 0.12]} radius={0.12} smoothness={4}>
        <meshToonMaterial color={palette.primary} gradientMap={ramp} />
        <InkOutline t={0.04} color={palette.ink} />
      </RoundedBox>
      <mesh position={[0, 0, 0.065]}>
        <planeGeometry args={[2.36, 3.4]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, -0.065]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2.3, 3.3]} />
        <meshToonMaterial color={palette.tint} gradientMap={ramp} />
      </mesh>
    </group>
  );
}

function Confetti({ palette }: { palette: Palette }) {
  const ramp = getToonRamp();
  return (
    <>
      <Float speed={2} rotationIntensity={2} floatIntensity={1.4} position={[-2.3, 1.4, -0.6]}>
        <mesh>
          <icosahedronGeometry args={[0.32, 0]} />
          <meshToonMaterial color={palette.accent} gradientMap={ramp} />
          <InkOutline t={0.03} color={palette.ink} />
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={1.5} floatIntensity={1.2} position={[2.3, -1.2, -0.4]}>
        <mesh rotation={[0.6, 0.4, 0]}>
          <torusGeometry args={[0.3, 0.12, 12, 30]} />
          <meshToonMaterial color={palette.pop} gradientMap={ramp} />
          <InkOutline t={0.03} color={palette.ink} />
        </mesh>
      </Float>
      <Float speed={2.4} rotationIntensity={1.8} floatIntensity={1.6} position={[2.1, 1.9, -1]}>
        <mesh>
          <coneGeometry args={[0.24, 0.48, 4]} />
          <meshToonMaterial color={palette.tint} gradientMap={ramp} />
          <InkOutline t={0.03} color={palette.ink} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={1} floatIntensity={1} position={[-2, -1.8, -0.2]}>
        <mesh>
          <sphereGeometry args={[0.2, 18, 18]} />
          <meshToonMaterial color={palette.primary} gradientMap={ramp} />
          <InkOutline t={0.03} color={palette.ink} />
        </mesh>
      </Float>
    </>
  );
}

export default function BadgeScene({ badge, active, onReady }: { badge: BadgeContent; active: boolean; onReady?: () => void }) {
  const [palette, setPalette] = useState<Palette | null>(null);

  useEffect(() => {
    let alive = true;
    // Wait for web fonts so the canvas texture uses the brand typefaces.
    document.fonts.ready.then(() => {
      if (alive) setPalette(readPalette());
    });
    return () => {
      alive = false;
    };
  }, []);

  if (!palette) return null;

  return (
    <Canvas
      flat
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 8.2], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <ambientLight intensity={1.6} />
      <directionalLight position={[3, 4, 6]} intensity={1.4} />
      <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.6}>
        <Badge badge={badge} palette={palette} />
      </Float>
      <Confetti palette={palette} />
    </Canvas>
  );
}
