import type { Metadata } from "next";
import { ContractorArt, TeamsArt } from "@/components/art/PageArt";
import { SitesArt } from "@/components/art/Scenes";
import { ConsoleScreen } from "@/components/home/Screens";
import { Icon } from "@/components/icons/Icon";
import { ScrollFx } from "@/components/motion/ScrollFx";
import { CheckList, CtaBand, PageHero } from "@/components/pages/Shared";
import { Eyebrow, Section, type Tone } from "@/components/ui/Section";
import { getProductSamples, getSolutionsContent } from "@/lib/api/pages";
import type { ConsoleContent, SolutionBlock } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getSolutionsContent();
  return { title: c.hero.metaTitle, description: c.hero.metaDescription };
}

function BlockArt({ block, console }: { block: SolutionBlock; console: ConsoleContent }) {
  if (block.id === "multi-site") {
    return (
      <div className="rounded-[var(--radius-blob)] border-2 border-ink bg-tint p-6 shadow-hard">
        <SitesArt label={block.artLabel} />
      </div>
    );
  }
  if (block.id === "contractors") return <ContractorArt label={block.artLabel} />;
  return (
    <div role="img" aria-label={block.artLabel} className="-rotate-1 rounded-[20px] shadow-primary">
      <div aria-hidden="true">
        <ConsoleScreen c={console} />
      </div>
    </div>
  );
}

const tones: Tone[] = ["paper", "accent-soft", "paper"];

export default async function SolutionsPage() {
  const [c, samples] = await Promise.all([getSolutionsContent(), getProductSamples()]);
  const total = String(c.blocks.length).padStart(2, "0");

  return (
    <>
      <PageHero tone="tint" id="solutions-hero" eyebrow={c.hero.eyebrow} title={c.hero.title} description={c.hero.description} art={<TeamsArt label={c.hero.artLabel} />} />

      {c.blocks.map((block, i) => {
        const flip = i % 2 === 1;
        return (
          <Section key={block.id} tone={tones[i % tones.length]} labelledBy={`sol-${block.id}`}>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div className={flip ? "lg:order-2" : undefined}>
                <Eyebrow variant="index" index={`${String(i + 1).padStart(2, "0")}/${total}`}>
                  <span className="icon-host inline-flex items-center gap-2">
                    <Icon name={block.icon} size={30} tint="none" />
                  </span>
                </Eyebrow>
                <h2 id={`sol-${block.id}`} className="mt-4 text-[clamp(2.1rem,4vw,3.3rem)] font-extrabold">
                  {block.title}
                </h2>
                <p className="mt-4 text-lg text-ink-soft">{block.description}</p>
                <CheckList items={block.bullets} className="mt-8" />
              </div>
              <div className={`mx-auto w-full max-w-[580px] ${flip ? "lg:order-1" : ""}`} data-fx="slide" data-from={flip ? "left" : "right"}>
                <BlockArt block={block} console={samples.console} />
              </div>
            </div>
          </Section>
        );
      })}

      <Section tone="ink" labelledBy="outcomes-title">
        <div className="max-w-3xl">
          <Eyebrow className="text-paper">{c.outcomes.eyebrow}</Eyebrow>
          <h2 id="outcomes-title" className="mt-4 text-[clamp(2.1rem,4.2vw,3.5rem)] font-extrabold">
            {c.outcomes.title}
          </h2>
        </div>
        <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
          {c.outcomes.items.map((o, i) => (
            <li key={o.title} data-fx="stamp">
              <span
                className="block font-display text-[5.5rem] font-extrabold leading-none text-transparent [-webkit-text-stroke:2px_var(--accent)]"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-[1.45rem] font-bold">{o.title}</h3>
              <p className="mt-2 text-paper/75">{o.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand cta={c.cta} />
      <ScrollFx />
    </>
  );
}
