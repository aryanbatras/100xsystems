import { HomeHero } from '@/presentation/features/homeHero.feature';
import { HomeVideoParallax } from '@/presentation/features/homeVideoParallax.feature';
import { HomeSystems } from '@/presentation/features/homeSystems.feature';
import { HomeJourneyVideo } from '@/presentation/features/homeJourneyVideo.feature';
import { HomeFAQ } from '@/presentation/features/homeFAQ.feature';
import { HomeSection10 } from '@/presentation/features/homeSection10.feature';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeVideoParallax />
      <HomeSystems />
      <HomeJourneyVideo />
      <HomeFAQ />
      <HomeSection10 />
    </>
  );
}
