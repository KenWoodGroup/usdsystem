"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ вместо useRouter для получения текущего пути
import { Menu, X, ChevronRight } from "lucide-react";

export default function Header() {
    const pathname = usePathname(); // текущий путь
    const [isOpen, setIsOpen] = useState(false); // состояние для мобильного меню

    // Список ссылок навигации
    const navLinks = [
        { name: "Главная", path: "/" },
        { name: "О нас", path: "/about" },
        { name: "USD ERP", path: "/usderp" },
        { name: "USD CRM", path: "/usdsoft" },
        { name: "USD Market", path: "/usdfinance" },
        { name: "Контакты", path: "/contact" },
    ];

    // Проверка, активен ли текущий путь
    const isActive = (path) => pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Логотип */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <span className="text-2xl font-bold tracking-tighter text-white">
                                USD<span className="text-blue-500">SYSTEM</span>
                            </span>
                        </Link>
                    </div>

                    {/* Меню для десктопа */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <Link key={link.name} href={link.path}>
                                    <span
                                        className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive(link.path)
                                            ? "text-blue-400" // если ссылка активна
                                            : "text-slate-300 hover:text-white" // если не активна
                                            }`}
                                    >
                                        {link.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Кнопка мобильного меню */}
                    <div className="md:hidden">
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
                <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.path}>
                                <span
                                    onClick={() => setIsOpen(false)} // закрытие меню при клике
                                    className={`block px-3 py-4 text-base font-medium border-b border-slate-800 last:border-0 ${isActive(link.path) ? "text-blue-400" : "text-slate-300"
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
