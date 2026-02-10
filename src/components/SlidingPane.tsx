import styles from "./SlidingPane.module.css";
import { useState, useEffect } from "react";

interface SlidingPaneProps {
    isOpen: boolean;
    onClose: () => void;
    side?: "left" | "right";
    children: React.ReactNode;
}

export default function SlidingPane({
    isOpen,
    onClose,
    side = "right",
    children,
}: SlidingPaneProps) {
    const [isClosing, setIsClosing] = useState(false);
    const [shouldRender, setShouldRender] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setIsClosing(false);
        } else if (!isOpen && shouldRender) {
            setIsClosing(true);
            
            const timeout = setTimeout(() => {
                setIsClosing(false);
                setShouldRender(false);
            }, 1500);
            
            return () => clearTimeout(timeout);
        }
    }, [isOpen, shouldRender]);

    const handleClose = () => {
        onClose();
    };

    if (!shouldRender) return null;

    return (
        <>
            <div
                className={`${styles.overlay} ${isOpen && !isClosing ? styles.open : ""}`}
                onClick={handleClose}
            />

            <aside
                className={`
                    ${styles.pane}
                    ${styles[side]}
                    ${isOpen && !isClosing ? styles.open : ""}
                    ${isClosing ? styles.closing : ""}
                `}
            >
                <button
                    className={styles.closeButton}
                    onClick={handleClose}
                    aria-label="Close panel"
                >
                </button>
            
                <div className={styles.content}>{children}</div>
            </aside>
        </>
    );
}