import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";
import Logo from "./Logo";
import SlidingPane from "./SlidingPane";
import Contact from "./Contact";
import pushPin from "../assets/pushpin.svg";
import bloomjiConfidential from "../assets/bloomji_confidential.png";

type Pane = "about" | "contact" | null;

export default function Footer() {
    const [activePane, setActivePane] = useState<Pane>(null);

    const closePane = () => setActivePane(null);

    const openPane = (pane: Pane) => {

        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => {
            console.log("Entra");
            setActivePane(pane);
        }, 800);
    };
    return (
        <>
            <footer className={styles.footer} tabIndex={0}>
                <div className={styles.container}>
                    <div className={styles.brand}>
                        <Logo scrolled={true}/>
                        <p>La mascota digital para tus plantas</p>
                    </div>

                    <nav className={styles.nav}>
                        <h4>Bloomji</h4>
                        <ul>
                            <li><NavLink to="/">Inicio</NavLink></li>
                            <li>
                                <button 
                                    type="button"
                                    onClick={() => openPane("about")}
                                    className={styles.link}
                                    style={{ 
                                        cursor: 'pointer',
                                        pointerEvents: 'auto'
                                    }}
                                >
                                    Qué es Bloomji
                                </button>
                            </li>
                            <li>
                                <button 
                                    type="button"
                                    onClick={() => openPane("contact")}
                                    className={styles.link}
                                    style={{ 
                                        cursor: 'pointer',
                                        pointerEvents: 'auto'
                                    }}
                                >
                                    Contacto
                                </button>
                            </li>
                        </ul>
                    </nav>

                    <div className={styles.legal}>
                        <h4>Legal</h4>
                        <ul>
                            <li><NavLink to="/privacy">Privacidad</NavLink></li>
                            <li><NavLink to="/terms">Términos</NavLink></li>
                        </ul>
                    </div>

                </div>
                    <div className={styles.bottom}>
                        © {new Date().getFullYear()} Bloomji. Todos los derechos reservados.
                    </div>
            </footer>

            {/* Sliding panes */}
            <SlidingPane
                isOpen={activePane === "about"}
                onClose={closePane}
                side="left"
            >
                <img src={pushPin} className={styles.pushPin} alt="Push pin" />
                <div className={styles.confidentialSheet}>
                    <div className={styles.confidentialContainer}>
                        <img src={bloomjiConfidential} className={styles.paperImg} alt="Bloomji confidential document" />
                    </div>
                </div>
            </SlidingPane>
        
            <SlidingPane
                isOpen={activePane === "contact"}
                onClose={closePane}
                side="right"
            >
                <Contact />
            </SlidingPane>
        </>
    );
}