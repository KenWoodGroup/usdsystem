'use client';

import React, { useEffect } from 'react';
import { Package, Users, BarChart3, ShieldCheck, Zap, Database } from "lucide-react";
import { useTranslation } from 'react-i18next';
import Foto from "../../../public/image_2026-03-11_13-34-52.png"
import Link from 'next/link';

export default function UsdErp() {
    const { t } = useTranslation();

    /* =========================
       SEO META
    ========================= */
    useEffect(() => {
        document.title = t("usderp.meta.title");

        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute("content", t("usderp.meta.description"));
        }
    }, [t]);

    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* =========================
                   HERO
                ========================= */}
                <div className="text-center mb-20" data-aos="fade-down">

                    <span className="text-blue-500 font-bold uppercase text-sm tracking-widest">
                        {t("usderp.hero.subtitle")}
                    </span>

                    <h1 className="text-4xl lg:text-5xl font-bold mt-4 mb-6 text-white">
                        {t("usderp.hero.title")}
                    </h1>

                    <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
                        {t("usderp.hero.desc")}
                    </p>

                </div>


                {/* =========================
                   FEATURES
                ========================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    <FeatureCard
                        icon={<Database className="text-purple-500" size={32} />}
                        title={t("usderp.features.finance.title")}
                        desc={t("usderp.features.finance.desc")}
                        delay={0}
                    />

                    <FeatureCard
                        icon={<Package className="text-blue-500" size={32} />}
                        title={t("usderp.features.orders.title")}
                        desc={t("usderp.features.orders.desc")}
                        delay={100}
                    />

                    <FeatureCard
                        icon={<Users className="text-teal-500" size={32} />}
                        title={t("usderp.features.warehouse.title")}
                        desc={t("usderp.features.warehouse.desc")}
                        delay={200}
                    />

                    <FeatureCard
                        icon={<ShieldCheck className="text-emerald-500" size={32} />}
                        title={t("usderp.features.suppliers.title")}
                        desc={t("usderp.features.suppliers.desc")}
                        delay={300}
                    />

                    <FeatureCard
                        icon={<BarChart3 className="text-orange-500" size={32} />}
                        title={t("usderp.features.analytics.title")}
                        desc={t("usderp.features.analytics.desc")}
                        delay={400}
                    />

                    <FeatureCard
                        icon={<Zap className="text-yellow-500" size={32} />}
                        title={t("usderp.features.integration.title")}
                        desc={t("usderp.features.integration.desc")}
                        delay={500}
                    />

                </div>


                {/* =========================
                   CTA
                ========================= */}
                <div className="mt-32 p-12 bg-blue-600/10 rounded-3xl border border-blue-500/20" data-aos="zoom-in">

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-white">
                                {t("usderp.cta.title")}
                            </h2>

                            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                {t("usderp.cta.desc")}
                            </p>
                            <Link href="/contact">
                                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition">
                                    {t("usderp.cta.button")}
                                </button>
                            </Link>

                        </div>

                        <div className="relative">
                            <img
                                src={Foto?.src || Foto}
                                className="rounded-2xl shadow-2xl"
                                alt={t("usderp.cta.title")}
                            />
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}


/* =========================
   FEATURE CARD
========================= */

const FeatureCard = ({ icon, title, desc, delay }) => (
    <div
        className="bg-[#0b1121] p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all group"
        data-aos="fade-up"
        data-aos-delay={delay}
    >

        <div className="p-3 bg-slate-900 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform">
            {icon}
        </div>

        <h3 className="text-xl font-bold mb-4 text-white">
            {title}
        </h3>

        <p className="text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
            {desc}
        </p>

    </div>
);