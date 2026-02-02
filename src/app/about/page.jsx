import { Target, Eye, Users2, Rocket } from "lucide-react";

/* =========================
   SEO — СТАТИКА
========================= */
export const metadata = {
    title: "О компании",
    description: "USD System — цифровая трансформация бизнеса.",

    alternates: {
        canonical: "https://usd-system.uz/about",
    },

    openGraph: {
        title: "О компании | USD System",
        description: "USD System — цифровая трансформация бизнеса.",
        url: "https://usd-system.uz/about",
        siteName: "USD System",
        images: [
            {
                url: "https://usd-system.uz/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "USD System",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "О компании | USD System",
        description: "USD System — цифровая трансформация бизнеса.",
        images: ["https://usd-system.uz/og-image.jpg"],
    },
};

/* =========================
   PAGE
========================= */
export default function AboutPage() {
    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Верхний блок */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                    <div className="relative" data-aos="fade-right">
                        <img
                            src="https://media.istockphoto.com/id/480928257/photo/human-hand-holding-the-world.jpg?s=170667a&w=0&k=20&c=1uY6daKPg-BvBqJluSHz6njOrxhEGZ5F5JnT56tWUyk=" className="rounded-3xl shadow-2xl relative z-10"
                            alt="USD System — цифровая трансформация бизнеса"
                        />
                        <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-blue-500/30 rounded-3xl -z-0"></div>
                    </div>

                    <div data-aos="fade-left">
                        <span className="text-blue-500 font-bold uppercase text-sm tracking-widest">
                            О компании
                        </span>
                        <h1 className="text-4xl lg:text-5xl font-bold mt-4 mb-6 leading-tight text-white">
                            Цифровая <br /> трансформация вашего бизнеса
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed mb-6">
                            USD System — это не просто IT-компания, а стратегический партнёр
                            вашего бизнеса. Мы автоматизируем процессы и повышаем эффективность.
                        </p>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Наша команда реализует сложные ERP, CRM и промышленные IT-решения.
                        </p>
                    </div>
                </div>

                {/* Карточки */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center text-white">
                    <AboutCard icon={<Target size={40} className="text-red-500" />} title="Миссия" desc="Полная цифровизация бизнеса." />
                    <AboutCard icon={<Eye size={40} className="text-blue-500" />} title="Видение" desc="Ведущая IT-экосистема региона." />
                    <AboutCard icon={<Users2 size={40} className="text-teal-500" />} title="Команда" desc="Опытные инженеры и аналитики." />
                    <AboutCard icon={<Rocket size={40} className="text-orange-500" />} title="Результат" desc="Измеримая эффективность решений." />
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
