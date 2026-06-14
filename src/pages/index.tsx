import { HomeHero } from '../presentation/features/homeHero.feature';
import { HomeProducts } from '../presentation/features/homeProducts.feature';
import { HomeSection3 } from '../presentation/features/homeSection3.feature';
import { HomeFAQ } from '../presentation/features/homeFAQ.feature';
import { HomeSection10 } from '../presentation/features/homeSection10.feature';
import styles from '../presentation/_styles/css/sections-home-shared.module.css';

export default function Home() {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.container}>
          <HomeHero />
          <HomeProducts />
          <HomeSection3 />
          <HomeFAQ />
          <HomeSection10 />
        </div>
      </div>
    </>
  );
}
