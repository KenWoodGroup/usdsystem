'use client';

import React, { useEffect } from 'react';
import { FileText, CheckCircle, ShieldCheck, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const USDKonsulting = () => {
    const { t } = useTranslation();

    /* ================= SEO META ================= */
    useEffect(() => {
        document.title = t("usdconsulting.meta.title");

        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute("content", t("usdconsulting.meta.description"));
        }
    }, [t]);

    return (
        <div className="pt-32 pb-24 bg-[#020617] min-h-screen text-white">

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* ================= HERO ================= */}
                <div className="text-center mb-20" data-aos="fade-up">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                        {t("usdconsulting.hero.h1")}
                    </h1>
                    <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
                        {t("usdconsulting.hero.desc")}
                    </p>
                </div>

                {/* ================= FEATURES ================= */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-28">
                    <FeatureCard
                        icon={<FileText className="text-blue-500" size={32} />}
                        title={t("usdconsulting.features.documentation.title")}
                        desc={t("usdconsulting.features.documentation.desc")}
                    />
                    <FeatureCard
                        icon={<CheckCircle className="text-green-500" size={32} />}
                        title={t("usdconsulting.features.certification.title")}
                        desc={t("usdconsulting.features.certification.desc")}
                    />
                    <FeatureCard
                        icon={<ShieldCheck className="text-purple-500" size={32} />}
                        title={t("usdconsulting.features.legal.title")}
                        desc={t("usdconsulting.features.legal.desc")}
                    />
                    <FeatureCard
                        icon={<Clock className="text-orange-500" size={32} />}
                        title={t("usdconsulting.features.efficiency.title")}
                        desc={t("usdconsulting.features.efficiency.desc")}
                    />
                </div>

                {/* ================= CTA ================= */}
                <div className="text-center mt-12" data-aos="zoom-in">
                    <a
                        href="https://consult.usdsoft.uz/login"
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-bold text-white mr-4 transition"
                    >
                        {t("usdconsulting.cta.login")}
                    </a>
                    <a
                        href="/consultregister"
                        className="px-8 py-4 border border-slate-700 hover:border-blue-500 rounded-full font-bold text-white transition"
                    >
                        {t("usdconsulting.cta.register")}
                    </a>
                </div>

            </div>

        </div>
    );
};

export default USDKonsulting;

/* ================= FEATURE CARD ================= */
const FeatureCard = ({ icon, title, desc }) => (
    <div
        className="p-8 bg-slate-900 border border-slate-800 rounded-2xl hover:border-blue-500/40 transition hover:scale-[1.03]"
        data-aos="fade-up"
    >
        <div className="mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{desc}</p>
    </div>
);