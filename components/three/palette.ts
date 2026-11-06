"use client";

import * as THREE from "three";

/** Read colour tokens from globals.css so the 3D scenes follow the CMS theme. */
export function readPalette() {
  const css = getComputedStyle(document.documentElement);
  const get = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
  return {
    ink: get("--ink", "#2a1b33"),
    primary: get("--primary", "#7b2d8e"),
    accent: get("--accent", "#ff9f45"),
    pop: get("--pop", "#4fb3e8"),
    paper: get("--paper", "#fff8f1"),
    tint: get("--tint", "#f3eafb"),
    inkSoft: get("--ink-soft", "#54465e"),
    accentSoft: get("--accent-soft", "#ffe8d1"),
    success: get("--success", "#1f8a5b"),
    display: get("--font-display", "sans-serif"),
    body: get("--font-body", "sans-serif"),
  };
}

export type Palette = ReturnType<typeof readPalette>;

let toonRamp: THREE.DataTexture | null = null;

/** Three-step ramp that gives MeshToonMaterial its flat, printed look. */
export function getToonRamp() {
  if (toonRamp) return toonRamp;
  const data = new Uint8Array([150, 150, 150, 255, 215, 215, 215, 255, 255, 255, 255, 255]);
  toonRamp = new THREE.DataTexture(data, 3, 1, THREE.RGBAFormat);
  toonRamp.minFilter = THREE.NearestFilter;
  toonRamp.magFilter = THREE.NearestFilter;
  toonRamp.needsUpdate = true;
  return toonRamp;
}
