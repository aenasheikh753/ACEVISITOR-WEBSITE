import type { SecurityPageContent } from "@/lib/types";

export const securityContent: SecurityPageContent = {
  hero: {
    eyebrow: "Security",
    title: "Visitor data is sensitive. We treat it that way.",
    description:
      "AceVisitor is built around least-privilege access, strict tenant isolation and a complete record of administrative activity.",
    metaTitle: "Security",
    metaDescription:
      "Least-privilege access, tenant isolation, multi-factor authentication, encryption and immutable audit logging in AceVisitor.",
    artLabel: "A shield with a check mark protecting visitor records",
  },
  architecture: {
    eyebrow: "Architecture",
    title: "Controls that apply at every layer",
    items: [
      { icon: "layers", title: "Tenant separation", description: "Each organization's data is isolated, with no shared visitor records between tenants." },
      { icon: "key", title: "Role-based access control", description: "Reception, security, host and administrator roles carry distinct, explicit permissions." },
      { icon: "phone", title: "Multi-factor authentication", description: "Administrative sign-in can require a second factor, enforced by policy." },
      { icon: "lock", title: "Encryption", description: "Data is encrypted in transit and at rest across the platform." },
      { icon: "audit", title: "Immutable audit logging", description: "Check-ins, approvals, badge prints and configuration changes are recorded and retained." },
      { icon: "sliders", title: "Data minimization", description: "Collect only the visitor fields a site requires, with configurable retention periods." },
    ],
  },
  admin: {
    eyebrow: "Administrative control",
    title: "Least privilege by default",
    bullets: [
      "Permissions are granted explicitly, never inherited by accident",
      "Administrators can be scoped to specific sites or regions",
      "Sensitive actions require elevated roles and are always logged",
      "Account access can be revoked immediately across all sites",
    ],
    artLabel: "A key ring with separate keys for each role next to a locked administrator door",
  },
  records: {
    eyebrow: "Records & retention",
    title: "Defensible visitor history",
    bullets: [
      "Searchable visit records by visitor, host, company, site and date",
      "Evacuation and on-site reports generated for any location in real time",
      "Exportable logs for internal audit and investigation requests",
      "Retention windows configurable to your organization's policy",
    ],
    artLabel: "A filing cabinet of visit records with a magnifying glass and an exported report",
  },
  note:
    "Security questionnaires, architecture documentation and details of our current compliance posture are shared directly with prospective customers under review. Contact our team to request them.",
  cta: {
    title: "Request a security review session",
    description: "We can walk your security and IT teams through the platform's access model, data handling and audit capabilities.",
    primary: { label: "Request a demo", href: "/request-demo" },
    secondary: { label: "Talk to sales", href: "/contact" },
  },
};
