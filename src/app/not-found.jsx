'use client';

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white px-4">
            <h1 className="text-6xl font-extrabold mb-4">{t("not_found.title")}</h1>
            <h2 className="text-2xl md:text-3xl mb-6">{t("not_found.subtitle")}</h2>
            <p className="text-slate-400 mb-8 text-center max-w-md">
                {t("not_found.description")}
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-bold transition-all duration-300"
            >
                {t("not_found.back_home")}
            </Link>
        </div>
    );
}
