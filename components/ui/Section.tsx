import type { ReactNode } from "react";

export type Tone = "paper" | "tint" | "ink" | "primary" | "accent-soft" | "pop-soft";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  tint: "bg-tint text-ink",
  "accent-soft": "bg-accent-soft text-ink",
  "pop-soft": "bg-pop-soft text-ink",
  ink: "on-dark bg-ink text-paper",
  primary: "on-dark bg-primary text-paper",
};

interface SectionProps {
  tone?: Tone;
  id?: string;
  className?: string;
  innerClassName?: string;
  labelledBy?: string;
  children: ReactNode;
}

/** Page band with consistent vertical rhythm and a tone from the palette. */
export function Section({ tone = "paper", id, className = "", innerClassName = "", labelledBy, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative overflow-hidden py-[var(--section-y)] ${tones[tone]} ${className}`}
    >
      <div className={`relative mx-auto w-full max-w-[1240px] px-5 sm:px-8 ${innerClassName}`}>{children}</div>
    </section>
  );
}

type EyebrowStyle = "sticker" | "dash" | "index";

interface EyebrowProps {
  children: ReactNode;
  variant?: EyebrowStyle;
  index?: string;
  className?: string;
}

/** Small lead-in above a heading. Three looks so headings never feel stamped out. */
export function Eyebrow({ children, variant = "dash", index, className = "" }: EyebrowProps) {
  if (variant === "sticker") {
    return (
      <p className={`inline-block -rotate-2 rounded-[var(--radius-tag)] border-2 border-ink bg-accent px-3 py-1 font-display text-sm font-bold text-ink shadow-hard-sm ${className}`}>
        {children}
      </p>
    );
  }
  if (variant === "index") {
    return (
      <p className={`flex items-baseline gap-3 font-display text-[0.95rem] font-semibold ${className}`}>
        <span className="text-[1.6rem] font-extrabold leading-none text-pop">{index}</span>
        <span>{children}</span>
      </p>
    );
  }
  return (
    <p className={`flex items-center gap-3 font-display text-[0.95rem] font-semibold ${className}`}>
      <svg viewBox="0 0 36 8" width="36" height="8" aria-hidden="true" className="shrink-0">
        <path d="M2 5c6-3 10 2 16-1s9-2 16 0" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" />
      </svg>
      {children}
    </p>
  );
}
