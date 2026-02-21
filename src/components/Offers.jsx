'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Package, CheckCircle, ChevronLeft, ChevronRight, Plus, Building2, Store, Hammer, User, Mail, MapPin, Lock, LogIn, Check, ArrowRight } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';

// Импортируем данные об областях и районах
import { regionsData } from '../app/regions/regions';
import { districtsData } from '../app/regions/districts'

export default function Offers() {
    // Начинаем с шага проверки аккаунта
    const [currentStep, setCurrentStep] = useState(1); // 1: проверка аккаунта, 2: регистрация, 3: успех
    const [selectedProducts, setSelectedProducts] = useState([]);

    // Шаг 2: Форма регистрации
    const [accountType, setAccountType] = useState('company');
    const [registrationData, setRegistrationData] = useState({
        type: 'company',
        name: '',
        full_name: '',
        address: '',
        phone: '+998',
        username: '',
        password: ''
    });

    // Данные для выбора адреса
    const [regions] = useState(regionsData);
    const [districts] = useState(districtsData);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [filteredDistricts, setFilteredDistricts] = useState([]);

    // Фильтрация районов при выборе области
    useEffect(() => {
        if (selectedRegion) {
            const filtered = districts.filter(district =>
                String(district.region_id) === String(selectedRegion)
            );
            setFilteredDistricts(filtered);
            setSelectedDistrict('');
        } else {
            setFilteredDistricts([]);
            setSelectedDistrict('');
        }
    }, [selectedRegion, districts]);

    // Обновление адреса при выборе области и района
    useEffect(() => {
        if (selectedRegion && selectedDistrict) {
            const region = regions.find(r => String(r.id) === String(selectedRegion));
            const district = districts.find(d => String(d.id) === String(selectedDistrict));

            if (region && district) {
                const address = `${district.name_ru}, ${region.name_ru}`;
                setRegistrationData(prev => ({
                    ...prev,
                    address: address
                }));
            }
        }
    }, [selectedRegion, selectedDistrict, regions, districts]);

    // Функция транслитерации кириллицы в латиницу
    const transliterateToLatin = (text) => {
        const cyrillicToLatin = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
            'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i',
            'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
            'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
            'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch',
            'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '',
            'э': 'e', 'ю': 'yu', 'я': 'ya',
            'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D',
            'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh', 'З': 'Z', 'И': 'I',
            'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
            'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T',
            'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch',
            'Ш': 'Sh', 'Щ': 'Sch', 'Ъ': '', 'Ы': 'Y', 'Ь': '',
            'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
        };

        return text.split('').map(char => cyrillicToLatin[char] || char).join('');
    };

    // Обработка выбора "У меня есть аккаунт"
    const handleHasAccount = () => {
        window.location.href = 'https://usdsoft.uz/login';
    };

    // Обработка выбора "Нет аккаунта"
    const handleNoAccount = () => {
        setCurrentStep(2);
    };

    // Обработчик изменения типа аккаунта
    const handleAccountTypeChange = (type) => {
        setAccountType(type);
        setRegistrationData(prev => ({
            ...prev,
            type: type
        }));
    };

    // Обработчик изменения данных регистрации
    const handleRegistrationChange = (e) => {
        const { name, value } = e.target;
        setRegistrationData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Обработчик изменения области
    const handleRegionChange = (e) => {
        const value = e.target.value;
        setSelectedRegion(value);
    };

    // Обработчик изменения района
    const handleDistrictChange = (e) => {
        const value = e.target.value;
        setSelectedDistrict(value);
    };

    // Генерация username на основе названия компании
    const generateUsername = (companyName) => {
        if (!companyName.trim()) return '';

        let username = transliterateToLatin(companyName.toLowerCase())
            .replace(/[^a-z0-9]/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_|_$/g, '');

        return username.substring(0, 20);
    };

    // Автогенерация username при изменении названия компании
    useEffect(() => {
        if (accountType === 'company' && registrationData.name && !registrationData.username) {
            const username = generateUsername(registrationData.name);
            setRegistrationData(prev => ({
                ...prev,
                username: username
            }));
        }
    }, [registrationData.name, accountType]);

    // Отправка формы регистрации
    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();

        // Валидация с SweetAlert2
        if (!registrationData.name.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Внимание',
                text: 'Пожалуйста, введите название компании/магазина',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3b82f6',
                background: '#0f172a',
                color: '#fff',
                iconColor: '#f59e0b'
            });
            return;
        }

        if (!registrationData.full_name.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Внимание',
                text: 'Пожалуйста, введите ФИО контактного лица',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3b82f6',
                background: '#0f172a',
                color: '#fff',
                iconColor: '#f59e0b'
            });
            return;
        }

        if (!registrationData.phone.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Внимание',
                text: 'Пожалуйста, введите номер телефона',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3b82f6',
                background: '#0f172a',
                color: '#fff',
                iconColor: '#f59e0b'
            });
            return;
        }

        if (!registrationData.username.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Внимание',
                text: 'Пожалуйста, введите имя пользователя',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3b82f6',
                background: '#0f172a',
                color: '#fff',
                iconColor: '#f59e0b'
            });
            return;
        }

        if (!registrationData.password.trim() || registrationData.password.length < 6) {
            Swal.fire({
                icon: 'warning',
                title: 'Внимание',
                text: 'Пароль должен содержать минимум 6 символов',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3b82f6',
                background: '#0f172a',
                color: '#fff',
                iconColor: '#f59e0b'
            });
            return;
        }

        if (!selectedRegion || !selectedDistrict) {
            Swal.fire({
                icon: 'warning',
                title: 'Внимание',
                text: 'Пожалуйста, выберите область и район',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3b82f6',
                background: '#0f172a',
                color: '#fff',
                iconColor: '#f59e0b'
            });
            return;
        }

        Swal.fire({
            title: 'Регистрация...',
            text: 'Пожалуйста, подождите',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
            background: '#0f172a',
            color: '#fff'
        });

        try {
            const response = await axios.post('https://api.usderp.uz/crm/api/locations/web', registrationData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            Swal.close();
            setCurrentStep(3);

        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            Swal.close();

            let errorMessage = 'Произошла ошибка при регистрации. Пожалуйста, попробуйте снова.';
            let errorDetails = [];

            if (error.response) {
                if (error.response.data?.message) {
                    errorMessage = error.response.data.message;
                }
                if (error.response.data?.errors) {
                    const errors = error.response.data.errors;
                    Object.keys(errors).forEach(field => {
                        const fieldErrors = Array.isArray(errors[field]) ? errors[field] : [errors[field]];
                        fieldErrors.forEach(err => {
                            errorDetails.push(`<li class="text-left text-slate-300">• ${err}</li>`);
                        });
                    });
                }
                if (error.response.data?.error) {
                    errorMessage = error.response.data.error;
                }
                if (error.response.data?.detail) {
                    errorMessage = error.response.data.detail;
                }
            } else if (error.request) {
                errorMessage = 'Не удалось связаться с сервером. Проверьте подключение к интернету.';
            }

            Swal.fire({
                icon: 'error',
                title: 'Ошибка регистрации',
                html: `
                <div class="space-y-4">
                    <p class="text-slate-300 text-sm md:text-base">${errorMessage}</p>
                    ${errorDetails.length > 0 ? `
                        <div class="bg-slate-800/50 rounded-lg p-3 md:p-4">
                            <p class="text-slate-400 text-xs md:text-sm mb-2">Детали ошибок:</p>
                            <ul class="space-y-1 text-xs md:text-sm">
                                ${errorDetails.join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            `,
                confirmButtonText: 'Понятно',
                confirmButtonColor: '#3b82f6',
                background: '#0f172a',
                color: '#fff',
                iconColor: '#ef4444'
            });
        }
    };

    // Возврат к предыдущему шагу
    const handleBack = () => {
        if (currentStep === 2) {
            setCurrentStep(1);
        } else if (currentStep === 3) {
            setCurrentStep(2);
        }
    };

    return (
        <div className="mt-16 mb-24 px-3 sm:px-4 md:px-6">
            {/* Заголовок секции */}
            <div className="text-center mb-8 md:mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-full mb-4">
                    <ShoppingCart className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-white">Оформить заявку на товары</h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-lg px-2">
                    Для оформления заявки необходимо иметь аккаунт в системе
                </p>
            </div>

            {/* Прогресс-бар */}
            <div className="max-w-2xl mx-auto mb-6 md:mb-8 px-2">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className={`flex items-center gap-1 md:gap-2 ${currentStep >= 1 ? 'text-blue-400' : 'text-slate-500'}`}>
                        <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-500' : 'bg-slate-800'}`}>
                            <User className="w-3 h-3 md:w-4 md:h-4" />
                        </div>
                        <span className="text-xs md:text-sm font-medium hidden sm:block">Аккаунт</span>
                    </div>

                    <div className="flex-1 h-1 mx-2 md:mx-4 bg-slate-800">
                        <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: currentStep >= 2 ? '100%' : '0%' }}></div>
                    </div>

                    <div className={`flex items-center gap-1 md:gap-2 ${currentStep >= 2 ? 'text-blue-400' : 'text-slate-500'}`}>
                        <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-500' : 'bg-slate-800'}`}>
                            <Lock className="w-3 h-3 md:w-4 md:h-4" />
                        </div>
                        <span className="text-xs md:text-sm font-medium hidden sm:block">Регистрация</span>
                    </div>
                </div>
            </div>

            {/* Шаг 1: Проверка аккаунта */}
            {currentStep === 1 && (
                <div className="max-w-2xl mx-auto">
                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8">
                        <div className="text-center mb-6 md:mb-8">
                            <div className="inline-flex items-center justify-center p-3 md:p-4 bg-blue-500/10 rounded-full mb-3 md:mb-4">
                                <User className="w-8 h-8 md:w-12 md:h-12 text-blue-400" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Есть ли у вас аккаунт?</h3>
                            <p className="text-slate-400 text-sm md:text-base">
                                Для оформления заявки нужен аккаунт в системе
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            <button
                                onClick={handleHasAccount}
                                className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-blue-500/50 rounded-xl md:rounded-2xl p-4 md:p-6 transition-all duration-300 group"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-3 md:mb-4 group-hover:bg-green-500/20 transition-colors">
                                        <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-400" />
                                    </div>
                                    <h4 className="text-lg md:text-xl font-semibold text-white mb-1.5 md:mb-2">У меня есть аккаунт</h4>
                                    <p className="text-slate-400 text-xs md:text-sm">
                                        Войдите в существующий аккаунт для оформления заявки
                                    </p>
                                </div>
                            </button>

                            <button
                                onClick={handleNoAccount}
                                className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-blue-500/50 rounded-xl md:rounded-2xl p-4 md:p-6 transition-all duration-300 group"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-3 md:mb-4 group-hover:bg-blue-500/20 transition-colors">
                                        <Plus className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
                                    </div>
                                    <h4 className="text-lg md:text-xl font-semibold text-white mb-1.5 md:mb-2">Создать аккаунт</h4>
                                    <p className="text-slate-400 text-xs md:text-sm">
                                        Зарегистрируйтесь как новый клиент для работы с нами
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Шаг 2: Регистрация */}
            {currentStep === 2 && (
                <div className="max-w-3xl mx-auto">
                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-0 mb-6 md:mb-8">
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-1.5 md:mb-2">Регистрация аккаунта</h3>
                                <p className="text-slate-400 text-sm md:text-base">
                                    Заполните данные для создания нового аккаунта
                                </p>
                            </div>
                        </div>

                        {/* Выбор типа аккаунта */}
                        <div className="mb-6 md:mb-8">
                            <h4 className="text-base md:text-lg font-medium text-white mb-3 md:mb-4">Тип аккаунта</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                                <button
                                    type="button"
                                    onClick={() => handleAccountTypeChange('company')}
                                    className={`p-3 md:p-4 rounded-xl border transition-all duration-300 ${accountType === 'company'
                                        ? 'bg-blue-500/10 border-blue-500/50 ring-2 ring-blue-500/20'
                                        : 'bg-slate-800/30 border-slate-700 hover:border-slate-600'
                                        }`}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <Building2 className={`w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3 ${accountType === 'company' ? 'text-blue-400' : 'text-slate-400'}`} />
                                        <span className={`font-medium text-sm md:text-base ${accountType === 'company' ? 'text-white' : 'text-slate-300'}`}>Компания</span>
                                        <span className="text-xs text-slate-400 mt-0.5 md:mt-1">Строительная компания</span>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleAccountTypeChange('shop')}
                                    className={`p-3 md:p-4 rounded-xl border transition-all duration-300 ${accountType === 'shop'
                                        ? 'bg-blue-500/10 border-blue-500/50 ring-2 ring-blue-500/20'
                                        : 'bg-slate-800/30 border-slate-700 hover:border-slate-600'
                                        }`}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <Store className={`w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3 ${accountType === 'shop' ? 'text-blue-400' : 'text-slate-400'}`} />
                                        <span className={`font-medium text-sm md:text-base ${accountType === 'shop' ? 'text-white' : 'text-slate-300'}`}>Магазин</span>
                                        <span className="text-xs text-slate-400 mt-0.5 md:mt-1">Торговая точка</span>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleAccountTypeChange('builder')}
                                    className={`p-3 md:p-4 rounded-xl border transition-all duration-300 ${accountType === 'builder'
                                        ? 'bg-blue-500/10 border-blue-500/50 ring-2 ring-blue-500/20'
                                        : 'bg-slate-800/30 border-slate-700 hover:border-slate-600'
                                        }`}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <Hammer className={`w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3 ${accountType === 'builder' ? 'text-blue-400' : 'text-slate-400'}`} />
                                        <span className={`font-medium text-sm md:text-base ${accountType === 'builder' ? 'text-white' : 'text-slate-300'}`}>Строитель</span>
                                        <span className="text-xs text-slate-400 mt-0.5 md:mt-1">Частный специалист</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Форма регистрации */}
                        <form onSubmit={handleRegistrationSubmit} className="space-y-4 md:space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-slate-300 mb-1.5 md:mb-2">
                                        {accountType === 'company' ? 'Название компании *' :
                                            accountType === 'shop' ? 'Название магазина *' :
                                                'ФИО специалиста *'}
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={registrationData.name}
                                        onChange={handleRegistrationChange}
                                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-slate-500 text-sm md:text-base"
                                        placeholder={
                                            accountType === 'company' ? 'Например: СтройТех' :
                                                accountType === 'shop' ? 'Например: СтройМаркет' :
                                                    'Например: Иванов Иван Иванович'
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-slate-300 mb-1.5 md:mb-2">
                                        ФИО контактного лица *
                                    </label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={registrationData.full_name}
                                        onChange={handleRegistrationChange}
                                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-slate-500 text-sm md:text-base"
                                        placeholder="Иванов Иван Иванович"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-slate-300 mb-1.5 md:mb-2">
                                        Номер телефона *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={registrationData.phone}
                                        onChange={handleRegistrationChange}
                                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-slate-500 text-sm md:text-base"
                                        placeholder="+998 90 123 45 67"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-slate-300 mb-1.5 md:mb-2">
                                        Область *
                                    </label>
                                    <select
                                        value={selectedRegion}
                                        onChange={handleRegionChange}
                                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-sm md:text-base"
                                        required
                                    >
                                        <option value="">Выберите область</option>
                                        {regions.map(region => (
                                            <option key={region.id} value={region.id}>
                                                {region.name_ru}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-slate-300 mb-1.5 md:mb-2">
                                        Район *
                                    </label>
                                    <select
                                        value={selectedDistrict}
                                        onChange={handleDistrictChange}
                                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-sm md:text-base"
                                        required
                                        disabled={!selectedRegion}
                                    >
                                        <option value="">
                                            {selectedRegion ? 'Выберите район' : 'Сначала выберите область'}
                                        </option>
                                        {filteredDistricts.map(district => (
                                            <option key={district.id} value={district.id}>
                                                {district.name_ru}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-slate-300 mb-1.5 md:mb-2">
                                        Адрес (улица, дом)
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-500" />
                                        <input
                                            type="text"
                                            name="address"
                                            value={registrationData.address}
                                            onChange={handleRegistrationChange}
                                            className="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-slate-500 text-sm md:text-base"
                                            placeholder="Область и район будут добавлены автоматически"
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-slate-300 mb-1.5 md:mb-2">
                                        Имя пользователя *
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-500" />
                                        <input
                                            type="text"
                                            name="username"
                                            value={registrationData.username}
                                            onChange={handleRegistrationChange}
                                            className="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-slate-500 text-sm md:text-base"
                                            placeholder="Например: stroymarket"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-slate-300 mb-1.5 md:mb-2">
                                        Пароль *
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-500" />
                                        <input
                                            type="password"
                                            name="password"
                                            value={registrationData.password}
                                            onChange={handleRegistrationChange}
                                            className="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-slate-500 text-sm md:text-base"
                                            placeholder="Минимум 6 символов"
                                            minLength="6"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-0 pt-4 md:pt-6 border-t border-slate-800">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex items-center justify-center gap-1.5 md:gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-colors text-sm md:text-base w-full sm:w-auto"
                                >
                                    <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
                                    Назад
                                </button>

                                <button
                                    type="submit"
                                    className="flex items-center justify-center gap-1.5 md:gap-2 px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all text-sm md:text-base w-full sm:w-auto"
                                >
                                    Зарегистрироваться
                                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Шаг 3: Успешная регистрация */}
            {currentStep === 3 && (
                <div className="max-w-md mx-auto">
                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-8">
                        <div className="text-center mb-6 md:mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-green-500/10 rounded-full mb-4 md:mb-6">
                                <Check className="w-8 h-8 md:w-10 md:h-10 text-green-400" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Регистрация успешна!</h3>
                            <p className="text-slate-400 text-sm md:text-base">
                                Ваш аккаунт успешно создан
                            </p>
                        </div>

                        <div className="space-y-4 md:space-y-6">
                            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 md:p-6">
                                <div className="space-y-3 md:space-y-4">
                                    <div className="flex items-start gap-2 md:gap-3">
                                        <div className="p-1.5 md:p-2 bg-blue-500/10 rounded-lg">
                                            <User className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs md:text-sm text-slate-400 mb-0.5">Имя пользователя</p>
                                            <p className="text-white font-medium text-sm md:text-base">{registrationData.username}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2 md:gap-3">
                                        <div className="p-1.5 md:p-2 bg-green-500/10 rounded-lg">
                                            <Lock className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs md:text-sm text-slate-400 mb-0.5">Пароль</p>
                                            <p className="text-white font-medium text-sm md:text-base">••••••••</p>
                                        </div>
                                    </div>

                                    {registrationData.name && (
                                        <div className="flex items-start gap-2 md:gap-3">
                                            <div className="p-1.5 md:p-2 bg-amber-500/10 rounded-lg">
                                                {accountType === 'company' ? (
                                                    <Building2 className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
                                                ) : accountType === 'shop' ? (
                                                    <Store className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
                                                ) : (
                                                    <Hammer className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs md:text-sm text-slate-400 mb-0.5">
                                                    {accountType === 'company' ? 'Компания' :
                                                        accountType === 'shop' ? 'Магазин' : 'Специалист'}
                                                </p>
                                                <p className="text-white font-medium text-sm md:text-base">{registrationData.name}</p>
                                            </div>
                                        </div>
                                    )}

                                    {registrationData.address && (
                                        <div className="flex items-start gap-2 md:gap-3">
                                            <div className="p-1.5 md:p-2 bg-blue-500/10 rounded-lg">
                                                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs md:text-sm text-slate-400 mb-0.5">Адрес</p>
                                                <p className="text-white font-medium text-sm md:text-base">{registrationData.address}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3 md:space-y-4">
                                <p className="text-slate-300 text-center text-sm md:text-base">
                                    Теперь вы можете войти в свою учетную запись для оформления заявки
                                </p>

                                <button
                                    onClick={() => window.location.href = 'https://usdsoft.uz/login'}
                                    className="w-full flex items-center justify-center gap-2 md:gap-3 px-6 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-300 group text-sm md:text-base"
                                >
                                    <LogIn className="w-4 h-4 md:w-5 md:h-5" />
                                    <span>Войти в систему</span>
                                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <div className="text-center">
                                    <button
                                        onClick={handleBack}
                                        className="text-slate-400 hover:text-slate-300 text-xs md:text-sm transition-colors"
                                    >
                                        Вернуться к редактированию данных
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}