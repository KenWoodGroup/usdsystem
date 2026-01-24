import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#0F172A] border-t border-[#1E293B] pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <span className="text-2xl font-bold tracking-tighter text-[#FFFFFF] mb-6 block">
                            USD<span className="text-[#3B82F6]">GROUP</span>
                        </span>
                        <p className="text-[#94A3B8] text-sm leading-relaxed">
                            Инновационные технологии и цифровые решения, которые поднимают ваш бизнес на новый уровень.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="text-[#94A3B8] hover:text-[#FFFFFF] transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-[#94A3B8] hover:text-[#FFFFFF] transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-[#94A3B8] hover:text-[#FFFFFF] transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="text-[#94A3B8] hover:text-[#FFFFFF] transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-[#FFFFFF] font-semibold mb-6">Услуги</h4>
                        <ul className="space-y-4 text-sm text-[#94A3B8]">
                            <li>
                                <Link href="/usderp" className="hover:text-[#60A5FA] transition-colors">
                                    USD ERP - Строительный CRM
                                </Link>
                            </li>
                            <li>
                                <Link href="/usdsoft" className="hover:text-[#60A5FA] transition-colors">
                                    USD Soft - Автоматизация
                                </Link>
                            </li>
                            <li>
                                <Link href="/usdfinance" className="hover:text-[#60A5FA] transition-colors">
                                    USD Finance - Marketplace
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="hover:text-[#60A5FA] transition-colors">
                                    Логистические услуги
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-[#FFFFFF] font-semibold mb-6">Компания</h4>
                        <ul className="space-y-4 text-sm text-[#94A3B8]">
                            <li>
                                <Link href="/about" className="hover:text-[#60A5FA] transition-colors">
                                    О нас
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-[#60A5FA] transition-colors">
                                    Контакты
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#60A5FA] transition-colors">Вакансии</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#60A5FA] transition-colors">Блог</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-[#FFFFFF] font-semibold mb-6">Контакты</h4>
                        <ul className="space-y-4 text-sm text-[#94A3B8]">
                            <li className="flex items-center space-x-3">
                                <MapPin size={18} className="text-[#3B82F6]" />
                                <span>г. Ташкент, Чиланзарский район, 5-й квартал</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={18} className="text-[#3B82F6]" />
                                <span>+998 71 200 00 00</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={18} className="text-[#3B82F6]" />
                                <span>info@usdgroup.uz</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#1E293B] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#64748B]">
                    <p>© 2024 USD Group. Все права защищены.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-[#FFFFFF] transition-colors">Политика конфиденциальности</a>
                        <a href="#" className="hover:text-[#FFFFFF] transition-colors">Условия использования</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
