import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { Icon } from "@/components/icons/Icon";
import { Eyebrow, Section } from "@/components/ui/Section";
import { getContactContent } from "@/lib/api/pages";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContactContent();
  return { title: c.hero.metaTitle, description: c.hero.metaDescription };
}

export default async function ContactPage() {
  const c = await getContactContent();
  return (
    <Section tone="paper" labelledBy="contact-title" className="!pt-12 sm:!pt-16">
      <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Eyebrow variant="sticker">{c.hero.eyebrow}</Eyebrow>
          <h1 id="contact-title" className="mt-6 text-[clamp(2.5rem,5vw,4.3rem)] font-extrabold tracking-[-0.04em]">
            {c.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-soft">{c.hero.description}</p>
          <ul className="mt-10 border-t-2 border-ink">
            {c.channels.map((ch) => (
              <li key={ch.title} className="icon-host flex items-center gap-5 border-b-2 border-dashed border-ink/25 py-5">
                <Icon name={ch.icon} size={52} />
                <div>
                  <h2 className="text-[1.25rem] font-bold">{ch.title}</h2>
                  <p className="text-ink-soft">{ch.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-7 text-[1.05rem]">
            {c.demoPrompt}{" "}
            <Link href={c.demoLink.href} className="font-bold text-primary underline decoration-accent decoration-[3px] underline-offset-4 hover:text-primary-deep">
              {c.demoLink.label}
            </Link>
          </p>
        </div>
        <div className="rounded-[var(--radius-blob)] border-2 border-ink bg-tint p-6 shadow-primary sm:p-10">
          <LeadForm form={c.form} title={c.formTitle} />
        </div>
      </div>
    </Section>
  );
}
