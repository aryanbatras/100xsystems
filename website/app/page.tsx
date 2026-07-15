import { HomeHero } from '@/presentation/features/homeHero.feature';
import { HomePhilosophy } from '@/presentation/features/homePhilosophy.feature';
import { HomeWhatIsSystem } from '@/presentation/features/homeWhatIsSystem.feature';
import { HomeVideoParallax } from '@/presentation/features/homeVideoParallax.feature';
import { HomeBuildSystems } from '@/presentation/features/homeBuildSystems.feature';
import { HomeLearningPhilosophy } from '@/presentation/features/homeLearningPhilosophy.feature';
import { HomeCubix } from '@/presentation/features/homeCubix.feature';
import { HomeOpenSource } from '@/presentation/features/homeOpenSource.feature';
import { HomeMission } from '@/presentation/features/homeMission.feature';
import { HomeContinueLearning } from '@/presentation/features/homeContinueLearning.feature';
import { getAllSystems } from '@/lib/mdx';
import type { SystemMeta } from '@/lib/mdx';

export default function HomePage() {
  const systems: SystemMeta[] = getAllSystems();

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
      <HomeContinueLearning systems={systems} />
    </>
  );
}
