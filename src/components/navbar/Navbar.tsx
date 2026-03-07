import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { RxCross1 } from "react-icons/rx";
import { CgMenuHotdog } from "react-icons/cg";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { AuthModal } from '../auth/AuthModal';

export function Navbar(): React.ReactElement {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isWhiteTheme, setIsWhiteTheme] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const router = useRouter();
    const { user, loading, signOut, signInWithGitHub } = useAuth();

    // Routes that should use white theme
    const whiteThemeRoutes = ['/articles', '/roadmaps', '/groups', '/graph', '/parser', '/admin-dashboard'];

    useEffect(() => {
        // Check if current route should use white theme
        const currentPath = router.pathname;
        const shouldUseWhiteTheme = whiteThemeRoutes.some(route => 
            currentPath === route || currentPath.startsWith(route + '/')
        );
        setIsWhiteTheme(shouldUseWhiteTheme);
    }, [router.pathname]);

    // Don't render navbar on article slug pages (static pages)
    if (router.pathname.startsWith('/articles/') && router.pathname !== '/articles') {
        return <div></div>;
    }

    return (
        <>
            <nav className={`${styles.nav} ${isWhiteTheme ? styles.whiteTheme : ''}`}>
                <Link href="/" className={styles.titleLink}>
                    <img 
                        src={isWhiteTheme ? "/100xsystemsblacklogo.png" : "/100xsystemsonlytitle.png"} 
                        alt="100X Systems" 
                        className={styles.titleImage}
                        width={200}
                        height={50}
                        loading="eager"
                    />
                </Link>
                <ul className={styles.links}>
                    <li className={styles.link}><Link href="/">Home</Link></li>
                    <li className={styles.link}><Link href="/articles">Articles</Link></li>
                    <li className={styles.link}><Link href="/roadmaps">Roadmaps</Link></li>
                    <li className={styles.link}><Link href="/groups">Groups</Link></li>
                    <li className={styles.link}><Link href="/graph">Knowledge Graph</Link></li>
                    <li className={styles.link}><Link href="/about">About</Link></li>
                    <li className={styles.link}><Link href="/contact">Contact</Link></li>
                    {user ? (
                        <li className={styles.link}>
                            <Link href="/user-dashboard" className={styles.welcomeLink}>
                                Welcome, {user.user_metadata?.full_name || user.email?.split('@')[0]}
                            </Link>
                        </li>
                    ) : (
                        <li className={styles.link}>
                            <button 
                                onClick={() => setIsAuthModalOpen(true)}
                                disabled={loading}
                                className={styles.authButton}
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </li>
                    )}
                    {user && (
                        <li className={styles.link}>
                            <button 
                                onClick={signOut}
                                className={styles.signOutButton}
                            >
                                Sign Out
                            </button>
                        </li>
                    )}
                    <li className={styles.link}><Link href="/admin-dashboard">Admin</Link></li>
                </ul>
                {!isMenuOpen ? (
                <button className={styles.menuButton} onClick={() => setIsMenuOpen(true)}>
                    <CgMenuHotdog />
                </button>) : null}
            </nav>
            {isMenuOpen && (
                <div className={styles.mobile_container}>
                    <button className={styles.crossButton} onClick={() => setIsMenuOpen(false)}>
                        <RxCross1 />
                    </button>
                    <ul className={styles.mobile_links}>
                        <Link href="/"> <li className={styles.mobile_link} onClick={() => setIsMenuOpen(false)}>Home</li></Link>
                        <Link href="/articles"> <li className={styles.mobile_link} onClick={() => setIsMenuOpen(false)}>Articles</li></Link>
                        <Link href="/roadmaps"> <li className={styles.mobile_link} onClick={() => setIsMenuOpen(false)}>Roadmaps</li></Link>
                        <Link href="/groups"> <li className={styles.mobile_link} onClick={() => setIsMenuOpen(false)}>Groups</li></Link>
                        <Link href="/graph"> <li className={styles.mobile_link} onClick={() => setIsMenuOpen(false)}>Knowledge Graph</li></Link>
                        <Link href="/about"> <li className={styles.mobile_link} onClick={() => setIsMenuOpen(false)}>About</li></Link>
                        <Link href="/contact"> <li className={styles.mobile_link} onClick={() => setIsMenuOpen(false)}>Contact</li></Link>
                        {user ? (
                            <Link href="/user-dashboard">
                                <li className={styles.mobile_link} onClick={() => setIsMenuOpen(false)}>
                                    Welcome, {user.user_metadata?.full_name || user.email?.split('@')[0]}
                                </li>
                            </Link>
                        ) : (
                            <li className={styles.mobile_link}>
                                <button 
                                        onClick={() => {
                                            setIsAuthModalOpen(true);
                                            setIsMenuOpen(false);
                                        }}
                                        disabled={loading}
                                        className={styles.mobileAuthButton}
                                    >
                                        {loading ? 'Signing in...' : 'Sign In'}
                                    </button>
                            </li>
                        )}
                        {user && (
                            <li className={styles.mobile_link}>
                                <button 
                                        onClick={() => {
                                            signOut();
                                            setIsMenuOpen(false);
                                        }}
                                        className={styles.mobileSignOutButton}
                                    >
                                        Sign Out
                                    </button>
                            </li>
                        )}
                        <Link href="/admin-dashboard"> <li className={styles.mobile_link} onClick={() => setIsMenuOpen(false)}>Admin</li></Link>
                    </ul>
                </div>
            )}
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
    )
}