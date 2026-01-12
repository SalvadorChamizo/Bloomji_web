import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";
import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <Logo scrolled={true}/>
                    <p>La mascota digital para tus plantas</p>
                </div>

                <nav className={styles.nav}>
                    <h4>Bloomji</h4>
                    <ul>
                        <li><NavLink to="/">Inicio</NavLink></li>
                        <li><NavLink to="/about">Qué es Bloomji</NavLink></li>
                        <li><NavLink to="/contact">Contacto</NavLink></li>
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
    );
}