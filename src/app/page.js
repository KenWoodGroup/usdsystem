'use client';

import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { ArrowRight, Cpu, Building2, Truck, ShoppingCart, CheckCircle2, Globe, Shield, Zap, Package, BarChart, Users } from 'lucide-react';

const Home = () => {
  return (
    <>
      {/* Комплексный SEO для 3 языков */}
      <Head>
        {/* Основной язык - русский */}
        <title>USD System Uzbekistan | Единая B2B платформа: Строительство, Производство, Продажа материалов</title>
        <meta
          name="description"
          content="USD System - ведущая цифровая экосистема в Узбекистане для строительства (qurilish), производства и продажи материалов (mollar). ERP, CRM, маркетплейс строительных материалов, логистика. B2B платформа №1 в Узбекистане."
        />
        <meta name="keywords" content="
          usd system, usdsystem, USD System Uzbekistan, 
          qurilish mollari, строительные материалы Узбекистан, 
          строительство Ташкент, производство материалов, 
          b2b платформа Узбекистан, строительный маркетплейс,
          ERP система Узбекистан, CRM для строительства,
          логистика материалов, оптовые поставки,
          usd erp, usd soft, usd marketplace,
          qurilish materiallari, qurilish buyumlari,
          строительные компании Ташкент, поставщики строительных материалов,
          онлайн закупки строительных материалов, тендерная площадка,
          digital строительство, умный склад, строительная логистика
        " />

        {/* Канонические ссылки */}
        <link rel="canonical" href="https://usd-system.uz" />
        <link rel="alternate" hreflang="ru" href="https://usd-system.uz/ru" />
        <link rel="alternate" hreflang="uz" href="https://usd-system.uz/uz" />
        <link rel="alternate" hreflang="en" href="https://usd-system.uz/en" />
        <link rel="alternate" hreflang="x-default" href="https://usd-system.uz" />

        {/* OG теги */}
        <meta property="og:title" content="USD System - Цифровая экосистема для строительного бизнеса Узбекистана" />
        <meta property="og:description" content="Единая B2B платформа для строительства, производства и продажи материалов. ERP, CRM, маркетплейс и логистика в одном решении." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://usd-system.uz" />
        <meta property="og:image" content="https://usd-system.uz/og-image.jpg" />
        <meta property="og:locale" content="ru_UZ" />
        <meta property="og:locale:alternate" content="uz_UZ" />
        <meta property="og:locale:alternate" content="en_US" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="USD System Uzbekistan | Строительная цифровая платформа" />
        <meta name="twitter:description" content="B2B экосистема для строительства, производства и продажи материалов в Узбекистане" />

        {/* Дополнительные мета-теги */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content="USD System Uzbekistan" />
        <meta name="copyright" content="USD System" />
        <meta name="geo.region" content="UZ" />
        <meta name="geo.placename" content="Tashkent" />

        {/* Структурированные данные (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "USD System Uzbekistan",
            "url": "https://usd-system.uz",
            "logo": "https://usd-system.uz/logo.png",
            "description": "Цифровая B2B платформа для строительства, производства и продажи материалов в Узбекистане",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Uzbekistan",
              "addressRegion": "Tashkent"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+998-XX-XXX-XXXX",
              "contactType": "Customer Service"
            },
            "sameAs": [
              "https://facebook.com/usdsystem",
              "https://linkedin.com/company/usd-system",
              "https://instagram.com/usdsystem"
            ]
          })}
        </script>
      </Head>

      <div className="relative pt-20">
        {/* HERO СЕКЦИЯ С КЛЮЧЕВЫМИ СЛОВАМИ */}
        <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
          {/* Фоны */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-600/20 blur-[120px] rounded-full" />

          <div className="container mx-auto px-4 relative text-center">
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-4">
              <span className="gradient-text">
                USD System - Цифровая Экосистема B2B
              </span>
            </h1>

            <div className="mb-4">
              {/* Ключевые слова в заголовках */}
              <h2 className="block text-white text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-bold">
                Строительные материалы (Qurilish mollari)
              </h2>
              <h2 className="block text-white text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-bold">
                Производство и Продажа
              </h2>
              <h2 className="block text-white text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-bold">
                Логистика и Поставки
              </h2>
            </div>

            <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-6">
              Ведущая B2B платформа в Узбекистане для строительства (qurilish),
              производства строительных материалов (qurilish materiallari) и управления поставками.
              ERP система, CRM для строительных компаний и онлайн-маркетплейс в одном решении.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                Начать проект <ArrowRight size={18} />
              </Link>
              <Link
                href="/demo"
                className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-bold flex items-center justify-center gap-2"
              >
                Демо доступ <Zap size={18} />
              </Link>
            </div>

            {/* Языковой переключатель для SEO */}
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/ru" className="px-4 py-2 text-sm bg-slate-800 rounded-lg flex items-center gap-2">
                <Globe size={14} /> Русский
              </Link>
              <Link href="/uz" className="px-4 py-2 text-sm bg-slate-800 rounded-lg flex items-center gap-2">
                <Globe size={14} /> O'zbekcha
              </Link>
              <Link href="/en" className="px-4 py-2 text-sm bg-slate-800 rounded-lg flex items-center gap-2">
                <Globe size={14} /> English
              </Link>
            </div>
          </div>
        </section>

        {/* КЛЮЧЕВЫЕ ПРЕИМУЩЕСТВА С СЕО */}
        <section className="py-12 border-y border-slate-800 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-2xl font-bold text-white mb-8">
              Почему выбирают USD System в Узбекистане?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "1000+ строительных материалов",
                  desc: "Самый полный каталог qurilish mollari в Узбекистане",
                  icon: <Package className="text-blue-400" />
                },
                {
                  title: "ERP для производства",
                  desc: "Управление производством строительных материалов",
                  icon: <Cpu className="text-green-400" />
                },
                {
                  title: "CRM для строительных компаний",
                  desc: "Специализированная система для qurilish korxonalari",
                  icon: <Building2 className="text-orange-400" />
                },
                {
                  title: "B2B Маркетплейс",
                  desc: "Площадка для оптовых закупок строительных материалов",
                  icon: <ShoppingCart className="text-purple-400" />
                },
                {
                  title: "Умная логистика",
                  desc: "Оптимизация поставок по всему Узбекистану",
                  icon: <Truck className="text-red-400" />
                },
                {
                  title: "Финансовый учет",
                  desc: "Полный контроль финансов строительного бизнеса",
                  icon: <BarChart className="text-yellow-400" />
                }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* СТАТИСТИКА С КЛЮЧЕВЫМИ СЛОВАМИ */}
        <section className="py-12 border-y border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-2xl font-bold text-white mb-8">
              USD System в цифрах - Лидер B2B рынка Узбекистана
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 text-center">
              {[
                ['5000+', 'строительных материалов', 'qurilish mollari'],
                ['1000+', 'поставщиков', 'yetkazib beruvchilar'],
                ['500+', 'строительных компаний', 'qurilish korxonalari'],
                ['10000+', 'успешных сделок', 'muvaffaqiyatli bitimlar'],
                ['24/7', 'поддержка', 'qoʻllab-quvvatlash'],
                ['95%', 'клиентов рекомендуют', 'mijozlar tavsiya qiladi']
              ].map(([value, labelRu, labelUz], i) => (
                <div key={i} className="p-4">
                  <div className="text-3xl font-bold text-white mb-2">{value}</div>
                  <div className="text-slate-300 text-sm">{labelRu}</div>
                  <div className="text-slate-500 text-xs mt-1">{labelUz}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ПРОДУКТЫ USD SYSTEM */}
        <section className="py-24 bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Продукты USD System Uzbekistan
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Комплексные решения для строительного бизнеса и производства материалов
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "USD ERP System",
                  desc: "ERP система для управления производством строительных материалов в Узбекистане. Контроль качества, складской учет, планирование.",
                  keywords: ["erp система", "production management", "ishlab chiqarish"],
                  icon: <Cpu size={32} className="text-blue-400" />,
                  link: "/usderp"
                },
                {
                  title: "USD Soft CRM",
                  desc: "CRM для строительных компаний (qurilish firmalari). Управление клиентами, тендерами, проектами и сделками.",
                  keywords: ["crm строительство", "qurilish crm", "клиентские отношения"],
                  icon: <Building2 size={32} className="text-teal-400" />,
                  link: "/usdsoft"
                },
                {
                  title: "USD Marketplace",
                  desc: "B2B маркетплейс строительных материалов. Покупка и продажа qurilish mollari оптом и в розницу.",
                  keywords: ["маркетплейс строительных материалов", "qurilish mollari sotuvi", "b2b platform"],
                  icon: <ShoppingCart size={32} className="text-orange-400" />,
                  link: "/marketplace"
                },
                {
                  title: "USD Logistics",
                  desc: "Система логистики и доставки строительных материалов по Узбекистану. Трекинг, оптимизация маршрутов.",
                  keywords: ["логистика материалов", "yetkazib berish", "доставка строительных материалов"],
                  icon: <Truck size={32} className="text-purple-400" />,
                  link: "/logistics"
                },
                {
                  title: "USD Finance",
                  desc: "Финансовый модуль для строительного бизнеса. Учет, отчетность, управление бюджетами проектов.",
                  keywords: ["финансы строительства", "moliyaviy hisob", "бюджетирование проектов"],
                  icon: <BarChart size={32} className="text-green-400" />,
                  link: "/usdfinance"
                },
                {
                  title: "USD Community",
                  desc: "Сообщество строительных компаний и поставщиков Узбекистана. Networking, тендеры, партнерства.",
                  keywords: ["сообщество строителей", "qurilish hamjamiyati", "b2b networking"],
                  icon: <Users size={32} className="text-red-400" />,
                  link: "/community"
                }
              ].map((product, i) => (
                <div
                  key={i}
                  className="p-8 rounded-3xl glass hover:bg-slate-800/50 transition-all hover:-translate-y-2 border border-slate-800"
                >
                  <div className="mb-6 p-4 bg-slate-900 rounded-2xl inline-block">
                    {product.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{product.title}</h3>
                  <p className="text-slate-400 mb-4">{product.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.keywords.map((kw, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs">
                        {kw}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={product.link}
                    className="flex items-center text-blue-400 font-semibold hover:text-blue-300"
                  >
                    Подробнее <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO БЛОК ДЛЯ ПОИСКОВЫХ СИСТЕМ */}
        <section className="py-16 bg-slate-900/50 border-t border-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                USD System - Ключевые направления
              </h2>

              <div className="grid gap-6">
                <div className="p-6 bg-slate-800/30 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-4">Строительные материалы в Ташкенте</h3>
                  <p className="text-slate-400">
                    USD System предоставляет самый полный каталог строительных материалов (qurilish mollari)
                    в Ташкенте и по всему Узбекистану. Цемент, кирпич, арматура, сантехника,
                    отделочные материалы - все для строительства и ремонта.
                  </p>
                </div>

                <div className="p-6 bg-slate-800/30 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-4">ERP для производства строительных материалов</h3>
                  <p className="text-slate-400">
                    Наша ERP система специально разработана для производителей строительных материалов
                    в Узбекистане. Управление заказами, контроль качества сырья, автоматизация
                    производственных процессов и интеграция с системой складского учета.
                  </p>
                </div>

                <div className="p-6 bg-slate-800/30 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-4">B2B Платформа для строительного бизнеса</h3>
                  <p className="text-slate-400">
                    USD System объединяет строительные компании, поставщиков материалов,
                    логистические компании и подрядчиков на единой цифровой платформе.
                    Эффективные закупки, управление цепочками поставок и рост бизнеса.
                  </p>
                </div>
              </div>

              {/* Многоязычные ключевые слова для SEO */}
              <div className="mt-12 p-6 bg-slate-900 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-4 text-center">
                  Поисковые запросы для USD System
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-2">Русский язык</h4>
                    <div className="text-sm text-slate-400 space-y-1">
                      <div>строительные материалы Узбекистан</div>
                      <div>qurilish mollari Toshkent</div>
                      <div>ERP система строительство</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-green-400 font-semibold mb-2">Узбекский язык</h4>
                    <div className="text-sm text-slate-400 space-y-1">
                      <div>qurilish materiallari</div>
                      <div>qurilish mollari narxlari</div>
                      <div>ishlab chiqarish boshqaruvi</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-orange-400 font-semibold mb-2">English</h4>
                    <div className="text-sm text-slate-400 space-y-1">
                      <div>construction materials Uzbekistan</div>
                      <div>b2b platform Tashkent</div>
                      <div>usd system uzbekistan</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;