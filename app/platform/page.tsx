import type { Metadata } from "next";
import { BadgeArt } from "@/components/art/BadgeArt";
import { ModuleRing } from "@/components/art/PageArt";
import { ConsoleScreen, KioskScreen } from "@/components/home/Screens";
import { Icon } from "@/components/icons/Icon";
import { ScrollFx } from "@/components/motion/ScrollFx";
import { CheckList, CtaBand, PageHero, SectionHead } from "@/components/pages/Shared";
import { Eyebrow, Section } from "@/components/ui/Section";
import { getPlatformContent, getProductSamples } from "@/lib/api/pages";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPlatformContent();
  return { title: c.hero.metaTitle, description: c.hero.metaDescription };
}

export default async function PlatformPage() {
  const [c, samples] = await Promise.all([getPlatformContent(), getProductSamples()]);

  return (
    <>
      <PageHero
        id="platform-hero"
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        description={c.hero.description}
        art={<ModuleRing icons={c.modules.items.map((m) => m.icon)} label={c.hero.artLabel} />}
      />

      {/* Modules: one ruled board, not a pile of cards */}
      <Section tone="tint" labelledBy="modules-title">
        <SectionHead id="modules-title" eyebrow={c.modules.eyebrow} title={c.modules.title} description={c.modules.description} />
        <ol className="mt-14 grid gap-[2px] overflow-hidden rounded-[28px] border-2 border-ink bg-ink/20 shadow-hard sm:grid-cols-2 lg:grid-cols-3" data-fx="stagger">
          {c.modules.items.map((m, i) => (
            <li key={m.title} data-fx-item className="icon-host group relative bg-paper p-7 transition-colors hover:bg-accent-soft sm:p-8">
              <span className="absolute right-6 top-6 font-display text-sm font-bold text-ink-muted" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Icon name={m.icon} size={54} />
              <h3 className="mt-4 text-[1.3rem] font-bold">{m.title}</h3>
              <p className="mt-2 text-ink-soft">{m.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Console */}
      <Section tone="paper" labelledBy="console-title">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Eyebrow>{c.console.eyebrow}</Eyebrow>
            <h2 id="console-title" className="mt-4 text-[clamp(2.1rem,4vw,3.3rem)] font-extrabold">
              {c.console.title}
            </h2>
            <CheckList items={c.console.bullets} className="mt-8" />
          </div>
          <div className="lg:rotate-1" data-fx="slide" data-from="right">
            <div className="rounded-[20px] shadow-primary">
              <ConsoleScreen c={samples.console} />
            </div>
          </div>
        </div>
      </Section>

      {/* Kiosk & badge */}
      <Section tone="accent-soft" labelledBy="kiosk-title">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="relative order-2 pb-16 lg:order-1 lg:pb-0 lg:pr-40" role="img" aria-label={c.kiosk.artLabel}>
            <div aria-hidden="true">
              <KioskScreen k={samples.kiosk} withKiko={false} />
            </div>
            <div className="absolute -bottom-6 right-0 w-[40%] max-w-[180px] rotate-6 sm:w-[32%] lg:-right-2 lg:bottom-4" aria-hidden="true" data-fx="stamp">
              <BadgeArt badge={samples.badge} label="" />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <Eyebrow variant="sticker">{c.kiosk.eyebrow}</Eyebrow>
            <h2 id="kiosk-title" className="mt-5 text-[clamp(2.1rem,4vw,3.3rem)] font-extrabold">
              {c.kiosk.title}
            </h2>
            <ol className="mt-8 space-y-5">
              {c.kiosk.bullets.map((b, i) => (
                <li key={b} className="flex items-start gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-ink bg-paper font-display text-lg font-extrabold shadow-hard-sm">
                    {i + 1}
                  </span>
                  <span className="pt-1.5 text-[1.05rem]">{b}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* Governance */}
      <Section tone="ink" labelledBy="gov-title">
        <SectionHead id="gov-title" dark eyebrow={c.governance.eyebrow} title={c.governance.title} description={c.governance.description} />
        <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-0">
          {c.governance.items.map((g, i) => (
            <li
              key={g.title}
              className={`icon-host md:px-8 ${i > 0 ? "md:border-l-2 md:border-dashed md:border-paper/20" : "md:pl-0"}`}
            >
              <Icon name={g.icon} size={68} />
              <h3 className="mt-5 text-[1.35rem] font-bold">{g.title}</h3>
              <p className="mt-2 text-paper/75">{g.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand cta={c.cta} />
      <ScrollFx />
    </>
  );
}
