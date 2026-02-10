import { usePageLoad } from "../hooks/usePageLoad"
import styles from "./Hero.module.css"

import { useRef } from "react";
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

    const rootRef = useRef<HTMLDivElement | null>(null);
    const dragging = useRef(false);
    const rel = useRef({ x: 0, y: 0 });

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!rootRef.current) return;

        dragging.current = true;

        const current = gsap.getProperty(rootRef.current, "x") as number;
        const currentY = gsap.getProperty(rootRef.current, "y") as number;


        rel.current = {
            x: e.clientX - current,
            y: e.clientY - currentY,
        };

        rootRef.current.style.cursor = "grabbing";
        rootRef.current.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!dragging.current || !rootRef.current) return;

        const newX = e.clientX - rel.current.x;
        const newY = e.clientY - rel.current.y;

        gsap.set(rootRef.current, {
            x: newX,
            y: newY,
        });
    };

    const onPointerUp = () => {
        dragging.current = false;
        if (rootRef.current) {
            rootRef.current.style.cursor = "grab";
        }
    };

    return (
        <div
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={`${styles.cloudRoot} ${cloud ? styles.hasRope : ""} ${loaded ? styles.enter : ""}`}
        style={{ top, left, right, width, opacity, zIndex, "--enter-delay": `${Math.abs(delay) * 0.1}s`,} as React.CSSProperties}
        >
            <div
            ref={rootRef}
            onPointerDown={onPointerDown}
            className={styles.cloudDrag}
            style={{ cursor: "grab", touchAction: "none", willChange: "transform", }}
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
                    {cloud && <div className={styles.rope}></div>}
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
        </div>
    )
}