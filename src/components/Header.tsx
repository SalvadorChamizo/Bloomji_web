import { useEffect, useState } from "react";
import { usePageLoad } from "../hooks/usePageLoad"
import styles from "./Header.module.css"
import Logo from './Logo';
import SlidingPane from "./SlidingPane";
import Contact from "./Contact";
import clip from "../assets/clip.svg";

interface HeaderProps {
    className?: string;
}

type Pane = "about" | "contact" | null;

function Header({ className }: HeaderProps) {
    const [activePane, setActivePane] = useState<Pane>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    const loaded = usePageLoad();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const closePane = () => setActivePane(null);

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
                    <button 
                        className={styles.menuButton} 
                        aria-label="Toggle menu"
                        aria-expanded={!!activePane}
                        onClick={() => setActivePane(activePane ? null : "about")

                        }
                    >
                        <span className={styles.bar} />
                        <span className={styles.bar} />
                        <span className={styles.bar} />
                    </button>
                </div>
            </header>

            {/* Sliding panes */}
            <SlidingPane
                isOpen={activePane === "about"}
                onClose={closePane}
                side="left"
            >
                <h2>¿Qué es Bloomji?</h2>
                <p>Contenido del panel About...</p>
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