import { useEffect, useState } from "react";

export function usePageLoad() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const t = requestAnimationFrame(() => setLoaded(true));
        return () => cancelAnimationFrame(t);
    }, []);

    return loaded;
}

