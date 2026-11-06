import type { Metadata } from "next";
import { EntranceArt } from "@/components/art/PageArt";
import { ScrollFx } from "@/components/motion/ScrollFx";
import { CheckList, CtaBand, PageHero, SectionHead } from "@/components/pages/Shared";
import { Eyebrow, Section } from "@/components/ui/Section";
import { getAboutContent } from "@/lib/api/pages";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getAboutContent();
  return { title: c.hero.metaTitle, description: c.hero.metaDescription };
}

const stepTone = ["bg-accent", "bg-pop", "bg-primary text-paper"];

export default async function AboutPage() {
  const c = await getAboutContent();

  return (
    <>
      <PageHero tone="pop-soft" id="about-hero" eyebrow={c.hero.eyebrow} title={c.hero.title} description={c.hero.description} art={<EntranceArt label={c.hero.artLabel} logbook />} />

      <Section tone="paper" labelledBy="mission-title">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Eyebrow>{c.mission.eyebrow}</Eyebrow>
            <h2 id="mission-title" className="mt-4 text-[clamp(2.3rem,4.6vw,3.9rem)] font-extrabold">
              {c.mission.title}
            </h2>
            <p className="mt-6 border-l-4 border-accent pl-5 text-lg text-ink-soft sm:text-xl">{c.mission.body}</p>
          </div>
          {/* Notebook page */}
          <div
            className="relative rotate-1 rounded-[14px] border-2 border-ink bg-white p-7 pl-12 shadow-hard sm:p-9 sm:pl-14"
            style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0, transparent 35px, var(--tint) 35px, var(--tint) 37px)" }}
          >
            <span className="absolute inset-y-0 left-7 w-0.5 bg-pop sm:left-9" aria-hidden="true" />
            <h3 className="text-[1.5rem] font-bold">{c.mission.focusTitle}</h3>
            <CheckList items={c.mission.focus} className="mt-6" />
          </div>
        </div>
      </Section>

      <Section tone="tint" labelledBy="process-title">
        <SectionHead id="process-title" eyebrow={c.process.eyebrow} title={c.process.title} description={c.process.description} />
        <div className="relative mt-16">
          <svg viewBox="0 0 1000 60" preserveAspectRatio="none" className="absolute left-[8%] right-[8%] top-7 hidden h-14 w-[84%] md:block" aria-hidden="true">
            <path data-fx="draw" data-duration="1.6" pathLength={1} d="M10 30C180 -6 320 66 500 30S820 -6 990 30" fill="none" stroke="var(--ink)" strokeWidth={3} strokeDasharray="1" strokeLinecap="round" />
          </svg>
          <ol className="relative grid gap-12 md:grid-cols-3 md:gap-8">
            {c.process.steps.map((s, i) => (
              <li key={s.title} className="text-left md:text-center">
                <span
                  data-fx="stamp"
                  className={`inline-grid size-16 place-items-center rounded-full border-2 border-ink font-display text-2xl font-extrabold shadow-hard ${stepTone[i % 3]}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-[1.5rem] font-bold">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-ink-soft md:max-w-[17rem]">{s.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <CtaBand cta={c.cta} />
      <ScrollFx />
    </>
  );
}
