import type { Metadata } from "next";
import Link from "next/link";
import { EntranceArt } from "@/components/art/PageArt";
import { LeadForm } from "@/components/forms/LeadForm";
import { Eyebrow, Section } from "@/components/ui/Section";
import { getLoginContent } from "@/lib/api/pages";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getLoginContent();
  return { title: c.metaTitle, description: c.description };
}

export default async function LoginPage() {
  const c = await getLoginContent();
  return (
    <Section tone="pop-soft" labelledBy="login-title" className="!pt-12 sm:!pt-16">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="mx-auto hidden w-full max-w-[480px] lg:block">
          <EntranceArt label={c.artLabel} />
        </div>
        <div className="mx-auto w-full max-w-[480px] rounded-[var(--radius-blob)] border-2 border-ink bg-paper p-7 shadow-primary sm:p-10">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h1 id="login-title" className="mt-4 text-[clamp(2rem,4vw,2.8rem)] font-extrabold">
            {c.title}
          </h1>
          <p className="mb-8 mt-3 text-ink-soft">{c.description}</p>
          <LeadForm form={c.form} />
          <Link href={c.forgot.href} className="mt-2 inline-block font-semibold text-primary underline underline-offset-4 hover:text-primary-deep">
            {c.forgot.label}
          </Link>
        </div>
      </div>
    </Section>
  );
}
