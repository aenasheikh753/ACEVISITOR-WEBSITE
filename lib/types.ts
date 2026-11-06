/**
 * Content types for the AceVisitor marketing site.
 * Every piece of user-facing copy is described here so a CMS can supply it later.
 */

export type IconName =
  | "invite"
  | "qr"
  | "door"
  | "verify"
  | "sign"
  | "badge"
  | "phone"
  | "checkout"
  | "audit"
  | "kiosk"
  | "printer"
  | "bell"
  | "buildings"
  | "key"
  | "shield"
  | "layers"
  | "lock"
  | "gear"
  | "sliders"
  | "chart"
  | "desk"
  | "gate"
  | "cloud"
  | "chat"
  | "hardhat";

export interface LinkContent {
  label: string;
  href: string;
}

export interface FeatureContent {
  icon: IconName;
  title: string;
  description: string;
}

export interface StepContent extends FeatureContent {
  number: string;
}

/* ---------- Site-wide ---------- */

export interface NavContent {
  brand: string;
  homeLabel: string;
  links: LinkContent[];
  login: LinkContent;
  demo: LinkContent;
  menuOpen: string;
  menuClose: string;
  navigationLabel: string;
  skipLink: string;
}

export interface FooterGroup {
  title: string;
  links: LinkContent[];
}

export interface FooterContent {
  summary: string;
  cta: LinkContent;
  groups: FooterGroup[];
  copyright: string;
  legalNote: string;
  legalLink: LinkContent;
  bottomLinks: LinkContent[];
}

export interface ChatContent {
  title: string;
  subtitle: string;
  openLabel: string;
  closeLabel: string;
  inputLabel: string;
  inputPlaceholder: string;
  sendLabel: string;
  greeting: string;
  placeholderReply: string;
  typingLabel: string;
  suggestions: string[];
}

export interface SiteContent {
  metadataTitle: string;
  metadataTemplate: string;
  metadataDescription: string;
  nav: NavContent;
  footer: FooterContent;
  chat: ChatContent;
}

/* ---------- Home ---------- */

export interface ProofTag {
  title: string;
  detail: string;
}

export interface BadgeContent {
  brand: string;
  label: string;
  name: string;
  company: string;
  host: string;
  site: string;
  badgeId: string;
  valid: string;
  escort: string;
}

export interface HomeHeroContent {
  eyebrow: string;
  title: string;
  /** Part of the title that gets the hand-drawn underline. */
  highlight: string;
  description: string;
  primary: LinkContent;
  secondary: LinkContent;
  proof: ProofTag[];
  badge: BadgeContent;
  artLabel: string;
}

export interface SectionIntro {
  eyebrow: string;
  title: string;
  description: string;
}

export interface ConsoleRow {
  visitor: string;
  host: string;
  status: string;
  tone: "onsite" | "pre" | "out";
  time: string;
}

export interface ConsoleContent {
  title: string;
  dayLabel: string;
  heading: string;
  searchLabel: string;
  stats: { value: string; label: string }[];
  columns: { visitor: string; host: string; status: string; time: string };
  rows: ConsoleRow[];
}

export interface KioskContent {
  site: string;
  device: string;
  greeting: string;
  step: string;
  fields: { label: string; value: string }[];
  note: string;
  action: string;
}

export interface ApprovalContent {
  label: string;
  name: string;
  company: string;
  location: string;
  timing: string;
  checks: string;
  approve: string;
  decline: string;
  host: string;
}

export interface ProductTab {
  id: "console" | "kiosk" | "approval";
  label: string;
}

export interface HomeContent {
  hero: HomeHeroContent;
  journey: SectionIntro & { steps: StepContent[] };
  capabilities: SectionIntro & { items: FeatureContent[] };
  platform: SectionIntro & { imageAlt: string; nodes: { console: string; kiosk: string; phone: string; printer: string; cloud: string } };
  security: SectionIntro & { items: FeatureContent[]; action: LinkContent; imageAlt: string };
  multiSite: SectionIntro & { items: FeatureContent[]; imageAlt: string };
  entrances: SectionIntro & { items: FeatureContent[]; imageAlts: string[] };
  product: SectionIntro & {
    tabs: ProductTab[];
    tabListLabel: string;
    console: ConsoleContent;
    kiosk: KioskContent;
    approval: ApprovalContent;
  };
  practice: SectionIntro & { scenes: { alt: string; caption: string }[]; action: LinkContent };
  cta: { title: string; description: string; primary: LinkContent; secondary: LinkContent };
}

/* ---------- Shared page pieces ---------- */

export interface CtaContent {
  title: string;
  description: string;
  primary: LinkContent;
  secondary: LinkContent;
}

export interface PageIntro {
  eyebrow: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
}

export interface BulletBlock {
  eyebrow: string;
  title: string;
  bullets: string[];
}

/* ---------- Platform ---------- */

export interface PlatformContent {
  hero: PageIntro & { artLabel: string };
  modules: SectionIntro & { items: FeatureContent[] };
  console: BulletBlock;
  kiosk: BulletBlock & { artLabel: string };
  governance: SectionIntro & { items: FeatureContent[] };
  cta: CtaContent;
}

/* ---------- Solutions ---------- */

export interface SolutionBlock {
  id: "multi-site" | "contractors" | "front-desk";
  icon: IconName;
  title: string;
  description: string;
  bullets: string[];
  artLabel: string;
}

export interface SolutionsContent {
  hero: PageIntro & { artLabel: string };
  blocks: SolutionBlock[];
  outcomes: { eyebrow: string; title: string; items: { title: string; description: string }[] };
  cta: CtaContent;
}

/* ---------- Industries ---------- */

export type SectorId = "office" | "healthcare" | "education" | "government" | "datacenter" | "construction";

export interface SectorContent {
  id: SectorId;
  title: string;
  description: string;
  points: string[];
  artLabel: string;
}

export interface IndustriesContent {
  hero: PageIntro & { artLabel: string };
  sectors: { eyebrow: string; title: string; items: SectorContent[] };
  cta: CtaContent;
}

/* ---------- Security ---------- */

export interface SecurityPageContent {
  hero: PageIntro & { artLabel: string };
  architecture: { eyebrow: string; title: string; items: FeatureContent[] };
  admin: BulletBlock & { artLabel: string };
  records: BulletBlock & { artLabel: string };
  note: string;
  cta: CtaContent;
}

/* ---------- About ---------- */

export interface AboutContent {
  hero: PageIntro & { artLabel: string };
  mission: { eyebrow: string; title: string; body: string; focusTitle: string; focus: string[] };
  process: SectionIntro & { steps: { title: string; description: string }[] };
  cta: CtaContent;
}

/* ---------- Gallery ---------- */

export type GalleryArt = "lobby" | "badges" | "approvals" | "sites" | "console";

export interface GalleryItem {
  id: string;
  art: GalleryArt;
  title: string;
  description: string;
  alt: string;
}

export interface GalleryContent {
  hero: PageIntro & { action: LinkContent };
  listLabel: string;
  items: GalleryItem[];
  enlargeLabel: string;
  previousLabel: string;
  nextLabel: string;
  closeLabel: string;
  viewLabel: string;
  counterSeparator: string;
  footnote: string;
}

/* ---------- Forms ---------- */

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "select" | "textarea";
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  options?: string[];
  /** Spans one column on wide screens (two per row). */
  half?: boolean;
}

export interface FormContent {
  fields: FormField[];
  honeypotLabel: string;
  submitLabel: string;
  sendingLabel: string;
  requiredError: string;
  emailError: string;
  successTitle: string;
  successMessage: string;
  resetLabel: string;
  note: string;
  noteLink?: LinkContent;
}

export interface ContactContent {
  hero: PageIntro;
  channels: FeatureContent[];
  demoPrompt: string;
  demoLink: LinkContent;
  form: FormContent;
  formTitle: string;
}

export interface DemoContent {
  hero: PageIntro;
  highlights: string[];
  form: FormContent;
  formTitle: string;
}

export interface LoginContent {
  eyebrow: string;
  title: string;
  description: string;
  metaTitle: string;
  form: FormContent;
  forgot: LinkContent;
  artLabel: string;
}

export interface NotFoundContent {
  title: string;
  description: string;
  action: LinkContent;
}
