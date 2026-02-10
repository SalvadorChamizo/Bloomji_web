import styles from "./Contact.module.css";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        company: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            if (formData.company) {
                setSubmitStatus('error');
                setIsSubmitting(false);
                return;
            }

            const lastSubmit = localStorage.getItem("lastSubmit");
            if (lastSubmit && Date.now() - Number(lastSubmit) < 60000) {
                alert("Espera un momento antes de enviar otro mensaje");
                setIsSubmitting(false);
                return;
            }

            if (formData.message.length < 10) {
                setSubmitStatus('error');
                setIsSubmitting(false);
                return;
            }

            if (/https?:\/\//i.test(formData.message)) {
                setSubmitStatus('error');
                setIsSubmitting(false);
                return;
            }

            localStorage.setItem("lastSubmit", Date.now().toString());

            const { error } = await supabase
                .from("contacts")
                .insert({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                });

            if (error) {
                console.error("Supabase error:", error);
                setSubmitStatus('error');
                return;
            }
            
            setSubmitStatus('success');
            setFormData({
                name: "",
                email: "",
                message: "",
                company: ""
            });

        } catch (error) {
            console.error("Submission error:", error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.contactSheet}>
            <div className={styles.contactContainer}>
                <div className={styles.contactHeader}>
                    <h2>Contáctanos</h2>
                    <p>¡Dinos cómo podemos ayudarte, te responderemos en breve!</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.contactForm}>

                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        style={{ display: "none" }}
                        tabIndex={-1}
                        autoComplete="off"
                    />

                    <div className={styles.formGroup}>
                        <label htmlFor="name">Nombre *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Tu nombre"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="message">Mensaje *</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            placeholder="Háblanos de tu proyecto..."
                        />
                    </div>

                    {submitStatus === 'success' && (
                        <div className={styles.successMessage}>
                            ¡Gracias por contactar! Te escribiremos pronto.
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className={styles.errorMessage}>
                            Algo ha ido mal. Por favor, inténtalo de nuevo.
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                    </button>
                </form>
            </div>
        </div>
    );
}