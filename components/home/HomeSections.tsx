import { Kiko } from "@/components/art/Characters";
import { EntrancePanorama, KikoStage, PlatformArt, PracticeScene, SecurityArt } from "@/components/art/Scenes";
import { Icon } from "@/components/icons/Icon";
import { Hero3D } from "@/components/three/Hero3D";
import { Sites3D } from "@/components/three/Sites3D";
import { ArrowGlyph, Button } from "@/components/ui/Button";
import { Eyebrow, Section } from "@/components/ui/Section";
import type { HomeContent } from "@/lib/types";
import { JourneyRoad } from "./JourneyRoad";
import { ProductTabs } from "./ProductTabs";
import { ApprovalScreen, ConsoleScreen, KioskScreen } from "./Screens";

function Scribble({ children, color = "var(--accent)" }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="scribble isolate">
      <span className="relative z-10">{children}</span>
      <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true" className="z-0">
        <path
          data-fx="draw"
          data-duration="1.1"
          data-delay="0.35"
          pathLength={1}
          d="M5 15C70 6 150 4 295 9M24 21c80-6 170-8 250-4"
          fill="none"
          stroke={color}
          strokeWidth={9}
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function splitTitle(title: string, highlight: string) {
  const at = title.indexOf(highlight);
  if (!highlight || at < 0) return { before: title, mark: "", punct: "", after: "" };
  const rest = title.slice(at + highlight.length);
  // Keep trailing punctuation glued to the highlighted phrase so it never wraps alone.
  const punct = rest.match(/^[,.;:!?]+/)?.[0] ?? "";
  return { before: title.slice(0, at), mark: highlight, punct, after: rest.slice(punct.length) };
}

/* ---------------- Hero ---------------- */

export function HomeHero({ hero }: { hero: HomeContent["hero"] }) {
  const t = splitTitle(hero.title, hero.highlight);
  const tilts = ["-rotate-2", "rotate-1", "-rotate-1"];
  return (
    <Section tone="paper" labelledBy="hero-title" className="!pt-10 sm:!pt-14 lg:!pt-16">
      <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
        <div>
          <Eyebrow variant="sticker">{hero.eyebrow}</Eyebrow>
          <h1 id="hero-title" className="mt-6 text-[clamp(2.6rem,5.5vw,4.9rem)] font-extrabold tracking-[-0.045em]">
            {t.before}
            {t.mark && (
              <span className="whitespace-nowrap">
                <Scribble>{t.mark}</Scribble>
                {t.punct}
              </span>
            )}
            {t.after}
          </h1>
          <p className="mt-6 max-w-[36rem] text-lg text-ink-soft sm:text-[1.2rem]">{hero.description}</p>
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <Button href={hero.primary.href} size="lg" icon={<ArrowGlyph />}>
              {hero.primary.label}
            </Button>
            <Button href={hero.secondary.href} size="lg" variant="secondary">
              {hero.secondary.label}
            </Button>
          </div>
          <ul className="mt-11 flex flex-wrap gap-4">
            {hero.proof.map((p, i) => (
              <li
                key={p.title}
                data-fx="stamp"
                data-delay={String(0.5 + i * 0.12)}
                className={`relative rounded-[var(--radius-tag)] border-2 border-ink bg-white py-2.5 pl-8 pr-4 shadow-hard-sm ${tilts[i % 3]}`}
              >
                <span className="absolute left-3 top-1/2 size-2.5 -translate-y-1/2 rounded-full border-2 border-ink bg-paper" aria-hidden="true" />
                <span className="block font-display font-extrabold leading-tight">{p.title}</span>
                <span className="block text-sm text-ink-soft">{p.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto aspect-[400/460] w-full max-w-[540px]">
          <svg viewBox="0 0 400 460" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <pattern id="halftone" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="4" cy="4" r="2.2" fill="var(--primary)" opacity={0.28} />
              </pattern>
            </defs>
            <path d="M74 66C140 6 300 10 356 86s40 204-6 278-196 104-270 54S-2 270 8 192s6-66 66-126Z" className="fill-pop" transform="translate(16 16)" />
            <path d="M74 66C140 6 300 10 356 86s40 204-6 278-196 104-270 54S-2 270 8 192s6-66 66-126Z" className="fill-accent" stroke="var(--ink)" strokeWidth={3} />
            <path d="M74 66C140 6 300 10 356 86s40 204-6 278-196 104-270 54S-2 270 8 192s6-66 66-126Z" fill="url(#halftone)" />
            <path d="M328 40v18M319 49h18M30 380v14M23 387h14" stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-x-[6%] inset-y-[2%]">
            <Hero3D badge={hero.badge} label={hero.artLabel} />
          </div>
          <svg
            viewBox="-80 -270 170 280"
            data-fx="slide"
            data-from="left"
            className="absolute -bottom-[4%] -left-[4%] w-[30%] sm:-left-[8%]"
            aria-hidden="true"
          >
            <Kiko scale={1} />
          </svg>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Journey ---------------- */

export function HomeJourney({ journey }: { journey: HomeContent["journey"] }) {
  return (
    <Section tone="tint" labelledBy="journey-title">
      <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Eyebrow>{journey.eyebrow}</Eyebrow>
          <h2 id="journey-title" className="mt-4 text-[clamp(2.1rem,4.4vw,3.6rem)] font-extrabold">
            {journey.title}
          </h2>
        </div>
        <p className="text-lg text-ink-soft">{journey.description}</p>
      </div>
      <div className="mt-16 lg:mt-20">
        <JourneyRoad steps={journey.steps} />
      </div>
    </Section>
  );
}

/* ---------------- Capabilities ---------------- */

export function HomeCapabilities({ capabilities }: { capabilities: HomeContent["capabilities"] }) {
  return (
    <Section tone="ink" labelledBy="cap-title">
      <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Eyebrow variant="index" index={String(capabilities.items.length).padStart(2, "0")} className="text-paper">
            {capabilities.eyebrow}
          </Eyebrow>
          <h2 id="cap-title" className="mt-4 text-[clamp(2.1rem,4.2vw,3.5rem)] font-extrabold">
            {capabilities.title}
          </h2>
          <p className="mt-5 max-w-md text-lg text-paper/75">{capabilities.description}</p>
          <KikoStage className="mt-10 hidden w-full max-w-[300px] lg:block" />
        </div>
        <ul className="grid gap-x-10 sm:grid-cols-2" data-fx="stagger">
          {capabilities.items.map((item) => (
            <li key={item.title} data-fx-item className="icon-host flex gap-4 border-t-2 border-dashed border-paper/20 py-6">
              <Icon name={item.icon} size={52} />
              <div>
                <h3 className="text-[1.22rem] font-bold">{item.title}</h3>
                <p className="mt-1.5 text-[0.98rem] text-paper/75">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------------- Connected platform ---------------- */

export function HomePlatform({ platform }: { platform: HomeContent["platform"] }) {
  return (
    <Section tone="paper" labelledBy="platform-title">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Eyebrow>{platform.eyebrow}</Eyebrow>
          <h2 id="platform-title" className="mt-4 text-[clamp(2.1rem,4.2vw,3.5rem)] font-extrabold">
            {platform.title}
          </h2>
          <p className="mt-5 max-w-lg text-lg text-ink-soft">{platform.description}</p>
          <svg viewBox="0 0 200 70" className="mt-6 hidden w-48 lg:block" aria-hidden="true">
            <path data-fx="draw" pathLength={1} d="M6 20c40 40 110 44 172 18M162 22l18 16-22 10" fill="none" stroke="var(--pop)" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="mx-auto w-full max-w-[600px]">
          <PlatformArt label={platform.imageAlt} nodes={platform.nodes} />
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Security ---------------- */

export function HomeSecurity({ security }: { security: HomeContent["security"] }) {
  return (
    <Section tone="accent-soft" labelledBy="security-title">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 mx-auto w-full max-w-[560px] lg:order-1" data-fx="slide" data-from="left">
          <SecurityArt label={security.imageAlt} />
        </div>
        <div className="order-1 lg:order-2">
          <Eyebrow variant="sticker" className="!bg-pop">
            {security.eyebrow}
          </Eyebrow>
          <h2 id="security-title" className="mt-5 text-[clamp(2.1rem,4.2vw,3.5rem)] font-extrabold">
            {security.title}
          </h2>
          <p className="mt-5 text-lg text-ink-soft">{security.description}</p>
          <ul className="mt-8 space-y-5">
            {security.items.map((item) => (
              <li key={item.title} className="icon-host flex items-start gap-4">
                <Icon name={item.icon} size={46} tint="paper" />
                <div className="border-l-2 border-ink/15 pl-4">
                  <h3 className="text-[1.15rem] font-bold">{item.title}</h3>
                  <p className="mt-1 text-ink-soft">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <Button href={security.action.href} variant="ink" className="mt-9" icon={<ArrowGlyph />}>
            {security.action.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Multi-site ---------------- */

export function HomeMultiSite({ multiSite }: { multiSite: HomeContent["multiSite"] }) {
  return (
    <Section tone="primary" labelledBy="sites-title">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="mx-auto w-full max-w-[600px]">
          <Sites3D label={multiSite.imageAlt} />
        </div>
        <div>
          <Eyebrow className="text-accent-soft">{multiSite.eyebrow}</Eyebrow>
          <h2 id="sites-title" className="mt-4 text-[clamp(2.1rem,4.2vw,3.5rem)] font-extrabold">
            {multiSite.title}
          </h2>
          <p className="mt-5 text-lg text-paper/85">{multiSite.description}</p>
          <ul className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {multiSite.items.map((item) => (
              <li key={item.title} className="icon-host">
                <Icon name={item.icon} size={46} tint={item.icon === "key" ? "accent" : undefined} />
                <h3 className="mt-3 text-[1.15rem] font-bold">{item.title}</h3>
                <p className="mt-1 text-[0.98rem] text-paper/80">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Entrances ---------------- */

export function HomeEntrances({ entrances }: { entrances: HomeContent["entrances"] }) {
  return (
    <Section tone="paper" labelledBy="entrances-title">
      <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow variant="index" index={String(entrances.items.length).padStart(2, "0")}>
            {entrances.eyebrow}
          </Eyebrow>
          <h2 id="entrances-title" className="mt-4 text-[clamp(2.1rem,4.2vw,3.5rem)] font-extrabold">
            {entrances.title}
          </h2>
        </div>
        <p className="text-lg text-ink-soft">{entrances.description}</p>
      </div>
      <div className="mt-14 hidden overflow-hidden rounded-[28px] border-2 border-ink shadow-hard md:block">
        <EntrancePanorama label={entrances.imageAlts.join(". ")} />
      </div>
      <ul className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
        {entrances.items.map((item, i) => (
          <li key={item.title} className="icon-host">
            <div className="mb-6 overflow-hidden rounded-[22px] border-2 border-ink shadow-hard md:hidden">
              <EntrancePanorama zone={i as 0 | 1 | 2} label={entrances.imageAlts[i] ?? item.title} />
            </div>
            <div className="flex items-center gap-3">
              <Icon name={item.icon} size={46} />
              <h3 className="text-[1.35rem] font-bold">{item.title}</h3>
            </div>
            <p className="mt-2 text-ink-soft">{item.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------------- Product ---------------- */

export function HomeProduct({ product }: { product: HomeContent["product"] }) {
  return (
    <Section tone="tint" labelledBy="product-title">
      <div className="max-w-2xl">
        <Eyebrow>{product.eyebrow}</Eyebrow>
        <h2 id="product-title" className="mt-4 text-[clamp(2.1rem,4.2vw,3.5rem)] font-extrabold">
          {product.title}
        </h2>
        <p className="mt-4 text-lg text-ink-soft">{product.description}</p>
      </div>
      <div className="mt-12">
        <ProductTabs
          tabs={product.tabs}
          label={product.tabListLabel}
          panels={{
            console: <ConsoleScreen c={product.console} />,
            kiosk: <KioskScreen k={product.kiosk} />,
            approval: <ApprovalScreen a={product.approval} />,
          }}
        />
      </div>
    </Section>
  );
}

/* ---------------- Practice ---------------- */

export function HomePractice({ practice }: { practice: HomeContent["practice"] }) {
  const tilt = ["md:-rotate-3", "md:rotate-2 md:translate-y-6", "md:-rotate-1"];
  return (
    <Section tone="pop-soft" labelledBy="practice-title">
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
        <div className="max-w-2xl">
          <Eyebrow variant="sticker" className="!bg-tint">
            {practice.eyebrow}
          </Eyebrow>
          <h2 id="practice-title" className="mt-5 text-[clamp(2.1rem,4.2vw,3.5rem)] font-extrabold">
            {practice.title}
          </h2>
          <p className="mt-4 text-lg text-ink-soft">{practice.description}</p>
        </div>
        <Button href={practice.action.href} variant="secondary" className="justify-self-start lg:justify-self-end">
          {practice.action.label}
        </Button>
      </div>
      <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-7">
        {practice.scenes.map((scene, i) => (
          <li key={scene.caption}>
            <figure
              className={`rounded-[6px] border-2 border-ink bg-white p-3 pb-4 shadow-lift transition-transform duration-500 hover:rotate-0 hover:-translate-y-2 ${tilt[i % 3]}`}
            >
              <div className="overflow-hidden rounded-[3px] border-2 border-ink">
                <PracticeScene variant={i as 0 | 1 | 2} label={scene.alt} />
              </div>
              <figcaption className="mt-3 px-1 font-display text-lg font-bold">{scene.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------------- CTA ---------------- */

export function HomeCta({ cta }: { cta: HomeContent["cta"] }) {
  return (
    <Section tone="primary" labelledBy="cta-title">
      <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_0.65fr]">
        <div>
          <h2 id="cta-title" className="text-[clamp(2.3rem,5vw,4.2rem)] font-extrabold">
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
        <KikoStage tone="fill-accent" holdBadge={false} className="mx-auto w-full max-w-[300px]" />
      </div>
    </Section>
  );
}
