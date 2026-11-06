import type { AboutContent } from "@/lib/types";
import { defaultCta } from "./samples";

export const aboutContent: AboutContent = {
  hero: {
    eyebrow: "About",
    title: "We build for organizations where the entrance is a control point",
    description:
      "AceVisitor exists because large organizations still manage visitors with paper logbooks, spreadsheets and sign-in apps that were never designed for multi-site governance.",
    metaTitle: "About",
    metaDescription: "Why AceVisitor exists, what we focus on and how we deploy visitor management across enterprise sites.",
    artLabel: "An old paper logbook being replaced by Kiko, the AceVisitor kiosk robot, at an office entrance",
  },
  mission: {
    eyebrow: "Our mission",
    title: "Make every visit verified, permissioned and recorded",
    body:
      "A visitor program should answer three questions at any moment: who is on site, who approved them, and what they were allowed to access. AceVisitor is designed to answer all three without extra work for reception or security staff.",
    focusTitle: "What we focus on",
    focus: [
      "Enterprise deployments across multiple buildings and regions",
      "Governance: roles, approvals, retention and audit evidence",
      "Entrance operations that work for reception, security and hosts",
      "Configurability without custom development for each site",
    ],
  },
  process: {
    eyebrow: "How we work",
    title: "Deployment led by people who know entrances",
    description: "Every engagement starts with your sites, visitor types and reporting obligations, not a generic template.",
    steps: [
      { title: "Discovery", description: "We map your entrances, visitor categories, approval rules and reporting needs." },
      { title: "Configuration", description: "Global standards and per-site overrides are set up with your security and facilities teams." },
      { title: "Rollout", description: "Phased launch by site, with training for reception, security and hosts." },
    ],
  },
  cta: defaultCta,
};
