import styles from "./SlidingPane.module.css";

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
    return (
        <>
            <div
                className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
                onClick={onClose}
            />

            <aside
                className={`
                    ${styles.pane}
                    ${styles[side]}
                    ${isOpen ? styles.open : ""}
                `}
            >
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Close panel"
                >
                    x
                </button>
            
                <div className={styles.content}>{children}</div>
            </aside>
        </>
    );
}