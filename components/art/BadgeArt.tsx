import { initials, qrCells } from "@/lib/art";
import type { BadgeContent } from "@/lib/types";

const O = { stroke: "var(--ink)", strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const display = { fontFamily: "var(--font-display)" };
const bodyFont = { fontFamily: "var(--font-body)" };

function Finder({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={16} height={16} rx={3} className="fill-ink" />
      <rect x={x + 3} y={y + 3} width={10} height={10} rx={2} className="fill-paper" />
      <rect x={x + 5.5} y={y + 5.5} width={5} height={5} rx={1} className="fill-ink" />
    </g>
  );
}

/** Flat visitor badge on a lanyard: the hero image when 3D is unavailable. */
export function BadgeArt({ badge, label, className = "" }: { badge: BadgeContent; label: string; className?: string }) {
  const cells = qrCells(11, 11);
  const q = 4; // QR cell size
  return (
    <svg viewBox="0 0 400 460" className={className} role="img" aria-label={label}>
      {/* lanyard */}
      <path d="M140 -10c10 60 30 100 52 138M262 -10c-10 60-30 100-52 138" fill="none" className="stroke-pop" strokeWidth={14} strokeLinecap="round" />
      <path d="M140 -10c10 60 30 100 52 138M262 -10c-10 60-30 100-52 138" fill="none" stroke="var(--ink)" strokeWidth={2} strokeDasharray="2 10" strokeLinecap="round" />
      <g className="art-float anim-part">
        <g transform="rotate(-4 200 280)">
          <rect x="108" y="144" width="200" height="290" rx="20" className="fill-primary" opacity={0.9} />
          <rect x="96" y="132" width="208" height="292" rx="20" className="fill-paper" {...O} />
          <path d="M96 196V152a20 20 0 0 1 20-20h168a20 20 0 0 1 20 20v44Z" className="fill-primary" {...O} />
          <rect x="182" y="112" width="36" height="30" rx="7" className="fill-accent" {...O} />
          <rect x="184" y="146" width="32" height="8" rx="4" className="fill-paper" />
          <text x="116" y="181" className="fill-paper" style={display} fontSize="17" fontWeight={800}>
            {badge.brand}
          </text>
          <rect x="226" y="164" width="62" height="22" rx="11" className="fill-accent" stroke="var(--ink)" strokeWidth={2} />
          <text x="257" y="179.5" textAnchor="middle" className="fill-ink" style={display} fontSize="11" fontWeight={800} letterSpacing="1">
            {badge.label.toUpperCase()}
          </text>

          <circle cx="200" cy="236" r="28" className="fill-pop" {...O} />
          <text x="200" y="244" textAnchor="middle" className="fill-ink" style={display} fontSize="22" fontWeight={800}>
            {initials(badge.name)}
          </text>
          <text x="200" y="292" textAnchor="middle" className="fill-ink" style={display} fontSize="22" fontWeight={800}>
            {badge.name}
          </text>
          <text x="200" y="313" textAnchor="middle" className="fill-ink-soft" style={bodyFont} fontSize="13.5">
            {badge.company}
          </text>
          <text x="200" y="331" textAnchor="middle" className="fill-ink" style={bodyFont} fontSize="12.5" fontWeight={600}>
            {badge.host}
          </text>
          <text x="200" y="347" textAnchor="middle" className="fill-ink-soft" style={bodyFont} fontSize="12">
            {badge.site}
          </text>
          <path d="M116 358h168" stroke="var(--ink)" strokeWidth={2} strokeDasharray="5 6" strokeLinecap="round" />

          <g transform="translate(116 368)">
            <rect x="-4" y="-4" width={11 * q + 8} height={11 * q + 8} rx="6" className="fill-white" stroke="var(--ink)" strokeWidth={2} />
            {cells.map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x * q} y={y * q} width={q} height={q} className="fill-ink" />
            ))}
            <g transform={`scale(${(4 * q) / 16})`}>
              <Finder x={0} y={0} />
              <Finder x={(7 * q * 16) / (4 * q)} y={0} />
              <Finder x={0} y={(7 * q * 16) / (4 * q)} />
            </g>
          </g>
          <text x="174" y="380" className="fill-ink" style={display} fontSize="12" fontWeight={800}>
            {badge.badgeId}
          </text>
          <text x="174" y="396" className="fill-ink-soft" style={bodyFont} fontSize="11.5">
            {badge.valid}
          </text>
          <g transform="translate(174 402)">
            <rect width="112" height="18" rx="9" className="fill-tint" stroke="var(--ink)" strokeWidth={1.6} />
            <text x="56" y="12.5" textAnchor="middle" className="fill-ink" style={bodyFont} fontSize="9.5" fontWeight={700}>
              {badge.escort}
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
}
