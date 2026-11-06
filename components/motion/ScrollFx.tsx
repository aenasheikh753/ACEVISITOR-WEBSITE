"use client";

import { useEffect } from "react";
import { getGsap, MOTION_OK, REDUCED_MOTION } from "@/lib/gsap";

/**
 * One small controller that wires declarative `data-fx` hooks inside server-rendered
 * markup to GSAP + ScrollTrigger. Nothing is hidden without JS. Everything runs for
 * every visitor; only scroll-linked parallax is skipped under prefers-reduced-motion.
 *
 *  data-fx="draw"      stroke paths with pathLength=1 draw in when visible
 *  data-fx="stamp"     element thumps in like a rubber stamp
 *  data-fx="slide"     slides in from data-from="left|right|bottom"
 *  data-fx="parallax"  drifts with scroll; data-speed (px over the section)
 *  data-fx="stagger"   children with [data-fx-item] pop in one after another
 */
export function ScrollFx() {
  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const reduced = window.matchMedia(REDUCED_MOTION).matches;
      gsap.utils.toArray<SVGPathElement>('[data-fx="draw"]').forEach((el) => {
        gsap.fromTo(
          el,
          { strokeDasharray: 1, strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: Number(el.dataset.duration ?? 1.2),
            delay: Number(el.dataset.delay ?? 0),
            ease: "power2.inOut",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-fx="stamp"]').forEach((el, i) => {
        gsap.from(el, {
          scale: 1.5,
          rotate: -14,
          opacity: 0,
          duration: 0.55,
          delay: Number(el.dataset.delay ?? i * 0.08),
          ease: "back.out(2.2)",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-fx="slide"]').forEach((el) => {
        const from = el.dataset.from ?? "left";
        const x = from === "left" ? -70 : from === "right" ? 70 : 0;
        const y = from === "bottom" ? 60 : 0;
        gsap.from(el, {
          x,
          y,
          rotate: from === "bottom" ? 0 : x > 0 ? 4 : -4,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-fx="parallax"]').forEach((el) => {
        if (reduced) return;
        const speed = Number(el.dataset.speed ?? 40);
        gsap.fromTo(
          el,
          { y: speed },
          {
            y: -speed,
            ease: "none",
            scrollTrigger: { trigger: el.closest("section") ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-fx="stagger"]').forEach((el) => {
        const items = el.querySelectorAll("[data-fx-item]");
        gsap.from(items, {
          y: 18,
          scale: 0.92,
          opacity: 0,
          duration: 0.5,
          stagger: 0.09,
          ease: "back.out(1.8)",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
      });

      ScrollTrigger.refresh();
    });

    return () => mm.revert();
  }, []);

  return null;
}
