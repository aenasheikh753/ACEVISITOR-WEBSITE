import type { HomeContent } from "@/lib/types";

const consoleRows: HomeContent["product"]["console"]["rows"] = [
  { visitor: "Robert Smith", host: "James Wilson", status: "On site", tone: "onsite", time: "09:42" },
  { visitor: "Elena Marsh", host: "Priya Raman", status: "Pre-registered", tone: "pre", time: "11:15" },
  { visitor: "Daniel Okafor", host: "Maria Gomez", status: "Checked out", tone: "out", time: "08:05" },
  { visitor: "Aiko Tanaka", host: "James Wilson", status: "On site", tone: "onsite", time: "10:28" },
];

export const homeContent: HomeContent = {
  hero: {
    eyebrow: "Enterprise visitor management",
    title: "Control every entrance, across every site.",
    highlight: "every entrance",
    description:
      "AceVisitor replaces paper logbooks and disconnected sign-in apps with one governed platform for pre-registration, verified check-in, host approval, badge printing and audit-ready visitor records.",
    primary: { label: "Request a demo", href: "/request-demo" },
    secondary: { label: "Explore the platform", href: "/platform" },
    proof: [
      { title: "Multi-site", detail: "One tenant, many buildings" },
      { title: "Role-based", detail: "Separation of duties" },
      { title: "Auditable", detail: "Every event recorded" },
    ],
    badge: {
      brand: "AceVisitor",
      label: "Visitor",
      name: "Robert Smith",
      company: "Northstar Technology",
      host: "Host: James Wilson",
      site: "Dallas Headquarters",
      badgeId: "Badge #V-10248",
      valid: "Valid 09:42 – 18:00",
      escort: "Escort not required",
    },
    artLabel:
      "AceVisitor visitor badge for Robert Smith of Northstar Technology, hosted by James Wilson at Dallas Headquarters, valid 09:42 – 18:00.",
  },
  journey: {
    eyebrow: "The visitor journey",
    title: "Nine governed steps from invitation to audit record",
    description:
      "Each step is logged, permissioned and configurable per site, so security, reception and hosts work from the same source of truth.",
    steps: [
      { number: "01", icon: "invite", title: "Invite", description: "Hosts pre-register visitors with date, purpose and site." },
      { number: "02", icon: "qr", title: "Pre-register", description: "Visitors receive a QR invitation and complete details in advance." },
      { number: "03", icon: "door", title: "Arrive", description: "Reception or kiosk recognises the booking on arrival." },
      { number: "04", icon: "verify", title: "Verify", description: "Identity, photo capture and watchlist screening." },
      { number: "05", icon: "sign", title: "Agree", description: "NDAs, safety briefings and site rules signed digitally." },
      { number: "06", icon: "badge", title: "Badge", description: "Photo badge printed with zone, host and validity window." },
      { number: "07", icon: "phone", title: "Host approval", description: "Host is notified and approves from their phone." },
      { number: "08", icon: "checkout", title: "Check out", description: "Badge scan or kiosk tap closes the visit automatically." },
      { number: "09", icon: "audit", title: "Audit", description: "Every event is written to an immutable visitor record." },
    ],
  },
  capabilities: {
    eyebrow: "Core capabilities",
    title: "Everything a controlled entrance needs",
    description:
      "Built for organizations where visitor records matter to security, compliance and operations teams alike.",
    items: [
      { icon: "invite", title: "Pre-registration & invitations", description: "Hosts invite visitors ahead of time with purpose, site, host and expected window, so arrival takes seconds." },
      { icon: "kiosk", title: "Self-service kiosk check-in", description: "Guided tablet flow with photo capture, document signing and multilingual prompts for unattended lobbies." },
      { icon: "printer", title: "Badge printing", description: "Photo badges with zone permissions, escort requirements, host name and a scannable validity window." },
      { icon: "qr", title: "QR check-in & check-out", description: "Scan at the gate, lobby or turnstile to open and close a visit without touching a keyboard." },
      { icon: "bell", title: "Host notification & approval", description: "Hosts approve, decline or delegate arrivals from mobile, email or the console in real time." },
      { icon: "audit", title: "Audit-ready visitor logs", description: "Complete, exportable records of who was on site, where, with whom and for how long." },
      { icon: "buildings", title: "Multi-site administration", description: "Standard policy across regions with per-site overrides for hours, zones and approval rules." },
      { icon: "key", title: "Role-based access control", description: "Reception, security, host and administrator roles see only what their responsibilities require." },
    ],
  },
  platform: {
    eyebrow: "One connected platform",
    title: "Kiosk, console, badges and cloud — working as one",
    description:
      "Self-service kiosks, host approvals, QR badge printing and multi-site visibility all run on the same cloud platform, so every entrance stays in sync.",
    imageAlt:
      "AceVisitor platform connecting laptop console, check-in kiosk, mobile approvals, badge printer and cloud services",
    nodes: { console: "Console", kiosk: "Kiosk", phone: "Approvals", printer: "Badges", cloud: "Cloud" },
  },
  security: {
    eyebrow: "Security architecture",
    title: "Designed for separation, not convenience",
    description:
      "AceVisitor keeps tenants, sites and roles isolated by design. Access is granted explicitly, and every administrative action is recorded.",
    items: [
      { icon: "layers", title: "Tenant separation", description: "Organization data is isolated at every layer of the platform." },
      { icon: "key", title: "Role-based access control", description: "Reception, security, hosts and administrators hold distinct permissions." },
      { icon: "lock", title: "Multi-factor authentication", description: "Administrative accounts can require a second factor at sign-in." },
      { icon: "audit", title: "Immutable audit logging", description: "Check-ins, approvals, badge prints and configuration changes are all recorded." },
    ],
    action: { label: "Read the security overview", href: "/security" },
    imageAlt: "AceVisitor dashboard on a laptop with multi-factor authentication on a phone",
  },
  multiSite: {
    eyebrow: "Multi-site management",
    title: "One policy, every building, every region",
    description:
      "Roll out a consistent visitor standard across headquarters, plants, clinics, campuses and data centers, while letting each site adapt the details it owns.",
    items: [
      { icon: "gear", title: "Central configuration", description: "Define global visitor types, documents and approval rules once, then inherit them everywhere." },
      { icon: "sliders", title: "Per-site overrides", description: "Adjust opening hours, zones, escort rules and badge layouts for a single location." },
      { icon: "key", title: "Scoped administration", description: "Site administrators manage their own entrances without seeing other locations." },
      { icon: "chart", title: "Consolidated reporting", description: "Review visitor volumes and incidents across the whole estate or one building." },
    ],
    imageAlt:
      "AceVisitor multi-site overview connecting corporate offices, healthcare facilities, schools, construction sites and data centers",
  },
  entrances: {
    eyebrow: "Entrance experience",
    title: "Every arrival point, handled the same way",
    description:
      "Attended desks, unattended lobbies and perimeter gates run on the same records and the same rules.",
    items: [
      { icon: "desk", title: "Reception desk", description: "Attended check-in where front desk staff process arrivals, print badges and manage walk-ins." },
      { icon: "kiosk", title: "Lobby kiosk", description: "Unattended self-service tablets for high-volume entrances and after-hours arrivals." },
      { icon: "gate", title: "Security gate", description: "Vehicle and contractor control with QR verification, escort flags and zone permissions." },
    ],
    imageAlts: [
      "Receptionist at a front desk handing a printed badge to a visitor",
      "Kiko, the AceVisitor kiosk robot, welcoming a visitor in an unattended lobby",
      "Security gate with a raised barrier and a guard scanning a contractor's QR code",
    ],
  },
  product: {
    eyebrow: "Inside the product",
    title: "Console, kiosk and host approval",
    description: "A closer look at the three screens your teams and visitors use every day.",
    tabListLabel: "Product screens",
    tabs: [
      { id: "console", label: "Administration console" },
      { id: "kiosk", label: "Lobby kiosk" },
      { id: "approval", label: "Host approval" },
    ],
    console: {
      title: "Administration Console · Dallas Headquarters",
      dayLabel: "Today",
      heading: "Visitor activity",
      searchLabel: "Search visitors",
      stats: [
        { value: "38", label: "On site now" },
        { value: "112", label: "Expected today" },
        { value: "17", label: "Contractors" },
      ],
      columns: { visitor: "Visitor", host: "Host", status: "Status", time: "Time" },
      rows: consoleRows,
    },
    kiosk: {
      site: "Dallas Headquarters",
      device: "Lobby Kiosk 02",
      greeting: "Welcome. Please check in.",
      step: "Step 2 of 4 · Confirm your details",
      fields: [
        { label: "Full name", value: "Robert Smith" },
        { label: "Company", value: "Northstar Technology" },
        { label: "Host", value: "James Wilson" },
        { label: "Purpose of visit", value: "Vendor review meeting" },
      ],
      note: "Photo capture and NDA signature next",
      action: "Continue",
    },
    approval: {
      label: "Visitor arrival",
      name: "Robert Smith",
      company: "Northstar Technology",
      location: "Dallas Headquarters · Lobby",
      timing: "Arrived 09:42 · Meeting 10:00",
      checks: "NDA signed · Photo captured",
      approve: "Approve",
      decline: "Decline",
      host: "Host: James Wilson",
    },
  },
  practice: {
    eyebrow: "See it in practice",
    title: "One platform at every entrance",
    description: "From lobby kiosks to host approvals on the go — a look at AceVisitor in everyday use.",
    scenes: [
      {
        alt: "AceVisitor check-in kiosk, reception console and host approval on a phone in a hotel lobby",
        caption: "Hotel lobby",
      },
      {
        alt: "Receptionist handing a visitor their printed AceVisitor badge at a corporate front desk",
        caption: "Corporate front desk",
      },
      {
        alt: "Host approving a visitor from a phone while the console shows pending approvals at an office lobby",
        caption: "Office lobby",
      },
    ],
    action: { label: "Explore the screenshot gallery →", href: "/gallery" },
  },
  cta: {
    title: "See AceVisitor running at your entrances",
    description:
      "Walk through pre-registration, kiosk check-in, host approval, badge printing and audit reporting with an enterprise specialist.",
    primary: { label: "Request a demo", href: "/request-demo" },
    secondary: { label: "Talk to sales", href: "/contact" },
  },
};
