'use client';

import React, { useEffect } from 'react';
import { Target, Eye, Users2, Rocket } from "lucide-react";
import { useTranslation } from 'react-i18next';

/* =========================
   SEO META
========================= */
const SEO = () => {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = t("about.hero.title");

        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute(
                "content",
                t("about.hero.desc1")
            );
        }

        const keywords = document.querySelector('meta[name="keywords"]');
        if (keywords) {
            keywords.setAttribute(
                "content",
                "USD System, construction platform, ERP CRM construction, building materials marketplace"
            );
        }

    }, [t]);

    return null;
};


/* =========================
   PAGE
========================= */

export default function AboutPage() {
    const { t } = useTranslation();

    return (
        <>
            <SEO />

            <div className="pt-32 pb-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    {/* HERO */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">

                        <div className="relative" data-aos="fade-right">
                            <img
                                src="https://media.istockphoto.com/id/480928257/photo/human-hand-holding-the-world.jpg?s=170667a&w=0&k=20&c=1uY6daKPg-BvBqJluSHz6njOrxhEGZ5F5JnT56tWUyk="
                                className="rounded-3xl shadow-2xl relative z-10"
                                alt={t("about.hero.title")}
                            />

                            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-blue-500/30 rounded-3xl z-0"></div>
                        </div>


                        <div data-aos="fade-left">

                            <span className="text-blue-500 font-bold uppercase text-sm tracking-widest">
                                {t("about.hero.subtitle")}
                            </span>

                            <h1 className="text-4xl lg:text-5xl font-bold mt-4 mb-6 leading-tight text-white">
                                {t("about.hero.title").split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        {i < t("about.hero.title").split('\n').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </h1>

                            <p className="text-slate-400 text-lg leading-relaxed mb-6">
                                {t("about.hero.desc1")}
                            </p>

                            <p className="text-slate-400 text-lg leading-relaxed">
                                {t("about.hero.desc2")}
                            </p>

                        </div>

                    </div>


                    {/* CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center text-white">

                        <AboutCard
                            icon={<Target size={40} className="text-red-500" />}
                            title={t("about.cards.mission.title")}
                            desc={t("about.cards.mission.desc")}
                        />

                        <AboutCard
                            icon={<Eye size={40} className="text-blue-500" />}
                            title={t("about.cards.vision.title")}
                            desc={t("about.cards.vision.desc")}
                        />

                        <AboutCard
                            icon={<Users2 size={40} className="text-teal-500" />}
                            title={t("about.cards.team.title")}
                            desc={t("about.cards.team.desc")}
                        />

                        <AboutCard
                            icon={<Rocket size={40} className="text-orange-500" />}
                            title={t("about.cards.result.title")}
                            desc={t("about.cards.result.desc")}
                        />

                    </div>

                </div>
            </div>
        </>
    );
}


/* =========================
   CARD COMPONENT
========================= */

const AboutCard = ({ icon, title, desc }) => (
    <div className="flex flex-col items-center" data-aos="fade-up">

        <div className="mb-6">
            {icon}
        </div>

        <h3 className="text-xl font-bold mb-2">
            {title}
        </h3>

        <p className="text-slate-500 text-sm leading-relaxed">
            {desc}
        </p>

    </div>
);