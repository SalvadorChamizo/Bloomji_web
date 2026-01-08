import styles from "./Hero.module.css";
import heroBg from "../assets/possible_bg2.png";
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
                    Tus plantas están a salvo
                </h1>
                <p className={styles.subHeadline}>
                    Bloomji es un dispositivo diseñado para ayudarte a cuidar de tu planta, convirtiéndola en una mascota que interactúa contigo mediante emociones.
                </p>
                <p>¡Inscríbete a la lista de espera!</p>
                <div className={styles.emailCapture}>
                    <input type="email" name="email" className={styles.input} placeholder="Dirección de correo" />
                    <button className={styles.ctaButton}>
                        Apúntate ahora
                    </button>
                </div>
            </div>
        </section>
    );
}