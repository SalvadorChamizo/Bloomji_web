import cloudImg1 from "../assets/paper_cloud4.svg";
import cloudImg2 from "../assets/paper_cloud5.svg";
import cloudImg3 from "../assets/paper_cloud6.svg";
import cloudImg4 from "../assets/paper_cloud1.svg";
import bloomjiImg from "../assets/bloomji.png";
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
    const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1399px)");

    const cloudSizes = isMobile
        ? { small: "160px", medium: "180px", large: "200px" }
        : isTablet
        ? { small: "130px", medium: "150px", large: "170px" }
        : { small: "200px", medium: "230px", large: "250px" };

    return (
        <div className={styles.fixedDecorationLayer} aria-hidden>

            {isMobile && (
                <>
                    <Cloud
                        src={cloudImg2}
                        top="8%"
                        left="-20%"
                        width={cloudSizes.large}
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
                        width={cloudSizes.medium}
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
                        top="90%"
                        left="0%"
                        width="400px"
                        opacity={1}
                        blur={0}
                        zIndex={10}
                    />

                    <div className={styles.bloomjiRoot} style={{ top: "100%", left: "20%", zIndex: 11 }}>
                        <div
                            className={styles.treeShape}
                            style={{
                                WebkitMaskImage: `url(${bloomjiImg})`,
                                maskImage: `url(${bloomjiImg})`,
                            }}
                        >
                            <img src={bloomjiImg} className={styles.tree} alt="Bloomji mascot" />
                        </div>
                    </div>
                </>
            )}

            {!isMobile && (
                <>
                    <Cloud
                        src={cloudImg2}
                        top="15%"
                        right="10%"
                        width={cloudSizes.large}
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
                        top="20%"
                        left="30%"
                        width={cloudSizes.small}
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
                        width={cloudSizes.medium}
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
                        width={cloudSizes.medium}
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
                        width={cloudSizes.small}
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
                        width={isTablet ? "550px" : "700px"}
                        opacity={1}
                        blur={0}
                        zIndex={10}
                    />

                    <div className={styles.bloomjiRoot} style={{ top: "105%", left: "70%", zIndex: 11 }}>
                        <div
                            className={styles.treeShape}
                            style={{
                                WebkitMaskImage: `url(${bloomjiImg})`,
                                maskImage: `url(${bloomjiImg})`,
                            }}
                        >
                            <img src={bloomjiImg} className={styles.tree} alt="Bloomji mascot" />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}