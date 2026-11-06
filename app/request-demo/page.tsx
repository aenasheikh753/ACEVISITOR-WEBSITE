import type { Metadata } from "next";
import { Kiko } from "@/components/art/Characters";
import { LeadForm } from "@/components/forms/LeadForm";
import { CheckList } from "@/components/pages/Shared";
import { Eyebrow, Section } from "@/components/ui/Section";
import { getDemoContent } from "@/lib/api/pages";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getDemoContent();
  return { title: c.hero.metaTitle, description: c.hero.metaDescription };
}

export default async function RequestDemoPage() {
  const c = await getDemoContent();
  return (
    <Section tone="accent-soft" labelledBy="demo-title" className="!pt-12 sm:!pt-16">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Eyebrow variant="sticker" className="!bg-pop">
            {c.hero.eyebrow}
          </Eyebrow>
          <h1 id="demo-title" className="mt-6 text-[clamp(2.4rem,4.8vw,4.1rem)] font-extrabold tracking-[-0.04em]">
            {c.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-soft">{c.hero.description}</p>
          <CheckList items={c.highlights} className="mt-9" />
          <svg viewBox="-90 -270 180 280" className="mt-10 hidden w-40 lg:block" aria-hidden="true">
            <Kiko holdBadge />
          </svg>
        </div>
        <div className="rounded-[var(--radius-blob)] border-2 border-ink bg-paper p-6 shadow-hard sm:p-10">
          <LeadForm form={c.form} title={c.formTitle} />
        </div>
      </div>
    </Section>
  );
}
