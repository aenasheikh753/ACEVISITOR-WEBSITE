"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { getGsap, MOTION_OK } from "@/lib/gsap";
import type { StepContent } from "@/lib/types";

interface Geo {
  w: number;
  h: number;
  d: string;
}

/** Build a hand-drawn road through the measured stop markers. */
function buildPath(pts: [number, number][], width: number) {
  if (pts.length < 2) return "";
  const multi = pts.some((p) => Math.abs(p[0] - pts[0][0]) > 24);
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    if (Math.abs(y1 - y0) < 12) {
      const mx = (x0 + x1) / 2;
      d += ` Q${mx.toFixed(1)} ${(y0 + (i % 2 ? -16 : 16)).toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
    } else if (multi && Math.abs(x1 - x0) < 24) {
      // Row turn: swing outside the column so the road never crosses copy.
      const col = Math.abs(pts[1][0] - pts[0][0]) || width / 3;
      const dir = x0 > width / 2 ? 1 : -1;
      const b = ((col / 2 + 26) / 0.75) * dir;
      d += ` C${(x0 + b).toFixed(1)} ${y0.toFixed(1)} ${(x1 + b).toFixed(1)} ${y1.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
    } else {
      const my = (y0 + y1) / 2;
      const s = i % 2 ? 16 : -16;
      d += ` C${(x0 + s).toFixed(1)} ${my.toFixed(1)} ${(x1 - s).toFixed(1)} ${my.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
    }
  }
  return d;
}

export function JourneyRoad({ steps }: { steps: StepContent[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const road = useRef<SVGPathElement>(null);
  const reveal = useRef<SVGPathElement>(null);
  const walker = useRef<SVGGElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const box = el.getBoundingClientRect();
      const pts = Array.from(el.querySelectorAll<HTMLElement>("[data-stop]")).map((m) => {
        const r = m.getBoundingClientRect();
        return [r.left + r.width / 2 - box.left, r.top + r.height / 2 - box.top] as [number, number];
      });
      const d = buildPath(pts, box.width);
      setGeo((g) => (g && g.d === d ? g : { w: box.width, h: box.height, d }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!geo || !wrap.current || !road.current || !reveal.current || !walker.current) return;
    const { gsap, ScrollTrigger } = getGsap();
    const el = wrap.current;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const st = { trigger: el, start: "top 72%", end: "bottom 62%", scrub: 0.6 };
      gsap.fromTo(reveal.current, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: st });
      gsap.set(walker.current, { opacity: 1 });
      gsap.to(walker.current, {
        ease: "none",
        motionPath: { path: road.current!, align: road.current!, alignOrigin: [0.5, 0.5] },
        scrollTrigger: st,
      });
      el.querySelectorAll<HTMLElement>("[data-stop]").forEach((stop) => {
        ScrollTrigger.create({
          trigger: stop,
          start: "top 68%",
          onEnter: () => stop.classList.add("is-lit"),
          onLeaveBack: () => stop.classList.remove("is-lit"),
        });
      });
      ScrollTrigger.refresh();
    });
    return () => mm.revert();
  }, [geo]);

  return (
    <div ref={wrap} className="relative lg:px-16">
      {geo && (
        <svg
          className="pointer-events-none absolute inset-0 overflow-visible"
          width={geo.w}
          height={geo.h}
          viewBox={`0 0 ${geo.w} ${geo.h}`}
          aria-hidden="true"
        >
          <defs>
            <mask id="journey-reveal" maskUnits="userSpaceOnUse" x={-200} y={-50} width={geo.w + 400} height={geo.h + 100}>
              <path ref={reveal} d={geo.d} pathLength={1} fill="none" stroke="#fff" strokeWidth={40} strokeLinecap="round" strokeDasharray={1} strokeDashoffset={0} />
            </mask>
          </defs>
          <path d={geo.d} fill="none" stroke="var(--paper)" strokeWidth={22} strokeLinecap="round" opacity={0.9} />
          <g mask="url(#journey-reveal)">
            <path ref={road} d={geo.d} fill="none" stroke="var(--ink)" strokeWidth={22} strokeLinecap="round" />
            <path d={geo.d} fill="none" stroke="var(--accent)" strokeWidth={3} strokeDasharray="12 12" strokeLinecap="round" />
          </g>
          <g ref={walker} opacity={0}>
            <g transform="translate(-17 -22)">
              <path d="M10 2 17 10l7-8" fill="none" stroke="var(--pop)" strokeWidth={3} strokeLinecap="round" />
              <rect x="3" y="8" width="28" height="34" rx="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth={2.5} />
              <rect x="3" y="8" width="28" height="11" rx="5" fill="var(--primary)" />
              <circle cx="12" cy="27" r="2.4" fill="var(--ink)" />
              <circle cx="22" cy="27" r="2.4" fill="var(--ink)" />
              <path d="M13 33c2.4 2 5.6 2 8 0" fill="none" stroke="var(--ink)" strokeWidth={2} strokeLinecap="round" />
            </g>
          </g>
        </svg>
      )}

      <ol className="relative grid gap-x-10 gap-y-10 lg:grid-cols-3 lg:gap-y-16">
        {steps.map((step, i) => {
          const row = Math.floor(i / 3);
          const col = row % 2 === 0 ? i % 3 : 2 - (i % 3);
          return (
            <li
              key={step.number}
              className="icon-host flex items-start gap-5 lg:flex-col lg:items-center lg:text-center lg:[grid-column:var(--c)] lg:[grid-row:var(--r)]"
              style={{ "--r": row + 1, "--c": col + 1 } as React.CSSProperties}
            >
              <span
                data-stop
                className="journey-stop relative z-10 grid size-[60px] shrink-0 place-items-center rounded-full border-[3px] border-ink bg-paper font-display text-xl font-extrabold"
              >
                {step.number}
              </span>
              <div className="pt-1 lg:max-w-[18rem] lg:pt-0">
                <div className="flex items-center gap-3 lg:justify-center">
                  <Icon name={step.icon} size={44} />
                  <h3 className="text-[1.45rem] font-bold">{step.title}</h3>
                </div>
                <p className="mt-2 text-ink-soft">{step.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
