'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { Warehouse, Users, Receipt, PieChart, ShieldCheck, Zap } from 'lucide-react';

export default function USDERP() {

    useEffect(() => {
        AOS.init({
            duration: 900,
            easing: 'ease-out-cubic',
            once: true,
            offset: 120,
        });
    }, []);

    const features = [
        { icon: <Warehouse />, title: "Управление складом", desc: "Контроль остатков в реальном времени." },
        { icon: <Users />, title: "HR и сотрудники", desc: "Учет зарплат, KPI и рабочего времени." },
        { icon: <Receipt />, title: "Финансовый учет", desc: "Доходы и расходы по проектам." },
        { icon: <PieChart />, title: "Аналитика проектов", desc: "Диаграммы и отчеты." },
        { icon: <ShieldCheck />, title: "Безопасность", desc: "Защищенное облачное хранение." },
        { icon: <Zap />, title: "Интеграция", desc: "Подключение за считанные дни." }
    ];

    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Заголовок */}
                <div
                    className="text-center mb-20 overflow-hidden" // добавили overflow-hidden
                    data-aos="fade-up"
                >
                    <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">
                        Системы для бизнеса
                    </span>
                    <h1 className="relative text-4xl lg:text-6xl font-bold mt-4 mb-6 text-white">
                        Платформа USD ERP
                    </h1>
                    <p className="text-slate-400 max-w-3xl mx-auto text-lg">
                        Все процессы строительной компании — в одной системе.
                    </p>
                </div>

                {/* Карточки */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            data-aos="fade-up"
                            data-aos-delay={i * 100}
                            className="p-8 bg-slate-900 border border-slate-800 rounded-2xl
                                       transition-all duration-300 hover:-translate-y-2
                                       hover:border-blue-500/50 hover:shadow-xl"
                        >
                            <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center mb-6">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">
                                {f.title}
                            </h3>
                            <p className="text-slate-400 text-sm">
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div
                    className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 rounded-[3rem] p-12 lg:p-20 overflow-hidden"
                    data-aos="zoom-in"
                >
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div
                            className="lg:w-1/2 overflow-hidden" // добавили overflow-hidden для анимации текста
                            data-aos="fade-right"
                        >
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
                                Цифровизация склада
                            </h2>
                            <p className="text-slate-300 mb-8">
                                Контроль материалов, уведомления и аналитика в реальном времени.
                            </p>
                            <button className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold transition hover:scale-105">
                                Просмотр демо
                            </button>
                        </div>

                        <div
                            className="lg:w-1/2 overflow-hidden" // добавили overflow-hidden для картинки
                            data-aos="fade-left"
                        >
                            <img
                                src="https://cdn.prod.website-files.com/6863b933f77bf8ca43166aa3/68b69a0a86ae316e2321d9ac_AdobeStock_219924013.jpeg"
                                className="rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105"
                                alt="ERP Dashboard"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
