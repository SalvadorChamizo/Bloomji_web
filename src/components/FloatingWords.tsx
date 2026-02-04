import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./FloatingWords.module.css";

gsap.registerPlugin(ScrollTrigger);

type FloatingWord = {
    text: string;
    top: string;
    left?: string;
    right?: string;
    size?: string;
    delay?: number;
};

type Props = {
    words: FloatingWord[];
    trigger?: HTMLElement | string;
};

export default function FloatingWords({ words, trigger }: Props) {
    return (
        <div className={styles.root}>
            {words.map((word, i) => (
                <span
                    key={i}
                    className={`${styles.word} fw-${i + 1}`}
                    style={{
                        top: word.top,
                        left: word.left,
                        fontSize: word.size ?? "3rem",
                    }}
                >
                    {word.text}
                </span>
                ))}
        </div>
    );
}