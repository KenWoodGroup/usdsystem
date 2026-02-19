'use client';

import React, { useState } from 'react';
import { FileText, Ruler, Upload, CheckCircle, AlertCircle, HardHat, Building2, Calculator, FileCheck, User, Phone, ArrowRight, Clock, Shield } from 'lucide-react';

const USDKonsult = () => {
    const [step, setStep] = useState(1); // 1: данные, 2: загрузка документов
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        agree: false
    });
    const [apzFile, setApzFile] = useState(null);
    const [drawingFile, setDrawingFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState({ apz: 0, drawing: 0 });
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [errors, setErrors] = useState({});

    // Валидация формы
    const validateForm = () => {
        const newErrors = {};
        if (!userData.name.trim()) {
            newErrors.name = 'Введите ваше имя';
        }
        if (!userData.phone.trim()) {
            newErrors.phone = 'Введите номер телефона';
        } else if (!/^\+?[0-9\s\-\(\)]{10,}$/.test(userData.phone)) {
            newErrors.phone = 'Введите корректный номер телефона';
        }
        if (!userData.agree) {
            newErrors.agree = 'Необходимо согласие на обработку данных';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Обработка отправки формы с данными
    const handleUserDataSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setStep(2);
        }
    };

    // Симуляция загрузки и анализа файлов
    const handleFileUpload = (type, file) => {
        if (type === 'apz') setApzFile(file);
        if (type === 'drawing') setDrawingFile(file);

        // Симуляция прогресса загрузки
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(prev => ({ ...prev, [type]: progress }));

            if (progress >= 100) {
                clearInterval(interval);
                // Проверяем, загружены ли оба файла
                if (apzFile && drawingFile) {
                    setAnalysisComplete(true);
                }
            }
        }, 200);
    };

    // Финальная отправка
    const handleFinalSubmit = () => {
        alert(`Спасибо, ${userData.name}! Ваш запрос принят. Специалист свяжется с вами по телефону ${userData.phone} в ближайшее время.`);
        // Здесь можно добавить реальную отправку данных на сервер
    };

    const ConsultingCard = ({ title, description, icon, type, file, onUpload }) => (
        <div
            className="relative p-8 rounded-3xl glass overflow-hidden group cursor-pointer hover:border-indigo-500/50 transition-all duration-300"
            onClick={() => document.getElementById(`${type}-upload`).click()}
        >
            <input
                type="file"
                id={`${type}-upload`}
                className="hidden"
                accept={type === 'apz' ? '.pdf,.doc,.docx' : '.dwg,.dxf,.pdf'}
                onChange={(e) => onUpload(type, e.target.files[0])}
            />

            {/* Фоновый градиент при наведении */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                    <div className="p-4 bg-slate-800/50 rounded-2xl">
                        {icon}
                    </div>
                    {uploadProgress[type] === 100 && (
                        <CheckCircle className="text-green-500" size={24} />
                    )}
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">{description}</p>

                {uploadProgress[type] > 0 && uploadProgress[type] < 100 ? (
                    <div className="space-y-2">
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress[type]}%` }}
                            />
                        </div>
                        <p className="text-sm text-slate-500">Загрузка... {uploadProgress[type]}%</p>
                    </div>
                ) : file ? (
                    <div className="flex items-center gap-2 text-sm">
                        <FileCheck className="text-green-500" size={18} />
                        <span className="text-green-500">Загружено: {file.name}</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-slate-500">
                        <Upload size={18} />
                        <span className="text-sm">Нажмите для загрузки</span>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="my-24 container mx-auto px-4">
            {/* Шаги процесса */}
            <div className="flex justify-center mb-12" data-aos="fade-up">
                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 ${step >= 1 ? 'text-indigo-400' : 'text-slate-600'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-indigo-500/20 border border-indigo-500' : 'bg-slate-800 border border-slate-700'}`}>
                            1
                        </div>
                        <span className="font-medium">Контакты</span>
                    </div>
                    <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-indigo-500' : 'bg-slate-700'}`} />
                    <div className={`flex items-center gap-2 ${step >= 2 ? 'text-indigo-400' : 'text-slate-600'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-indigo-500/20 border border-indigo-500' : 'bg-slate-800 border border-slate-700'}`}>
                            2
                        </div>
                        <span className="font-medium">Документы</span>
                    </div>
                </div>
            </div>

            {/* Заголовок секции */}
            <div className="text-center mb-12" data-aos="fade-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
                    <HardHat className="text-indigo-400" size={18} />
                    <span className="text-indigo-400 text-sm font-medium">Консалтинг проектов</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                    {step === 1 ? 'Начните с контактных данных' : 'Загрузите документы проекта'}
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    {step === 1
                        ? 'Оставьте свои контактные данные, и мы поможем с анализом вашей документации'
                        : 'Загрузите АПЗ и чертежи проекта для профессионального анализа'}
                </p>
            </div>

            {step === 1 ? (
                // Шаг 1: Форма с контактными данными
                <div className="max-w-xl mx-auto" data-aos="fade-up">
                    <form onSubmit={handleUserDataSubmit} className="space-y-6">
                        {/* Имя */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Ваше имя <span className="text-rose-400">*</span>
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                <input
                                    type="text"
                                    value={userData.name}
                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                    placeholder="Иван Петров"
                                    className={`w-full pl-12 pr-4 py-4 bg-slate-900/50 border ${errors.name ? 'border-rose-500' : 'border-slate-700'} rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors`}
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-2 text-sm text-rose-400">{errors.name}</p>
                            )}
                        </div>

                        {/* Телефон */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Номер телефона <span className="text-rose-400">*</span>
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                <input
                                    type="tel"
                                    value={userData.phone}
                                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                    placeholder="+998 97 123-45-67"
                                    className={`w-full pl-12 pr-4 py-4 bg-slate-900/50 border ${errors.phone ? 'border-rose-500' : 'border-slate-700'} rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors`}
                                />
                            </div>
                            {errors.phone && (
                                <p className="mt-2 text-sm text-rose-400">{errors.phone}</p>
                            )}
                        </div>

                        {/* Согласие */}
                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="agree"
                                checked={userData.agree}
                                onChange={(e) => setUserData({ ...userData, agree: e.target.checked })}
                                className="mt-1 w-4 h-4 bg-slate-800 border-slate-700 rounded focus:ring-indigo-500 text-indigo-600"
                            />
                            <label htmlFor="agree" className="text-sm text-slate-400">
                                Я согласен на обработку персональных данных и принимаю условия договора-оферты
                            </label>
                        </div>
                        {errors.agree && (
                            <p className="text-sm text-rose-400">{errors.agree}</p>
                        )}

                        {/* Кнопка далее */}
                        <button
                            type="submit"
                            className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 group"
                        >
                            Продолжить
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        {/* Пояснение */}
                        <p className="text-center text-sm text-slate-500 flex items-center justify-center gap-2">
                            <Shield size={16} />
                            Ваши данные в безопасности и не передаются третьим лицам
                        </p>
                    </form>
                </div>
            ) : (
                // Шаг 2: Загрузка документов
                <>
                    {/* Карточки загрузки файлов */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div data-aos="fade-right">
                            <ConsultingCard
                                title="АПЗ"
                                description="Архитектурно-планировочное задание. Загрузите документ для анализа соответствия нормативам и требованиям."
                                icon={<FileText className="text-indigo-400" size={32} />}
                                type="apz"
                                file={apzFile}
                                onUpload={handleFileUpload}
                            />
                        </div>

                        <div data-aos="fade-left">
                            <ConsultingCard
                                title="Чертежи проекта"
                                description="Архитектурные и конструктивные чертежи в форматах DWG, DXF или PDF для детального анализа."
                                icon={<Ruler className="text-purple-400" size={32} />}
                                type="drawing"
                                file={drawingFile}
                                onUpload={handleFileUpload}
                            />
                        </div>
                    </div>

                    {/* Статус анализа */}
                    {analysisComplete && (
                        <div
                            className="p-6 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-3xl mb-8"
                            data-aos="fade-up"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-indigo-500/20 rounded-xl">
                                    <CheckCircle className="text-indigo-400" size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-2">
                                        Файлы успешно загружены!
                                    </h4>
                                    <p className="text-slate-300 mb-4">
                                        Наши специалисты уже приступили к анализу вашей документации.
                                        В течение 24 часов вы получите детальный отчет с рекомендациями.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Building2 className="text-indigo-400" size={16} />
                                            <span className="text-slate-300">Проверка нормативов</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calculator className="text-indigo-400" size={16} />
                                            <span className="text-slate-300">Расчет нагрузок</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <AlertCircle className="text-indigo-400" size={16} />
                                            <span className="text-slate-300">Выявление ошибок</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Информационные блоки */}
                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            {
                                icon: <FileCheck className="text-emerald-400" />,
                                title: "Проверка соответствия",
                                description: "Анализ документации на соответствие СНиП и ГОСТ"
                            },
                            {
                                icon: <AlertCircle className="text-amber-400" />,
                                title: "Выявление ошибок",
                                description: "Поиск потенциальных проблем и несоответствий в проекте"
                            },
                            {
                                icon: <Calculator className="text-rose-400" />,
                                title: "Сметные расчеты",
                                description: "Предварительный расчет стоимости реализации"
                            }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl flex items-start gap-3"
                                data-aos="fade-up"
                                data-aos-delay={100 * (idx + 1)}
                            >
                                <div className="p-2 bg-slate-800 rounded-lg shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <h5 className="font-medium text-white text-sm mb-1">{item.title}</h5>
                                    <p className="text-xs text-slate-500">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Кнопка отправки */}
                    {apzFile && drawingFile && (
                        <div className="mt-8 text-center" data-aos="fade-up">
                            <button
                                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-600/25"
                                onClick={handleFinalSubmit}
                            >
                                Отправить на анализ
                            </button>
                            <p className="text-sm text-slate-500 mt-4 flex items-center justify-center gap-2">
                                <Clock size={16} />
                                Обычно ответ приходит в течение 24 часов
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default USDKonsult;