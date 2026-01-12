import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/Footer";

export default function MainLayout() {
    const location = useLocation();

    useEffect(() => {
        if (!location.hash) return;

        const el = document.querySelector(location.hash);
        if (!el) return;
        
        el.scrollIntoView({ behavior: "smooth" });

        const timeout = setTimeout(() => {
            window.history.replaceState(
                null,
                "",
                location.pathname
            );
        }, 300);

        return () => clearTimeout(timeout);
    }, [location]);

    return (
        <>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
