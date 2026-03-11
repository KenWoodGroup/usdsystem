'use client';

import React, { useEffect } from 'react';
import {
    Search,
    BarChart3,
    ShoppingCart,
    Truck,
    Users,
    Layers
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const USDMarket = () => {

    const { t } = useTranslation();

    useEffect(() => {
        document.title = t("usdmarket.meta.title");

        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute("content", t("usdmarket.meta.description"));
        }
    }, [t]);

    return (
        <div className="pt-32 pb-24 bg-[#020617] min-h-screen">

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* ================= HERO ================= */}

                <div className="text-center mb-24" data-aos="fade-up">

                    <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
                        {t("usdmarket.hero.title")}
                    </h1>

                    <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed mb-10">
                        {t("usdmarket.hero.desc")}
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">

                        <a
                            href="https://usdsoft.uz/login"
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition"
                        >
                            {t("usdmarket.hero.cta1")}
                        </a>

                        <a
                            href="https://usdsoft.uz/register"
                            className="px-8 py-4 border border-slate-700 hover:border-blue-500 text-white rounded-full font-bold transition"
                        >
                            {t("usdmarket.hero.cta2")}
                        </a>

                    </div>

                </div>


                {/* ================= PROBLEM → SOLUTION ================= */}

                <div className="mb-28">

                    <h2 className="text-3xl font-bold text-white mb-14 text-center">
                        {t("usdmarket.problem.title")}
                    </h2>

                    <div className="grid lg:grid-cols-2 gap-6">

                        {[
                            {
                                problem: "p1",
                                solution: "s1",
                                icon: <Search className="text-blue-500" size={28} />
                            },
                            {
                                problem: "p2",
                                solution: "s2",
                                icon: <BarChart3 className="text-green-500" size={28} />
                            },
                            {
                                problem: "p3",
                                solution: "s3",
                                icon: <Users className="text-purple-500" size={28} />
                            },
                            {
                                problem: "p4",
                                solution: "s4",
                                icon: <Truck className="text-teal-500" size={28} />
                            }
                        ].map((item, i) => (

                            <div
                                key={i}
                                className="grid grid-cols-[40px_1fr_40px_1fr] gap-4 items-center p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-blue-500/40 transition"
                                data-aos="fade-up"
                                data-aos-delay={i * 100}
                            >

                                <div>
                                    {item.icon}
                                </div>

                                <div className="text-red-400 text-sm">
                                    {t(`usdmarket.problem.${item.problem}`)}
                                </div>

                                <div className="text-slate-500 text-xl font-bold text-center">
                                    →
                                </div>

                                <div className="text-green-400 text-sm">
                                    {t(`usdmarket.solution.${item.solution}`)}
                                </div>

                            </div>

                        ))}

                    </div>

                </div>


                {/* ================= FEATURES ================= */}

                <div>

                    <h2 className="text-3xl font-bold text-white mb-14 text-center">
                        {t("usdmarket.features.title")}
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        <FeatureCard
                            icon={<Layers className="text-blue-500" size={30} />}
                            title={t("usdmarket.features.catalog.title")}
                            desc={t("usdmarket.features.catalog.desc")}
                        />

                        <FeatureCard
                            icon={<BarChart3 className="text-green-500" size={30} />}
                            title={t("usdmarket.features.prices.title")}
                            desc={t("usdmarket.features.prices.desc")}
                        />

                        <FeatureCard
                            icon={<ShoppingCart className="text-orange-500" size={30} />}
                            title={t("usdmarket.features.orders.title")}
                            desc={t("usdmarket.features.orders.desc")}
                        />

                        <FeatureCard
                            icon={<Users className="text-purple-500" size={30} />}
                            title={t("usdmarket.features.suppliers.title")}
                            desc={t("usdmarket.features.suppliers.desc")}
                        />

                        <FeatureCard
                            icon={<Truck className="text-teal-500" size={30} />}
                            title={t("usdmarket.features.delivery.title")}
                            desc={t("usdmarket.features.delivery.desc")}
                        />

                        <FeatureCard
                            icon={<Search className="text-yellow-500" size={30} />}
                            title={t("usdmarket.features.analytics.title")}
                            desc={t("usdmarket.features.analytics.desc")}
                        />

                    </div>

                </div>

            </div>

        </div>
    );
};

export default USDMarket;



/* ================= FEATURE CARD ================= */

const FeatureCard = ({ icon, title, desc }) => (
    <div
        className="p-8 bg-slate-900 border border-slate-800 rounded-2xl hover:border-blue-500/40 transition hover:scale-[1.03]"
        data-aos="fade-up"
    >

        <div className="mb-6">
            {icon}
        </div>

        <h3 className="text-xl font-bold mb-4 text-white">
            {title}
        </h3>

        <p className="text-slate-400 leading-relaxed">
            {desc}
        </p>

    </div>
);