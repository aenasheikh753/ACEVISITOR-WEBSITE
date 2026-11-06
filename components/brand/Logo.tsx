interface LogoMarkProps {
  className?: string;
  size?: number;
}

/** The badge mark: a lanyard visitor badge whose letter "A" smiles. */
export function LogoMark({ className = "", size = 40 }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} aria-hidden="true" focusable="false">
      <rect x="9.5" y="9.5" width="26" height="28" rx="6.5" className="fill-pop" />
      <rect x="6.5" y="7" width="26" height="28" rx="6.5" className="fill-primary stroke-ink" strokeWidth={2.4} />
      <rect x="15.5" y="2.5" width="8" height="7" rx="2.2" className="fill-accent stroke-ink" strokeWidth={2.2} />
      <rect x="15.5" y="11.5" width="8" height="2.6" rx="1.3" className="fill-paper" />
      <path d="M12.5 30.5 19.5 17l7 13.5" className="fill-none stroke-paper" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.2 25.4c2.6 2.2 6 2.2 8.6 0" className="fill-none stroke-accent" strokeWidth={2.8} strokeLinecap="round" />
    </svg>
  );
}

interface LogoProps {
  tone?: "light" | "dark";
  className?: string;
  brand: string;
}

/** Mark + wordmark. `tone="dark"` is for use on ink or primary backgrounds. */
export function Logo({ tone = "light", className = "", brand }: LogoProps) {
  const first = brand.slice(0, 3).toLowerCase();
  const rest = brand.slice(3).toLowerCase();
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="font-display text-[1.45rem] font-extrabold leading-none tracking-[-0.04em]" aria-hidden="true">
        <span className={tone === "dark" ? "text-paper" : "text-ink"}>{first}</span>
        <span className={tone === "dark" ? "text-accent" : "text-primary"}>{rest}</span>
      </span>
      <span className="sr-only">{brand}</span>
    </span>
  );
}
