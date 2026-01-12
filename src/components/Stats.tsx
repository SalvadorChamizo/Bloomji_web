import styles from "./Stats.module.css";
import statsImage from "../assets/bloomchi_happy.jpeg"

export default function Stats() {
    return (
        <section id="about" className={styles.statsSection}>
            <div className={styles.container}>
                <h2 className={styles.title}>¿Por qué Bloomji?</h2>

                <p> Estamos desarrollando un "tamagotchi" capaz de transmitir las necesidades de tu planta para que cuidarla sea más fácil que nunca.</p>
                <img
                src={statsImage}
                alt="Planta interactuando con Bloomji"
                className={styles.image}
                />

                <ul className={styles.statsGrid}>
                    <li className={styles.stat}>
                        <strong>Siente</strong>
                        <span>Monitorización de humedad, luz, temperatura...</span>
                    </li>
                    <li className={styles.stat}>
                        <strong>Informa</strong>
                        <span>Notificaciones en tiempo real a través de la aplicación</span>
                    </li>
                    <li className={styles.stat}>
                        <strong>Conecta</strong>
                        <span>Conecta con tus plantas a través de las emociones</span>
                    </li>
                </ul>
            </div>
        </section>
    )
}