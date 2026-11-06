"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { ShieldArt } from "@/components/art/PageArt";
import { useCan3D, useInView } from "@/lib/hooks/useMotion";

const ShieldScene = dynamic(() => import("./ShieldScene"), { ssr: false });

/** 3D shield on capable devices; flat SVG shield on mobile, low-end or reduced motion. */
export function Shield3D({ label }: { label: string }) {
  const can3D = useCan3D();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [ready, setReady] = useState(false);
  const show3D = can3D && ready;

  return (
    <div ref={ref} className="relative aspect-square w-full">
      <div className={`absolute inset-0 transition-opacity duration-500 ${show3D ? "opacity-0" : "opacity-100"}`}>
        <ShieldArt label={label} />
      </div>
      {can3D && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${show3D ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
          <ShieldScene active={inView} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
