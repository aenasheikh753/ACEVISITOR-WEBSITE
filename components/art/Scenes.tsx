import { Kiko, Person, Plant } from "./Characters";

const O = { stroke: "var(--ink)", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const display = { fontFamily: "var(--font-display)" };

function Tag({ x, y, w = 96, text, tone = "fill-paper", tilt = 0 }: { x: number; y: number; w?: number; text: string; tone?: string; tilt?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${tilt})`}>
      <rect x={-w / 2} y={-15} width={w} height={30} rx={8} className={tone} {...O} strokeWidth={2.2} />
      <text y={5.5} textAnchor="middle" className="fill-ink" style={display} fontSize={15} fontWeight={700}>
        {text}
      </text>
    </g>
  );
}

function Laptop({ x, y, scale = 1, children }: { x: number; y: number; scale?: number; children?: React.ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="170" height="108" rx="10" className="fill-ink" {...O} />
      <rect x="9" y="9" width="152" height="90" rx="5" className="fill-paper" />
      {children ?? (
        <g>
          <rect x="9" y="9" width="152" height="16" className="fill-primary" />
          <rect x="18" y="34" width="38" height="22" rx="4" className="fill-tint" {...O} strokeWidth={1.6} />
          <rect x="64" y="34" width="38" height="22" rx="4" className="fill-accent-soft" {...O} strokeWidth={1.6} />
          <rect x="110" y="34" width="38" height="22" rx="4" className="fill-pop-soft" {...O} strokeWidth={1.6} />
          {[64, 76, 88].map((ry, i) => (
            <g key={ry}>
              <circle cx="22" cy={ry} r="3.4" className={["fill-success", "fill-accent", "fill-pop"][i]} />
              <path d={`M30 ${ry}h60M110 ${ry}h30`} {...O} strokeWidth={2} />
            </g>
          ))}
        </g>
      )}
      <path d="M-16 108h202l-10 14H-6Z" className="fill-tint" {...O} />
    </g>
  );
}

function Phone({ x, y, scale = 1, rotate = 0, check = true }: { x: number; y: number; scale?: number; rotate?: number; check?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <rect x="0" y="0" width="64" height="112" rx="13" className="fill-ink" {...O} />
      <rect x="6" y="12" width="52" height="86" rx="6" className="fill-primary" />
      {check && (
        <>
          <circle cx="32" cy="46" r="16" className="fill-accent" {...O} />
          <path d="m24 46 6 6 10-11" fill="none" {...O} strokeWidth={3} />
          <rect x="14" y="72" width="16" height="12" rx="4" className="fill-success" />
          <rect x="34" y="72" width="16" height="12" rx="4" className="fill-paper" />
        </>
      )}
    </g>
  );
}

/* ---------------- Connected platform ---------------- */

export function PlatformArt({ label, nodes }: { label: string; nodes: { console: string; kiosk: string; phone: string; printer: string; cloud: string } }) {
  const links = [
    "M262 146C200 150 132 168 104 196",
    "M268 152C240 220 206 280 196 318",
    "M300 152C330 220 366 262 380 304",
    "M312 142C380 146 446 166 470 196",
  ];
  return (
    <svg viewBox="0 0 560 500" className="h-auto w-full" role="img" aria-label={label}>
      <ellipse cx="280" cy="300" rx="250" ry="180" fill="none" stroke="var(--ink)" strokeOpacity={0.14} strokeWidth={2} strokeDasharray="3 9" />
      {links.map((d, i) => (
        <g key={d}>
          <path d={d} fill="none" className="stroke-primary art-dash" strokeWidth={3} strokeLinecap="round" />
          <circle r="6" className="fill-accent" stroke="var(--ink)" strokeWidth={2}>
            <animateMotion dur={`${2.6 + i * 0.4}s`} repeatCount="indefinite" path={d} keyPoints={i % 2 ? "1;0" : "0;1"} keyTimes="0;1" calcMode="linear" />
          </circle>
        </g>
      ))}

      {/* cloud */}
      <g className="art-float anim-part">
        <path d="M222 150a38 38 0 0 1 4-74 56 56 0 0 1 104-10 42 42 0 0 1 14 84Z" className="fill-paper" {...O} strokeWidth={3} />
      </g>
      <Tag x={282} y={46} w={92} text={nodes.cloud} tone="fill-accent" tilt={-4} />

      {/* printer */}
      <g transform="translate(48 196)">
        <rect x="22" y="-26" width="58" height="46" rx="4" className="fill-paper ic-print anim-part" {...O} />
        <rect x="0" y="0" width="104" height="58" rx="12" className="fill-primary" {...O} />
        <path d="M14 20h76" {...O} />
        <circle cx="86" cy="40" r="5" className="fill-accent" {...O} strokeWidth={2} />
      </g>
      <Tag x={100} y={284} w={92} text={nodes.printer} tilt={3} />

      {/* laptop console */}
      <Laptop x={110} y={322} />
      <Tag x={196} y={478} w={100} text={nodes.console} tone="fill-pop-soft" tilt={-2} />

      {/* kiosk */}
      <Kiko x={380} y={452} scale={0.6} wave={false} />
      <Tag x={380} y={480} w={86} text={nodes.kiosk} tone="fill-tint" tilt={3} />

      {/* phone approvals */}
      <g className="ic-buzz anim-part">
        <Phone x={448} y={190} />
      </g>
      <path d="M432 214c-6 10-6 22 0 32M528 214c6 10 6 22 0 32" fill="none" className="stroke-pop" strokeWidth={3} strokeLinecap="round" />
      <Tag x={496} y={336} w={112} text={nodes.phone} tone="fill-accent-soft" tilt={-3} />
    </svg>
  );
}

/* ---------------- Security ---------------- */

export function SecurityArt({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 540 460" className="h-auto w-full" role="img" aria-label={label}>
      <circle cx="270" cy="230" r="205" className="fill-paper" {...O} strokeDasharray="4 10" strokeOpacity={0.4} />
      {/* laptop: separated tenant workspaces + audit list */}
      <g transform="translate(40 96)">
        <rect x="0" y="0" width="330" height="208" rx="14" className="fill-ink" {...O} />
        <rect x="12" y="12" width="306" height="184" rx="6" className="fill-paper" />
        <rect x="12" y="12" width="306" height="24" className="fill-primary" />
        <circle cx="28" cy="24" r="4" className="fill-pop" />
        <circle cx="42" cy="24" r="4" className="fill-accent" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${24 + i * 96} 50)`}>
            <rect width="84" height="62" rx="8" className={["fill-tint", "fill-accent-soft", "fill-pop-soft"][i]} stroke="var(--ink)" strokeWidth={2} strokeDasharray="5 5" />
            <rect x="32" y="22" width="20" height="16" rx="3" className="fill-accent" {...O} strokeWidth={2} />
            <path d="M36 22v-5a6 6 0 0 1 12 0v5" fill="none" {...O} strokeWidth={2} />
          </g>
        ))}
        {[130, 152, 174].map((ry, i) => (
          <g key={ry}>
            <circle cx="34" cy={ry} r="7" className="fill-success" />
            <path d={`m30 ${ry}l3 3 5-6`} fill="none" stroke="var(--paper)" strokeWidth={2.2} strokeLinecap="round" />
            <path d={`M50 ${ry}h${120 - i * 22}M210 ${ry}h60`} {...O} strokeWidth={2.2} />
          </g>
        ))}
        <path d="M-22 208h374l-14 18H-8Z" className="fill-tint" {...O} />
      </g>

      {/* phone with MFA */}
      <g transform="translate(296 236) rotate(6)" className="ic-bob anim-part">
        <rect width="92" height="160" rx="16" className="fill-ink" {...O} />
        <rect x="8" y="16" width="76" height="126" rx="8" className="fill-tint" />
        <rect x="32" y="40" width="28" height="22" rx="4" className="fill-accent" {...O} />
        <path d="M37 40v-6a9 9 0 0 1 18 0v6" fill="none" {...O} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={16 + (i % 3) * 21} y={78 + Math.floor(i / 3) * 24} width="16" height="18" rx="4" className="fill-paper" {...O} strokeWidth={1.8} />
        ))}
      </g>

      {/* shield */}
      <g className="art-float anim-part" style={{ animationDelay: "-2s" }}>
        <path d="M440 70 506 96v58c0 46-30 76-66 94-36-18-66-48-66-94V96Z" className="fill-primary" {...O} strokeWidth={3} />
        <path d="M440 92 488 110v44c0 32-20 54-48 68-28-14-48-36-48-68v-44Z" className="fill-none" stroke="var(--paper)" strokeWidth={2.5} strokeDasharray="5 6" />
        <path d="m414 158 18 18 34-38" fill="none" stroke="var(--accent)" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* key */}
      <g transform="translate(52 42)" className="ic-swing anim-part">
        <circle cx="20" cy="20" r="16" className="fill-accent" {...O} />
        <circle cx="20" cy="20" r="5" className="fill-paper" {...O} strokeWidth={2} />
        <path d="m32 32 30 30M50 50l6-6M58 58l6-6" {...O} strokeWidth={4} />
      </g>
      <path d="M150 50v14M143 57h14M500 300v12M494 306h12" {...O} className="stroke-pop ic-pulse anim-part" />
    </svg>
  );
}

/* ---------------- Multi-site (flat fallback) ---------------- */

export function SitesArt({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 520 460" className="h-auto w-full" role="img" aria-label={label}>
      <ellipse cx="260" cy="330" rx="238" ry="112" className="fill-tint" {...O} strokeWidth={3} />
      <ellipse cx="260" cy="330" rx="150" ry="70" fill="none" stroke="var(--paper)" strokeWidth={6} />
      <path d="M120 330C180 300 210 300 260 310S360 330 410 300M150 380c50-20 120-20 220 0" fill="none" className="stroke-primary art-dash" strokeWidth={3} strokeLinecap="round" />
      {/* plant */}
      <g transform="translate(70 270)">
        <rect x="0" y="0" width="110" height="64" rx="4" className="fill-accent" {...O} />
        <path d="M0 0l22-18 22 18 22-18 22 18 22-18v18" className="fill-accent" {...O} />
        <rect x="80" y="-60" width="16" height="60" className="fill-paper" {...O} />
        <circle cx="92" cy="-74" r="10" className="fill-paper ic-bob anim-part" {...O} />
        <path d="M14 26h80" stroke="var(--paper)" strokeWidth={8} />
      </g>
      {/* HQ */}
      <g transform="translate(212 92)">
        <rect x="0" y="0" width="96" height="232" rx="6" className="fill-primary" {...O} strokeWidth={3} />
        {[30, 70, 110, 150, 190].map((ry) => (
          <path key={ry} d={`M16 ${ry}h64`} stroke="var(--paper)" strokeWidth={9} strokeLinecap="round" />
        ))}
        <rect x="32" y="-22" width="32" height="22" rx="4" className="fill-accent" {...O} />
      </g>
      {/* clinic */}
      <g transform="translate(340 250)">
        <rect x="0" y="0" width="100" height="84" rx="6" className="fill-paper" {...O} />
        <path d="M50 22v32M34 38h32" stroke="var(--pop)" strokeWidth={10} strokeLinecap="round" />
      </g>
      {/* school */}
      <g transform="translate(110 360)">
        <rect x="0" y="0" width="92" height="56" rx="4" className="fill-pop" {...O} />
        <path d="M-8 2 46-34 100 2Z" className="fill-primary" {...O} />
        <path d="M46-34v-30" {...O} />
        <path d="M46-64h22l-4 7 4 7H46" className="fill-accent" {...O} />
      </g>
      {/* data centre */}
      <g transform="translate(316 356)">
        <rect x="0" y="0" width="108" height="56" rx="6" className="fill-ink" {...O} />
        {[14, 28, 42].map((ry) => (
          <path key={ry} d={`M12 ${ry}h60`} stroke="var(--accent)" strokeWidth={4} strokeLinecap="round" />
        ))}
        <circle cx="90" cy="28" r="6" className="fill-success" />
      </g>
      {/* pins */}
      {[
        [260, 40, "fill-pop"],
        [120, 228, "fill-paper"],
        [390, 214, "fill-accent"],
        [156, 296, "fill-paper"],
        [370, 320, "fill-pop"],
      ].map(([x, y, c], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <g className="ic-bob anim-part" style={{ animationDelay: `${-i * 0.4}s` }}>
            <path d="M0 0a14 14 0 0 1 14 14c0 10-14 24-14 24S-14 24-14 14A14 14 0 0 1 0 0Z" className={String(c)} {...O} />
            <circle cx="0" cy="14" r="5" className="fill-ink" />
          </g>
        </g>
      ))}
    </svg>
  );
}

/* ---------------- Entrance panorama (desk · lobby · gate) ---------------- */

export function EntrancePanorama({ zone, label }: { zone?: 0 | 1 | 2; label: string }) {
  const viewBox = zone === undefined ? "0 0 1200 380" : `${zone * 400} 0 400 380`;
  return (
    <svg viewBox={viewBox} className="h-auto w-full" role="img" aria-label={label}>
      <defs>
        <clipPath id={`pano-clip-${zone ?? "all"}`}>
          <rect x="0" y="0" width="1200" height="380" rx="28" />
        </clipPath>
      </defs>
      <g clipPath={`url(#pano-clip-${zone ?? "all"})`}>
        {/* walls */}
        <rect x="0" y="0" width="400" height="330" className="fill-pop-soft" />
        <rect x="400" y="0" width="400" height="330" className="fill-tint" />
        <rect x="800" y="0" width="400" height="330" className="fill-accent-soft" />
        <rect x="0" y="330" width="1200" height="50" className="fill-paper" />
        <path d="M0 330h1200" {...O} strokeWidth={3} />

        {/* --- reception --- */}
        <circle cx="330" cy="76" r="30" className="fill-paper" {...O} />
        <path d="M330 56v20l14 8" fill="none" {...O} />
        <path d="M40 54h150M40 74h110" stroke="var(--pop)" strokeWidth={10} strokeLinecap="round" opacity={0.55} />
        <Person x={140} y={268} half hair="bun" shirt="fill-primary" skin="fill-skin-mid" prop="headset" />
        <rect x="56" y="168" width="64" height="44" rx="6" className="fill-ink" {...O} />
        <rect x="62" y="174" width="52" height="32" rx="3" className="fill-tint" />
        <path d="M88 212v10" {...O} />
        <rect x="30" y="222" width="250" height="16" rx="6" className="fill-paper" {...O} />
        <rect x="40" y="238" width="230" height="92" className="fill-primary" {...O} />
        <path d="M60 262h190" stroke="var(--paper)" strokeWidth={3} strokeDasharray="6 8" strokeLinecap="round" />
        <Person x={330} y={330} flip pose="hold" hair="short" shirt="fill-accent" pants="fill-primary" skin="fill-skin-deep" />
        <g transform="translate(246 196) rotate(-12)" className="ic-bob anim-part">
          <rect width="24" height="30" rx="4" className="fill-paper" {...O} strokeWidth={2} />
          <rect x="7" y="5" width="10" height="3" rx="1.5" className="fill-ink" />
          <circle cx="12" cy="17" r="4" className="fill-pop" />
        </g>

        {/* --- lobby --- */}
        <rect x="560" y="60" width="200" height="270" rx="6" className="fill-paper" {...O} />
        <rect x="572" y="72" width="84" height="258" className="fill-tint" {...O} strokeWidth={2} />
        <rect x="664" y="72" width="84" height="258" className="fill-tint" {...O} strokeWidth={2} />
        <path d="M590 100l30-20M684 100l30-20" stroke="var(--paper)" strokeWidth={6} strokeLinecap="round" />
        <Plant x={444} y={330} scale={1.1} />
        <Kiko x={530} y={330} scale={0.92} />
        <Person x={700} y={330} flip hair="long" shirt="fill-pop" pants="fill-ink" prop="lanyard" skin="fill-skin-light" />

        {/* --- security gate --- */}
        <circle cx="1130" cy="70" r="30" className="fill-accent" {...O} />
        <path d="M800 290c80-30 160-30 240-10s120 10 160-6v56H800Z" className="fill-paper" opacity={0.7} />
        <rect x="826" y="150" width="104" height="180" rx="6" className="fill-paper" {...O} />
        <path d="M816 152h124l-14-30h-96Z" className="fill-primary" {...O} />
        <rect x="840" y="174" width="76" height="60" rx="5" className="fill-tint" {...O} />
        <Person x={878} y={262} scale={0.55} half hair="cap" shirt="fill-primary" skin="fill-skin-mid" />
        <rect x="840" y="174" width="76" height="60" rx="5" fill="none" {...O} />
        <rect x="956" y="236" width="22" height="94" rx="4" className="fill-ink" {...O} />
        <g className="gate-arm anim-part">
          <rect x="968" y="236" width="200" height="18" rx="9" className="fill-paper" {...O} />
          {[1000, 1048, 1096, 1144].map((sx) => (
            <path key={sx} d={`M${sx} 238v14`} stroke="var(--pop)" strokeWidth={14} />
          ))}
          <rect x="968" y="236" width="200" height="18" rx="9" fill="none" {...O} />
        </g>
        <circle cx="967" cy="228" r="8" className="fill-pop ic-pulse anim-part" {...O} strokeWidth={2} />
        <Person x={1100} y={330} flip pose="phone" hair="cap" shirt="fill-accent" pants="fill-ink" skin="fill-skin-light" scale={0.95} />
      </g>
      {/* pillars between zones */}
      <rect x="388" y="0" width="24" height="330" className="fill-paper" {...O} />
      <rect x="788" y="0" width="24" height="330" className="fill-paper" {...O} />
    </svg>
  );
}

/* ---------------- "See it in practice" polaroids ---------------- */

export function PracticeScene({ variant, label }: { variant: 0 | 1 | 2; label: string }) {
  return (
    <svg viewBox="0 0 400 300" className="h-auto w-full" role="img" aria-label={label}>
      {variant === 0 && (
        <>
          <rect width="400" height="300" className="fill-accent-soft" />
          <path d="M150 230V90a50 50 0 0 1 100 0v140Z" className="fill-tint" {...O} />
          <path d="M200 40v190M150 130h100" stroke="var(--paper)" strokeWidth={4} />
          <rect y="260" width="400" height="40" className="fill-paper" />
          <path d="M0 260h400" {...O} />
          <Kiko x={92} y={262} scale={0.8} />
          <rect x="240" y="194" width="150" height="66" rx="4" className="fill-primary" {...O} />
          <rect x="232" y="186" width="166" height="12" rx="4" className="fill-paper" {...O} />
          <rect x="264" y="142" width="74" height="44" rx="6" className="fill-ink" {...O} />
          <rect x="270" y="148" width="62" height="32" rx="3" className="fill-paper" />
          <path d="M276 158h40M276 166h30M276 174h44" {...O} strokeWidth={1.8} />
          <path d="M356 186a14 14 0 0 1 28 0Z" className="fill-accent" {...O} />
          <g className="ic-buzz anim-part">
            <Phone x={318} y={28} scale={0.7} rotate={10} />
          </g>
          <Plant x={204} y={262} scale={0.9} />
        </>
      )}
      {variant === 1 && (
        <>
          <rect width="400" height="300" className="fill-tint" />
          <rect x="24" y="30" width="150" height="56" rx="10" className="fill-paper" {...O} />
          <path d="M44 52h80M44 66h60" stroke="var(--primary)" strokeWidth={6} strokeLinecap="round" />
          <Person x={130} y={300} scale={1.2} half hair="curly" shirt="fill-pop" skin="fill-skin-deep" pose="hold" prop="headset" />
          <Person x={336} y={330} scale={1.1} flip hair="short" shirt="fill-primary" skin="fill-skin-light" pose="hold" />
          <g transform="translate(212 150) rotate(-8)" className="ic-bob anim-part">
            <path d="M8 -12 16 2l8-14" fill="none" stroke="var(--accent)" strokeWidth={3} />
            <rect width="34" height="44" rx="6" className="fill-paper" {...O} />
            <rect x="11" y="6" width="12" height="4" rx="2" className="fill-primary" />
            <circle cx="17" cy="22" r="6" className="fill-pop" {...O} strokeWidth={2} />
            <path d="M9 34h16" {...O} strokeWidth={2} />
          </g>
          <rect x="0" y="246" width="400" height="16" rx="4" className="fill-paper" {...O} />
          <rect x="0" y="262" width="400" height="40" className="fill-primary" {...O} />
        </>
      )}
      {variant === 2 && (
        <>
          <rect width="400" height="300" className="fill-pop-soft" />
          <rect x="28" y="36" width="200" height="132" rx="12" className="fill-ink" {...O} />
          <rect x="38" y="46" width="180" height="112" rx="6" className="fill-paper" />
          <rect x="38" y="46" width="180" height="20" className="fill-primary" />
          {[82, 104, 126, 148].map((ry, i) => (
            <g key={ry}>
              <circle cx="54" cy={ry} r="5" className={i < 2 ? "fill-accent ic-pulse anim-part" : "fill-success"} />
              <path d={`M66 ${ry}h80M170 ${ry}h32`} {...O} strokeWidth={2} />
            </g>
          ))}
          <path d="M128 168v30M88 198h80" {...O} strokeWidth={3} />
          <rect y="262" width="400" height="38" className="fill-paper" />
          <path d="M0 262h400" {...O} />
          <Person x={300} y={262} scale={1.05} pose="phone" hair="long" shirt="fill-primary" skin="fill-skin-mid" />
          <g transform="translate(330 46)" className="ic-bob anim-part">
            <path d="M0 0h56a10 10 0 0 1 10 10v28a10 10 0 0 1-10 10H22l-12 12V48H0a10 10 0 0 1-10-10V10A10 10 0 0 1 0 0Z" className="fill-paper" {...O} />
            <circle cx="28" cy="24" r="12" className="fill-success" />
            <path d="m22 24 4 4 8-8" fill="none" stroke="var(--paper)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </>
      )}
    </svg>
  );
}

/* ---------------- Kiko on a stage (capabilities + CTA) ---------------- */

export function KikoStage({ tone = "fill-accent", holdBadge = true, className = "" }: { tone?: string; holdBadge?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 320 340" className={className} aria-hidden="true">
      <circle cx="160" cy="180" r="140" className={tone} {...O} strokeWidth={3} />
      <path d="M40 120c-14-4-22 6-18 16M282 92c14-6 24 4 20 16" fill="none" className="stroke-pop" strokeWidth={4} strokeLinecap="round" />
      <path d="M58 60v14M51 67h14M270 250v12M264 256h12" {...O} />
      <Kiko x={170} y={318} scale={1} holdBadge={holdBadge} />
    </svg>
  );
}
