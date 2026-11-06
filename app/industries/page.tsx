import type { Metadata } from "next";
import { StreetArt } from "@/components/art/PageArt";
import { ScrollFx } from "@/components/motion/ScrollFx";
import { CtaBand } from "@/components/pages/Shared";
import { Eyebrow, Section } from "@/components/ui/Section";
import { getIndustriesContent } from "@/lib/api/pages";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getIndustriesContent();
  return { title: c.hero.metaTitle, description: c.hero.metaDescription };
}

const tileTone = ["bg-tint", "bg-pop-soft", "bg-accent-soft"];

export default async function IndustriesPage() {
  const c = await getIndustriesContent();

  return (
    <>
      <Section tone="paper" labelledBy="ind-hero" className="!pb-0 !pt-12 sm:!pt-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Eyebrow variant="sticker">{c.hero.eyebrow}</Eyebrow>
            <h1 id="ind-hero" className="mt-6 text-[clamp(2.5rem,5.2vw,4.5rem)] font-extrabold tracking-[-0.04em]">
              {c.hero.title}
            </h1>
          </div>
          <p className="text-lg text-ink-soft sm:text-[1.2rem]">{c.hero.description}</p>
        </div>
        <div className="mt-14 sm:mt-16" data-fx="slide" data-from="bottom">
          <StreetArt label={c.hero.artLabel} />
        </div>
      </Section>

      <Section tone="tint" labelledBy="sectors-title">
        <div className="max-w-3xl">
          <Eyebrow variant="index" index={String(c.sectors.items.length).padStart(2, "0")}>
            {c.sectors.eyebrow}
          </Eyebrow>
          <h2 id="sectors-title" className="mt-4 text-[clamp(2.1rem,4.2vw,3.5rem)] font-extrabold">
            {c.sectors.title}
          </h2>
        </div>
        <ul className="mt-12 border-t-2 border-ink">
          {c.sectors.items.map((s, i) => (
            <li key={s.id} className="grid items-center gap-6 border-b-2 border-dashed border-ink/25 py-8 md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1.1fr_0.9fr] lg:gap-10">
              <div className={`w-40 overflow-hidden rounded-[22px] border-2 border-ink px-3 pt-4 shadow-hard-sm md:w-full ${tileTone[i % 3]}`}>
                <StreetArt sector={s.id} label={s.artLabel} />
              </div>
              <div>
                <h3 className="text-[1.6rem] font-bold">{s.title}</h3>
                <p className="mt-2 text-ink-soft">{s.description}</p>
              </div>
              <ul className="flex flex-wrap gap-2.5 md:col-start-2 lg:col-start-auto" aria-label={s.title}>
                {s.points.map((p) => (
                  <li key={p} className="rounded-[var(--radius-pill)] border-2 border-ink bg-paper px-3.5 py-1.5 text-[0.95rem] font-semibold">
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand cta={c.cta} />
      <ScrollFx />
    </>
  );
}
