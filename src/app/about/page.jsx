// src/app/about/page.jsx
import { Target, Eye, Users2, Rocket } from "lucide-react";

const seoLanguages = {
    ru: {
        title: "О компании | USD System",
        description: "USD System — цифровая трансформация бизнеса.",
        url: "https://usd-system.uz/about",
    },
    en: {
        title: "About Us | USD System",
        description: "USD System — digital transformation of business.",
        url: "https://usd-system.uz/about",
    },
    uz: {
        title: "Kompaniya haqida | USD System",
        description: "USD System — biznesni raqamli transformatsiya qiladi.",
        url: "https://usd-system.uz/about",
    },
};

// Функция для динамического metadata
export async function generateMetadata({ searchParams }) {
    const lang = searchParams?.lang || "ru";
    const metadata = seoLanguages[lang] || seoLanguages.ru;

    return {
        title: metadata.title,
        description: metadata.description,
        alternates: {
            canonical: metadata.url,
            languages: {
                ru: "https://usd-system.uz/about",
                en: "https://usd-system.uz/about?lang=en",
                uz: "https://usd-system.uz/about?lang=uz",
            },
        },
        openGraph: {
            title: metadata.title,
            description: metadata.description,
            url: metadata.url,
            images: ["https://usd-system.uz/og-image.jpg"],
            type: "website",
        },
    };
}

export default function AboutPage() {
    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Верхний блок */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                    <div className="relative" data-aos="fade-right">
                        <img
                            src="https://media.istockphoto.com/id/480928257/photo/human-hand-holding-the-world.jpg?s=170667a&w=0&k=20&c=1uY6daKPg-BvBqJluSHz6njOrxhEGZ5F5JnT56tWUyk="
                            className="rounded-3xl shadow-2xl relative z-10"
                            alt="Office"
                        />
                        <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-blue-500/30 rounded-3xl -z-0"></div>
                    </div>

                    <div data-aos="fade-left">
                        <span className="text-blue-500 font-bold uppercase text-sm tracking-widest">
                            О компании
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6 leading-tight text-white">
                            Цифровая <br /> Трансформация вашего бизнеса
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-6">
                            USD System — это не просто IT-компания, мы стратегический партнер вашего бизнеса.
                            Наша главная цель — снизить человеческий труд и повысить эффективность, применяя передовые технологии.
                        </p>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Наша команда состоит из опытных специалистов, прошедших путь от автоматизации крупных заводов до построения сложных CRM-систем.
                        </p>
                    </div>
                </div>

                {/* Карточки */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center text-white">
                    <AboutCard icon={<Target size={40} className="text-red-500" />} title="Миссия" desc="Полная цифровизация промышленности." />
                    <AboutCard icon={<Eye size={40} className="text-blue-500" />} title="Видение" desc="Ведущая IT-экосистема Узбекистана." />
                    <AboutCard icon={<Users2 size={40} className="text-teal-500" />} title="Команда" desc="20+ опытных инноваторов." />
                    <AboutCard icon={<Rocket size={40} className="text-orange-500" />} title="Результат" desc="100% гарантированная эффективность." />
                </div>
            </div>
        </div>
    );
}

const AboutCard = ({ icon, title, desc }) => (
    <div className="flex flex-col items-center" data-aos="fade-up">
        <div className="mb-6">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
);
