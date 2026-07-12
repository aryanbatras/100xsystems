import { HomeHero } from '@/presentation/features/homeHero.feature';
import { HomePhilosophy } from '@/presentation/features/homePhilosophy.feature';
import { HomeWhatIsSystem } from '@/presentation/features/homeWhatIsSystem.feature';
import { HomeVideoParallax } from '@/presentation/features/homeVideoParallax.feature';
import { HomeBuildSystems } from '@/presentation/features/homeBuildSystems.feature';
import { HomeLearningPhilosophy } from '@/presentation/features/homeLearningPhilosophy.feature';
import { HomeCubix } from '@/presentation/features/homeCubix.feature';
import { HomeOpenSource } from '@/presentation/features/homeOpenSource.feature';
import { HomeMission } from '@/presentation/features/homeMission.feature';
import { HomeSection10 } from '@/presentation/features/homeSection10.feature';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomePhilosophy />
      <HomeWhatIsSystem />
      <HomeVideoParallax />
      <HomeBuildSystems />
      <HomeLearningPhilosophy />
      <HomeCubix />
      <HomeOpenSource />
      <HomeMission />
      <HomeSection10 />
    </>
  );
}
