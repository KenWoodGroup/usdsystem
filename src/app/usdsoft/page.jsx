'use client';

import React from 'react';
import { Code2, Smartphone, Globe, Layers, Cpu, Cloud, Rocket } from "lucide-react";
import { useTranslation } from 'react-i18next';

export default function UsdSoft() {
    const { t } = useTranslation();

    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                    <div data-aos="fade-right">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm font-bold border border-blue-500/20">
                                {t("usdsoft.tags.production")}
                            </span>
                            <span className="px-3 py-1 bg-teal-500/10 text-teal-500 rounded-full text-sm font-bold border border-teal-500/20">
                                {t("usdsoft.tags.cloud")}
                            </span>
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight text-white">
                            {t("usdsoft.hero.title")}{" "}
                            <span className="text-blue-500">{t("usdsoft.hero.decoration")}</span>
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10">
                            {t("usdsoft.hero.desc")}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition">
                                {t("home.hero.start_project")}
                            </button>
                        </div>
                    </div>
                    <div className="relative group" data-aos="fade-left">
                        <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-teal-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <img 
                            src="https://media.istockphoto.com/id/1182470663/photo/close-up-of-hands-typing-on-laptop-keyboard.jpg?s=170667a&w=0&k=20&c=6-6X7D-c-A-Q-X-4-S-X-0-X-X-X-X-X-X-X-X-X-X-X-X-X=" 
                            className="relative rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition duration-500" 
                            alt={t("usdsoft.hero.title")}
                        />
                    </div>
                </div>

                {/* Tech Stack Heading */}
                <div className="text-center mb-20" data-aos="fade-up">
                    <h2 className="text-3xl font-bold text-white mb-4">{t("usdsoft.tech.title")}</h2>
                    <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
                </div>

                {/* Icons Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center text-white">
                    <TechItem icon={<Globe size={40} />} name="Next.js" />
                    <TechItem icon={<Code2 size={40} />} name="TypeScript" />
                    <TechItem icon={<Layers size={40} />} name="Tailwind" />
                    <TechItem icon={<Cpu size={40} />} name="Node.js" />
                    <TechItem icon={<Database size={40} />} name="PostgreSQL" />
                    <TechItem icon={<Cloud size={40} />} name="Docker" />
                    <style jsx>{`
                        .Database { display: block; } /* Placeholder for Database icon if not imported */
                    `}</style>
                </div>
            </div>
        </div>
    );
}

const TechItem = ({ icon, name }) => (
    <div className="p-8 rounded-2xl bg-[#0b1121] border border-slate-800 hover:border-blue-500/50 transition duration-300 group" data-aos="zoom-in">
        <div className="mb-4 text-slate-500 group-hover:text-blue-500 transition duration-300 flex justify-center">
            {icon}
        </div>
        <div className="font-bold text-sm text-slate-400 group-hover:text-white transition duration-300">{name}</div>
    </div>
);

// Placeholder icon for Database since I used Database item
const Database = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);
