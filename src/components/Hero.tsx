import { useRef } from "react";

import styles from "./Hero.module.css";
import clickHereImg from "../assets/click_here.svg";
import Header from "./Header";
import AppFrame from "./Frame";
import { HeroDecoration } from "./HeroDecoration";

import { usePageLoad } from "../hooks/usePageLoad";

import { EmailCapture } from "./EmailCapture";

const HERO_TITLE = "La mascota digital para tus plantas";

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const loaded = usePageLoad();

    return (
        <AppFrame>
            <div className={styles.frame}>
                <section ref={heroRef} className={styles.hero}>
            
                    <div className={styles.clickHereWrapper}>
                        <img src={clickHereImg} className={styles.clickHere} alt="Click Here" />
                    </div>
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