'use client';

import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
const Contact = () => {
    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16">

                    {/* Левая колонка */}
                    <div className="space-t-12">
                        <div className="overflow-hidden" data-aos="fade-down">
                            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-[#FFFFFF]">
                                Свяжитесь с нами
                            </h1>
                            <p className="text-[#94A3B8] text-lg mb-12">
                                Есть вопросы по проекту или хотите сотрудничать? Напишите нам или позвоните.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <ContactInfo
                                icon={<Phone className="text-[#3B82F6]" />}
                                label="Телефон"
                                value="+998 71 200 00 00"
                                delay={0}
                            />
                            <ContactInfo
                                icon={<Mail className="text-[#3B82F6]" />}
                                label="Email"
                                value="info@usdgroup.uz"
                                delay={100}
                            />
                            <ContactInfo
                                icon={<MapPin className="text-[#3B82F6]" />}
                                label="Адрес"
                                value="г. Ташкент, Чиланзарский район, 5-й квартал"
                                delay={200}
                            />
                        </div>

                        {/* Секция карты */}
                        {/* Секция карты */}
                        <div
                            className="mt-12 h-64 rounded-3xl overflow-hidden border border-[#1E293B]"
                            data-aos="zoom-in"
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24269.18843728014!2d68.76681100158085!3d40.505153952142315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38b20744f37988af%3A0x5fe5538855c9a835!2z0JzQvtC70L7QtNC10LbQvdGL0Lkg0YbQtdC90YLRgA!5e0!3m2!1sru!2s!4v1769680768792!5m2!1sru!2s"
                                className="w-full h-full"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                    </div>

                    {/* Правая колонка: Форма */}
                    <div
                        className="bg-[#0F172A] p-8 lg:p-12 rounded-[2.5rem] border border-[#1E293B]"
                        data-aos="fade-left"
                    >
                        <h3 className="text-2xl font-bold mb-8 text-[#FFFFFF]">Отправить сообщение</h3>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Ваше имя</label>
                                    <input type="text" className="w-full bg-[#020617] border border-[#1E293B] rounded-xl px-4 py-3 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition-all text-[#FFFFFF]" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Телефон</label>
                                    <input type="tel" className="w-full bg-[#020617] border border-[#1E293B] rounded-xl px-4 py-3 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition-all text-[#FFFFFF]" placeholder="+998 90 ..." />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#94A3B8] mb-2">Тема</label>
                                <select className="w-full bg-[#020617] border border-[#1E293B] rounded-xl px-4 py-3 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition-all text-[#94A3B8]">
                                    <option className="text-[#94A3B8]">Автоматизация</option>
                                    <option className="text-[#94A3B8]">USD ERP (CRM)</option>
                                    <option className="text-[#94A3B8]">USD Soft (Разработка)</option>
                                    <option className="text-[#94A3B8]">Сотрудничество</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#94A3B8] mb-2">Сообщение</label>
                                <textarea rows={4} className="w-full bg-[#020617] border border-[#1E293B] rounded-xl px-4 py-3 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition-all placeholder:text-[#475569] text-[#FFFFFF]" placeholder="Расскажите подробнее о вашем проекте..."></textarea>
                            </div>

                            <button type="submit" className="w-full py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-[#FFFFFF] font-bold rounded-xl flex items-center justify-center space-x-2 transition-all">
                                <span>Отправить</span>
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ContactInfo = ({ icon, label, value, delay = 0 }) => (
    <div
        className="flex items-start space-x-6 overflow-hidden"
        data-aos="fade-up"
        data-aos-delay={delay}
    >
        <div className="p-4 bg-[#0F172A] rounded-2xl border border-[#1E293B]">{icon}</div>
        <div>
            <div className="text-[#64748B] text-sm mb-1">{label}</div>
            <div className="text-lg font-semibold text-[#FFFFFF]">{value}</div>
        </div>
    </div>
);

export default Contact;
