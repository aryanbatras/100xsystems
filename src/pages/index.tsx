import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Section1 from '../components/sections/home/Section1';
import Section2 from '../components/sections/home/Section2';
import Section3 from '../components/sections/home/Section3';
import Section4 from '../components/sections/home/Section4';
import Section5 from '../components/sections/home/Section5';
import Section6 from '../components/sections/home/Section6';
import Section7 from '../components/sections/home/Section7';
import Section8 from '../components/sections/home/Section8';
import Section9 from '../components/sections/home/Section9';
import Section10 from '../components/sections/home/Section10';
import Section11 from '../components/sections/home/Section11';
import { AuthModal } from '../components/auth/AuthModal';
import { useAuth } from '../contexts/AuthContext';
import styles from '../components/sections/home/shared.module.css';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    console.log('🔍 Router state:', {
      isReady: router.isReady,
      query: router.query,
      pathname: router.pathname,
      user: !!user
    });

    // Check URL parameters for auth requirements
    if (router.isReady) {
      const authRequired = router.query['auth-required'];
      const unauthorized = router.query['unauthorized'];
      const adminRequired = router.query['admin-required'];
      const redirectPath = router.query['redirect'];
      
      console.log('🔍 Auth check:', { authRequired, unauthorized, adminRequired, user: !!user, redirectPath });
      
      // If user is authenticated and there's a redirect path, redirect there
      if (authRequired === 'true' && user && redirectPath) {
        console.log('✅ Redirecting authenticated user to:', redirectPath);
        router.push(redirectPath as string);
        return;
      }
      
      // If user is authenticated and there's no redirect, just close any modal
      if (authRequired === 'true' && user) {
        console.log('✅ User authenticated, no redirect needed');
        setIsAuthModalOpen(false);
        return;
      }
      
      if (authRequired === 'true' && !user) {
        console.log('✅ Opening auth modal for unauthenticated user');
        setIsAuthModalOpen(true);
      } else if (unauthorized === 'true') {
        console.error('❌ Unauthorized access attempt');
      } else if (adminRequired === 'true') {
        console.error('❌ Admin access required');
      }
    }
  }, [router.isReady, router.query, user]);

  // Force modal open if URL contains auth-required, unauthorized, or admin-required
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const authRequired = urlParams.get('auth-required');
      const unauthorized = urlParams.get('unauthorized');
      const adminRequired = urlParams.get('admin-required');
      
      if (authRequired === 'true' && !user) {
        console.log('✅ Opening auth modal from URL params (auth-required)');
        setIsAuthModalOpen(true);
      } else if (unauthorized === 'true') {
        console.log('✅ Opening auth modal from URL params (unauthorized)');
        setIsAuthModalOpen(true);
      } else if (adminRequired === 'true') {
        console.log('✅ Opening auth modal from URL params (admin-required)');
        setIsAuthModalOpen(true);
      }
    }
  }, [user, router.query]);

  return (
    <>
      <div className={styles.page}>
        <div className={styles.container}>
          <Section1 />
          <Section2 />
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
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}