import Link from "next/link";
import Image from "next/image"; 
import { ArrowRight } from "lucide-react";
import foto from '../../../public/2026-02-03 16.02.49.jpg'

export default function Blog() {
    return (
        <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden mt-[50px]">
            {/* Фоновые blur-эффекты */}
            <div
                className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"
                data-aos="fade-right"
            />
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-600/20 blur-[120px] rounded-full"
                data-aos="fade-left"
            />

            <div className="container mx-auto px-4 relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Левая часть — контент */}
                    <div>
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6"
                            data-aos="fade-up"
                        >
                            <span className="gradient-text">
                                Системное управление производством — требование времени
                            </span>
                        </h2>

                        <p
                            className="text-slate-400 text-lg mb-6"
                            data-aos="fade-up"
                            data-aos-delay={200}
                        >
                            В современном производстве ключ к успеху — это точность и скорость.
                            Работа по устаревшим схемам, в Excel или на бумаге, приводит к
                            потерям ресурсов и ошибкам. ERP-система объединяет все процессы
                            компании в едином цифровом пространстве.
                        </p>

                        <ul
                            className="space-y-4 text-slate-300 mb-8"
                            data-aos="fade-up"
                            data-aos-delay={400}
                        >
                            <li>
                                <span className="font-semibold text-white">
                                    Контроль сырья:
                                </span>{" "}
                                актуальные остатки на складе в режиме реального времени.
                            </li>
                            <li>
                                <span className="font-semibold text-white">
                                    Экономия времени:
                                </span>{" "}
                                автоматизация производственных этапов.
                            </li>
                            <li>
                                <span className="font-semibold text-white">
                                    Снижение затрат:
                                </span>{" "}
                                устранение перерасходов и скрытых потерь.
                            </li>
                            <li>
                                <span className="font-semibold text-white">
                                    Аналитика:
                                </span>{" "}
                                готовые отчёты для управленческих решений.
                            </li>
                        </ul>

                        <p
                            className="text-slate-400 mb-8"
                            data-aos="fade-up"
                            data-aos-delay={600}
                        >
                            Сегодня систематизация производства — это не преимущество,
                            а обязательное условие роста и конкурентоспособности.
                        </p>

                        <div
                            className="flex flex-col sm:flex-row gap-4"
                            data-aos="fade-up"
                            data-aos-delay={800}
                        >
                            <Link
                                href="/contact"
                                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-500 hover:scale-105"
                            >
                                Внедрить ERP <ArrowRight size={18} />
                            </Link>

                            <Link
                                href="/about"
                                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-bold border border-slate-700 transition-all duration-500 hover:scale-105"
                            >
                                Подробнее
                            </Link>
                        </div>
                    </div>

                    {/* Правая часть — место под изображение */}
                    <div
                        className="relative w-full h-[300px] md:h-[400px] lg:h-[480px] rounded-3xl overflow-hidden bg-slate-800 border border-slate-700"
                        data-aos="fade-left"
                    >
                        <Image
                            src={foto}
                            alt="ERP система для управления производством"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                            Изображение ERP / Производства
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
