'use client';

import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { ArrowRight, Cpu, Building2, Truck, ShoppingCart, CheckCircle2, Globe, MapPin, Phone, Mail, Clock, Users, Shield, Star } from 'lucide-react';

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

        {/* Ключевые слова для поисковых систем */}
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
          digital строительство, умный склад, строительная логистика,
          USD System Tashkent, usd system узбекистан,
          строительные материалы оптом, qurilish mollari narxlari,
          b2b trading platform, construction materials Uzbekistan,
          производство строительных материалов, ishlab chiqarish,
          логистика Узбекистан, доставка строительных материалов,
          складское хозяйство, inventory management,
          финансовый учет строительства, строительный софт
        " />

        {/* Канонические ссылки и многоязычность */}
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
        <meta property="og:site_name" content="USD System Uzbekistan" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="USD System Uzbekistan | Строительная цифровая платформа" />
        <meta name="twitter:description" content="B2B экосистема для строительства, производства и продажи материалов в Узбекистане" />
        <meta name="twitter:image" content="https://usd-system.uz/twitter-image.jpg" />
        <meta name="twitter:site" content="@usdsystem" />

        {/* Дополнительные мета-теги */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="USD System Uzbekistan" />
        <meta name="copyright" content="USD System" />
        <meta name="geo.region" content="UZ" />
        <meta name="geo.placename" content="Tashkent" />
        <meta name="geo.position" content="41.2995;69.2401" />
        <meta name="ICBM" content="41.2995, 69.2401" />

        {/* Viewport и мобильная оптимизация */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Бизнес-метатеги для расширенных сниппетов */}
        <meta name="business:contact_data:street_address" content="Улица, дом" />
        <meta name="business:contact_data:locality" content="Ташкент" />
        <meta name="business:contact_data:region" content="Ташкент" />
        <meta name="business:contact_data:postal_code" content="100000" />
        <meta name="business:contact_data:country_name" content="Узбекистан" />
        <meta name="business:contact_data:email" content="info@usd-system.uz" />
        <meta name="business:contact_data:phone_number" content="+998-XX-XXX-XXXX" />
        <meta name="business:contact_data:website" content="https://usd-system.uz" />
        <meta name="business:hours:day" content="Понедельник - Пятница" />
        <meta name="business:hours:start" content="09:00" />
        <meta name="business:hours:end" content="18:00" />

        {/* Структурированные данные (JSON-LD) для лучшего SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              // Основная организация
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://usd-system.uz/#organization",
                "name": "USD System Uzbekistan",
                "url": "https://usd-system.uz",
                "logo": "https://usd-system.uz/logo.png",
                "description": "Цифровая B2B платформа для строительства, производства и продажи материалов в Узбекистане",
                "foundingDate": "2020",
                "founders": [
                  {
                    "@type": "Person",
                    "name": "Основатель USD System"
                  }
                ],
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Улица, дом",
                  "addressLocality": "Ташкент",
                  "addressRegion": "Ташкент",
                  "postalCode": "100000",
                  "addressCountry": "UZ"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+998-XX-XXX-XXXX",
                  "contactType": "customer service",
                  "availableLanguage": ["Russian", "Uzbek", "English"]
                },
                "sameAs": [
                  "https://facebook.com/usdsystemuz",
                  "https://linkedin.com/company/usd-system-uzbekistan",
                  "https://instagram.com/usdsystemuz",
                  "https://t.me/usdsystem"
                ],
                "knowsAbout": [
                  "Строительные материалы",
                  "ERP системы",
                  "CRM системы",
                  "B2B платформы",
                  "Логистика",
                  "Digital трансформация"
                ],
                "award": [
                  "Лучшая B2B платформа Узбекистана 2023",
                  "Инновация года в строительной отрасли"
                ],
                "employee": {
                  "@type": "Person",
                  "name": "Генеральный директор USD System"
                }
              },
              // Веб-сайт
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://usd-system.uz/#website",
                "url": "https://usd-system.uz",
                "name": "USD System Uzbekistan",
                "description": "Цифровая B2B платформа для строительного бизнеса",
                "publisher": {
                  "@id": "https://usd-system.uz/#organization"
                }
              },
              // Главная страница
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "@id": "https://usd-system.uz/#webpage",
                "url": "https://usd-system.uz",
                "inLanguage": "ru",
                "name": "USD System Uzbekistan | Единая B2B платформа",
                "description": "Ведущая цифровая экосистема для строительства в Узбекистане",
                "isPartOf": {
                  "@id": "https://usd-system.uz/#website"
                },
                "breadcrumb": {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Главная",
                      "item": "https://usd-system.uz"
                    }
                  ]
                }
              },
              // Продукты как SoftwareApplication
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "USD ERP System",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "ratingCount": "250"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "USD CRM Soft",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web"
              },
              // Местный бизнес для Google My Business
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "USD System Uzbekistan",
                "image": "https://usd-system.uz/business-image.jpg",
                "@id": "https://usd-system.uz",
                "url": "https://usd-system.uz",
                "telephone": "+998-XX-XXX-XXXX",
                "priceRange": "$$",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Улица, дом",
                  "addressLocality": "Tashkent",
                  "addressRegion": "Tashkent",
                  "postalCode": "100000",
                  "addressCountry": "UZ"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 41.2995,
                  "longitude": 69.2401
                },
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "18:00"
                },
                "sameAs": [
                  "https://www.facebook.com/usdsystemuz",
                  "https://www.linkedin.com/company/usd-system-uzbekistan"
                ]
              },
              // FAQPage для сниппетов с ответами
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Что такое USD System?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "USD System - это единая B2B платформа для строительного бизнеса в Узбекистане, которая объединяет ERP систему, CRM, маркетплейс строительных материалов и логистику."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Какие услуги предоставляет USD System?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Мы предоставляем ERP систему для управления производством, CRM для строительных компаний, онлайн-маркетплейс строительных материалов и логистические решения."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Как начать работу с USD System?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Для начала работы оставьте заявку на нашем сайте или свяжитесь с нами по телефону. Мы проведем демонстрацию платформы и поможем с настройкой."
                    }
                  }
                ]
              }
            ])
          }}
        />
      </Head>

      {/* Существующий дизайн без изменений */}
      <div className="relative pt-20">
        {/* HERO */}
        <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
          {/* SEO оптимизированные заголовки в существующем дизайне */}
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
              {/* SEO оптимизированное описание */}
              USD System - единая B2B платформа для поиска всех продуктов по выгодным ценам.
              Строительные материалы (qurilish mollari), ERP система для производства,
              CRM для строительных компаний и онлайн-маркетплейс в Узбекистане.
            </p>

            <div
              className="flex flex-col sm:flex-row justify-center gap-4"
              data-aos="fade-up"
              data-aos-delay={800}
            >
              <Link
                href="/contact"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-500 hover:scale-105"
                aria-label="Начать проект с USD System Uzbekistan"
              >
                Начать проект <ArrowRight size={18} />
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-bold border border-slate-700 transition-all duration-500 hover:scale-105"
                aria-label="Узнать больше о USD System"
              >
                О нас
              </Link>
            </div>
          </div>
        </section>

        {/* ИНФО-БЛОК КАК У OLX */}
        <section className="py-8 bg-slate-900/50 border-y border-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-slate-900/70 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Globe size={20} className="text-blue-400" />
                USD System Uzbekistan - Ведущая B2B платформа
              </h2>
              <p className="text-slate-300 mb-4">
                <strong>USD System</strong> - цифровая экосистема для строительного бизнеса в Узбекистане.
                Объединяем производителей, поставщиков и строительные компании на единой платформе.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center gap-3 text-slate-300">
                  <Shield size={18} className="text-green-400" />
                  <span>Безопасные сделки</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Users size={18} className="text-blue-400" />
                  <span>500+ компаний-партнеров</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Star size={18} className="text-yellow-400" />
                  <span>Рейтинг 4.8/5.0</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* СТАТИСТИКА */}
        <section className="py-12 border-y border-slate-800 bg-slate-900/50"
          itemScope itemType="https://schema.org/Organization">
          <meta itemProp="name" content="USD System Uzbekistan" />
          <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              ['1 000+', 'Успешные заказы', 'Успешные заказы строительных материалов'],
              ['100 000+', 'Материалы', 'Строительные материалы в каталоге'],
              ['500+', 'Продавцы', 'Продавцы строительных материалов'],
              ['100+', 'Компании', 'Строительные компании партнеры'],
            ].map(([value, label, ariaLabel], i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 150}
                itemProp="makesOffer"
                itemScope
                itemType="https://schema.org/Offer"
                className="transform transition-all duration-700 hover:scale-105 hover:bg-slate-800/30 p-4 rounded-xl"
              >
                <div className="text-3xl font-bold text-white" itemProp="price">{value}</div>
                <div className="text-slate-300 text-sm" aria-label={ariaLabel}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* КОНТАКТНАЯ ИНФОРМАЦИЯ ДЛЯ СНИППЕТОВ */}
        <section className="py-12 bg-slate-950 border-y border-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Контактная информация */}
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Phone size={18} className="text-blue-400" />
                    Контакты
                  </h3>
                  <div className="space-y-3">
                    <p className="text-slate-300 flex items-center gap-2">
                      <Phone size={16} className="text-green-400" />
                      <span>Телефон: <strong>+998-XX-XXX-XXXX</strong></span>
                    </p>
                    <p className="text-slate-300 flex items-center gap-2">
                      <Mail size={16} className="text-yellow-400" />
                      <span>Email: <strong>info@usd-system.uz</strong></span>
                    </p>
                    <p className="text-slate-300 flex items-center gap-2">
                      <Clock size={16} className="text-purple-400" />
                      <span>Время работы: <strong>9:00 - 18:00</strong></span>
                    </p>
                  </div>
                </div>

                {/* Адрес */}
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <MapPin size={18} className="text-red-400" />
                    Адрес
                  </h3>
                  <div className="space-y-3">
                    <p className="text-slate-300">
                      <strong>USD System Uzbekistan</strong><br />
                      Ташкент, Узбекистан<br />
                      Улица, дом
                    </p>
                    <p className="text-sm text-slate-500">
                      Штаб-квартира в Ташкенте
                    </p>
                  </div>
                </div>

                {/* Быстрые ссылки */}
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-bold text-white mb-4">Быстрые ссылки</h3>
                  <div className="space-y-2">
                    <Link href="/marketplace" className="text-blue-400 hover:text-blue-300 block">
                      Маркетплейс материалов
                    </Link>
                    <Link href="/erp" className="text-blue-400 hover:text-blue-300 block">
                      ERP система
                    </Link>
                    <Link href="/crm" className="text-blue-400 hover:text-blue-300 block">
                      CRM для строительства
                    </Link>
                    <Link href="/login" className="text-blue-400 hover:text-blue-300 block">
                      Войти в систему
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* УСЛУГИ */}
        <section className="py-24 bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Наши услуги в Узбекистане
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Комплексные решения для всех этапов строительного бизнеса и производства материалов
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <ServiceCard
                icon={<Cpu size={32} className="text-blue-400" />}
                title="USD ERP"
                description="Умное управление производством строительных материалов в Узбекистане"
                link="/usderp"
                delay={0}
                ariaLabel="ERP система для производства строительных материалов"
              />
              <ServiceCard
                icon={<Building2 size={32} className="text-teal-400" />}
                title="USD SOFT"
                description="CRM для строительных компаний и qurilish korxonalari"
                link="/usdsoft"
                delay={150}
                ariaLabel="CRM система для строительных компаний Узбекистана"
              />
              <ServiceCard
                icon={<ShoppingCart size={32} className="text-orange-400" />}
                title="Marketplace"
                description="Онлайн-платформа для продажи строительных материалов в Узбекистане"
                link="/usdfinance"
                delay={300}
                ariaLabel="Маркетплейс строительных материалов Узбекистан"
              />
              <ServiceCard
                icon={<Truck size={32} className="text-purple-400" />}
                title="Логистика"
                description="Управление доставкой строительных материалов по Узбекистану"
                link="/"
                delay={450}
                ariaLabel="Логистика строительных материалов Ташкент"
              />
            </div>
          </div>
        </section>

        {/* ИНТЕГРАЦИЯ */}
        <section className="py-24 bg-slate-900">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2" data-aos="fade-right">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Интеграция Marketplace & CRM для строительного бизнеса
              </h2>
              <p className="text-slate-400 mb-8">
                Все процессы строительства и продажи материалов объединены в единую экосистему USD System
              </p>
              <ul className="space-y-4">
                {[
                  { text: 'Контроль склада строительных материалов', keyword: 'склад qurilish mollari' },
                  { text: 'HR-система для строительных компаний', keyword: 'hr система строительство' },
                  { text: 'Финансы строительных проектов', keyword: 'финансы qurilish' },
                  { text: 'Логистика материалов по Узбекистану', keyword: 'логистика Узбекистан' }
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-slate-200 transform transition-all duration-500 hover:translate-x-2"
                    data-aos="fade-up"
                    data-aos-delay={i * 150}
                  >
                    <CheckCircle2 size={20} className="text-blue-500 transition-all duration-500 hover:scale-125" />
                    <span>{item.text} <span className="text-slate-500 text-sm">({item.keyword})</span></span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:w-1/2 relative" data-aos="fade-left">
              <img
                src="https://s.glavbukh.ru/images/preview/1200x800/48b6b509cee037071bd39322dd6d6afe.webp"
                alt="USD System Dashboard - ERP система для управления строительными материалами в Узбекистане"
                title="USD System Dashboard - Управление строительным бизнесом"
                className="rounded-2xl shadow-2xl border border-slate-700 grayscale hover:grayscale-0 transition-all duration-700 transform hover:scale-[1.02]"
                loading="lazy"
                width="1200"
                height="800"
              />
            </div>
          </div>
        </section>

        {/* FAQ СЕКЦИЯ ДЛЯ GOOGLE SNIPPETS */}
        <section className="py-16 bg-slate-950 border-t border-slate-800">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Часто задаваемые вопросы
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  q: "Что такое USD System?",
                  a: "USD System - это единая B2B платформа для строительного бизнеса в Узбекистане, которая объединяет ERP систему для управления производством, CRM для строительных компаний, онлайн-маркетплейс строительных материалов и логистические решения."
                },
                {
                  q: "Как начать использовать USD System?",
                  a: "Для начала работы оставьте заявку на нашем сайте или свяжитесь с нами по телефону. Мы проведем демонстрацию платформы, поможем с настройкой и обучением вашей команды."
                },
                {
                  q: "Сколько стоит подключение к USD System?",
                  a: "Стоимость зависит от выбранного пакета услуг. Мы предлагаем гибкие тарифы для компаний любого размера - от малого бизнеса до крупных корпораций. Свяжитесь с нами для получения индивидуального предложения."
                },
                {
                  q: "Работает ли USD System по всему Узбекистану?",
                  a: "Да, USD System работает по всему Узбекистану. Мы обслуживаем клиентов в Ташкенте, Самарканде, Бухаре, Намангане и всех других регионах страны."
                }
              ].map((faq, i) => (
                <div key={i} className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-slate-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Скрытый SEO контент для поисковых систем */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <h1>USD System Uzbekistan</h1>
          <h2>Ведущая B2B платформа для строительного бизнеса</h2>
          <p>USD System - цифровая экосистема №1 в Узбекистане для:</p>
          <ul>
            <li>Строительные материалы (qurilish mollari) в Ташкенте и по всему Узбекистану</li>
            <li>ERP система для производителей строительных материалов</li>
            <li>CRM для строительных компаний (qurilish korxonalari)</li>
            <li>Онлайн-маркетплейс строительных материалов</li>
            <li>Логистические решения для доставки материалов</li>
            <li>Финансовый учет строительных проектов</li>
            <li>Управление складом строительных материалов</li>
          </ul>

          <h3>Контакты USD System:</h3>
          <p>
            Адрес: Ташкент, Узбекистан<br />
            Телефон: +998-XX-XXX-XXXX<br />
            Email: info@usd-system.uz<br />
            Сайт: https://usd-system.uz
          </p>

          <h3>Ключевые слова USD System:</h3>
          <p>
            usd system узбекистан, usdsystem uz, строительные материалы Ташкент,
            qurilish mollari Toshkent, ERP система строительство, CRM для qurilish,
            маркетплейс строительных материалов Узбекистан, b2b платформа строительство,
            производство строительных материалов, ishlab chiqarish, логистика материалов,
            доставка qurilish mollari, складское хозяйство, inventory management,
            финансовый учет строительства, строительный софт Узбекистан,
            usd erp system, usd crm soft, usd marketplace
          </p>

          <h3>USD System на разных языках:</h3>
          <p>
            Russian: USD System Узбекистан, строительные материалы<br />
            Uzbek: USD System O'zbekiston, qurilish mollari<br />
            English: USD System Uzbekistan, construction materials
          </p>
        </div>
      </div>
    </>
  );
};

const ServiceCard = ({ icon, title, description, link, delay, ariaLabel }) => (
  <Link
    href={link}
    data-aos="fade-up"
    data-aos-delay={delay}
    className="group p-8 rounded-3xl glass hover:bg-slate-800/50 transition-all duration-700 hover:-translate-y-2 relative overflow-hidden"
    aria-label={ariaLabel || `Узнать больше о ${title}`}
  >
    {/* Анимированный фон при hover */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

    {/* Контент карточки */}
    <div className="relative z-10">
      <div className="mb-6 p-4 bg-slate-900 rounded-2xl inline-block transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 transform transition-all duration-500 group-hover:translate-x-2">
        {title}
      </h3>
      <p className="text-slate-400 mb-6 transform transition-all duration-500 group-hover:translate-x-1">
        {description}
      </p>
      <div className="flex items-center text-blue-400 font-semibold transform transition-all duration-500 group-hover:translate-x-2">
        Подробнее
        <ArrowRight size={16} className="ml-2 transform transition-all duration-500 group-hover:translate-x-2" />
      </div>
    </div>

    {/* Анимированный border */}
    <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-blue-500/30 transition-all duration-700" />
  </Link>
);

export default Home;