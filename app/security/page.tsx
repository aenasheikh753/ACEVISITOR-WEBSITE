import type { Metadata } from "next";
import { KeyRingArt, RecordsArt } from "@/components/art/PageArt";
import { Icon } from "@/components/icons/Icon";
import { ScrollFx } from "@/components/motion/ScrollFx";
import { CheckList, CtaBand, PageHero } from "@/components/pages/Shared";
import { Shield3D } from "@/components/three/Shield3D";
import { Eyebrow, Section } from "@/components/ui/Section";
import { getSecurityContent } from "@/lib/api/pages";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getSecurityContent();
  return { title: c.hero.metaTitle, description: c.hero.metaDescription };
}

export default async function SecurityPage() {
  const c = await getSecurityContent();

  return (
    <>
      <PageHero tone="ink" id="sec-hero" eyebrow={c.hero.eyebrow} title={c.hero.title} description={c.hero.description} art={<Shield3D label={c.hero.artLabel} />} />

      <Section tone="paper" labelledBy="arch-title">
        <div className="max-w-3xl">
          <Eyebrow>{c.architecture.eyebrow}</Eyebrow>
          <h2 id="arch-title" className="mt-4 text-[clamp(2.1rem,4.2vw,3.5rem)] font-extrabold">
            {c.architecture.title}
          </h2>
        </div>
        <ol className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3" data-fx="stagger">
          {c.architecture.items.map((item, i) => (
            <li key={item.title} data-fx-item className="icon-host flex gap-4 border-t-2 border-ink py-7">
              <div className="flex flex-col items-center gap-2">
                <Icon name={item.icon} size={52} />
                <span className="font-display text-xs font-extrabold text-ink-muted" aria-hidden="true">
                  L{i + 1}
                </span>
              </div>
              <div>
                <h3 className="text-[1.2rem] font-bold">{item.title}</h3>
                <p className="mt-1.5 text-ink-soft">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="accent-soft" labelledBy="admin-title">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 mx-auto w-full max-w-[500px] lg:order-1" data-fx="slide" data-from="left">
            <KeyRingArt label={c.admin.artLabel} />
          </div>
          <div className="order-1 lg:order-2">
            <Eyebrow variant="sticker">{c.admin.eyebrow}</Eyebrow>
            <h2 id="admin-title" className="mt-5 text-[clamp(2.1rem,4vw,3.3rem)] font-extrabold">
              {c.admin.title}
            </h2>
            <CheckList items={c.admin.bullets} className="mt-8" />
          </div>
        </div>
      </Section>

      <Section tone="tint" labelledBy="records-title">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>{c.records.eyebrow}</Eyebrow>
            <h2 id="records-title" className="mt-4 text-[clamp(2.1rem,4vw,3.3rem)] font-extrabold">
              {c.records.title}
            </h2>
            <CheckList items={c.records.bullets} className="mt-8" />
          </div>
          <div className="mx-auto w-full max-w-[500px]" data-fx="slide" data-from="right">
            <RecordsArt label={c.records.artLabel} />
          </div>
        </div>
        <aside className="icon-host mt-14 flex flex-col gap-4 rounded-[var(--radius-card)] border-2 border-dashed border-ink bg-paper p-6 sm:flex-row sm:items-center sm:p-8">
          <Icon name="lock" size={56} />
          <p className="text-[1.05rem] text-ink-soft">{c.note}</p>
        </aside>
      </Section>

      <CtaBand cta={c.cta} />
      <ScrollFx />
    </>
  );
}
