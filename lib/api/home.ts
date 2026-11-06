import { cacheLife } from "next/cache";
import { homeContent } from "@/lib/content/home";
import type { HomeContent } from "@/lib/types";
import { loadContent } from "./client";

export async function getHomeContent(): Promise<HomeContent> {
  "use cache";
  cacheLife("hours");
  return loadContent("home", homeContent);
}
