'use client';

import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { ArrowRight, Cpu, Building2, Truck, ShoppingCart, CheckCircle2 } from 'lucide-react';

const Home = () => {
  return (
    <>
      {/* SEO на русском */}
      <Head>
        <title>USD System — Единая платформа для бизнеса</title>
        <meta
          name="description"
          content="USD System объединяет производство, продажи и строительство в одной платформе. Найдите все, что нужно вашему бизнесу."
        />
        <link rel="canonical" href="https://usd-system.uz" />
        <link rel="alternate" hrefLang="ru" href="https://usd-system.uz" />

        {/* OG теги */}
        <meta property="og:title" content="USD System — Единая платформа для бизнеса" />
        <meta
          property="og:description"
          content="USD System объединяет производство, продажи и строительство в одной платформе. Найдите все, что нужно вашему бизнесу."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://usd-system.uz" />
        <meta property="og:image" content="https://usd-system.uz/og-image.jpg" />
      </Head>

      <div className="relative pt-20">
        {/* HERO */}
        <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
          {/* Фоны */}
          <div
            className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"
            data-aos="fade-right"
          />
          <div
            className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-600/20 blur-[120px] rounded-full"
            data-aos="fade-left"
          />

          <div className="container mx-auto px-4 relative text-center">
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-4" data-aos="fade-up">
              <span className="gradient-text">Все на единой платформе</span>
            </h1>

            <div className="mb-4">
              {['Производство', 'Продажа', 'Строительство'].map((text, i) => (
                <span
                  key={text}
                  className="block text-white text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-bold"
                  data-aos="fade-up"
                  data-aos-delay={i * 200}
                >
                  {text}
                </span>
              ))}
            </div>

            <p
              className="text-slate-400 max-w-2xl mx-auto text-lg mb-6"
              data-aos="fade-up"
              data-aos-delay={600}
            >
              Единая платформа для поиска всех продуктов по выгодным ценам
            </p>

            <div
              className="flex flex-col sm:flex-row justify-center gap-4"
              data-aos="fade-up"
              data-aos-delay={800}
            >
              <Link
                href="/contact"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                Начать проект <ArrowRight size={18} />
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-bold border border-slate-700"
              >
                О нас
              </Link>
            </div>
          </div>
        </section>

        {/* СТАТИСТИКА */}
        <section className="py-12 border-y border-slate-800 bg-slate-900/50">
          <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              ['1 000+', 'Успешные заказы'],
              ['100 000+', 'Материалы'],
              ['500+', 'Продавцы'],
              ['100+', 'Компании'],
            ].map(([value, label], i) => (
              <div key={i} data-aos="fade-up" data-aos-delay={i * 150}>
                <div className="text-3xl font-bold text-white">{value}</div>
                <div className="text-slate-300 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* УСЛУГИ */}
        <section className="py-24 bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Наши услуги
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Комплексные решения для всех этапов бизнеса
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <ServiceCard
                icon={<Cpu size={32} className="text-blue-400" />}
                title="USD ERP"
                description="Умное управление производством"
                link="/usderp"
                delay={0}
              />
              <ServiceCard
                icon={<Building2 size={32} className="text-teal-400" />}
                title="USD SOFT"
                description="CRM для строительных компаний"
                link="/usdsoft"
                delay={150}
              />
              <ServiceCard
                icon={<ShoppingCart size={32} className="text-orange-400" />}
                title="Marketplace"
                description="Онлайн-платформа для продаж"
                link="/usdfinance"
                delay={300}
              />
              <ServiceCard
                icon={<Truck size={32} className="text-purple-400" />}
                title="Логистика"
                description="Управление доставкой"
                link="/"
                delay={450}
              />
            </div>
          </div>
        </section>

        {/* ИНТЕГРАЦИЯ */}
        <section className="py-24 bg-slate-900">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2" data-aos="fade-right">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Интеграция Marketplace & CRM
              </h2>
              <p className="text-slate-400 mb-8">
                Все процессы объединены в единую экосистему
              </p>
              <ul className="space-y-4">
                {['Контроль склада', 'HR-система', 'Финансы', 'Логистика'].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-slate-200"
                    data-aos="fade-up"
                    data-aos-delay={i * 150}
                  >
                    <CheckCircle2 size={20} className="text-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:w-1/2 relative" data-aos="fade-left">
              <img
                src="https://s.glavbukh.ru/images/preview/1200x800/48b6b509cee037071bd39322dd6d6afe.webp"
                alt="Dashboard"
                className="rounded-2xl shadow-2xl border border-slate-700 grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const ServiceCard = ({ icon, title, description, link, delay }) => (
  <Link
    href={link}
    data-aos="fade-up"
    data-aos-delay={delay}
    className="p-8 rounded-3xl glass hover:bg-slate-800/50 transition-all hover:-translate-y-2"
  >
    <div className="mb-6 p-4 bg-slate-900 rounded-2xl inline-block">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-slate-400 mb-6">{description}</p>
    <div className="flex items-center text-blue-400 font-semibold">
      Подробнее <ArrowRight size={16} className="ml-2" />
    </div>
  </Link>
);

export default Home;
