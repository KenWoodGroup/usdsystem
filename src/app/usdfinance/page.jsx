'use client'; // 🔥 Важно! Делает компонент клиентским

import React, { useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Wallet, ShoppingBag, CreditCard } from 'lucide-react';
import Offers from '@/components/Offers';
import AOS from 'aos';
import 'aos/dist/aos.css';

const data = [
  { name: 'Янв', savdo: 4000, foyda: 2400 },
  { name: 'Фев', savdo: 3000, foyda: 1398 },
  { name: 'Мар', savdo: 2000, foyda: 9800 },
  { name: 'Апр', savdo: 2780, foyda: 3908 },
  { name: 'Май', savdo: 1890, foyda: 4800 },
  { name: 'Июн', savdo: 2390, foyda: 3800 },
];

const USDFinance = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 120,
    });
  }, []);

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

        {/* Графики и информация */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* График */}
          <div
            className="lg:col-span-2 p-8 rounded-3xl glass overflow-hidden"
            data-aos="fade-right"
          >
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-white" data-aos="fade-up">
              <TrendingUp className="text-green-500" /> Динамика продаж
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSavdo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', color: '#fff' }} />
                  <Area type="monotone" dataKey="savdo" stroke="#3b82f6" fill="url(#colorSavdo)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
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
        <div className="mt-16" data-aos="fade-up" data-aos-delay="500">
          <Offers />
        </div>
      </div>
    </div>
  );
};

export default USDFinance;
