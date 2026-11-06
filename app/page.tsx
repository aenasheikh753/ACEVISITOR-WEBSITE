import {
  HomeCapabilities,
  HomeCta,
  HomeEntrances,
  HomeHero,
  HomeJourney,
  HomeMultiSite,
  HomePlatform,
  HomePractice,
  HomeProduct,
  HomeSecurity,
} from "@/components/home/HomeSections";
import { ScrollFx } from "@/components/motion/ScrollFx";
import { getHomeContent } from "@/lib/api/home";

export default async function HomePage() {
  const home = await getHomeContent();
  return (
    <>
      <HomeHero hero={home.hero} />
      <HomeJourney journey={home.journey} />
      <HomeCapabilities capabilities={home.capabilities} />
      <HomePlatform platform={home.platform} />
      <HomeSecurity security={home.security} />
      <HomeMultiSite multiSite={home.multiSite} />
      <HomeEntrances entrances={home.entrances} />
      <HomeProduct product={home.product} />
      <HomePractice practice={home.practice} />
      <HomeCta cta={home.cta} />
      <ScrollFx />
    </>
  );
}
