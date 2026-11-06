import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button, ArrowGlyph } from "@/components/ui/Button";
import type { FooterContent } from "@/lib/types";

/** Hand-drawn skyline that runs along the top of the footer. */
function Skyline() {
  return (
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="block h-14 w-full sm:h-20" aria-hidden="true">
      <path
        d="M0 90V62h70V38h46v24h40V20h64v42h38V48h52v14h60V30l30-16 30 16v32h52V44h70v18h44V10h58v52h36V40h48v22h70V28h40v34h56V50h62v12h46V22h64v40h50V44h52v18h60V34h44v28h46V90Z"
        className="fill-paper" opacity={0.05}
      />
      <path
        d="M0 62h70V38h46v24h40V20h64v42h38V48h52v14h60V30l30-16 30 16v32h52V44h70v18h44V10h58v52h36V40h48v22h70V28h40v34h56V50h62v12h46V22h64v40h50V44h52v18h60V34h44v28h46"
        fill="none"
        className="stroke-accent"
        strokeWidth={2}
        strokeDasharray="10 8"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function Footer({ content, brand }: { content: FooterContent; brand: string }) {
  return (
    <footer className="on-dark relative bg-ink">
      <Skyline />
      <div className="bg-ink text-paper">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 pb-10 pt-14 sm:px-8 lg:grid-cols-[1.2fr_1.8fr] lg:items-center">
          <div className="max-w-md">
            <Link href="/" className="inline-block rounded-[10px]">
              <Logo brand={brand} tone="dark" />
            </Link>
            <p className="mt-5 text-paper/80">{content.summary}</p>
            <Button href={content.cta.href} variant="paper" className="mt-7" icon={<ArrowGlyph />}>
              {content.cta.label}
            </Button>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {content.groups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="font-display text-lg font-bold text-accent">{group.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.href}-${link.label}`}>
                      <Link href={link.href} className="text-paper/85 underline-offset-4 transition-colors hover:text-paper hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="flex flex-col gap-4 border-t-2 border-dashed border-paper/20 py-7 text-[0.92rem] text-paper/70 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p>{content.copyright}</p>
              <p>
                {content.legalNote}{" "}
                <a href={content.legalLink.href} className="text-paper underline underline-offset-4 hover:text-accent" target="_blank" rel="noreferrer">
                  {content.legalLink.label}
                </a>
                .
              </p>
            </div>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {content.bottomLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="underline-offset-4 hover:text-paper hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
