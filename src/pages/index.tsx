import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Section0 from '../presentation/features/sections/home/Section0';
import Section1 from '../presentation/features/sections/home/Section1';
import Section2 from '../presentation/features/sections/home/Section2';
import SectionBootcamp from '../presentation/features/sections/home/SectionBootcamp';
import Section3 from '../presentation/features/sections/home/Section3';
import Section4 from '../presentation/features/sections/home/Section4';
import Section5 from '../presentation/features/sections/home/Section5';
import Section6 from '../presentation/features/sections/home/Section6';
import Section7 from '../presentation/features/sections/home/Section7';
import Section8 from '../presentation/features/sections/home/Section8';
import Section9 from '../presentation/features/sections/home/Section9';
import Section10 from '../presentation/features/sections/home/Section10';
import Section11 from '../presentation/features/sections/home/Section11';
import styles from '../presentation/_styles/components/sections/home/shared.module.css';
import SectionMain from '../presentation/features/sections/home/SectionMain';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className={styles.page}>
        <div className={styles.container}>
         <SectionMain />
          {/* <Section0 /> */}
          <Section1 />
          <Section2 />
          <SectionBootcamp />
          <Section11 />
          <Section3 />
          {/* <Section4 /> */}
          <Section5 />
          <Section6 />
          <Section7 />
          {/* <Section8 /> */}
          <Section9 />
          <Section10 />
        </div>
      </div>
    </>
  );
}