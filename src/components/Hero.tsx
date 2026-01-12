import styles from "./Hero.module.css";
import heroBg from "../assets/possible_bg2.png";
import Header from "./Header";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { usePageLoad } from "../hooks/usePageLoad";

export function EmailCapture() {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const loaded = usePageLoad();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = await supabase.from("waitlist").insert({ email });
        if (!error) {
            setSuccess(true);
            setEmail("");
        }
    };

    return success ? (
        <p className={styles.emailCaptureSuccess} >¡Gracias! Te avisaremos pronto.</p>
    ) : (
        <form className={`${styles.emailCapture} ${loaded ? styles.enter : ""}`} onSubmit={submit}>
            <input
                type="email"
                name="email"
                className={styles.input}
                placeholder="Dirección de correo"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button className={`${styles.ctaButton} ${loaded ? styles.enter : ""}`}>
                Apúntate ahora
            </button>
        </form>
    )
}


export default function Hero() {
    const loaded = usePageLoad();
    return (
        <section 
            className={styles.hero}
            style={{ backgroundImage: `url(${heroBg})` }}
        >
            <Header className={styles.headerOverlay}/>
            <div className={`${styles.content} ${loaded ? styles.enter : ""}`}>
                <h1 className={`${styles.title} ${loaded ? styles.enter : ""}`}>
                    Tus plantas están a salvo
                </h1>
                <p className={styles.subHeadline}>
                    Bloomji es un dispositivo diseñado para ayudarte a cuidar de tu planta, convirtiéndola en una mascota que interactúa contigo mediante emociones.
                </p>
                <p>¡Inscríbete a la lista de espera!</p>
                <EmailCapture />
            </div>
        </section>
    );
}