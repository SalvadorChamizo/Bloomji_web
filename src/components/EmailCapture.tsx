import { supabase } from "../lib/supabase";
import { usePageLoad } from "../hooks/usePageLoad";
import { useRef, useState } from "react";

import styles from "./EmailCapture.module.css";

export function CTAButton({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLButtonElement>(null)

    const handleEnter = () => {
        if (!ref.current) return;

        ref.current.style.transition = "transform 7s cubic-bezier(.72, .17, .17, 1)"
    };

    const handleMove = (e: React.MouseEvent) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const xNorm = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const yNorm = ((e.clientY - rect.top) / rect.height) * 2 - 1;

        const clamp = (v: number, min: number, max: number) =>
            Math.min(Math.max(v, min), max);

        const rotateX = yNorm * -2;
        const rotateZ = clamp(xNorm * 6, -5, 5);
        const scale = 1.080;

        requestAnimationFrame(() => {
            if (!ref.current) return ;

            ref.current.style.transition = 
                "transform 0.05s cubic-bezier(.72, .17, .17, 1)"

            ref.current.style.transform = `
                rotateX(${rotateX}deg) 
                rotateZ(${rotateZ}deg)
                scale(${scale})
            `
        });
    };

    const reset = () => {
        if (!ref.current) return;

        ref.current.style.transition = 
            "transform 0.3s cubic-bezier(.72, .17, .17, 1)";

        ref.current.style.transform = 
            "rotate(0deg) scale(1)";
    }

    return (
        <button
            ref={ref}
            className={styles.ctaButton}
            onMouseEnter={handleEnter}
            onMouseMove={handleMove}
            onMouseLeave={reset}
        >
            {children}
        </button>
    );
}

export function EmailCapture() {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const loaded = usePageLoad();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const { error: supabaseError } = await supabase
            .from("waitlist")
            .insert({ email });

        if (supabaseError) {
            if (supabaseError.code === "23505" || supabaseError.message.includes("duplicate")) {
                setError("Este correo ya está registrado");
            } else {
                setError("Hubo un error. Por favor, inténtalo de nuevo");
            }
            return;
        }

        setSuccess(true);
        setEmail("");
    };

    if (success) {
        return (
            <p className={styles.emailCaptureSuccess}>
                ¡Gracias! Te avisaremos pronto.
            </p>
        );
    }

    return  (
        <form 
            className={`${styles.emailCapture} ${loaded ? styles.enter : ""}`}
            onSubmit={submit}
        >
            <input
                type="email"
                name="email"
                className={styles.input}
                placeholder="Dirección de correo"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <CTAButton>
                Apúntate ahora
            </CTAButton>
            {error && <p className={styles.errorMessage}>{error}</p>}
        </form>
    );
}