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
                    Siempre hay espacio para una planta.
                </h1>
            <button className={styles.ctaButton}>
                Apúntate ahora
            </button>
            </div>
        </section>
    );
}