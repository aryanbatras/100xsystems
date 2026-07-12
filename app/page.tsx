import { HomeHero } from '@/presentation/features/homeHero.feature';
import { HomeProducts } from '@/presentation/features/homeProducts.feature';
import { HomeSection3 } from '@/presentation/features/homeSection3.feature';
import { HomeCubixShowcase } from '@/presentation/features/homeCubixShowcase.feature';
import { HomeFAQ } from '@/presentation/features/homeFAQ.feature';
import { HomeSection10 } from '@/presentation/features/homeSection10.feature';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeProducts />
      <HomeSection3 />
      <HomeCubixShowcase />
      <HomeFAQ />
      <HomeSection10 />
    </>
  );
}
