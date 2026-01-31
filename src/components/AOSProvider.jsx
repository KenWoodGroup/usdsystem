// components/AOSProvider.jsx
"use client";
import { useEffect } from "react";

export default function AOSProvider() {
    useEffect(() => {
        import("aos/dist/aos.css");
        import("aos").then((AOS) => AOS.default.init());
    }, []);

    return null;
}
