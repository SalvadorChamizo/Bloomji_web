import { NavLink } from "react-router-dom";
import { useCallback, useEffect, useRef, useState} from "react";
import styles from "./Logo.module.css";

const INACTIVITY_DELAY = 2000;

export default function Logo() {
    const pupilRefs = useRef<HTMLDivElement[]>([]);
    const inactivityTimer = useRef<number | null>(null);

    const [isHovering, setIsHovering] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsActive(true);
        }, 6000);
        return () => clearTimeout(timer);
    }, []);
    
    const resetEyes = useCallback(() => {
        pupilRefs.current.forEach((pupil) => {
            if (pupil) {
                pupil.style.transform = "translate(0, 0)";
            }
        });
    }, []);

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
            <div className={styles.eyes}>
                {[0, 1].map((i) => (
                    <div key={i} className={styles.eye}>
                        <div ref={(el) => setPupilRef(el, i)} className={styles.pupil}></div> 
                    </div>
                ))}
            </div>
        </NavLink>
    )
}