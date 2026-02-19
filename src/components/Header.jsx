"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";

import AOS from "aos";
import "aos/dist/aos.css";

export default function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: "ease-out-cubic",
            once: true,
            offset: 0,
        });
    }, []);

    const navLinks = [
        { name: "Главная", path: "/" },
        { name: "О нас", path: "/about" },
        { name: "Блог", path: "/blog" },
        { name: "USD ERP", path: "/usderp" },
        { name: "USD консалтинг", path: "/usdkonsult" },
        { name: "USD Market", path: "/usdmarket" },
        { name: "Контакты", path: "/contact" },
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
                    <div className="flex-shrink-0" data-aos="fade-right">
                        <Link href="/">
                            <span className="text-2xl font-bold tracking-tighter text-white">
                                USD<span className="text-blue-500">SYSTEM</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop меню */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
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
                                        {link.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Кнопка мобильного меню */}
                    <div className="md:hidden" data-aos="fade-left">
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
                                        {link.name}
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
