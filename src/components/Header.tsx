import { useEffect, useState, useRef } from "react";
import { usePageLoad } from "../hooks/usePageLoad"
import styles from "./Header.module.css"
import Logo from './Logo';
import SlidingPane from "./SlidingPane";
import Contact from "./Contact";
import pushPin from "../assets/pushpin.svg";
import clip from "../assets/clip.svg";
import bloomjiConfidential from "../assets/bloomji_confidential.png";

interface HeaderProps {
    className?: string;
}

type Pane = "about" | "contact" | null;

function Header({ className }: HeaderProps) {
    const [activePane, setActivePane] = useState<Pane>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    
    const loaded = usePageLoad();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isMobileMenuOpen && 
                mobileMenuRef.current && 
                !mobileMenuRef.current.contains(event.target as Node) &&
                !(event.target as Element).closest(`.${styles.menuButton}`)) {
                closeMobileMenu();
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    const closeMobileMenu = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsMobileMenuOpen(false);
            setIsClosing(false);
        }, 300);
    };

    const closePane = () => setActivePane(null);

    const handleMobileMenuClick = (pane: Pane) => {
        setActivePane(pane);
        closeMobileMenu();
    };

    return (
        <>
            <header 
                className={`
                    ${styles.header} 
                    ${className ?? ""} 
                    ${loaded ? styles.enter : ""} 
                    ${scrolled ? styles.scrolled : ""}`}>

                {/* Desktop */}
                <nav className={styles.desktopNav}>
                    <ul className={styles.navList}>
                        <li>
                            <button
                                className={`${styles.link} ${styles.leftLink}`}
                                onClick={() => setActivePane("about")}
                            >
                                ¿Qué es Bloomji?
                            </button>
                        </li>

                        <Logo scrolled={scrolled} />
                        
                        <li>
                            <button
                                className={styles.link}
                                onClick={() => setActivePane("contact")}
                            >
                                Contacto
                            </button>
                        </li>
                    </ul>
                </nav>

                {/* Mobile */}
                <div className={styles.mobileBar}>
                    <Logo scrolled={scrolled} />
                    <button 
                        className={styles.menuButton} 
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                        onClick={() => isMobileMenuOpen ? closeMobileMenu() : setIsMobileMenuOpen(true)}
                    >
                        <span className={styles.bar} />
                        <span className={styles.bar} />
                        <span className={styles.bar} />
                    </button>
                </div>
            </header>

            {isMobileMenuOpen && (
                <>
                    <div 
                        className={styles.mobileMenuBackdrop}
                        onClick={closeMobileMenu}
                    />
                    <div className={`${styles.mobileMenu} ${isClosing ? styles.closing : ''}`} ref={mobileMenuRef}>
                        <ul className={styles.mobileNavList}>
                            <li>
                                <button
                                    className={styles.link}
                                    onClick={() => handleMobileMenuClick("about")}
                                >
                                    ¿Qué es Bloomji?
                                </button>
                            </li>
                            <li>
                                <button
                                    className={styles.link}
                                    onClick={() => handleMobileMenuClick("contact")}
                                >
                                    Contacto
                                </button>
                            </li>
                        </ul>
                    </div>
                </>
            )}

            {/* Sliding panes */}
            <SlidingPane
                isOpen={activePane === "about"}
                onClose={closePane}
                side="left"
            >
                <img src={pushPin}
                className={styles.pushPin}/>
                <div className={styles.confidentialSheet}>
                    <div className={styles.confidentialContainer}>
                        <img src={bloomjiConfidential}
                            className={styles.paperImg}/>
                    </div>
                </div>
            </SlidingPane>
        
            <SlidingPane
                isOpen={activePane === "contact"}
                onClose={closePane}
                side="right"
            >
                <img src={clip}
                className={styles.clip}/>
                <Contact />
            </SlidingPane>
        </>
    );
}

export default Header;