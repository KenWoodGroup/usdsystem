'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { TrendingUp, Wallet, ShoppingBag, CreditCard } from 'lucide-react';

const AreaChartComponent = dynamic(() => import('@/components/AreaChartComponent'), { ssr: false });
const Offers = dynamic(() => import('@/components/Offers'), { ssr: false });

const USDFinance = () => {
  return (
    <div className="pt-32 pb-24 bg-[#020617] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-20 overflow-hidden" data-aos="fade-up">
          <h1 className="relative text-4xl lg:text-6xl font-bold mb-6 text-white">
            USD Finance & Marketplace
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Современные финтех-решения для анализа финансовых процессов и продажи строительных материалов.
          </p>
        </div>

        {/* График */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 p-8 rounded-3xl glass overflow-hidden" data-aos="fade-right">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-white" data-aos="fade-up">
              <TrendingUp className="text-green-500" /> Динамика продаж
            </h3>
            <AreaChartComponent />
          </div>

          {/* Боковые карточки */}
          <div className="space-y-8">
            <div className="p-8 rounded-3xl glass flex flex-col items-center text-center overflow-hidden" data-aos="fade-up" data-aos-delay="100">
              <Wallet className="text-orange-500 mb-4" size={32} />
              <h4 className="text-lg font-bold mb-2 text-white">Кошелек Marketplace</h4>
              <p className="text-slate-500 text-sm">Все расчеты и платежи в одном безопасном кошельке.</p>
            </div>
            <div className="p-8 rounded-3xl glass flex flex-col items-center text-center overflow-hidden" data-aos="fade-up" data-aos-delay="200">
              <ShoppingBag className="text-blue-500 mb-4" size={32} />
              <h4 className="text-lg font-bold mb-2 text-white">Удобный Marketplace</h4>
              <p className="text-slate-500 text-sm">Тысячи строительных товаров по оптовым ценам в одном месте.</p>
            </div>
          </div>
        </div>

        {/* Особенности */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Оптовые цены', icon: <CreditCard className="text-indigo-400" /> },
            { label: 'Кредитные линии', icon: <TrendingUp className="text-emerald-400" /> },
            { label: 'Кэшбек система', icon: <Wallet className="text-amber-400" /> },
            { label: 'Быстрые платежи', icon: <ShoppingBag className="text-rose-400" /> },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center space-x-4 overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={100 * (idx + 1)}
            >
              <div className="p-3 bg-slate-950 rounded-xl">{item.icon}</div>
              <span className="font-medium text-white">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Offers */}
        <div className="mt-16" data-aos="fade-up" data-aos-delay={500}>
          <Offers />
        </div>
      </div>
    </div>
  );
};

export default USDFinance;