import { NavLink } from "react-router-dom";
import { useCallback, useEffect, useRef, useState} from "react";
import styles from "./Logo.module.css";

const INACTIVITY_DELAY = 500;

export default function Logo() {
    const pupilRefs = useRef<HTMLDivElement[]>([]);
    const inactivityTimer = useRef<number | null>(null);

    const [isHovering, setIsHovering] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);

    const blinkOnce = useCallback(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
    }, []);

    const blinkTwice = useCallback(() => {
        setIsBlinking(true);
        setTimeout(() => {
            setIsBlinking(false);
            setTimeout(() => {
                setIsBlinking(true);
                setTimeout(() => setIsBlinking(false), 150);
            }, 120);
        }, 140);
    }, []);

    const moveEyes = useCallback((x: number, y: number) => {
        pupilRefs.current.forEach((pupil) => {
            if (pupil) {
                pupil.style.transform = `translate(${x}px, ${y}px)`;
            }
        });
    }, []);

    const lookLeft = () => moveEyes(-4, 0);
    const lookRight = () => moveEyes(4, 0);
    const lookUp = () => moveEyes(0, -4);
    const lookDown = () => moveEyes(0, 4);

    const pickIdleAction = (): (() => void) => {
        const r = Math.random() * 100;

        if (r < 60) return blinkOnce;
        if (r < 70) return blinkTwice;
        if (r < 75) return lookLeft;
        if (r < 80) return lookRight;
        if (r < 85) return lookUp;
        if (r < 90) return lookDown;

        return () => {};
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsActive(true);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);
    
    const resetEyes = useCallback(() => {
        moveEyes(0, 0);

        setTimeout(() => {
            const action = pickIdleAction();
            action();
        }, 400);

        setTimeout(() => {
            moveEyes(0, 0);
        }, 800);
    }, [moveEyes]);

    const clearInactivityTimer = () => {
        if (inactivityTimer.current) {
            clearTimeout(inactivityTimer.current);
            inactivityTimer.current = null;
        }
    };

    const startInactivityTimer = () => {
        clearInactivityTimer();
        inactivityTimer.current = window.setTimeout(() => {
            resetEyes();
        }, INACTIVITY_DELAY);
    }

    useEffect(() => {
        if (isHovering) {
            clearInactivityTimer();
            resetEyes();
        }
    }, [isHovering, resetEyes]);

    useEffect(() => {
        if (!isActive) return;

        const handleMouseMove = (e: MouseEvent ) => {
            if (isHovering) {
                return;
            } 

            startInactivityTimer();
            pupilRefs.current.forEach((pupil) => {
                if (!pupil)
                    return;
                const rect = pupil.getBoundingClientRect();
                const pupilCenterX = rect.left + rect.width / 2;
                const pupilCenterY = rect.top + rect.height / 2;

                const deltaX = e.clientX - pupilCenterX;
                const deltaY = e.clientY - pupilCenterY;

                const maxMove = 5;
                const angle = Math.atan2(deltaY, deltaX);
                const x = Math.cos(angle) * maxMove;
                const y = Math.sin(angle) * maxMove;

                pupil.style.transform = `translate(${x}px, ${y}px)`;
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [isActive, isHovering, resetEyes]);
    
    useEffect(() => {
        const handleMouseOut = (e: MouseEvent) => {
            if (e.relatedTarget === null) {
                resetEyes();
            }
        };
        window.removeEventListener("mouseout", handleMouseOut);
        return () => window.removeEventListener("mouseout", handleMouseOut);

    }, [resetEyes]);
    const setPupilRef = useCallback((el: HTMLDivElement | null, i: number) => {
        if (el) pupilRefs.current[i] = el;
    }, []);


    return (
        <NavLink 
            to="/" 
            className={styles.logo}
            onMouseEnter={() =>  setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false) }
        >
            <span className={styles.text}>Bloomji</span>
            <div className={`${styles.eyes} ${isBlinking ? styles.blink : ""}`}>
                {[0, 1].map((i) => (
                    <div key={i} className={styles.eye}>
                        <div ref={(el) => setPupilRef(el, i)} className={styles.pupil}></div> 
                    </div>
                ))}
            </div>
        </NavLink>
    )
}