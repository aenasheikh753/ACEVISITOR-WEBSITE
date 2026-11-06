import { cacheLife } from "next/cache";
import { aboutContent } from "@/lib/content/about";
import { contactContent, demoContent, loginContent, notFoundContent } from "@/lib/content/forms";
import { galleryContent } from "@/lib/content/gallery";
import { industriesContent } from "@/lib/content/industries";
import { platformContent } from "@/lib/content/platform";
import { approvalSample, badgeSample, consoleSample, kioskSample } from "@/lib/content/samples";
import { securityContent } from "@/lib/content/security";
import { solutionsContent } from "@/lib/content/solutions";
import { loadContent } from "./client";

export async function getPlatformContent() {
  "use cache";
  cacheLife("hours");
  return loadContent("platform", platformContent);
}

export async function getSolutionsContent() {
  "use cache";
  cacheLife("hours");
  return loadContent("solutions", solutionsContent);
}

export async function getIndustriesContent() {
  "use cache";
  cacheLife("hours");
  return loadContent("industries", industriesContent);
}

export async function getSecurityContent() {
  "use cache";
  cacheLife("hours");
  return loadContent("security", securityContent);
}

export async function getAboutContent() {
  "use cache";
  cacheLife("hours");
  return loadContent("about", aboutContent);
}

export async function getGalleryContent() {
  "use cache";
  cacheLife("hours");
  return loadContent("gallery", galleryContent);
}

export async function getContactContent() {
  "use cache";
  cacheLife("hours");
  return loadContent("contact", contactContent);
}

export async function getDemoContent() {
  "use cache";
  cacheLife("hours");
  return loadContent("request-demo", demoContent);
}

export async function getLoginContent() {
  "use cache";
  cacheLife("hours");
  return loadContent("login", loginContent);
}

export async function getNotFoundContent() {
  "use cache";
  cacheLife("hours");
  return loadContent("not-found", notFoundContent);
}

/** Sample product records (console, kiosk, approval, badge) shown on several pages. */
export async function getProductSamples() {
  "use cache";
  cacheLife("hours");
  return loadContent("samples", { console: consoleSample, kiosk: kioskSample, approval: approvalSample, badge: badgeSample });
}
