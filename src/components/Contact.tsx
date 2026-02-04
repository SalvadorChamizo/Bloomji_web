import styles from "./Contact.module.css";
import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
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
            // Add your form submission logic here (e.g., API call)
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            
            setSubmitStatus('success');
            setFormData({ name: "", email: "", company: "", message: "" });
        } catch (error) {
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
                            Thanks for reaching out! We'll get back to you soon.
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className={styles.errorMessage}>
                            Something went wrong. Please try again.
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    );
}