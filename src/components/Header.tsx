import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import { usePageLoad } from "../hooks/usePageLoad"
import styles from "./Header.module.css"
import Logo from './Logo';

interface HeaderProps {
    className?: string;
}


function Header({ className }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    const loaded = usePageLoad();

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 80);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={`${styles.header} ${className ?? ""} ${loaded ? styles.enter : ""} ${scrolled ? styles.scrolled : ""}`}>

            <nav className={styles.desktopNav}>
                <ul className={styles.navList}>
                    <li>
                        <NavLink to="/#about" className={styles.link}>¿Qué es Bloomji?</NavLink>
                    </li>
            <Logo scrolled={scrolled} />
                    <li>
                        <NavLink to="/Contact" className={styles.link}>Contacto</NavLink>
                    </li>
                </ul>
            </nav>

            <div className={styles.mobileBar}>
                <Logo scrolled={scrolled} />
                <button 
                    className={styles.menuButton} 
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <span className={styles.bar} />
                    <span className={styles.bar} />
                    <span className={styles.bar} />
                </button>
            </div>

            {isOpen && (
                <nav className={styles.mobileMenu}>
                    <ul className={styles.mobileNavList}>
                        <li>
                            <NavLink to="/about" onClick={() => setIsOpen(false)}>Quienes somos</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" onClick={() => setIsOpen(false)}>Contacto</NavLink>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}

export default Header;