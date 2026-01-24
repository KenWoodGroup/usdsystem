'use client'; // 🔥 Важно для интерактивных компонентов

import React from 'react';
import { Code2, Smartphone, Globe, Layers, Settings, Cloud } from 'lucide-react';

export default function USDSoft() {
    return (
        <div className="pt-32 pb-24 bg-[#020617]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                    <div>
                        <h1 className="text-4xl lg:text-6xl font-extrabold mb-8 leading-tight text-[#FFFFFF]">
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
                            <div className="h-64 rounded-3xl overflow-hidden shadow-2xl">
                                <img src="https://picsum.photos/400/600?random=3" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Скриншот USDSoft 1" />
                            </div>
                            <div className="h-40 bg-[#0D9488] rounded-3xl flex items-center justify-center">
                                <Code2 size={48} className="text-[#FFFFFF]" />
                            </div>
                        </div>
                        <div className="space-y-4 pt-8">
                            <div className="h-40 bg-[#2563EB] rounded-3xl flex items-center justify-center">
                                <Smartphone size={48} className="text-[#FFFFFF]" />
                            </div>
                            <div className="h-64 rounded-3xl overflow-hidden shadow-2xl">
                                <img src="https://picsum.photos/400/600?random=4" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Скриншот USDSoft 2" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Технологический стек */}
                <div className="border-t border-[#1E293B] pt-24">
                    <h2 className="text-3xl font-bold mb-16 text-center text-[#FFFFFF]">Технологический стек</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 text-center opacity-70">
                        <div className="flex flex-col items-center text-[#CBD5E1]">
                            <Globe size={32} className="mb-2" />
                            <span>React / Next.js</span>
                        </div>
                        <div className="flex flex-col items-center text-[#CBD5E1]">
                            <Layers size={32} className="mb-2" />
                            <span>Микросервисы</span>
                        </div>
                        <div className="flex flex-col items-center text-[#CBD5E1]">
                            <Code2 size={32} className="mb-2" />
                            <span>Python / Go</span>
                        </div>
                        <div className="flex flex-col items-center text-[#CBD5E1]">
                            <Settings size={32} className="mb-2" />
                            <span>IoT & Edge</span>
                        </div>
                        <div className="flex flex-col items-center text-[#CBD5E1]">
                            <Cloud size={32} className="mb-2" />
                            <span>AWS / Azure</span>
                        </div>
                        <div className="flex flex-col items-center text-[#CBD5E1]">
                            <Smartphone size={32} className="mb-2" />
                            <span>React Native</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
