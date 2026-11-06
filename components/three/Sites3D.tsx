"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { SitesArt } from "@/components/art/Scenes";
import { useCan3D, useInView, useNearViewport } from "@/lib/hooks/useMotion";

const SitesScene = dynamic(() => import("./SitesScene"), { ssr: false });

/** Rotating 3D campus of sites; loads only when scrolled near, flat SVG otherwise. */
export function Sites3D({ label }: { label: string }) {
  const can3D = useCan3D();
  const ref = useRef<HTMLDivElement>(null);
  const near = useNearViewport(ref);
  const inView = useInView(ref);
  const [ready, setReady] = useState(false);
  const show3D = can3D && ready;

  return (
    <div ref={ref} className="relative aspect-[520/460] w-full">
      <div className={`absolute inset-0 transition-opacity duration-500 ${show3D ? "opacity-0" : "opacity-100"}`}>
        <SitesArt label={label} />
      </div>
      {can3D && near && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${show3D ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
          <SitesScene active={inView} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
