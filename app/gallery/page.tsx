import type { Metadata } from "next";
import { GalleryViewer } from "@/components/gallery/GalleryViewer";
import { ArrowGlyph, Button } from "@/components/ui/Button";
import { Eyebrow, Section } from "@/components/ui/Section";
import { getGalleryContent } from "@/lib/api/pages";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getGalleryContent();
  return { title: c.hero.metaTitle, description: c.hero.metaDescription };
}

export default async function GalleryPage() {
  const c = await getGalleryContent();
  return (
    <>
      <Section tone="paper" labelledBy="gallery-title" className="!pb-14 !pt-12 sm:!pt-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow variant="sticker">{c.hero.eyebrow}</Eyebrow>
            <h1 id="gallery-title" className="mt-6 text-[clamp(2.6rem,5.6vw,4.8rem)] font-extrabold tracking-[-0.04em]">
              {c.hero.title}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-ink-soft sm:text-[1.2rem]">{c.hero.description}</p>
          </div>
          <Button href={c.hero.action.href} size="lg" icon={<ArrowGlyph />} className="justify-self-start lg:justify-self-end">
            {c.hero.action.label}
          </Button>
        </div>
      </Section>
      <Section tone="tint">
        <GalleryViewer c={c} />
        <p className="mt-10 text-sm text-ink-muted">{c.footnote}</p>
      </Section>
    </>
  );
}
