"use client"

import styles from "./header_landing.module.css"
import Image from "next/image"
import Link from "next/link"

const HeaderLanding = () => {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <div className={styles.style}>
            <ul>
                <li>
                    <button type="button">
                        <Image 
                            className={styles.logo}
                            onClick={() => scrollToSection('beranda')}
                            src="/img/Logo_GasKeep_Biru.png" 
                            alt="Logo GasKeep" 
                            width={120} 
                            height={40}
                            priority
                        />
                    </button>
                </li>
                <li className={styles.li_text} onClick={() => scrollToSection('beranda')}>Beranda</li>
                <li className={styles.li_text} onClick={() => scrollToSection('layanan')}>Layanan</li>
                <li className={styles.li_text} onClick={() => scrollToSection('tentang')}>Tentang</li>
                <li>
                    <Link href="/login">
                        <button type="button" className={styles.btn_daftar}>Daftar</button>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default HeaderLanding;