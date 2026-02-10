import styles from "./Hero.module.css"
import { usePageLoad } from "../hooks/usePageLoad";
import treeMask from "../assets/flower_pot_mask.svg"

type TreeProps = {
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
}

export function Tree({
    src,
    top = "0%",
    left,
    right,
    width = "40%",
    opacity = 1,
    blur = 0,
    zIndex = 1,
    rotate = 0,
}: TreeProps) {
    const loaded = usePageLoad();

    return (
        <div
            className={`${styles.treeRoot} ${loaded ? styles.enter : ""}`}
            style={{ top, left, right, width, opacity, zIndex }}
        >
                <div
                    className={styles.cloudRotate}
                    style={{ "--rotate": `${rotate}deg` } as React.CSSProperties}
                    >
                    <div
                        className={styles.treeShape}
                        style={{
                        WebkitMaskImage: `url(${treeMask})`,
                        maskImage: `url(${treeMask})`,
                        }}
                    >
                        <img
                            src={src}
                            className={styles.tree}
                            style={{ filter: blur ? `blur(${blur}px)` : undefined }}
                            draggable={false}
                            alt=""
                            tabIndex={0}
                        />
                    </div>
                </div>
            </div>
    )
}