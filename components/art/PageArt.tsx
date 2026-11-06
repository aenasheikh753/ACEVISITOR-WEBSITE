import { LogoMark } from "@/components/brand/Logo";
import { Icon } from "@/components/icons/Icon";
import type { IconName, SectorId } from "@/lib/types";
import { Kiko, Person, Plant } from "./Characters";

const O = { stroke: "var(--ink)", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/* ---------------- Platform: module ring ---------------- */

/** Nine module icons orbiting one badge: the single visitor record. */
export function ModuleRing({ icons, label }: { icons: IconName[]; label: string }) {
  const n = icons.length;
  return (
    <div role="img" aria-label={label} className="relative mx-auto aspect-square w-full max-w-[520px]">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="200" cy="200" r="188" className="fill-tint" {...O} strokeWidth={3} />
        <circle cx="200" cy="200" r="150" fill="none" stroke="var(--ink)" strokeWidth={2} strokeDasharray="4 10" opacity={0.5} />
        <circle cx="200" cy="200" r="78" className="fill-accent" {...O} strokeWidth={3} />
        <circle cx="200" cy="200" r="78" fill="none" className="stroke-primary art-dash" strokeWidth={3} />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid size-[24%] place-items-center rounded-[22%] border-2 border-ink bg-paper shadow-hard">
          <LogoMark size={64} className="h-[62%] w-[62%]" />
        </div>
      </div>
      <div className="ring-spin absolute inset-0">
        {icons.map((name, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(a) * 37.5;
          const y = 50 + Math.sin(a) * 37.5;
          return (
            <div
              key={`${name}-${i}`}
              className="absolute grid size-[17%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-ink bg-paper shadow-hard-sm"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div className="ring-counter grid h-[78%] w-[78%] place-items-center">
                <Icon name={name} size={56} tint="none" className="h-full w-full" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Solutions: three teams on one podium ---------------- */

export function TeamsArt({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 520 440" className="h-auto w-full" role="img" aria-label={label}>
      <ellipse cx="260" cy="410" rx="240" ry="22" className="fill-ink" opacity={0.1} />
      <path d="M70 70c10-20 34-24 46-8M440 96c14-12 34-6 36 10" fill="none" className="stroke-pop" strokeWidth={4} strokeLinecap="round" />
      <path d="M250 40v16M242 48h16M470 230v12M464 236h12M40 250v12M34 256h12" {...O} />
      {/* podium */}
      <rect x="40" y="300" width="150" height="104" rx="8" className="fill-accent" {...O} strokeWidth={3} />
      <rect x="185" y="250" width="150" height="154" rx="8" className="fill-primary" {...O} strokeWidth={3} />
      <rect x="330" y="320" width="150" height="84" rx="8" className="fill-pop" {...O} strokeWidth={3} />
      <path d="M210 290h100M210 310h70" stroke="var(--paper)" strokeWidth={6} strokeLinecap="round" opacity={0.6} />
      <Person x={115} y={300} hair="cap" shirt="fill-primary" pants="fill-ink" skin="fill-skin-deep" pose="wave" />
      <Person x={260} y={250} hair="bun" shirt="fill-pop" pants="fill-ink" skin="fill-skin-light" prop="headset" pose="hold" />
      <Person x={405} y={320} flip hair="short" shirt="fill-accent" pants="fill-primary" skin="fill-skin-mid" pose="phone" />
      <g transform="translate(316 140) rotate(10)" className="ic-bob anim-part">
        <path d="M8 -14 15 0l7-14" fill="none" className="stroke-pop" strokeWidth={3} />
        <rect width="34" height="44" rx="6" className="fill-paper" {...O} />
        <rect x="11" y="6" width="12" height="4" rx="2" className="fill-primary" />
        <circle cx="17" cy="22" r="6" className="fill-accent" {...O} strokeWidth={2} />
      </g>
    </svg>
  );
}

/* ---------------- Solutions: contractor access ---------------- */

export function ContractorArt({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 520 440" className="h-auto w-full" role="img" aria-label={label}>
      <circle cx="260" cy="230" r="196" className="fill-paper" {...O} strokeWidth={3} />
      {/* calendar */}
      <g transform="translate(46 70) rotate(-5)">
        <rect width="190" height="170" rx="14" className="fill-paper" {...O} strokeWidth={3} />
        <path d="M0 44h190" {...O} />
        <rect x="0" y="0" width="190" height="44" rx="14" className="fill-primary" {...O} strokeWidth={3} />
        <path d="M44 -10v22M146 -10v22" {...O} strokeWidth={4} />
        {[0, 1, 2, 3, 4].map((c) =>
          [0, 1, 2].map((r) => {
            const on = (c + r) % 2 === 0 && r < 2;
            return (
              <g key={`${c}-${r}`} transform={`translate(${18 + c * 34} ${62 + r * 34})`}>
                <rect width="24" height="24" rx="6" className={on ? "fill-accent" : "fill-tint"} {...O} strokeWidth={2} />
                {on && <path d="m6 12 4 4 8-8" fill="none" {...O} strokeWidth={2.4} />}
              </g>
            );
          }),
        )}
      </g>
      {/* document with expiry stamp */}
      <g transform="translate(330 70) rotate(6)">
        <path d="M0 0h96l26 26v134H0Z" className="fill-paper" {...O} strokeWidth={3} />
        <path d="M96 0v26h26" fill="none" {...O} />
        <path d="M18 44h70M18 64h86M18 84h60M18 104h80" {...O} strokeWidth={2.4} />
        <g transform="translate(62 128) rotate(-14)" className="ic-pulse anim-part">
          <circle r="28" className="fill-success" opacity={0.15} />
          <circle r="24" fill="none" stroke="var(--success)" strokeWidth={4} />
          <path d="m-10 0 7 7 13-14" fill="none" stroke="var(--success)" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <Person x={262} y={420} scale={1.08} hair="cap" shirt="fill-accent" pants="fill-primary" skin="fill-skin-mid" prop="badge" pose="wave" />
      <path d="M250 255h24" className="stroke-pop" strokeWidth={6} strokeLinecap="round" />
    </svg>
  );
}

/* ---------------- Industries: six buildings on one street ---------------- */

function Building({ id }: { id: SectorId }) {
  switch (id) {
    case "office":
      return (
        <g>
          <rect x="52" y="34" width="96" height="166" rx="4" className="fill-primary" {...O} strokeWidth={3} />
          {[56, 82, 108, 134].map((y) => (
            <path key={y} d={`M66 ${y}h68`} stroke="var(--paper)" strokeWidth={9} strokeLinecap="round" />
          ))}
          <rect x="84" y="164" width="32" height="36" rx="3" className="fill-accent" {...O} />
          <path d="M100 34V12" {...O} strokeWidth={3} />
          <circle cx="100" cy="10" r="5" className="fill-pop ic-pulse anim-part" {...O} strokeWidth={2} />
        </g>
      );
    case "healthcare":
      return (
        <g>
          <rect x="22" y="92" width="156" height="108" rx="4" className="fill-paper" {...O} strokeWidth={3} />
          <rect x="70" y="52" width="60" height="44" rx="6" className="fill-pop" {...O} strokeWidth={3} />
          <path d="M100 60v28M86 74h28" stroke="var(--paper)" strokeWidth={8} strokeLinecap="round" />
          {[40, 78, 116, 146].map((x) => (
            <rect key={x} x={x} y="114" width="18" height="18" rx="3" className="fill-tint" {...O} strokeWidth={2} />
          ))}
          <rect x="82" y="152" width="36" height="48" rx="3" className="fill-primary" {...O} />
        </g>
      );
    case "education":
      return (
        <g>
          <rect x="30" y="104" width="140" height="96" rx="4" className="fill-accent" {...O} strokeWidth={3} />
          <path d="M20 108 100 54l80 54Z" className="fill-primary" {...O} strokeWidth={3} />
          <circle cx="100" cy="90" r="12" className="fill-paper" {...O} />
          <path d="M100 82v8l5 4" fill="none" {...O} strokeWidth={2} />
          <rect x="84" y="150" width="32" height="50" rx="3" className="fill-paper" {...O} />
          <rect x="44" y="126" width="22" height="22" rx="3" className="fill-paper" {...O} strokeWidth={2} />
          <rect x="134" y="126" width="22" height="22" rx="3" className="fill-paper" {...O} strokeWidth={2} />
          <path d="M100 54V18" {...O} strokeWidth={3} />
          <path d="M100 18h30l-6 8 6 8h-30" className="fill-pop ic-swing anim-part" {...O} />
        </g>
      );
    case "government":
      return (
        <g>
          <path d="M20 86 100 40l80 46Z" className="fill-paper" {...O} strokeWidth={3} />
          <rect x="26" y="86" width="148" height="14" className="fill-primary" {...O} />
          {[40, 70, 100, 130, 160].map((x) => (
            <rect key={x} x={x - 8} y="100" width="16" height="78" className="fill-tint" {...O} strokeWidth={2} />
          ))}
          <rect x="18" y="178" width="164" height="11" className="fill-paper" {...O} />
          <rect x="10" y="189" width="180" height="11" className="fill-paper" {...O} />
          <circle cx="100" cy="68" r="8" className="fill-accent" {...O} strokeWidth={2} />
        </g>
      );
    case "datacenter":
      return (
        <g>
          <rect x="20" y="104" width="160" height="96" rx="6" className="fill-ink" {...O} strokeWidth={3} />
          {[38, 78, 118].map((x) => (
            <g key={x}>
              <rect x={x} y="120" width="30" height="64" rx="3" className="fill-primary" />
              {[130, 146, 162].map((y, i) => (
                <g key={y}>
                  <path d={`M${x + 5} ${y}h12`} stroke="var(--accent)" strokeWidth={3} strokeLinecap="round" />
                  <circle cx={x + 23} cy={y} r="2.6" className={i === 1 ? "fill-pop ic-pulse anim-part" : "fill-success"} />
                </g>
              ))}
            </g>
          ))}
          <path d="M150 104V74" {...O} strokeWidth={3} />
          <path d="M130 70a24 24 0 0 0 40 0Z" className="fill-paper" {...O} />
        </g>
      );
    case "construction":
      return (
        <g>
          <path d="M40 200V40M40 40h130M40 40l20 20M60 40v20M90 40l-30 20" fill="none" stroke="var(--accent)" strokeWidth={6} strokeLinecap="round" />
          <path d="M40 200V40h130" fill="none" {...O} strokeWidth={2} />
          <g className="ic-swing anim-part" style={{ transformOrigin: "50% 0%" }}>
            <path d="M150 40v40" {...O} strokeWidth={2} />
            <rect x="138" y="80" width="24" height="16" rx="2" className="fill-primary" {...O} strokeWidth={2} />
          </g>
          <rect x="74" y="120" width="96" height="80" className="fill-none" {...O} strokeWidth={3} />
          <path d="M74 146h96M74 172h96M106 120v80M138 120v80" stroke="var(--primary)" strokeWidth={4} />
          <path d="M180 200l-10-26h-8l-10 26Z" className="fill-pop" {...O} strokeWidth={2} />
        </g>
      );
  }
}

const SECTOR_ORDER: SectorId[] = ["office", "healthcare", "education", "government", "datacenter", "construction"];

/** A street of all six sectors, or a single crop with `sector`. */
export function StreetArt({ sector, label, className = "" }: { sector?: SectorId; label: string; className?: string }) {
  const i = sector ? SECTOR_ORDER.indexOf(sector) : -1;
  const viewBox = i >= 0 ? `${i * 200} 0 200 240` : "0 0 1200 240";
  return (
    <svg viewBox={viewBox} className={`h-auto w-full ${className}`} role="img" aria-label={label}>
      <rect x="0" y="200" width="1200" height="40" className="fill-ink" />
      <path d="M10 220h1180" stroke="var(--accent)" strokeWidth={4} strokeDasharray="22 18" strokeLinecap="round" />
      {SECTOR_ORDER.map((id, k) => (
        <g key={id} transform={`translate(${k * 200} 0)`}>
          <Building id={id} />
        </g>
      ))}
    </svg>
  );
}

/* ---------------- Security: shield fallback ---------------- */

export function ShieldArt({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 440 440" className="h-auto w-full" role="img" aria-label={label}>
      <circle cx="220" cy="220" r="190" className="fill-primary" opacity={0.35} />
      <ellipse cx="220" cy="230" rx="200" ry="60" fill="none" stroke="var(--accent)" strokeWidth={4} strokeDasharray="10 12" transform="rotate(-14 220 230)" />
      <g className="art-float anim-part">
        <path d="M220 70 330 112v88c0 74-48 122-110 152-62-30-110-78-110-152v-88Z" className="fill-accent" {...O} strokeWidth={4} />
        <path d="M220 92 312 128v72c0 62-40 102-92 128-52-26-92-66-92-128v-72Z" className="fill-primary" {...O} strokeWidth={3} />
        <path d="m172 208 34 34 64-70" fill="none" stroke="var(--paper)" strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <circle cx="70" cy="170" r="12" className="fill-pop ic-pulse anim-part" {...O} />
      <circle cx="372" cy="306" r="10" className="fill-accent ic-pulse anim-part" {...O} style={{ animationDelay: "-1s" }} />
      <path d="M360 90v18M351 99h18M80 340v14M73 347h14" stroke="var(--paper)" strokeWidth={3} strokeLinecap="round" />
    </svg>
  );
}

/* ---------------- Security: keys + records ---------------- */

export function KeyRingArt({ label }: { label: string }) {
  const keys = ["fill-accent", "fill-pop", "fill-primary", "fill-paper"];
  return (
    <svg viewBox="0 0 480 400" className="h-auto w-full" role="img" aria-label={label}>
      {/* door */}
      <rect x="280" y="40" width="160" height="320" rx="8" className="fill-primary" {...O} strokeWidth={3} />
      <rect x="298" y="58" width="124" height="284" rx="4" className="fill-tint" {...O} />
      <rect x="390" y="190" width="22" height="30" rx="5" className="fill-accent" {...O} />
      <circle cx="401" cy="202" r="4" className="fill-ink" />
      <rect x="318" y="90" width="84" height="40" rx="6" className="fill-paper" {...O} />
      <path d="M332 110h56" {...O} strokeWidth={3} />
      {/* ring */}
      <g className="ic-swing anim-part" style={{ transformOrigin: "50% 0%" }}>
        <path d="M150 40v40" {...O} strokeWidth={4} />
        <circle cx="150" cy="120" r="40" fill="none" {...O} strokeWidth={6} />
        {keys.map((k, i) => {
          const a = -40 + i * 30;
          return (
            <g key={k} transform={`translate(150 160) rotate(${a})`}>
              <path d="M0 0v120" {...O} strokeWidth={9} />
              <path d="M0 0v120" className={k.replace("fill-", "stroke-")} strokeWidth={5} />
              <path d="M0 96h14M0 112h10" {...O} strokeWidth={5} />
              <circle cx="0" cy="0" r="14" className={k} {...O} strokeWidth={3} />
            </g>
          );
        })}
      </g>
      <path d="M60 330h120" {...O} opacity={0.2} strokeWidth={10} />
    </svg>
  );
}

export function RecordsArt({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 480 400" className="h-auto w-full" role="img" aria-label={label}>
      {/* cabinet */}
      <rect x="40" y="60" width="200" height="300" rx="10" className="fill-paper" {...O} strokeWidth={3} />
      {[80, 172, 264].map((y, i) => (
        <g key={y}>
          <rect x="58" y={y} width="164" height="78" rx="6" className={["fill-tint", "fill-accent-soft", "fill-pop-soft"][i]} {...O} />
          <rect x="112" y={y + 30} width="56" height="16" rx="8" className="fill-paper" {...O} strokeWidth={2} />
        </g>
      ))}
      {/* folders sticking out */}
      <path d="M80 80v-24h40l8 10h50v14" className="fill-accent" {...O} />
      {/* exported report */}
      <g transform="translate(272 70) rotate(5)">
        <rect width="150" height="190" rx="8" className="fill-paper" {...O} strokeWidth={3} />
        <rect x="0" y="0" width="150" height="30" rx="8" className="fill-primary" {...O} strokeWidth={3} />
        {[56, 80, 104, 128].map((y, i) => (
          <g key={y}>
            <circle cx="22" cy={y} r="6" className={i === 2 ? "fill-accent" : "fill-success"} />
            <path d={`M38 ${y}h${80 - i * 10}`} {...O} strokeWidth={2.4} />
          </g>
        ))}
        <path d="M20 160h40l20-14 20 8 30-20" fill="none" className="stroke-pop" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* magnifier */}
      <g transform="translate(330 270)" className="ic-bob anim-part">
        <circle r="44" className="fill-tint" opacity={0.7} {...O} strokeWidth={5} />
        <path d="M32 32l40 40" {...O} strokeWidth={12} />
        <path d="M32 32l40 40" className="stroke-accent" strokeWidth={6} />
      </g>
    </svg>
  );
}

/* ---------------- About + Login: the entrance ---------------- */

export function EntranceArt({ label, logbook = false }: { label: string; logbook?: boolean }) {
  return (
    <svg viewBox="0 0 500 460" className="h-auto w-full" role="img" aria-label={label}>
      <circle cx="250" cy="230" r="210" className="fill-paper" {...O} strokeWidth={3} />
      {/* door frame */}
      <rect x="236" y="60" width="180" height="340" rx="8" className="fill-primary" {...O} strokeWidth={3} />
      <rect x="254" y="78" width="144" height="322" className="fill-accent-soft" />
      <path d="M254 78 336 98v290l-82 12Z" className="fill-tint" {...O} />
      <circle cx="322" cy="250" r="6" className="fill-accent" {...O} strokeWidth={2} />
      <path d="M100 400h320" {...O} strokeWidth={3} />
      <rect x="200" y="400" width="180" height="14" rx="4" className="fill-pop" {...O} />
      <Kiko x={170} y={400} scale={0.95} />
      <Plant x={440} y={400} scale={1.1} />
      {logbook && (
        <g transform="translate(330 300) rotate(-8)">
          <rect width="120" height="84" rx="6" className="fill-paper" {...O} strokeWidth={3} />
          <path d="M60 0v84" {...O} />
          <path d="M12 20h36M12 34h30M12 48h36M72 20h34M72 34h28M72 48h34" {...O} strokeWidth={1.8} opacity={0.6} />
          <path d="M8 8l104 68M112 8 8 76" className="stroke-pop" strokeWidth={6} strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
