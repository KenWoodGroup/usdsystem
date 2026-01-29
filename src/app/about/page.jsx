"use client";

import React, { useEffect } from "react";
import { Target, Eye, Users2, Rocket } from "lucide-react";

import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
    useEffect(() => {
        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 120,
        });
    }, []);

    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Верхний блок */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                    {/* Картинка */}
                    <div className="relative" data-aos="fade-right">
                        <img
                            src="https://media.istockphoto.com/id/480928257/photo/human-hand-holding-the-world.jpg?s=170667a&w=0&k=20&c=1uY6daKPg-BvBqJluSHz6njOrxhEGZ5F5JnT56tWUyk="
                            className="rounded-3xl shadow-2xl relative z-10"
                            alt="Office"
                        />
                        <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-blue-500/30 rounded-3xl -z-0"></div>
                    </div>

                    {/* Текст */}
                    <div data-aos="fade-left">
                        <span className="text-blue-500 font-bold uppercase text-sm tracking-widest">
                            О компании
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6 leading-tight text-white">
                            Цифровая <br /> Трансформация вашего бизнеса
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-6">
                            USD Group — это не просто IT-компания, мы стратегический партнер
                            вашего бизнеса. Наша главная цель — снизить человеческий труд и
                            повысить эффективность, применяя передовые технологии в
                            производстве и строительстве, а также дать строительным компаниям
                            возможность получать строительные материалы напрямую от
                            производителей, по самым выгодным ценам и с быстрой доставкой.
                        </p>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Наша команда состоит из опытных специалистов, прошедших путь от
                            автоматизации крупных заводов до построения сложных CRM-систем.
                        </p>
                    </div>
                </div>

                {/* Карточки */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center text-white">
                    <AboutCard
                        icon={<Target size={40} className="text-red-500" />}
                        title="Миссия"
                        desc="Полная цифровизация промышленности."
                        delay={0}
                    />
                    <AboutCard
                        icon={<Eye size={40} className="text-blue-500" />}
                        title="Видение"
                        desc="Ведущая IT-экосистема Узбекистана."
                        delay={150}
                    />
                    <AboutCard
                        icon={<Users2 size={40} className="text-teal-500" />}
                        title="Команда"
                        desc="20+ опытных инноваторов."
                        delay={300}
                    />
                    <AboutCard
                        icon={<Rocket size={40} className="text-orange-500" />}
                        title="Результат"
                        desc="100% гарантированная эффективность."
                        delay={450}
                    />
                </div>
            </div>
        </div>
    );
};

const AboutCard = ({ icon, title, desc, delay }) => (
    <div
        className="flex flex-col items-center"
        data-aos="fade-up"
        data-aos-delay={delay}
    >
        <div className="mb-6">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
);

export default About;
