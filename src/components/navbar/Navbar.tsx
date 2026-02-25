import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar(){
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
        </nav>
    )
}