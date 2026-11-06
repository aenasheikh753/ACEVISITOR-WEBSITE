"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

function subscribeMedia(query: string) {
  return (cb: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  };
}

let webglSupport: boolean | null = null;
function hasWebGL() {
  if (webglSupport !== null) return webglSupport;
  try {
    const c = document.createElement("canvas");
    webglSupport = !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

// 3D is skipped on phones (flat SVG instead); it runs regardless of reduced-motion.
const QUERY = "(max-width: 767px)";
const subscribe3D = subscribeMedia(QUERY);

function snapshot3D() {
  if (window.matchMedia(QUERY).matches) return false;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  if (cores < 4 || memory < 4) return false;
  return hasWebGL();
}

/**
 * True only on capable desktop/tablet devices without reduced motion.
 * Server render and first paint always get `false`, so the SVG fallback shows first.
 */
export function useCan3D() {
  return useSyncExternalStore(subscribe3D, snapshot3D, () => false);
}

/** Becomes true once the element has scrolled near the viewport (and stays true). */
export function useNearViewport<T extends Element>(ref: React.RefObject<T | null>, rootMargin = "300px") {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, near]);
  return near;
}

/** Tracks whether an element is currently visible (used to pause 3D render loops). */
export function useInView<T extends Element>(ref: React.RefObject<T | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => setInView(entries[0]?.isIntersecting ?? false));
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return inView;
}
