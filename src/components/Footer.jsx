"use client";

import React from "react";
import Link from "next/link";
import {
    Linkedin,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
const Footer = () => {
    return (
        <footer
            className="bg-[#0F172A] border-t border-[#1E293B] pt-16 pb-8"
            data-aos="fade-up"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Верхняя часть */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div data-aos="fade-up" data-aos-delay="0">
                        <span className="text-2xl font-bold tracking-tighter text-white mb-6 block">
                            USD<span className="text-blue-500">SYSTEM</span>
                        </span>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Инновационные технологии и цифровые решения, которые поднимают ваш
                            бизнес на новый уровень.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <a href="/offers" className="text-slate-300 hover:text-white transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div data-aos="fade-up" data-aos-delay="150">
                        <h4 className="text-white font-semibold mb-6">Услуги</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li>
                                <Link href="/usderp" className="hover:text-blue-400 transition-colors">
                                    USD ERP – Строительный CRM
                                </Link>
                            </li>
                            <li>
                                <Link href="/usdsoft" className="hover:text-blue-400 transition-colors">
                                    USD Soft – Автоматизация
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/usdfinance"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    USD Finance – Marketplace
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="hover:text-blue-400 transition-colors">
                                    Логистические услуги
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div data-aos="fade-up" data-aos-delay="300">
                        <h4 className="text-white font-semibold mb-6">Компания</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li>
                                <Link href="/about" className="hover:text-blue-400 transition-colors">
                                    О нас
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    Контакты
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-400 transition-colors">
                                    Вакансии
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-400 transition-colors">
                                    Блог
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div data-aos="fade-up" data-aos-delay="450">
                        <h4 className="text-white font-semibold mb-6">Контакты</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li className="flex items-start space-x-3">
                                <MapPin size={18} className="text-blue-500 mt-0.5" />
                                <span>
                                    700002, Tashkent, Tashkent Region, Узбекистан
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={18} className="text-blue-500" />
                                <a href="tel:+998 88 666 33 66">+998 88 666 33 66</a>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={18} className="text-blue-500" />
                                <a href="mailto:umarkhidirboev@gmail.com">
                                    umarkhidirboev@gmail.com
                                </a>                            </li>
                        </ul>
                    </div>
                </div>

                {/* Нижняя часть */}
                <div
                    className="border-t border-[#1E293B] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500"
                    data-aos="fade-up"
                    data-aos-delay="600"
                >
                    <p>© 2024 USD Group. Все права защищены.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">
                            Политика конфиденциальности
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            Условия использования
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
