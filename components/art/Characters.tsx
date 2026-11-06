/**
 * Shared cartoon cast. All parts are plain SVG <g> groups so scenes can
 * position them with a transform. Colours come from Tailwind tokens.
 */

type Fill =
  | "fill-primary"
  | "fill-accent"
  | "fill-pop"
  | "fill-tint"
  | "fill-paper"
  | "fill-ink"
  | "fill-accent-soft"
  | "fill-pop-soft";

type Skin = "fill-skin-light" | "fill-skin-mid" | "fill-skin-deep";
type Hair = "short" | "bun" | "long" | "curly" | "cap";
type Pose = "down" | "wave" | "hold" | "phone";
type Prop = "none" | "badge" | "headset" | "lanyard";

export interface PersonProps {
  x?: number;
  y?: number;
  scale?: number;
  skin?: Skin;
  hair?: Hair;
  shirt?: Fill;
  pants?: Fill;
  pose?: Pose;
  prop?: Prop;
  flip?: boolean;
  /** Draw from the waist up only (for people behind desks). */
  half?: boolean;
  className?: string;
}

const O = { stroke: "var(--ink)", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Arm({ d, shirt, hand, skin, className = "" }: { d: string; shirt: Fill; hand: [number, number]; skin: Skin; className?: string }) {
  return (
    <g className={className}>
      <path d={d} fill="none" stroke="var(--ink)" strokeWidth={15} strokeLinecap="round" />
      <path d={d} fill="none" className={shirt.replace("fill-", "stroke-")} strokeWidth={10} strokeLinecap="round" />
      <circle cx={hand[0]} cy={hand[1]} r={6.5} className={skin} {...O} />
    </g>
  );
}

export function Person({
  x = 0,
  y = 0,
  scale = 1,
  skin = "fill-skin-light",
  hair = "short",
  shirt = "fill-primary",
  pants = "fill-ink",
  pose = "down",
  prop = "none",
  flip = false,
  half = false,
  className = "",
}: PersonProps) {
  const sx = flip ? -scale : scale;
  return (
    <g transform={`translate(${x} ${y}) scale(${sx} ${scale})`} className={className}>
      {!half && (
        <>
          <ellipse cx="0" cy="2" rx="30" ry="5" className="fill-ink" opacity={0.12} />
          <path d="M-17 -52v48M17 -52v48" stroke="var(--ink)" strokeWidth={15} strokeLinecap="round" />
          <path d="M-17 -52v46M17 -52v46" className={pants.replace("fill-", "stroke-")} strokeWidth={10} strokeLinecap="round" />
          <path d="M-27 0h16M11 0h16" stroke="var(--ink)" strokeWidth={7} strokeLinecap="round" />
        </>
      )}

      {/* back hair */}
      {hair === "long" && <path d="M-21 -128c-4 20-2 34 2 42h38c4-8 6-22 2-42Z" className="fill-ink" {...O} />}

      {/* torso */}
      <path d="M-29 -48v-40a22 22 0 0 1 22-22h14a22 22 0 0 1 22 22v40Z" className={shirt} {...O} />
      <path d="M-6 -110 0 -100l6-10" fill="none" {...O} />
      {prop === "lanyard" || prop === "badge" ? (
        <g>
          <path d="M-9 -108 0 -82l9-26" fill="none" className="stroke-accent" strokeWidth={3} />
          <rect x="-8" y="-84" width="16" height="20" rx="3" className="fill-paper" {...O} strokeWidth={2} />
          <rect x="-4" y="-80" width="8" height="2.5" rx="1" className="fill-primary" />
          <circle cx="0" cy="-72" r="3" className="fill-pop" />
        </g>
      ) : null}

      {/* neck + head */}
      <rect x="-6" y="-118" width="12" height="10" className={skin} {...O} />
      <circle cx="0" cy="-134" r="19" className={skin} {...O} />
      <circle cx="-11" cy="-128" r="3.4" className="fill-accent" opacity={0.75} />
      <circle cx="11" cy="-128" r="3.4" className="fill-accent" opacity={0.75} />
      <g className="art-blink">
        <circle cx="-6.5" cy="-135" r="2.3" className="fill-ink" />
        <circle cx="6.5" cy="-135" r="2.3" className="fill-ink" />
      </g>
      <path d="M-5 -126c2.8 2.6 7.2 2.6 10 0" fill="none" {...O} strokeWidth={2.2} />

      {/* hair */}
      {hair === "short" && <path d="M-19 -136c-2-14 8-22 20-21 12 0 20 9 18 21-6-6-14-9-24-8-6 1-10 4-14 8Z" className="fill-ink" {...O} />}
      {hair === "bun" && (
        <>
          <circle cx="0" cy="-160" r="8" className="fill-ink" {...O} />
          <path d="M-19 -134c-1-15 8-23 19-23s20 8 19 23c-5-9-12-13-19-13s-14 4-19 13Z" className="fill-ink" {...O} />
        </>
      )}
      {hair === "long" && <path d="M-20 -132c-1-16 9-25 20-25s21 9 20 25c-8-4-12-10-14-15-6 8-16 13-26 15Z" className="fill-ink" {...O} />}
      {hair === "curly" && (
        <path d="M-20 -134c-6-6-1-16 6-15 0-8 10-12 15-6 5-6 15-3 15 5 8 0 11 10 4 16-3-6-9-9-14-8-7 1-14 2-20 0-3 2-5 5-6 8Z" className="fill-ink" {...O} />
      )}
      {hair === "cap" && (
        <>
          <path d="M-20 -138c0-14 9-21 20-21s20 7 20 21Z" className="fill-primary" {...O} />
          <path d="M-4 -139h30" {...O} strokeWidth={4} />
          <circle cx="0" cy="-149" r="3" className="fill-accent" />
        </>
      )}
      {prop === "headset" && (
        <g fill="none" {...O}>
          <path d="M-20 -136a20 20 0 0 1 40 0" strokeWidth={3} />
          <rect x="-24" y="-140" width="7" height="12" rx="3" className="fill-accent" />
          <path d="M-20 -128c0 8 6 10 12 10" />
        </g>
      )}

      {/* arms */}
      <Arm d="M-24 -98c-6 14-8 28-6 40" hand={[-30, -56]} shirt={shirt} skin={skin} />
      {pose === "down" && <Arm d="M24 -98c6 14 8 28 6 40" hand={[30, -56]} shirt={shirt} skin={skin} />}
      {pose === "wave" && <Arm d="M24 -98c12-8 18-22 18-38" hand={[42, -140]} shirt={shirt} skin={skin} className="art-wave" />}
      {pose === "hold" && <Arm d="M24 -98c8 10 18 18 34 20" hand={[60, -78]} shirt={shirt} skin={skin} />}
      {pose === "phone" && (
        <g>
          <Arm d="M24 -98c8 12 6 24-6 30" hand={[16, -70]} shirt={shirt} skin={skin} />
          <rect x="6" y="-96" width="16" height="26" rx="3" className="fill-ink" {...O} strokeWidth={2} />
          <rect x="9" y="-92" width="10" height="16" rx="1.5" className="fill-primary" />
        </g>
      )}
    </g>
  );
}

export interface KikoProps {
  x?: number;
  y?: number;
  scale?: number;
  wave?: boolean;
  holdBadge?: boolean;
  screenText?: string;
  className?: string;
}

/**
 * Kiko, the AceVisitor kiosk robot. Local origin is the bottom centre of the stand;
 * total height ~250 units.
 */
export function Kiko({ x = 0, y = 0, scale = 1, wave = true, holdBadge = false, className = "" }: KikoProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className={className}>
      <ellipse cx="0" cy="2" rx="52" ry="7" className="fill-ink" opacity={0.12} />
      {/* stand */}
      <path d="M-34 0h68l-10-18h-48Z" className="fill-ink" {...O} />
      <rect x="-8" y="-62" width="16" height="46" className="fill-paper" {...O} />
      {/* body */}
      <rect x="-42" y="-128" width="84" height="70" rx="20" className="fill-primary" {...O} />
      <rect x="-26" y="-114" width="52" height="30" rx="8" className="fill-paper" {...O} />
      <g className="ic-print anim-part">
        <rect x="-14" y="-106" width="28" height="7" rx="2" className="fill-accent" />
      </g>
      <circle cx="-22" cy="-70" r="4" className="fill-accent" {...O} strokeWidth={2} />
      <circle cx="-8" cy="-70" r="4" className="fill-pop" {...O} strokeWidth={2} />
      {/* arms */}
      <g className={wave ? "art-wave" : undefined}>
        <path d="M40 -112c18-6 26-20 26-36" fill="none" stroke="var(--ink)" strokeWidth={13} strokeLinecap="round" />
        <path d="M40 -112c18-6 26-20 26-36" fill="none" className="stroke-tint" strokeWidth={8} strokeLinecap="round" />
        <circle cx="66" cy="-152" r="9" className="fill-accent" {...O} />
      </g>
      <path d="M-40 -110c-16 4-24 14-26 26" fill="none" stroke="var(--ink)" strokeWidth={13} strokeLinecap="round" />
      <path d="M-40 -110c-16 4-24 14-26 26" fill="none" className="stroke-tint" strokeWidth={8} strokeLinecap="round" />
      {holdBadge ? (
        <g transform="translate(-74 -88) rotate(-10)">
          <path d="M8 -14 14 0l6-14" fill="none" className="stroke-pop" strokeWidth={3} />
          <rect x="0" y="-2" width="28" height="36" rx="5" className="fill-paper" {...O} />
          <rect x="9" y="3" width="10" height="3" rx="1.5" className="fill-ink" />
          <circle cx="14" cy="15" r="5" className="fill-primary" />
          <path d="M7 25h14M9 29h10" fill="none" {...O} strokeWidth={1.8} />
        </g>
      ) : (
        <circle cx="-66" cy="-82" r="9" className="fill-accent" {...O} />
      )}
      {/* neck */}
      <rect x="-10" y="-140" width="20" height="14" rx="4" className="fill-tint" {...O} />
      {/* head: tablet */}
      <rect x="-62" y="-232" width="124" height="94" rx="26" className="fill-ink" {...O} />
      <rect x="-50" y="-220" width="100" height="70" rx="18" className="fill-tint" />
      <g className="art-blink">
        <rect x="-28" y="-200" width="14" height="22" rx="7" className="fill-ink" />
        <rect x="14" y="-200" width="14" height="22" rx="7" className="fill-ink" />
        <circle cx="-19" cy="-194" r="3" className="fill-paper" />
        <circle cx="23" cy="-194" r="3" className="fill-paper" />
      </g>
      <circle cx="-36" cy="-170" r="6" className="fill-accent" opacity={0.85} />
      <circle cx="36" cy="-170" r="6" className="fill-accent" opacity={0.85} />
      <path d="M-12 -170c6 7 18 7 24 0" fill="none" {...O} strokeWidth={3} />
      {/* antenna */}
      <path d="M0 -232v-18" fill="none" {...O} strokeWidth={3} />
      <circle cx="0" cy="-254" r="7" className="fill-accent ic-pulse anim-part" {...O} />
    </g>
  );
}

/** A small potted plant to soften interior scenes. */
export function Plant({ x = 0, y = 0, scale = 1 }: { x?: number; y?: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-10 -40c-14-10-20-26-14-38 10 6 16 20 14 38ZM10 -40c14-10 20-26 14-38-10 6-16 20-14 38ZM0 -44c-6-16-4-34 4-44 6 12 4 30-4 44Z" className="fill-success" {...O} />
      <path d="M-16 -40h32l-5 40h-22Z" className="fill-pop" {...O} />
    </g>
  );
}
