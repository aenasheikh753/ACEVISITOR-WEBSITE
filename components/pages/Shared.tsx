import type { ReactNode } from "react";
import { KikoStage } from "@/components/art/Scenes";
import { ArrowGlyph, Button } from "@/components/ui/Button";
import { Eyebrow, Section, type Tone } from "@/components/ui/Section";
import type { CtaContent } from "@/lib/types";

/** Closing call to action shared by every inner page. */
export function CtaBand({ cta, id = "cta-title" }: { cta: CtaContent; id?: string }) {
  return (
    <Section tone="primary" labelledBy={id}>
      <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_0.65fr]">
        <div>
          <h2 id={id} className="text-[clamp(2.3rem,5vw,4.2rem)] font-extrabold">
            {cta.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-paper/85">{cta.description}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href={cta.primary.href} variant="paper" size="lg" icon={<ArrowGlyph />}>
              {cta.primary.label}
            </Button>
            <Button href={cta.secondary.href} variant="accent" size="lg">
              {cta.secondary.label}
            </Button>
          </div>
        </div>
        <KikoStage tone="fill-accent" holdBadge={false} className="mx-auto w-full max-w-[280px]" />
      </div>
    </Section>
  );
}

/** Hand-drawn tick list. */
export function CheckList({ items, dark = false, className = "" }: { items: string[]; dark?: boolean; className?: string }) {
  return (
    <ul className={`space-y-4 ${className}`} data-fx="stagger">
      {items.map((item) => (
        <li key={item} data-fx-item className="flex items-start gap-3.5">
          <svg viewBox="0 0 28 28" width="28" height="28" className="mt-0.5 shrink-0" aria-hidden="true">
            <path d="M14 2.5c6.5 0 11.5 4.8 11.5 11.4S20.4 25.5 14 25.5 2.5 20.6 2.5 14 7.6 2.5 14 2.5Z" className={dark ? "fill-accent" : "fill-accent"} stroke="var(--ink)" strokeWidth={2} />
            <path d="m8.5 14.5 4 4 7.5-9" fill="none" stroke="var(--ink)" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={`text-[1.05rem] ${dark ? "text-paper/90" : "text-ink"}`}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

interface PageHeroProps {
  tone?: Tone;
  eyebrow: string;
  title: string;
  description: string;
  art: ReactNode;
  id: string;
  /** Art on the left instead of the right. */
  reverse?: boolean;
  children?: ReactNode;
  eyebrowVariant?: "sticker" | "dash" | "index";
}

/** Split hero for inner pages: copy and art vertically centred. */
export function PageHero({ tone = "paper", eyebrow, title, description, art, id, reverse = false, children, eyebrowVariant = "sticker" }: PageHeroProps) {
  const dark = tone === "ink" || tone === "primary";
  return (
    <Section tone={tone} labelledBy={id} className="!pt-12 sm:!pt-16">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className={reverse ? "lg:order-2" : undefined}>
          <Eyebrow variant={eyebrowVariant}>{eyebrow}</Eyebrow>
          <h1 id={id} className="mt-6 text-[clamp(2.5rem,5.2vw,4.5rem)] font-extrabold tracking-[-0.04em]">
            {title}
          </h1>
          <p className={`mt-6 max-w-[36rem] text-lg sm:text-[1.2rem] ${dark ? "text-paper/80" : "text-ink-soft"}`}>{description}</p>
          {children}
        </div>
        <div className={`mx-auto w-full max-w-[560px] ${reverse ? "lg:order-1" : ""}`}>{art}</div>
      </div>
    </Section>
  );
}

/** Two-line section heading block used on inner pages. */
export function SectionHead({
  eyebrow,
  title,
  description,
  id,
  dark = false,
  variant = "dash",
  index,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  id: string;
  dark?: boolean;
  variant?: "sticker" | "dash" | "index";
  index?: string;
}) {
  return (
    <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
      <div>
        <Eyebrow variant={variant} index={index} className={dark ? "text-paper" : undefined}>
          {eyebrow}
        </Eyebrow>
        <h2 id={id} className="mt-4 text-[clamp(2.1rem,4.2vw,3.5rem)] font-extrabold">
          {title}
        </h2>
      </div>
      {description && <p className={`text-lg ${dark ? "text-paper/75" : "text-ink-soft"}`}>{description}</p>}
    </div>
  );
}
