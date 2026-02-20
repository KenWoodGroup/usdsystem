'use client';

import React, { useState } from 'react';
import { FileText, Ruler, Upload, CheckCircle, AlertCircle, HardHat, Building2, Calculator, FileCheck, User, Phone, ArrowRight, Clock, Shield, Loader } from 'lucide-react';
import Swal from 'sweetalert2';

const USDKonsult = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        full_name: '',
        phone: '',
        password: '',
        note: '',
        agree: false
    });
    const [apzFile, setApzFile] = useState(null);
    const [drawingFile, setDrawingFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState({ apz: 0, drawing: 0 });
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');

    // Валидация формы
    const validateForm = () => {
        const newErrors = {};
        if (!userData.full_name.trim()) {
            newErrors.full_name = 'Введите ваше имя';
        }
        if (!userData.phone.trim()) {
            newErrors.phone = 'Введите номер телефона';
        } else if (!/^\+998\d{9}$/.test(userData.phone.replace(/\s+/g, ''))) {
            newErrors.phone = 'Введите корректный номер телефона в формате +998XXXXXXXXX';
        }
        if (!userData.password.trim()) {
            newErrors.password = 'Введите пароль';
        } else if (userData.password.length < 6) {
            newErrors.password = 'Пароль должен содержать минимум 6 символов';
        }
        if (!userData.agree) {
            newErrors.agree = 'Необходимо согласие на обработку данных';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Валидация файлов
    const validateFiles = () => {
        const newErrors = {};
        if (!apzFile) {
            newErrors.apz = 'Загрузите файл АПЗ';
        }
        if (!drawingFile) {
            newErrors.drawing = 'Загрузите чертежи проекта';
        }

        // Проверка размера файлов (например, не больше 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (apzFile && apzFile.size > maxSize) {
            newErrors.apz = 'Размер файла не должен превышать 10MB';
        }
        if (drawingFile && drawingFile.size > maxSize) {
            newErrors.drawing = 'Размер файла не должен превышать 10MB';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Показать успешное уведомление
    const showSuccessAlert = () => {
        Swal.fire({
            title: 'Успешно отправлено!',
            html: `
                <div class="text-left">
                    <p class="mb-2">Спасибо, ${userData.full_name}!</p>
                    <p class="mb-2">Ваш запрос принят. Специалист свяжется с вами по телефону</p>
                    <p class="font-semibold text-indigo-600">${userData.phone}</p>
                    <p class="mt-4 text-sm text-gray-500">в ближайшее время.</p>
                </div>
            `,
            icon: 'success',
            confirmButtonText: 'Отлично',
            confirmButtonColor: '#4f46e5',
            background: '#1e1b4b',
            color: '#fff',
            customClass: {
                popup: 'rounded-3xl',
                confirmButton: 'px-8 py-3 rounded-xl font-semibold'
            }
        });
    };

    // Показать ошибку
    const showErrorAlert = (message) => {
        Swal.fire({
            title: 'Ошибка!',
            text: message || 'Произошла ошибка при отправке данных. Пожалуйста, попробуйте снова.',
            icon: 'error',
            confirmButtonText: 'Понятно',
            confirmButtonColor: '#ef4444',
            background: '#1e1b4b',
            color: '#fff',
            customClass: {
                popup: 'rounded-3xl',
                confirmButton: 'px-8 py-3 rounded-xl font-semibold'
            }
        });
    };

    // Показать предупреждение о валидации
    const showValidationAlert = () => {
        Swal.fire({
            title: 'Внимание!',
            text: 'Пожалуйста, заполните все обязательные поля и загрузите файлы.',
            icon: 'warning',
            confirmButtonText: 'Понятно',
            confirmButtonColor: '#f59e0b',
            background: '#1e1b4b',
            color: '#fff',
            customClass: {
                popup: 'rounded-3xl',
                confirmButton: 'px-8 py-3 rounded-xl font-semibold'
            }
        });
    };

    // Показать загрузку
    const showLoadingAlert = () => {
        Swal.fire({
            title: 'Отправка данных...',
            html: 'Пожалуйста, подождите',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
            background: '#1e1b4b',
            color: '#fff',
            customClass: {
                popup: 'rounded-3xl'
            }
        });
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

                    // Показываем уведомление о завершении загрузки
                    Swal.fire({
                        title: 'Файлы загружены!',
                        text: 'Все файлы успешно загружены. Теперь вы можете отправить их на анализ.',
                        icon: 'success',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        background: '#1e1b4b',
                        color: '#fff',
                        customClass: {
                            popup: 'rounded-xl'
                        }
                    });
                }
            }
        }, 200);
    };

    // Функция для форматирования номера телефона
    const formatPhoneNumber = (phone) => {
        // Удаляем все пробелы и дефисы
        return phone.replace(/[\s\-\(\)]/g, '');
    };

    // Отправка данных на backend
    const sendToBackend = async () => {
        if (!validateFiles()) {
            showValidationAlert();
            return;
        }

        setLoading(true);
        showLoadingAlert();

        try {
            const formData = new FormData();

            // Добавляем все поля в FormData
            formData.append('full_name', userData.full_name);
            formData.append('phone', formatPhoneNumber(userData.phone));
            formData.append('password', userData.password);
            formData.append('note', userData.note || '');
            formData.append('file1', apzFile);
            formData.append('file2', drawingFile);

            // Отправка запроса
            const response = await fetch('https://api.usderp.uz/consulting/api/v1/offers/user', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Ошибка при отправке данных');
            }

            // Закрываем загрузку
            Swal.close();

            // Успешная отправка
            showSuccessAlert();

            // Сброс формы после успешной отправки
            resetForm();

        } catch (error) {
            console.error('Error sending data:', error);

            // Закрываем загрузку
            Swal.close();

            // Показываем ошибку
            showErrorAlert(error.message);
            setApiError(error.message || 'Произошла ошибка при отправке данных. Пожалуйста, попробуйте снова.');
        } finally {
            setLoading(false);
        }
    };

    // Сброс формы
    const resetForm = () => {
        setStep(1);
        setUserData({
            full_name: '',
            phone: '',
            password: '',
            note: '',
            agree: false
        });
        setApzFile(null);
        setDrawingFile(null);
        setUploadProgress({ apz: 0, drawing: 0 });
        setAnalysisComplete(false);
        setErrors({});
        setApiError('');
    };

    // Финальная отправка
    const handleFinalSubmit = () => {
        sendToBackend();
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
            {errors[type] && (
                <p className="mt-2 text-sm text-rose-400">{errors[type]}</p>
            )}
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

            {/* Ошибка API */}
            {apiError && (
                <div className="max-w-xl mx-auto mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-sm">
                    {apiError}
                </div>
            )}

            {step === 1 ? (
                // Шаг 1: Форма с контактными данными
                <div className="max-w-xl mx-auto" data-aos="fade-up">
                    <form onSubmit={handleUserDataSubmit} className="space-y-6">
                        {/* Полное имя */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Полное имя <span className="text-rose-400">*</span>
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                <input
                                    type="text"
                                    value={userData.full_name}
                                    onChange={(e) => setUserData({ ...userData, full_name: e.target.value })}
                                    placeholder="Иван Петров"
                                    className={`w-full pl-12 pr-4 py-4 bg-slate-900/50 border ${errors.full_name ? 'border-rose-500' : 'border-slate-700'} rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors`}
                                />
                            </div>
                            {errors.full_name && (
                                <p className="mt-2 text-sm text-rose-400">{errors.full_name}</p>
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

                        {/* Пароль */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Пароль <span className="text-rose-400">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={userData.password}
                                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                    placeholder="Минимум 6 символов"
                                    className={`w-full px-4 py-4 bg-slate-900/50 border ${errors.password ? 'border-rose-500' : 'border-slate-700'} rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors`}
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm text-rose-400">{errors.password}</p>
                            )}
                        </div>

                        {/* Примечание (опционально) */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Примечание (необязательно)
                            </label>
                            <textarea
                                value={userData.note}
                                onChange={(e) => setUserData({ ...userData, note: e.target.value })}
                                placeholder="Дополнительная информация по проекту"
                                rows="3"
                                className="w-full px-4 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                            />
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
                                className={`px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 mx-auto ${loading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                onClick={handleFinalSubmit}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader size={20} className="animate-spin" />
                                        Отправка...
                                    </>
                                ) : (
                                    'Отправить на анализ'
                                )}
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