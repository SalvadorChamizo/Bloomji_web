import { NavLink } from 'react-router-dom';
import { useState } from "react";
import styles from "./Header.module.css"
import Logo from './Logo';

interface HeaderProps {
    className?: string;
}

function Header({ className }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className={`${styles.header} ${className ?? ""}`}>

            <Logo />
            <nav className={styles.desktopNav}>
                <ul className={styles.navList}>
                    <li>
                        <NavLink to="/about" className={({ isActive}) => isActive ? styles.active : styles.link}>Quienes somos</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Contact" className={({ isActive}) => isActive ? styles.active : styles.link}>Contacto</NavLink>
                    </li>
                </ul>
            </nav>

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

            {isOpen && (
                <nav className={styles.mobileNav}>
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