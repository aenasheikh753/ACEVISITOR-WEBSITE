import type { PlatformContent } from "@/lib/types";
import { defaultCta } from "./samples";

export const platformContent: PlatformContent = {
  hero: {
    eyebrow: "Platform",
    title: "One platform for the entire visitor lifecycle",
    description:
      "From the moment a host sends an invitation to the moment a visitor badge is deactivated, AceVisitor keeps a single governed record of who was on site and why.",
    metaTitle: "Platform",
    metaDescription:
      "One platform for the entire visitor lifecycle: pre-registration, kiosk check-in, identity verification, badges, host notifications, check-out and audit.",
    artLabel: "The nine AceVisitor modules arranged in a ring around a single visitor badge",
  },
  modules: {
    eyebrow: "Modules",
    title: "Capabilities that work together, not in silos",
    description: "Each module shares the same visitor record, permissions model and audit trail.",
    items: [
      { icon: "invite", title: "Pre-registration", description: "Hosts schedule visits in advance with purpose, site, duration and required documents." },
      { icon: "kiosk", title: "Kiosk check-in", description: "Guided self-service arrival on tablets, with photo capture and digital signatures." },
      { icon: "verify", title: "Identity verification", description: "Confirm visitor identity, capture a photo and apply internal screening rules." },
      { icon: "printer", title: "Badge issuance", description: "Print photo badges carrying zone access, escort status and validity window." },
      { icon: "bell", title: "Host notifications", description: "Instant alerts by mobile and email with approve, decline or delegate actions." },
      { icon: "checkout", title: "Check-out", description: "Close visits by QR scan, kiosk tap or reception action, with automatic end-of-day rules." },
      { icon: "chart", title: "Audit & reporting", description: "Searchable visitor history, evacuation lists and exportable compliance reports." },
      { icon: "hardhat", title: "Contractor management", description: "Recurring access for contractors with document expiry tracking and escort rules." },
      { icon: "gear", title: "Configuration", description: "Visitor types, document packs, approval chains and branding, per site or globally." },
    ],
  },
  console: {
    eyebrow: "Administration console",
    title: "Front desk and security see the same live picture",
    bullets: [
      "Live view of everyone currently on site, by building and zone",
      "Expected arrivals with host, purpose and required documents",
      "Walk-in registration with immediate host notification",
      "Evacuation list generated on demand for any location",
      "Searchable history by visitor, company, host, site or date range",
    ],
  },
  kiosk: {
    eyebrow: "Kiosk & badge",
    title: "A controlled arrival in under a minute",
    bullets: [
      "Scan the invitation QR code or search by name and host",
      "Confirm details, capture a photo and sign required documents",
      "Safety briefings and site rules shown before access is granted",
      "Badge prints automatically with zone and escort information",
    ],
    artLabel: "Lobby kiosk confirming Robert Smith's details next to his printed visitor badge",
  },
  governance: {
    eyebrow: "Governance",
    title: "Built on access control and accountability",
    description: "Administrative capability is deliberately constrained, and nothing meaningful happens without a record.",
    items: [
      { icon: "key", title: "Role-based permissions", description: "Reception, security, hosts and administrators each receive a scoped set of actions." },
      { icon: "buildings", title: "Site-scoped access", description: "Administrators can be limited to the buildings they are responsible for." },
      { icon: "sign", title: "Document control", description: "Track NDA and induction validity, and block arrivals with expired requirements." },
    ],
  },
  cta: defaultCta,
};
