'use client';

import React from 'react';
import { Code2, Smartphone, Globe, Layers, Settings, Cloud } from 'lucide-react';

export default function USDSoft() {
    return (
        <div className="pt-32 pb-24 bg-[#020617]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                    <div className="overflow-hidden" data-aos="fade-up"> {/* Анимация появления */}
                        <h1 className="relative text-4xl lg:text-6xl font-extrabold mb-8 leading-tight text-[#FFFFFF]">
                            Автоматизируйте ваш <span className="text-[#2DD4BF] underline decoration-2 underline-offset-8">бизнес</span>
                        </h1>
                        <p className="text-[#94A3B8] text-lg mb-10 leading-relaxed">
                            Мы не просто пишем код, мы решаем проблемы. Анализируем ваши бизнес-процессы и создаём самые эффективные цифровые решения.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center space-x-2 px-4 py-2 bg-[#0F172A] border border-[#1E293B] rounded-full text-sm text-[#CBD5E1]">
                                <Settings size={16} className="text-[#2DD4BF]" />
                                <span>Систематизация производства</span>
                            </div>
                            <div className="flex items-center space-x-2 px-4 py-2 bg-[#0F172A] border border-[#1E293B] rounded-full text-sm text-[#CBD5E1]">
                                <Cloud size={16} className="text-[#60A5FA]" />
                                <span>Облачные решения</span>
                            </div>
                        </div>
                    </div>

                    {/* Скриншоты и иконки */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="h-64 rounded-3xl overflow-hidden shadow-2xl" data-aos="fade-up" data-aos-delay="100">
                                <img
                                    src="https://biznes-repetitor.ru/upload/iblock/800/3wlax7hl0s0z1849shbsbvg15593ob2p.jpg"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                    alt="Скриншот USDSoft 1"
                                />
                            </div>
                            <div className="h-40 bg-[#0D9488] rounded-3xl flex items-center justify-center overflow-hidden" data-aos="fade-up" data-aos-delay="200">
                                <Code2 size={48} className="text-[#FFFFFF]" />
                            </div>
                        </div>
                        <div className="space-y-4 pt-8">
                            <div className="h-40 bg-[#2563EB] rounded-3xl flex items-center justify-center overflow-hidden" data-aos="fade-up" data-aos-delay="300">
                                <Smartphone size={48} className="text-[#FFFFFF]" />
                            </div>
                            <div className="h-64 rounded-3xl overflow-hidden shadow-2xl" data-aos="fade-up" data-aos-delay="400">
                                <img
                                    src="https://s0.rbk.ru/v6_top_pics/media/img/0/87/347543056344870.webp"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                    alt="Скриншот USDSoft 2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Технологический стек */}
                <div className="border-t border-[#1E293B] pt-24 overflow-hidden">
                    <h2 className="relative text-3xl font-bold mb-16 text-center text-[#FFFFFF]" data-aos="fade-up">
                        Технологический стек
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 text-center opacity-70">
                        <div className="flex flex-col items-center text-[#CBD5E1]" data-aos="fade-up" data-aos-delay="100">
                            <Globe size={32} className="mb-2" />
                            <span>React / Next.js</span>
                        </div>
                        <div className="flex flex-col items-center text-[#CBD5E1]" data-aos="fade-up" data-aos-delay="200">
                            <Layers size={32} className="mb-2" />
                            <span>Микросервисы</span>
                        </div>
                        <div className="flex flex-col items-center text-[#CBD5E1]" data-aos="fade-up" data-aos-delay="300">
                            <Code2 size={32} className="mb-2" />
                            <span>Python / Go</span>
                        </div>
                        <div className="flex flex-col items-center text-[#CBD5E1]" data-aos="fade-up" data-aos-delay="400">
                            <Settings size={32} className="mb-2" />
                            <span>IoT & Edge</span>
                        </div>
                        <div className="flex flex-col items-center text-[#CBD5E1]" data-aos="fade-up" data-aos-delay="500">
                            <Cloud size={32} className="mb-2" />
                            <span>AWS / Azure</span>
                        </div>
                        <div className="flex flex-col items-center text-[#CBD5E1]" data-aos="fade-up" data-aos-delay="600">
                            <Smartphone size={32} className="mb-2" />
                            <span>React Native</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
