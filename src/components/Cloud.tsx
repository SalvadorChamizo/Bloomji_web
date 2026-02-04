import { usePageLoad } from "../hooks/usePageLoad"
import styles from "./Hero.module.css"

import {useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CloudProps = {
    src: string
    top?: string
    left?: string
    right?: string
    width?: string
    opacity?: number
    blur?: number
    zIndex?: number
    rotate?: number
    floatX?: number;
    floatY?: number;
    duration?: number;
    delay?: number;
    
    tree?: boolean
    cloud?: boolean
}


export function Cloud({
    src,
    top = "0%",
    left,
    right,
    width = "40%",
    opacity = 1,
    blur = 0,
    zIndex = 1,
    rotate = 0,
    floatX = 12,
    floatY = 8,
    duration = 18,
    delay = 0,
    cloud = true,
    tree = false,
}: CloudProps) {
    const loaded = usePageLoad();

    return (
        <div
            className={`${styles.cloudRoot} ${cloud ? styles.hasRope : ""} ${loaded ? styles.enter : ""}`}
            style={{ top, left, right, width, opacity, zIndex, "--enter-delay": `${Math.abs(delay) * 0.1}s`,} as React.CSSProperties}
        >
            <div
                className={styles.cloudFloat}
                style={{
                    "--float-x": `${floatX}px`,
                    "--float-y": `${floatY}px`,
                    "--float-duration": `${duration}s`,
                    "--float-delay": `${delay}s`,
                } as React.CSSProperties}
                >
                <div
                className={styles.cloudRotate}
                style={{ "--rotate": `${rotate}deg` } as React.CSSProperties}
                >
                <div
                    className={styles.cloudShape}
                    style={{
                    WebkitMaskImage: `url(${src})`,
                    maskImage: `url(${src})`,
                    }}
                >
                    <img
                    src={src}
                    className={`${cloud ? styles.cloud : ""} ${tree ? styles.tree : ""}`}
                    style={{ filter: blur ? `blur(${blur}px)` : undefined }}
                    draggable={false}
                    alt=""
                    />
                </div>
                </div>
            </div>
        </div>
    )
}