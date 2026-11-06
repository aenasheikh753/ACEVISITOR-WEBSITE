import { cacheLife } from "next/cache";
import { siteContent } from "@/lib/content/site";
import type { SiteContent } from "@/lib/types";
import { loadContent } from "./client";

export async function getSiteContent(): Promise<SiteContent> {
  "use cache";
  cacheLife("hours");
  return loadContent("site", siteContent);
}
