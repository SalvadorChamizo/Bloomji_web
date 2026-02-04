import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./Hero.module.css";
import saintImg from "../assets/Eglise_Notre-Dame_Bar-le-Duc_Vitrail_Saint_Fiacre_30_04_2012.png";

import Header from "./Header";
import AppFrame from "./Frame";
import { HeroDecoration } from "./HeroDecoration";
import FloatingWords from "./FloatingWords";

import { usePageLoad } from "../hooks/usePageLoad";

import { EmailCapture } from "./EmailCapture";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger);

const HERO_TITLE = "La mascota digital para tus plantas";

const FLOATING_WORDS = [
    {
        text: "Quieres",
        top: "20%",
        left: "25%",
        size: "clamp(1.3rem, 2.5vw, 2.8rem)",
    },
    {
        text: "tener",
        top: "40%",
        left: "40%",
        size: "clamp(1.5rem, 3vw, 3rem)",
    },
    {
        text: "plantas",
        top: "23%",
        left: "55%",
        size: "clamp(2rem, 4vw, 3.5rem)",
    },
    {
        text: "pero",
        top: "50%",
        left: "30%",
        size: "clamp(1rem, 2vw, 2.5rem)",
    },
];

function useHeroScrollAnimation(ref: React.RefObject<HTMLElement | null>) {
    useEffect(() => {
        if (!ref.current) return;

        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(".word").forEach((el, i) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ref.current,
                            start: `${20 + i * 20}% top`,
                            end: `${25 + i * 20}% top`,
                            scrub: true,
                        },
                    }
                );
            });
        }, ref);

        return () => ctx.revert();
    }, [ref]);
}

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const loaded = usePageLoad();
    const [contactPane, setContactPane] = useState<{visible: boolean}>({visible: false});

    useHeroScrollAnimation(heroRef);

    return (
        <AppFrame>
            <div className={styles.frame}>
                <section ref={heroRef} className={styles.hero}>
                    <img src={saintImg} className={`${styles.saint} ${styles.hasRope}`} alt="Saint" />
            
                    <FloatingWords words={FLOATING_WORDS} />
                    <HeroDecoration />
                    <Header className={styles.headerOverlay}/>

                    <div 
                        className={`${styles.content} ${
                            loaded ? styles.enter : ""
                        }`}>
                        
                        <h1 
                            className={`${styles.title} ${
                                loaded ? styles.enter : ""
                            }`}>
                            {HERO_TITLE.split(" ").map((word, i) => (
                                <span key={i} className={styles.word}>
                                {word}
                                </span>
                            ))}
                        </h1>
                        
                        <p>¡Inscríbete a la lista de espera!</p>
                        <EmailCapture />
                    </div>
                </section>
            </div>
        </AppFrame>
    );
}