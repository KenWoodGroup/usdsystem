'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Fankoil from '../../../public/image.png';
import Beton from '../../../public/image copy.png';
import Metall from '../../../public/image copy 2.png';
import Block from '../../../public/image copy 3.png';
import PC from '../../../public/image copy 4.png';
import JBI from '../../../public/image copy 5.png';
import Mebel from '../../../public/image copy 6.png';
import Kabel from '../../../public/image copy 7.png';
import Gipsakarton from '../../../public/image copy 8.png';
import Kafel from '../../../public/image copy 9.png';
import SendvichPanel from '../../../public/image copy 10.png';
import Shpaklefka from '../../../public/image copy 11.png';
import EshikVaRom from '../../../public/image copy 12.png';



export default function Directions() {
    const { t } = useTranslation();

    const directions = [
        {
            id: 1,
            titleKey: "home.directions.fancoil.title",
            descKey: "home.directions.fancoil.desc",
            image: Fankoil,
        },
        {
            id: 2,
            titleKey: "home.directions.concrete.title",
            descKey: "home.directions.concrete.desc",
            image: Beton,
        },
        {
            id: 3,
            titleKey: "home.directions.rebar.title",
            descKey: "home.directions.rebar.desc",
            image: Metall,
        },
        {
            id: 4,
            titleKey: "home.directions.brick.title",
            descKey: "home.directions.brick.desc",
            image: Block,
        },
        {
            id: 5,
            titleKey: "home.directions.furniture.title",
            descKey: "home.directions.furniture.desc",
            image: Mebel,
        },
        {
            id: 6,
            titleKey: "home.directions.electro.title",
            descKey: "home.directions.electro.desc",
            image: PC,
        },
        {
            id: 7,
            titleKey: "home.directions.precast.title",
            descKey: "home.directions.precast.desc",
            image: JBI,
        },
        {
            id: 8,
            titleKey: "home.directions.cable.title",
            descKey: "home.directions.cable.desc",
            image: Kabel,
        },
        {
            id: 9,
            titleKey: "home.directions.gypsum.title",
            descKey: "home.directions.gypsum.desc",
            image: Gipsakarton,
        },
        {
            id: 10,
            titleKey: "home.directions.Kafel.title",
            descKey: "home.directions.Kafel.desc",
            image: Kafel,
        },
        {
            id: 11,
            titleKey: "home.directions.sandwich.title",
            descKey: "home.directions.sandwich.desc",
            image: SendvichPanel,
        },
        {
            id: 12,
            titleKey: "home.directions.Shpaklefka.title",
            descKey: "home.directions.Shpaklefka.desc",
            image: Shpaklefka,
        },
        {
            id: 13,
            titleKey: "home.directions.EshikVaRom.title",
            descKey: "home.directions.EshikVaRom.desc",
            image: EshikVaRom,
        },
    ];

    // Функция для получения src из объекта или строки
    const getImageSrc = (image) => {
        if (typeof image === 'string') return image;
        if (image && typeof image === 'object' && image.src) return image.src;
        return '/placeholder.jpg';
    };

    return (
        <div className="relative pt-20 bg-slate-950 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                {/* Заголовок страницы */}
                <div className="text-center mb-12" data-aos="fade-up">
                    <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
                        {t("home.directions.title")}
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        {t("home.directions.subtitle")}
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto mt-4 rounded-full" />
                </div>

                {/* Сетка карточек: 1 колонка на мобильных, 2 на планшетах, 3 на десктопе */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {directions.map((dir, idx) => (
                        <div
                            key={dir.id}
                            data-aos="fade-up"
                            data-aos-delay={idx * 100}
                            className="group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 transition-all duration-700 hover:border-blue-500/70 hover:shadow-lg h-full flex flex-col"
                        >
                            <div className="relative h-56 overflow-hidden bg-white/100">
                                <img
                                    src={getImageSrc(dir.image)}
                                    alt={t(dir.titleKey)}
                                    className="w-full h-full  object-contain transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent transition-opacity duration-700 group-hover:opacity-80" />
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <h2 className="text-xl font-bold text-white mb-2 transition-colors duration-700 group-hover:text-blue-400">
                                    {t(dir.titleKey)}
                                </h2>
                                <p className="text-slate-400 text-sm leading-relaxed flex-1">
                                    {t(dir.descKey)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}