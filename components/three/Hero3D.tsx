"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { BadgeArt } from "@/components/art/BadgeArt";
import { useCan3D, useInView } from "@/lib/hooks/useMotion";
import type { BadgeContent } from "@/lib/types";

const BadgeScene = dynamic(() => import("./BadgeScene"), { ssr: false });

/**
 * Hero visual: a floating 3D visitor badge on capable devices, the flat SVG badge
 * everywhere else (mobile, low-end hardware, reduced motion, no WebGL).
 */
export function Hero3D({ badge, label }: { badge: BadgeContent; label: string }) {
  const can3D = useCan3D();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [ready, setReady] = useState(false);
  const show3D = can3D && ready;

  return (
    <div ref={ref} className="relative h-full w-full">
      <BadgeArt
        badge={badge}
        label={label}
        className={`absolute inset-0 m-auto h-full w-full transition-opacity duration-500 ${show3D ? "opacity-0" : "opacity-100"}`}
      />
      {can3D && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${show3D ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
          <BadgeScene badge={badge} active={inView} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
