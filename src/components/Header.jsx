"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import Logo from "../../public/Logo.png";

import AOS from "aos";
import "aos/dist/aos.css";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const languages = [
        { code: 'ru', name: 'RU' },
        { code: 'en', name: 'EN' },
        { code: 'uz', name: 'UZ' }
    ];

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                aria-label="Change language"
            >
                <Globe size={16} />
                <span>{mounted ? currentLanguage.name : languages[0].name}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-24 rounded-xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden z-50">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                i18n.changeLanguage(lang.code);
                                setIsOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-sm text-left transition-colors ${i18n.language === lang.code
                                ? "bg-blue-600 text-white"
                                : "text-slate-300 hover:bg-slate-800"
                                }`}
                        >
                            {lang.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function Header() {
    const { t } = useTranslation();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        AOS.init({
            duration: 700,
            easing: "ease-out-cubic",
            once: true,
            offset: 0,
        });
    }, []);

    const navLinks = [
        { name: t("header.home"), path: "/" },
        { name: t("header.about"), path: "/about" },
        { name: t("header.usderp"), path: "/usderp" },
        { name: t("header.usdkonsult"), path: "/usdkonsult" },
        { name: t("header.usdmarket"), path: "/usdmarket" },
        { name: t("header.contact"), path: "/contact" },
    ];

    const isActive = (path) => pathname === path;

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 glass transition-all duration-300"
            data-aos="fade-down"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Логотип */}
                    <div className="shrink-0" data-aos="fade-right">
                        <Link href="/">
                            <img
                                src={Logo.src || Logo}
                                alt="Logo"
                                className="w-[50px]"
                            />
                        </Link>
                    </div>

                    {/* Desktop меню */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4 lg:space-x-8">
                            {navLinks.map((link, i) => (
                                <Link key={link.name} href={link.path}>
                                    <span
                                        data-aos="fade-down"
                                        data-aos-delay={i * 80}
                                        className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive(link.path)
                                            ? "text-blue-400"
                                            : "text-slate-300 hover:text-white"
                                            }`}
                                    >
                                        {mounted ? link.name : ""}
                                    </span>
                                </Link>
                            ))}
                            <LanguageSwitcher />
                        </div>
                    </div>

                    {/* Кнопка мобильного меню */}
                    <div className="md:hidden flex items-center gap-4" data-aos="fade-left">
                        <LanguageSwitcher />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Мобильное меню */}
            {isOpen && (
                <div
                    className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800"
                    data-aos="fade-down"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link, i) => (
                            <Link key={link.name} href={link.path}>
                                <span
                                    onClick={() => setIsOpen(false)}
                                    data-aos="fade-right"
                                    data-aos-delay={i * 100}
                                    className={`block px-3 py-4 text-base font-medium border-b border-slate-800 last:border-0 ${isActive(link.path)
                                        ? "text-blue-400"
                                        : "text-slate-300"
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        {mounted ? link.name : ""}
                                        <ChevronRight size={16} />
                                    </div>
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
