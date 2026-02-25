import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { RxCross1 } from "react-icons/rx";
import { CgMenuHotdog } from "react-icons/cg";
import { useState } from 'react';

export function Navbar(): React.ReactElement {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className={styles.nav}>
            <Link href="/" className={styles.titleLink}>
                <Image 
                    src="/100xsystemsonlytitle.png" 
                    alt="100X Systems" 
                    className={styles.titleImage}
                    width={200}
                    height={50}
                />
            </Link>
            <ul className={styles.links}>
                <li className={styles.link}><Link href="/">Home</Link></li>
                <li className={styles.link}><Link href="/paths">Paths</Link></li>
                <li className={styles.link}><Link href="/about">About</Link></li>
                <li className={styles.link}><Link href="/contact">Contact</Link></li>
            </ul>
            {!isMenuOpen ? (
            <button className={styles.menuButton} onClick={() => setIsMenuOpen(true)}>
                <CgMenuHotdog />
            </button>) : (
                <div className={styles.mobile_container}>
                    <button className={styles.crossButton} onClick={() => setIsMenuOpen(false)}>
                        <RxCross1 />
                    </button>
                    <ul className={styles.mobile_links}>
                        <Link href="/"> <li className={styles.mobile_link} onClick={() => setIsMenuOpen(false)}>Home</li></Link>
                        <Link href="/paths"> <li className={styles.mobile_link} onClick={() => setIsMenuOpen(false)}>Paths</li></Link>
                        <Link href="/about"> <li className={styles.mobile_link} onClick={() => setIsMenuOpen(false)}>About</li></Link>
                        <Link href="/contact"> <li className={styles.mobile_link} onClick={() => setIsMenuOpen(false)}>Contact</li></Link>
                    </ul>
                </div>
            )}
        </nav>
    )
}