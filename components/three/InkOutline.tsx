"use client";

import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Cartoon ink outline (inverted hull). Place inside a <mesh> whose geometry is centred;
 * it reuses the parent geometry, scales it out by `t` world units and renders back faces.
 */
export function InkOutline({ t = 0.035, color }: { t?: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useLayoutEffect(() => {
    const hull = ref.current;
    const parent = hull?.parent as THREE.Mesh | null;
    if (!hull || !parent?.geometry) return;
    const geo = parent.geometry;
    hull.geometry = geo;
    geo.computeBoundingBox();
    const size = new THREE.Vector3();
    geo.boundingBox!.getSize(size);
    hull.scale.set(
      size.x > 0 ? (size.x + 2 * t) / size.x : 1,
      size.y > 0 ? (size.y + 2 * t) / size.y : 1,
      size.z > 0 ? (size.z + 2 * t) / size.z : 1,
    );
  });

  return (
    <mesh ref={ref} raycast={() => null}>
      <meshBasicMaterial color={color} side={THREE.BackSide} />
    </mesh>
  );
}
