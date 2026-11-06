import type { SolutionsContent } from "@/lib/types";
import { defaultCta } from "./samples";

export const solutionsContent: SolutionsContent = {
  hero: {
    eyebrow: "Solutions",
    title: "Built for the teams accountable for who is on site",
    description:
      "Security leaders, facilities teams and reception staff work from one platform with one visitor record, whether you run two buildings or two hundred.",
    metaTitle: "Solutions",
    metaDescription:
      "Multi-site visitor programs, contractor and vendor access, and front desk operations on one AceVisitor platform.",
    artLabel: "A security lead, a facilities manager and a receptionist standing together on one platform",
  },
  blocks: [
    {
      id: "multi-site",
      icon: "buildings",
      title: "Multi-site visitor programs",
      description: "Standardize how every building receives visitors, while giving each site control of the details it owns.",
      bullets: [
        "Global visitor types, documents and approval chains",
        "Per-site hours, zones, escort rules and badge layouts",
        "Estate-wide reporting with per-building drill-down",
      ],
      artLabel: "Several connected sites sharing one visitor standard",
    },
    {
      id: "contractors",
      icon: "hardhat",
      title: "Contractor and vendor access",
      description: "Give recurring workers controlled, time-bound access without losing track of inductions and insurance documents.",
      bullets: [
        "Recurring visit schedules with validity windows",
        "Document expiry tracking that blocks non-compliant arrivals",
        "Escort requirements and restricted zone flags on the badge",
      ],
      artLabel: "A contractor with a time-bound badge, a recurring schedule and checked documents",
    },
    {
      id: "front-desk",
      icon: "desk",
      title: "Front desk operations",
      description: "Reduce queueing at reception and give front desk teams a clear, auditable workflow for every arrival.",
      bullets: [
        "Expected-arrivals list with one-tap check-in",
        "Walk-in registration with immediate host notification",
        "Badge reprint, early check-out and no-show handling",
      ],
      artLabel: "AceVisitor administration console showing today's visitor activity",
    },
  ],
  outcomes: {
    eyebrow: "Operational outcomes",
    title: "What changes once visitor management is governed",
    items: [
      { title: "Fewer unverified arrivals", description: "Every visitor is expected, identified and tied to a host before a badge is issued." },
      { title: "Faster lobby throughput", description: "Pre-registration and QR arrival reduce the time each visitor spends at the desk." },
      { title: "Evidence on demand", description: "Produce a defensible record of site attendance for audits and investigations." },
    ],
  },
  cta: defaultCta,
};
