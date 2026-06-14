import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Section0, Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9, Section10, Section11, SectionBootcamp, SectionMain } from '../presentation/features/sections.feature';
import styles from '../presentation/_styles/sections-home-shared.module.css';

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