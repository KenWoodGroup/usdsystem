'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

const Contact = () => {
    const { t, i18n } = useTranslation();
    const [ready, setReady] = useState(false);

    // ================== State формы ==================
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [type, setType] = useState('erp');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);

    // ================== Ждём инициализацию i18n ==================
    useEffect(() => {
        if (i18n.isInitialized) setReady(true);
    }, [i18n]);

    // Если i18n ещё не готов — не рендерим
    if (!ready) return null;

    // ================== Отправка формы ==================
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = { full_name: fullName, phone, type, note };

        try {
            const res = await fetch("https://api.usderp.uz/broker/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await res.json();

            if (res.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Xabar yuborildi!',
                    text: 'Sizning xabaringiz muvaffaqiyatli yuborildi.',
                    timer: 3000,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false
                });
                setFullName('');
                setPhone('');
                setNote('');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Xatolik yuz berdi',
                    text: result.message || 'Server javobi bilan muammo',
                    toast: true,
                    position: 'top-end',
                    timer: 4000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Server bilan ulanishda xatolik',
                text: 'Iltimos, qayta urinib ko‘ring.',
                toast: true,
                position: 'top-end',
                timer: 4000,
                showConfirmButton: false
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Левая колонка */}
                    <div className="space-t-12">
                        <div className="overflow-hidden" data-aos="fade-down">
                            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-[#FFFFFF]">
                                {t("contact.title")}
                            </h1>
                            <p className="text-[#94A3B8] text-lg mb-12">{t("contact.description")}</p>
                        </div>

                        <div className="space-y-8">
                            <ContactInfo icon={<Phone className="text-[#3B82F6]" />} label={t("contact.info.phone")} value="+998 88 666 33 66" delay={0} t={t} />
                            <ContactInfo icon={<Mail className="text-[#3B82F6]" />} label={t("contact.info.email")} value=" kenwoodgroup1@gmail.com" delay={100} t={t} />
                            <ContactInfo icon={<MapPin className="text-[#3B82F6]" />} label={t("contact.info.address")} value={t("contact.info.address_value")} delay={200} t={t} />
                        </div>

                        <div className="mt-12 h-64 rounded-3xl overflow-hidden border border-[#1E293B]" data-aos="zoom-in">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5736.168328493563!2d69.2527698!3d41.3120116!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b771c9b2f2b%3A0x9c4fe2258809cbe3!2sUSD%20SYSTEM!5e1!3m2!1sru!2s!4v1770099672290!5m2!1sru!2s"
                                className="w-full h-full"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>

                    {/* Правая колонка: Форма */}
                    <div className="bg-[#0F172A] p-8 lg:p-12 rounded-[2.5rem] border border-[#1E293B]" data-aos="fade-left">
                        <h3 className="text-2xl font-bold mb-8 text-[#FFFFFF]">{t("contact.form.title")}</h3>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">{t("contact.form.name")}</label>
                                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                                        className="w-full bg-[#020617] border border-[#1E293B] rounded-xl px-4 py-3 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition-all text-[#FFFFFF]" placeholder={t("contact.form.placeholder_name")} required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">{t("contact.form.phone")}</label>
                                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-[#020617] border border-[#1E293B] rounded-xl px-4 py-3 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition-all text-[#FFFFFF]" placeholder={t("contact.form.placeholder_phone")} required />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#94A3B8] mb-2">{t("contact.form.subject")}</label>
                                <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-[#020617] border border-[#1E293B] rounded-xl px-4 py-3 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition-all text-[#94A3B8]">
                                    <option value="erp">{t("contact.form.subjects.erp")}</option>
                                    <option value="market">{t("contact.form.subjects.market")}</option>
                                    <option value="consulting">{t("contact.form.subjects.consulting")}</option>
                                    <option value="other">{t("contact.form.subjects.other")}</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#94A3B8] mb-2">{t("contact.form.message")}</label>
                                <textarea rows={4} value={note} onChange={(e) => setNote(e.target.value)}
                                    className="w-full bg-[#020617] border border-[#1E293B] rounded-xl px-4 py-3 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition-all placeholder:text-[#475569] text-[#FFFFFF]" placeholder={t("contact.form.placeholder_message")} />
                            </div>

                            <button type="submit" disabled={loading} className={`w-full py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-[#FFFFFF] font-bold rounded-xl flex items-center justify-center space-x-2 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                <span>{loading ? "Yuborilmoqda..." : t("contact.form.send")}</span>
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ContactInfo = ({ icon, label, value, delay = 0, t }) => {
    const getHref = () => {
        if (label === t("contact.info.phone")) return `tel:${value.replace(/\s+/g, "")}`;
        if (label === t("contact.info.email")) return `mailto:${value}`;
        if (label === t("contact.info.address")) return "https://maps.google.com/?q=700002, Tashkent, Uzbekistan";
        return "#";
    };

    return (
        <div className="flex items-start space-x-6 overflow-hidden" data-aos="fade-up" data-aos-delay={delay}>
            <div className="p-4 bg-[#0F172A] rounded-2xl border border-[#1E293B]">{icon}</div>
            <div>
                <div className="text-[#64748B] text-sm mb-1">{label}</div>
                <a href={getHref()} target={label === t("contact.info.address") ? "_blank" : undefined} rel={label === t("contact.info.address") ? "noopener noreferrer" : undefined} className="text-lg font-semibold text-[#FFFFFF] hover:text-[#3B82F6] transition" aria-label={label}>{value}</a>
            </div>
        </div>
    );
};

export default Contact;