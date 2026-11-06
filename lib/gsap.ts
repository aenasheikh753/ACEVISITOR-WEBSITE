"use client";

import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

/** Animations always run; only parallax checks REDUCED_MOTION to tone itself down. */
export const MOTION_OK = "all";
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
