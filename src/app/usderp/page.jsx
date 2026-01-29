// app/usderp/page.js
import React from 'react';
import { Warehouse, Users, Receipt, PieChart, ShieldCheck, Zap } from 'lucide-react';

export default function USDERP() {
    const features = [
        { icon: <Warehouse />, title: "Управление складом", desc: "Анализ остатков и движения строительных материалов в реальном времени." },
        { icon: <Users />, title: "HR и сотрудники", desc: "Автоматический учет рабочего времени, зарплат и KPI сотрудников." },
        { icon: <Receipt />, title: "Финансовый учет", desc: "Полный мониторинг доходов и расходов по проектам." },
        { icon: <PieChart />, title: "Аналитика проектов", desc: "Визуальные диаграммы и отчеты для каждого строительного объекта." },
        { icon: <ShieldCheck />, title: "Безопасность", desc: "Хранение данных в облаке с высоким уровнем шифрования." },
        { icon: <Zap />, title: "Быстрая интеграция", desc: "Легкое подключение к маркетплейсам и бухгалтерским программам." }
    ];

    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <span className="text-[#3B82F6] font-bold tracking-widest uppercase text-sm">Системы для бизнеса</span>
                    <h1 className="text-4xl lg:text-6xl font-bold mt-4 mb-6 text-[#FFFFFF]">Платформа USD ERP</h1>
                    <p className="text-[#94A3B8] max-w-3xl mx-auto text-lg leading-relaxed">
                        Единственная экосистема, объединяющая все внутренние процессы строительных компаний. Управление теперь под рукой.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
                    {features.map((f, i) => (
                        <div key={i} className="p-8 bg-[#0F172A] border border-[#1E293B] rounded-2xl hover:border-[#3B82F6]/50 transition-all">
                            <div className="w-12 h-12 bg-[#3B82F6]/10 text-[#3B82F6] rounded-lg flex items-center justify-center mb-6">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-[#FFFFFF]">{f.title}</h3>
                            <p className="text-[#94A3B8] text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-r from-[#1E40AF]/40 to-[#3730A3]/40 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden">
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#FFFFFF]">Цифровизация вашего склада</h2>
                            <p className="text-[#CBD5E1] mb-8 leading-relaxed">
                                Наибольшие потери на стройке происходят из-за беспорядка на складе. С USD ERP вы знаете остатки каждого материала. Система автоматически уведомляет, когда материалы заканчиваются.
                            </p>
                            <button className="px-8 py-4 bg-[#FFFFFF] text-[#0F172A] rounded-full font-bold hover:bg-[#E2E8F0] transition-colors">
                                Просмотр демо
                            </button>
                        </div>
                        <div className="lg:w-1/2">
                            <img src="https://picsum.photos/600/400?random=2" className="rounded-2xl shadow-2xl" alt="ERP Dashboard" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
