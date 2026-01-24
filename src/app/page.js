'use client'; // 🔥 нужно для интерактивных компонентов (кнопки, hover)

import Link from 'next/link';
import React from 'react';
import { ArrowRight, Cpu, Building2, BarChart3, Truck, ShoppingCart, CheckCircle2 } from 'lucide-react';

const Home = () => {
  return (
    <div className="relative pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-40 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-600/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl text-white lg:text-7xl font-extrabold tracking-tight mb-8">
              Производство → Продажа → Строительство <br />
              <span className="gradient-text">На единой платформе</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-10 leading-relaxed">
              Систематизируем производство, предлагаем CRM для строительных компаний и платформу для продажи строительных материалов, а также инновационные логистические решения для повышения эффективности вашего бизнеса.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Начать проект</span>
                <ArrowRight size={20} />
              </Link>
              <Link href="/about" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-bold transition-all border border-slate-700">
                О нас
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Статистика / Быстрая информация */}
      <section className="py-12 border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-1">1 000+</div>
              <div className="text-slate-500 text-sm">Успешные заказы</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">100 000+</div>
              <div className="text-slate-500 text-sm">Строительные материалы</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-slate-500 text-sm">Продавцы на Marketplace</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">100+</div>
              <div className="text-slate-500 text-sm">Активные компании</div>
            </div>
          </div>
        </div>
      </section>

      {/* Сетка услуг */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">Наши услуги</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              USD SYSTEM предлагает комплексные решения для всех этапов вашего бизнеса.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
            <ServiceCard
              icon={<Cpu className="text-blue-400" size={32} />}
              title="USD ERP"
              description="Полная систематизация производственных процессов и умные решения для управления."
              link="/usdsoft"
            />
            <ServiceCard
              icon={<Building2 className="text-teal-400" size={32} />}
              title="USD SOFT"
              description="Специальная CRM для строительных компаний: склад, HR, финансовый контроль."
              link="/usderp"
            />
            <ServiceCard
              icon={<ShoppingCart className="text-orange-400" size={32} />}
              title="Marketplace"
              description="Большая и удобная онлайн-платформа для продажи строительных материалов."
              link="/usdfinance"
            />
            <ServiceCard
              icon={<Truck className="text-purple-400" size={32} />}
              title="Логистика"
              description="Цифровое управление перевозкой и доставкой грузов."
              link="/"
            />
          </div>
        </div>
      </section>

      {/* Визуализация проекта */}
      <section className="py-24 bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[white]">Интеграция Marketplace & CRM</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Наши решения позволяют строительным компаниям не только удобно закупать материалы, но и отслеживать остатки на складе в реальном времени. Все процессы объединены в единую экосистему.
              </p>
              <ul className="space-y-4">
                {[
                  "Контроль склада в реальном времени",
                  "Автоматизированная HR-система",
                  "Безопасные финансовые транзакции",
                  "Интеллектуальные маршруты логистики"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-slate-200">
                    <CheckCircle2 className="text-blue-500 flex-shrink-0" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                <img src="https://picsum.photos/800/600?random=1" alt="Dashboard" className="w-full grayscale hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServiceCard = ({ icon, title, description, link }) => (
  <Link href={link} className="p-8 rounded-3xl glass hover:bg-slate-800/50 transition-all group">
    <div className="mb-6 p-4 rounded-2xl bg-slate-900 inline-block group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed mb-6">{description}</p>
    <div className="flex items-center text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
      <span>Подробнее</span>
      <ArrowRight size={16} className="ml-2" />
    </div>
  </Link>
);

export default Home;
