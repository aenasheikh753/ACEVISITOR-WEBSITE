import { Kiko } from "@/components/art/Characters";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getNotFoundContent } from "@/lib/api/pages";

export default async function NotFound() {
  const c = await getNotFoundContent();
  return (
    <Section tone="tint" labelledBy="nf-title">
      <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
        <svg viewBox="-90 -270 180 280" className="mx-auto w-44 md:w-56" aria-hidden="true">
          <Kiko />
        </svg>
        <div>
          <p className="font-display text-[5rem] font-extrabold leading-none text-transparent [-webkit-text-stroke:2px_var(--primary)]" aria-hidden="true">
            404
          </p>
          <h1 id="nf-title" className="mt-3 text-[clamp(2.2rem,4.4vw,3.4rem)] font-extrabold">
            {c.title}
          </h1>
          <p className="mt-3 max-w-lg text-lg text-ink-soft">{c.description}</p>
          <Button href={c.action.href} size="lg" className="mt-8">
            {c.action.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
