import styles from "./Hero.module.css";
import heroBg from "../assets/fondo-home.jpg";
import Header from "./Header";

export default function Hero() {
    return (
        <section 
            className={styles.hero}
            style={{ backgroundImage: `url(${heroBg})` }}
        >
            <Header className={styles.headerOverlay}/>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    ¿Quién dijo que las plantas no tienen sentimientos? :(
                </h1>
                <p className={styles.subHeadline}>
                    Bloomji es un dispositivo diseñado para ayudarte a cuidar de tu planta, convirtiéndola en una mascota que interactúa contigo mediante emociones.
                </p>
                <div className={styles.emailCapture}>
                    <p>¡Inscríbete a la waitlist!</p>
                    <input type="email" name="email" className={styles.input} placeholder="Tu e-mail" />
                    <button className={styles.ctaButton}>
                        Apúntate ahora
                    </button>
                </div>
            </div>
        </section>
    );
}