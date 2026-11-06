import type { ReactNode } from "react";
import type { IconName } from "@/lib/types";

/**
 * AceVisitor cartoon icon set.
 * Hand-drawn feel: chunky ink outline, flat palette fills, a sticker blob behind,
 * and one small looping motion per icon (sped up on hover via `.icon-host`).
 */

type Tint = "accent" | "pop" | "tint" | "primary" | "accent-soft" | "pop-soft" | "paper" | "none";

const tintClass: Record<Exclude<Tint, "none">, string> = {
  accent: "fill-accent",
  pop: "fill-pop",
  tint: "fill-tint",
  primary: "fill-primary",
  "accent-soft": "fill-accent-soft",
  "pop-soft": "fill-pop-soft",
  paper: "fill-paper",
};

const defaultTint: Record<IconName, Tint> = {
  invite: "accent",
  qr: "pop",
  door: "tint",
  verify: "accent",
  sign: "pop",
  badge: "tint",
  phone: "accent",
  checkout: "pop",
  audit: "tint",
  kiosk: "accent",
  printer: "pop",
  bell: "tint",
  buildings: "accent",
  key: "pop",
  shield: "accent",
  layers: "pop",
  lock: "tint",
  gear: "accent",
  sliders: "pop",
  chart: "tint",
  desk: "pop",
  gate: "accent",
  cloud: "pop",
  chat: "accent",
  hardhat: "pop",
};

const glyphs: Record<IconName, ReactNode> = {
  invite: (
    <>
      <rect x="9" y="17" width="30" height="21" rx="3" className="fill-paper" />
      <path d="M9.5 19 24 30l14.5-11" className="fill-none" />
      <path d="M9.5 18.5 24 9l14.5 9.5Z" className="anim-part ic-flap fill-primary" />
      <circle cx="24" cy="29.5" r="3.4" className="fill-pop" />
    </>
  ),
  qr: (
    <>
      <rect x="11" y="11" width="26" height="26" rx="4" className="fill-paper" />
      <rect x="15" y="15" width="7" height="7" rx="1.5" className="fill-ink" />
      <rect x="26" y="15" width="7" height="7" rx="1.5" className="fill-ink" />
      <rect x="15" y="26" width="7" height="7" rx="1.5" className="fill-ink" />
      <path d="M27 27h2m2 0h2M27 31h6M29 33v0" className="fill-none" />
      <path d="M8 24h32" className="anim-part ic-scan fill-none stroke-primary" strokeWidth={3} />
    </>
  ),
  door: (
    <>
      <rect x="13" y="8" width="22" height="32" rx="2" className="fill-primary" />
      <rect x="15.5" y="10.5" width="17" height="29.5" rx="1" className="anim-part ic-door fill-accent" />
      <circle cx="29" cy="25" r="1.6" className="fill-ink" />
      <path d="M8 40h32" className="fill-none" />
    </>
  ),
  verify: (
    <>
      <rect x="8" y="13" width="32" height="22" rx="4" className="fill-paper" />
      <circle cx="17" cy="22" r="4" className="fill-primary" />
      <path d="M12 31c1.5-3 8.5-3 10 0M26 20h9M26 25h7M26 30h5" className="fill-none" />
      <path d="M6 24h36" className="anim-part ic-scan fill-none stroke-pop" strokeWidth={2.6} />
    </>
  ),
  sign: (
    <>
      <path d="M12 8h17l7 7v25H12Z" className="fill-paper" />
      <path d="M29 8v7h7" className="fill-none" />
      <path d="M15 31c3-6 5 2 7-2s3 3 6 0 3-1 5-1" className="ic-draw fill-none stroke-primary" />
      <g className="anim-part ic-bob">
        <path d="m31 13 6 6-11 11-6.5 1 1-6.5Z" className="fill-accent" />
        <path d="m29 15 6 6" className="fill-none" />
      </g>
    </>
  ),
  badge: (
    <>
      <path d="M18 4l6 8 6-8" className="fill-none stroke-primary" strokeWidth={3} />
      <g className="anim-part ic-swing">
        <rect x="21" y="9" width="6" height="5" rx="1.5" className="fill-accent" />
        <rect x="13" y="13" width="22" height="28" rx="4" className="fill-paper" />
        <rect x="20" y="16" width="8" height="2.4" rx="1.2" className="fill-ink" />
        <circle cx="24" cy="25" r="4" className="fill-pop" />
        <path d="M18 33h12M20 37h8" className="fill-none" />
      </g>
    </>
  ),
  phone: (
    <>
      <path d="M8 16c-2 3-2 6 0 9M40 16c2 3 2 6 0 9" className="fill-none stroke-primary" />
      <g className="anim-part ic-buzz">
        <rect x="15" y="7" width="18" height="34" rx="4" className="fill-ink" />
        <rect x="17.5" y="11" width="13" height="23" rx="2" className="fill-primary" stroke="none" />
        <path d="m20 23 3 3 5.5-6" className="fill-none stroke-paper" strokeWidth={2.8} />
        <circle cx="24" cy="37.5" r="1.2" className="fill-paper" stroke="none" />
      </g>
    </>
  ),
  checkout: (
    <>
      <rect x="9" y="8" width="18" height="32" rx="2" className="fill-paper" />
      <circle cx="22" cy="25" r="1.6" className="fill-ink" />
      <g className="anim-part ic-slide">
        <path d="M23 24h17" className="fill-none stroke-primary" strokeWidth={3.2} />
        <path d="m34 18 6 6-6 6" className="fill-none stroke-primary" strokeWidth={3.2} />
      </g>
    </>
  ),
  audit: (
    <>
      <rect x="11" y="9" width="26" height="32" rx="3" className="fill-paper" />
      <rect x="18" y="6" width="12" height="6" rx="2" className="fill-accent" />
      <path d="m15 20 2.5 2.5L22 18M15 30l2.5 2.5L22 28" className="fill-none stroke-primary" strokeWidth={2.6} />
      <path d="M26 21h7M26 31h7" className="fill-none" />
      <circle cx="35" cy="37" r="4.5" className="anim-part ic-pulse fill-pop" />
    </>
  ),
  kiosk: (
    <>
      <path d="M24 31v7M16 41h16" className="fill-none" />
      <path d="M24 5v4" className="fill-none" />
      <circle cx="24" cy="4.5" r="2" className="anim-part ic-pulse fill-pop" />
      <rect x="10" y="9" width="28" height="22" rx="6" className="fill-primary" />
      <rect x="14" y="13" width="20" height="14" rx="4" className="fill-paper" />
      <g className="anim-part ic-blink">
        <circle cx="20" cy="19.5" r="1.9" className="fill-ink" stroke="none" />
        <circle cx="28" cy="19.5" r="1.9" className="fill-ink" stroke="none" />
      </g>
      <path d="M21 23.5c1.7 1.4 4.3 1.4 6 0" className="fill-none" />
    </>
  ),
  printer: (
    <>
      <rect x="16" y="22" width="16" height="17" rx="2" className="anim-part ic-print fill-paper" />
      <rect x="8" y="14" width="32" height="14" rx="4" className="fill-primary" />
      <path d="M14 28h20" className="fill-none" />
      <circle cx="34" cy="19" r="1.6" className="fill-accent" />
      <path d="M20 34h8" className="fill-none" />
    </>
  ),
  bell: (
    <>
      <g className="anim-part ic-swing">
        <path d="M24 7v3" className="fill-none" />
        <path d="M14 31c2-3 2-6 2-10a8 8 0 0 1 16 0c0 4 0 7 2 10Z" className="fill-accent" />
        <circle cx="24" cy="35" r="3" className="fill-primary" />
      </g>
      <path d="M10 14c-2 3-2 6-1 9M38 14c2 3 2 6 1 9" className="fill-none stroke-primary" />
    </>
  ),
  buildings: (
    <>
      <rect x="8" y="22" width="11" height="18" rx="1.5" className="fill-paper" />
      <rect x="18" y="13" width="13" height="27" rx="1.5" className="fill-primary" />
      <rect x="30" y="25" width="10" height="15" rx="1.5" className="fill-paper" />
      <path d="M22 18h5M22 23h5M22 28h5" className="fill-none stroke-paper" strokeWidth={2} />
      <path d="M11.5 27h4M11.5 32h4M33 30h4" className="fill-none" strokeWidth={2} />
      <g className="anim-part ic-bob">
        <path d="M35 6a4 4 0 0 1 4 4c0 3-4 7-4 7s-4-4-4-7a4 4 0 0 1 4-4Z" className="fill-pop" />
      </g>
    </>
  ),
  key: (
    <g className="anim-part ic-swing">
      <circle cx="17" cy="17" r="8" className="fill-accent" />
      <circle cx="17" cy="17" r="2.6" className="fill-paper" />
      <path d="m22.5 22.5 15 15M31 31l3-3M35 35l3-3" className="fill-none" strokeWidth={3} />
    </g>
  ),
  shield: (
    <>
      <path d="M24 6 38 11v11c0 9-6 15-14 19-8-4-14-10-14-19V11Z" className="fill-primary" />
      <path d="m17.5 23.5 4.5 4.5 9-9.5" className="fill-none stroke-paper" strokeWidth={3.2} />
      <path d="M40 6v4M38 8h4" className="anim-part ic-pulse fill-none stroke-pop" />
    </>
  ),
  layers: (
    <>
      <path d="M24 30 8 23l16-7 16 7Z" className="fill-paper" />
      <path d="M24 36 8 29l3.5-1.6L24 33l12.5-5.6L40 29Z" className="fill-primary" />
      <g className="anim-part ic-bob">
        <path d="M24 22 8 15l16-7 16 7Z" className="fill-accent" />
      </g>
    </>
  ),
  lock: (
    <>
      <path d="M16 21v-5a8 8 0 0 1 16 0v5" className="anim-part ic-bob fill-none" strokeWidth={3} />
      <rect x="11" y="21" width="26" height="19" rx="4" className="fill-accent" />
      <circle cx="24" cy="29" r="2.6" className="fill-ink" />
      <path d="M24 31v4" className="fill-none" />
    </>
  ),
  gear: (
    <>
      <g className="anim-part ic-spin">
        <circle cx="21" cy="22" r="10" className="fill-none" strokeWidth={6} strokeDasharray="3.9 3.95" />
        <circle cx="21" cy="22" r="9" className="fill-primary" />
        <circle cx="21" cy="22" r="3.5" className="fill-paper" />
      </g>
      <circle cx="36" cy="36" r="5" className="fill-accent" />
      <circle cx="36" cy="36" r="1.6" className="fill-ink" stroke="none" />
    </>
  ),
  sliders: (
    <>
      <path d="M10 14h28M10 24h28M10 34h28" className="fill-none" />
      <circle cx="18" cy="14" r="4" className="anim-part ic-slide fill-accent" />
      <circle cx="30" cy="24" r="4" className="anim-part ic-slide fill-primary" style={{ animationDelay: "-0.5s" }} />
      <circle cx="21" cy="34" r="4" className="anim-part ic-slide fill-pop" style={{ animationDelay: "-1s" }} />
    </>
  ),
  chart: (
    <>
      <path d="M9 40h30" className="fill-none" />
      <rect x="12" y="26" width="6" height="14" rx="1.5" className="anim-part ic-bob origin-bottom fill-paper" />
      <rect x="21" y="18" width="6" height="22" rx="1.5" className="anim-part ic-bob origin-bottom fill-primary" style={{ animationDelay: "-0.6s" }} />
      <rect x="30" y="11" width="6" height="29" rx="1.5" className="anim-part ic-bob origin-bottom fill-accent" style={{ animationDelay: "-1.2s" }} />
    </>
  ),
  desk: (
    <>
      <path d="M6 24h36v6H6Z" className="fill-primary" />
      <path d="M9 30h30v10H9Z" className="fill-paper" />
      <g className="anim-part ic-bob">
        <path d="M17 20a7 7 0 0 1 14 0Z" className="fill-accent" />
        <path d="M24 10v3M15 22h18" className="fill-none" />
      </g>
    </>
  ),
  gate: (
    <>
      <rect x="8" y="18" width="7" height="22" rx="1.5" className="fill-primary" />
      <g className="anim-part ic-swing" style={{ transformOrigin: "0% 50%" }}>
        <rect x="14" y="19" width="27" height="5" rx="2.5" className="fill-paper" />
        <path d="M21 19v5M28 19v5M35 19v5" className="fill-none stroke-pop" strokeWidth={3} />
      </g>
      <circle cx="11.5" cy="14" r="2.5" className="anim-part ic-pulse fill-accent" />
      <path d="M6 40h36" className="fill-none" />
    </>
  ),
  cloud: (
    <>
      <path d="M14 33a7 7 0 0 1 0-14 10 10 0 0 1 19-2 8 8 0 0 1 1 16Z" className="anim-part ic-bob fill-paper" />
      <path d="M18 39v3M24 37v5M30 39v3" className="ic-dash fill-none stroke-primary" />
    </>
  ),
  chat: (
    <>
      <path d="M9 12h30v20H22l-8 7v-7H9Z" className="fill-primary" />
      <circle cx="17" cy="22" r="2" className="anim-part ic-pulse fill-paper" stroke="none" />
      <circle cx="24" cy="22" r="2" className="anim-part ic-pulse fill-paper" stroke="none" style={{ animationDelay: "0.3s" }} />
      <circle cx="31" cy="22" r="2" className="anim-part ic-pulse fill-paper" stroke="none" style={{ animationDelay: "0.6s" }} />
    </>
  ),
  hardhat: (
    <>
      <path d="M13 40c0-6 5-10 11-10s11 4 11 10Z" className="fill-primary" />
      <circle cx="24" cy="24" r="6" className="fill-skin-mid" />
      <g className="anim-part ic-bob">
        <path d="M11 21a13 13 0 0 1 26 0Z" className="fill-accent" />
        <path d="M8 21h32" className="fill-none" strokeWidth={3} />
        <path d="M24 8v8" className="fill-none" />
      </g>
    </>
  ),
};

const blobs = [
  "M25 6c10 0 18 7 18 18s-9 19-19 19S5 36 5 25 15 6 25 6Z",
  "M23 5c11-1 20 8 19 19s-8 18-19 18S5 35 6 23 12 6 23 5Z",
  "M26 7c9 1 17 9 16 19s-10 17-19 16S6 34 6 24 16 6 26 7Z",
];

export interface IconProps {
  name: IconName;
  size?: number;
  tint?: Tint;
  className?: string;
  /** When set the icon is announced; otherwise it is decorative. */
  label?: string;
}

export function Icon({ name, size = 48, tint, className = "", label }: IconProps) {
  const t = tint ?? defaultTint[name];
  const blob = blobs[name.length % blobs.length];
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={`av-icon shrink-0 overflow-visible ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {t !== "none" && <path d={blob} className={tintClass[t]} />}
      <g strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="stroke-ink">
        {glyphs[name]}
      </g>
    </svg>
  );
}
