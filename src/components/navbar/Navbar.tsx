import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { RxCross1 } from "react-icons/rx";
import { CgMenuHotdog } from "react-icons/cg";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export function Navbar(): React.ReactElement {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isWhiteTheme, setIsWhiteTheme] = useState(false);
    const router = useRouter();

    // Routes that should use white theme
    const whiteThemeRoutes = ['/articles', '/admin', '/roadmaps', '/parser', '/admin-dashboard'];

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
                    <li className={styles.link}><Link href="/about">About</Link></li>
                    <li className={styles.link}><Link href="/contact">Contact</Link></li>
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
                        <Link href="/about"> <li className={styles.mobile_link} onClick={() => setIsMenuOpen(false)}>About</li></Link>
                        <Link href="/contact"> <li className={styles.mobile_link} onClick={() => setIsMenuOpen(false)}>Contact</li></Link>
                        <Link href="/admin-dashboard"> <li className={styles.mobile_link} onClick={() => setIsMenuOpen(false)}>Admin</li></Link>
                    </ul>
                </div>
            )}
        </>
    )
}