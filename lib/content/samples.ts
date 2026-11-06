import type { CtaContent } from "@/lib/types";
import { homeContent } from "./home";

/** Product sample records shared by several pages (single source of truth: home content). */
export const consoleSample = homeContent.product.console;
export const kioskSample = homeContent.product.kiosk;
export const approvalSample = homeContent.product.approval;
export const badgeSample = homeContent.hero.badge;

export const defaultCta: CtaContent = homeContent.cta;
