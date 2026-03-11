'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Cpu, Building2, Truck, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Существующий дизайн без изменений */}
      <div className="relative pt-20">
        {/* HERO */}
        <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
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
              <span className="gradient-text">{t("home.hero.all_on_platform")}</span>
            </h1>

            <div className="mb-4">
              {[t("home.hero.production"), t("home.hero.sale"), t("home.hero.construction")].map((text, i) => (
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
              {t("home.hero.description")}
            </p>

            <div
              className="flex flex-col sm:flex-row justify-center gap-4"
              data-aos="fade-up"
              data-aos-delay={800}
            >
              <Link
                href="/contact"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-500 hover:scale-105"
              >
                {t("home.hero.start_project")} <ArrowRight size={18} />
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-bold border border-slate-700 transition-all duration-500 hover:scale-105"
              >
                {t("home.hero.about_us")}
              </Link>
            </div>
          </div>
        </section>

        {/* СТАТИСТИКА */}
        <section className="py-12 border-y border-slate-800 bg-slate-900/50">
          <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              ['1 000+', t("home.stats.orders")],
              ['100 000+', t("home.stats.materials")],
              ['500+', t("home.stats.sellers")],
              ['100+', t("home.stats.companies")],
            ].map(([value, label], i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 150}
                className="transform transition-all duration-700 hover:scale-105 hover:bg-slate-800/30 p-4 rounded-xl"
              >
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
                {t("home.services.title")}
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                {t("home.services.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <ServiceCard
                icon={<Cpu size={32} className="text-blue-400" />}
                title="USD ERP"
                description={t("home.services.usderp_desc")}
                link="/usderp"
                delay={0}
                t={t}
              />
              <ServiceCard
                icon={<Building2 size={32} className="text-teal-400" />}
                title="USD SOFT"
                description={t("home.services.usdsoft_desc")}
                link="/about"
                delay={150}
                t={t}
              />
              <ServiceCard
                icon={<ShoppingCart size={32} className="text-orange-400" />}
                title="Marketplace"
                description={t("home.services.marketplace_desc")}
                link="/usdmarket"
                delay={300}
                t={t}
              />
              <ServiceCard
                icon={<Truck size={32} className="text-purple-400" />}
                title="Логистика"
                description={t("home.services.logistics_desc")}
                link="/"
                delay={450}
                t={t}
              />
            </div>
          </div>
        </section>

        {/* ИНТЕГРАЦИЯ */}
        <section className="py-24 bg-slate-900">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2" data-aos="fade-right">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                {t("home.integration.title")}
              </h2>
              <p className="text-slate-400 mb-8">
                {t("home.integration.description")}
              </p>
              <ul className="space-y-4">
                {t("home.integration.items", { returnObjects: true }).map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-slate-200 transform transition-all duration-500 hover:translate-x-2"
                    data-aos="fade-up"
                    data-aos-delay={i * 150}
                  >
                    <CheckCircle2 size={20} className="text-blue-500 transition-all duration-500 hover:scale-125" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:w-1/2 relative" data-aos="fade-left">
              <img
                src="https://s.glavbukh.ru/images/preview/1200x800/48b6b509cee037071bd39322dd6d6afe.webp"
                alt="USD System Dashboard"
                className="rounded-2xl shadow-2xl border border-slate-700 grayscale hover:grayscale-0 transition-all duration-700 transform hover:scale-[1.02]"
                loading="lazy"
                width="1200"
                height="800"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const ServiceCard = ({ icon, title, description, link, delay, t }) => (
  <Link
    href={link}
    data-aos="fade-up"
    data-aos-delay={delay}
    className="group p-8 rounded-3xl glass hover:bg-slate-800/50 transition-all duration-700 relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-linear-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

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
        {t("home.services.more")}
        <ArrowRight size={16} className="ml-2 transform transition-all duration-500 group-hover:translate-x-2" />
      </div>
    </div>

    <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-blue-500/30 transition-all duration-700" />
  </Link>
);

export default Home;