import cloudImg1 from "../assets/paper_cloud4.svg";
import cloudImg2 from "../assets/paper_cloud5.svg";
import cloudImg3 from "../assets/paper_cloud6.svg";
import cloudImg4 from "../assets/paper_cloud1.svg";
import saroca from "../assets/sergio_foto.png"
import tree from "../assets/flower_pot_new.svg";
import { Cloud } from "./Cloud";
import { Tree } from "./Tree";
import { useEffect, useState} from "react";
import styles from "./Hero.module.css";

function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(
        window.matchMedia(query).matches
    );

    useEffect(() => {
        const media: MediaQueryList = window.matchMedia(query);
        const listener = (): void => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
}


export function HeroDecoration() {
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <div className={styles.fixedDecorationLayer} aria-hidden>
            
            {/* BACK clouds */}
            {/* MID clouds */}
            {isMobile && (
                <>
                    <Cloud
                        src={cloudImg2}
                        top="8%"
                        left="-20%%"
                        width="200px"
                        opacity={0.95}
                        blur={0}
                        floatX={16}
                        floatY={42}
                        duration={26}
                        delay={-12}
                        zIndex={8}
                        rotate={-2}
                    />

                    <Cloud
                        src={cloudImg1}
                        top="40%"
                        right="0%"
                        width="190px"
                        opacity={0.95}
                        blur={0}
                        floatX={-20}
                        floatY={2}
                        duration={30}
                        delay={-7}
                        zIndex={9}
                    />
                    <Tree
                        src={tree}
                        top="110%"
                        left="80%"
                        width="50px"
                        opacity={1}
                        blur={0}
                        zIndex={10}
                    />
                </>
            )}
            {!isMobile && (
                <>
                <Cloud
                    src={cloudImg2}
                    top="15%"
                    right="10%"
                    width="250px"
                    opacity={0.95}
                    blur={0}
                    floatX={16}
                    floatY={42}
                    duration={26}
                    delay={-12}
                    zIndex={8}
                    rotate={-2}
                />
{/*                 <Cloud
                    src={saroca}
                    top="40%"
                    right="45%"
                    width="150px"
                    opacity={0.95}
                    blur={0}
                    floatX={16}
                    floatY={42}
                    duration={26}
                    delay={-12}
                    zIndex={8}
                    rotate={-2}
                /> */}
                <Cloud
                    src={cloudImg1}
                    top="20%"
                    left="30%"
                    width="200px"
                    opacity={0.95}
                    blur={0}
                    floatX={25}
                    floatY={12}
                    duration={22}
                    delay={-4}
                    zIndex={4}
                />
                <Cloud
                    src={cloudImg4}
                    top="0.2%"
                    left="5%"
                    width="220px"
                    opacity={1}
                    blur={0}
                    floatX={-32}
                    floatY={12}
                    duration={18}
                    delay={-9}
                    zIndex={6}
                />
                <Cloud
                    src={cloudImg3}
                    top="40%"
                    left="55%"
                    width="230px"
                    opacity={0.95}
                    blur={0}
                    floatX={-20}
                    floatY={2}
                    duration={30}
                    delay={-7}
                    zIndex={9}
                />
                <Cloud
                    src={cloudImg1}
                    top="50%"
                    left="90%"
                    width="200px"
                    opacity={0.95}
                    blur={0}
                    floatX={-20}
                    floatY={2}
                    duration={30}
                    delay={-7}
                    zIndex={9}
                />
                <Tree
                    src={tree}
                    top="84%"
                    left="60%"
                    width="700px"
                    opacity={1}
                    blur={0}
                    zIndex={10}
                />
            </>
            )}
        </div>
    )
}