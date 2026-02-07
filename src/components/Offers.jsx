'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, Package, CheckCircle, SearchIcon, Loader2, ChevronLeft, ChevronRight, Plus, X, Edit2, Building2, Store, Hammer, User, Mail, MapPin, Lock, LogIn, Check, ArrowRight } from 'lucide-react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import Swal from 'sweetalert2';

// Импортируем данные об областях и районах
import { regionsData } from '../app/regions/regions';
import { districtsData } from '../app/regions/districts'

export default function Offers() {
    // Шаг 1: Выбор товаров
    const [currentStep, setCurrentStep] = useState(1); // 1: выбор товаров, 2: проверка аккаунта, 3: регистрация, 4: успех
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit, setLimit] = useState(15);
    const [showManualAdd, setShowManualAdd] = useState(false);
    const [manualProduct, setManualProduct] = useState({
        name: '',
        quantity: '',
        unit: 'шт',
        notes: ''
    });

    // Шаг 3: Форма регистрации
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
            setSelectedDistrict(''); // Сбрасываем выбранный район при смене области
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

    // Функция поиска продуктов с пагинацией
    const searchProducts = useCallback(
        debounce(async (term, page = 1) => {
            if (!term.trim()) {
                setProducts([]);
                setHasSearched(false);
                setTotalPages(1);
                setTotalItems(0);
                setCurrentPage(1);
                return;
            }

            setIsSearching(true);
            try {
                const response = await axios.get(`https://api.usderp.uz/crm/api/stock/by-name/product/${term}/?page=${page}`);
                const data = response.data;

                if (data?.data && Array.isArray(data.data) && data.pagination) {
                    const items = data.data;
                    const paginationData = data.pagination;

                    const formattedProducts = items.map(item => ({
                        id: item.id,
                        product_id: item.product.id,
                        name: item.product.name,
                        unit: item.product.unit,
                        quantity: Number(item.quantity),
                        purchase_price: Number(item.purchase_price),
                        barcode: item.barcode,
                        batch: item.batch,
                        category: item.product.category?.name || 'Без категории',
                        location_id: item.location_id,
                        fixed_quantity: item.fixed_quantity,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt,
                    }));

                    setProducts(formattedProducts);
                    setTotalItems(paginationData.totalCount);
                    setTotalPages(paginationData.totalPages);
                    setCurrentPage(paginationData.currentPage);
                    setLimit(paginationData.limit);
                    setHasSearched(true);
                }
                else {
                    setProducts([]);
                    setTotalItems(0);
                    setTotalPages(1);
                    setHasSearched(true);
                }
            } catch (error) {
                console.error('Ошибка при поиске:', error);
                setProducts([]);
                setTotalItems(0);
                setTotalPages(1);
                setHasSearched(true);
            } finally {
                setIsSearching(false);
            }
        }, 500),
        []
    );

    // Обработчик изменения поискового запроса
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim()) {
            setCurrentPage(1);
            searchProducts(value, 1);
        } else {
            setProducts([]);
            setHasSearched(false);
        }
    };

    // Обработчик изменения страницы
    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages || page === currentPage) return;
        setCurrentPage(page);
        searchProducts(searchTerm, page);
    };

    // Обработчик изменения ручного ввода продукта
    const handleManualProductChange = (e) => {
        const { name, value } = e.target;
        setManualProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Добавление товара вручную
    const handleAddManualProduct = () => {
        if (!manualProduct.name.trim()) {
            return;
        }

        const productString = manualProduct.quantity && manualProduct.quantity.trim() && manualProduct.unit
            ? `${manualProduct.name} (${manualProduct.quantity} ${manualProduct.unit}${manualProduct.notes ? ` - ${manualProduct.notes}` : ''})`
            : manualProduct.name;

        if (!selectedProducts.includes(productString)) {
            setSelectedProducts(prev => [...prev, productString]);

            // Сброс формы
            setManualProduct({
                name: '',
                quantity: '',
                unit: 'шт',
                notes: ''
            });
            setShowManualAdd(false);
        }
    };

    // Обработчик выбора/отмены выбора продукта
    const handleProductSelect = (productName) => {
        setSelectedProducts(prev => {
            if (prev.includes(productName)) {
                return prev.filter(name => name !== productName);
            } else {
                return [...prev, productName];
            }
        });
    };

    // Удаление продукта из выбранных
    const handleRemoveProduct = (productName) => {
        setSelectedProducts(prev => prev.filter(name => name !== productName));
    };

    // Редактирование ручного продукта
    const handleEditManualProduct = (productString) => {
        const match = productString.match(/^(.*?)(?:\s*\((\d+(?:\.\d+)?)\s*(\S+)(?:\s*-\s*(.*))?\))?$/);

        if (match) {
            const [, name, quantity, unit, notes] = match;
            setManualProduct({
                name: name.trim(),
                quantity: quantity || '',
                unit: unit || 'шт',
                notes: notes || ''
            });
            setShowManualAdd(true);
            handleRemoveProduct(productString);
        }
    };

    // Форматирование цены
    const formatPrice = (price) => {
        if (!price) return 'Цена не указана';
        return `${parseInt(price).toLocaleString('ru-RU')} сум`;
    };

    // Переход к следующему шагу
    const handleNextStep = () => {
        if (selectedProducts.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Внимание',
                text: 'Пожалуйста, выберите хотя бы один товар',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3b82f6',
                background: '#0f172a',
                color: '#fff',
                iconColor: '#f59e0b'
            });
            return;
        }
        setCurrentStep(2);
    };

    // Обработка выбора "У меня есть аккаунт"
    const handleHasAccount = () => {
        // Перенаправление на URL для существующих пользователей
        window.location.href = 'https://app.usderp.uz/login?redirect=offer';
    };

    // Обработка выбора "Нет аккаунта"
    const handleNoAccount = () => {
        setCurrentStep(3);
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

        // Транслитерация и очистка от спецсимволов
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
                iconColor: '#f59e0b',
                customClass: {
                    popup: 'swal-popup-responsive'
                }
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
                iconColor: '#f59e0b',
                customClass: {
                    popup: 'swal-popup-responsive'
                }
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
                iconColor: '#f59e0b',
                customClass: {
                    popup: 'swal-popup-responsive'
                }
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
                iconColor: '#f59e0b',
                customClass: {
                    popup: 'swal-popup-responsive'
                }
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
                iconColor: '#f59e0b',
                customClass: {
                    popup: 'swal-popup-responsive'
                }
            });
            return;
        }

        // Проверка адреса (области и района)
        if (!selectedRegion || !selectedDistrict) {
            Swal.fire({
                icon: 'warning',
                title: 'Внимание',
                text: 'Пожалуйста, выберите область и район',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3b82f6',
                background: '#0f172a',
                color: '#fff',
                iconColor: '#f59e0b',
                customClass: {
                    popup: 'swal-popup-responsive'
                }
            });
            return;
        }

        // Показываем лоадер
        Swal.fire({
            title: 'Регистрация...',
            text: 'Пожалуйста, подождите',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
            background: '#0f172a',
            color: '#fff',
            customClass: {
                popup: 'swal-popup-responsive'
            }
        });

        try {
            // Отправка данных регистрации
            const response = await axios.post('https://api.usderp.uz/crm/api/locations/web', registrationData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Закрываем лоадер
            Swal.close();

            // Успешная регистрация - переходим к шагу 4
            setCurrentStep(4);

        } catch (error) {
            console.error('Ошибка при регистрации:', error);

            // Закрываем лоадер
            Swal.close();

            // Формируем сообщение об ошибке
            let errorMessage = 'Произошла ошибка при регистрации. Пожалуйста, попробуйте снова.';
            let errorDetails = [];

            // Обрабатываем различные форматы ошибок от backend
            if (error.response) {
                // Если есть response.data.message
                if (error.response.data?.message) {
                    errorMessage = error.response.data.message;
                }

                // Если есть response.data.errors (объект с полями и ошибками)
                if (error.response.data?.errors) {
                    const errors = error.response.data.errors;

                    // Формируем список ошибок по полям
                    Object.keys(errors).forEach(field => {
                        const fieldErrors = Array.isArray(errors[field]) ? errors[field] : [errors[field]];
                        fieldErrors.forEach(err => {
                            errorDetails.push(`<li class="text-left text-slate-300">• ${err}</li>`);
                        });
                    });
                }

                // Если есть response.data.error (одна строка ошибки)
                if (error.response.data?.error) {
                    errorMessage = error.response.data.error;
                }

                // Если есть response.data.detail
                if (error.response.data?.detail) {
                    errorMessage = error.response.data.detail;
                }
            } else if (error.request) {
                // Запрос был отправлен, но ответ не получен
                errorMessage = 'Не удалось связаться с сервером. Проверьте подключение к интернету.';
            }

            // Показываем ошибку
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
                iconColor: '#ef4444',
                width: '90%',
                customClass: {
                    popup: 'swal-popup-responsive max-w-md',
                    htmlContainer: 'text-left'
                }
            });
        }
    };

    // Возврат к предыдущему шагу
    const handleBack = () => {
        if (currentStep === 2) {
            setCurrentStep(1);
        } else if (currentStep === 3) {
            setCurrentStep(2);
        } else if (currentStep === 4) {
            setCurrentStep(3);
        }
    };

    // Генерация номеров страниц для отображения
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, currentPage + 2);

            if (currentPage <= 3) {
                endPage = Math.min(maxVisiblePages, totalPages);
            }

            if (currentPage >= totalPages - 2) {
                startPage = Math.max(1, totalPages - maxVisiblePages + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    // Проверяем, является ли продукт ручным добавлением
    const isManualProduct = (productString) => {
        return selectedProducts.includes(productString) &&
            !products.some(p => p.name === productString);
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
                    Выберите нужные строительные материалы и оформите заявку
                </p>
            </div>

            {/* Прогресс-бар */}
            <div className="max-w-2xl mx-auto mb-6 md:mb-8 px-2">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className={`flex items-center gap-1 md:gap-2 ${currentStep >= 1 ? 'text-blue-400' : 'text-slate-500'}`}>
                        <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-500' : 'bg-slate-800'}`}>
                            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                        </div>
                        <span className="text-xs md:text-sm font-medium hidden sm:block">Выбор товаров</span>
                    </div>

                    <div className="flex-1 h-1 mx-2 md:mx-4 bg-slate-800">
                        <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: currentStep >= 2 ? '100%' : '0%' }}></div>
                    </div>

                    <div className={`flex items-center gap-1 md:gap-2 ${currentStep >= 2 ? 'text-blue-400' : 'text-slate-500'}`}>
                        <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-500' : 'bg-slate-800'}`}>
                            <User className="w-3 h-3 md:w-4 md:h-4" />
                        </div>
                        <span className="text-xs md:text-sm font-medium hidden sm:block">Аккаунт</span>
                    </div>

                    <div className="flex-1 h-1 mx-2 md:mx-4 bg-slate-800">
                        <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: currentStep >= 3 ? '100%' : '0%' }}></div>
                    </div>

                    <div className={`flex items-center gap-1 md:gap-2 ${currentStep >= 3 ? 'text-blue-400' : 'text-slate-500'}`}>
                        <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-500' : 'bg-slate-800'}`}>
                            <Lock className="w-3 h-3 md:w-4 md:h-4" />
                        </div>
                        <span className="text-xs md:text-sm font-medium hidden sm:block">Регистрация</span>
                    </div>
                </div>
            </div>

            {/* Шаг 1: Выбор товаров */}
            {currentStep === 1 && (
                <div className="max-w-4xl mx-auto">
                    {/* Выбранные продукты */}
                    {selectedProducts.length > 0 && (
                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-6 mb-4 md:mb-6">
                                <div className="flex items-center gap-2 md:gap-3">
                                    <div className="p-1.5 md:p-2 bg-blue-500/10 rounded-lg">
                                        <Package className="w-4 h-4 md:w-6 md:h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-base md:text-lg font-medium text-white">Выбранные товары</h3>
                                        <p className="text-xs md:text-sm text-slate-400">
                                            {selectedProducts.length} товаров выбрано
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col xs:flex-row gap-2 md:gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowManualAdd(!showManualAdd)}
                                        className="flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors"
                                    >
                                        <Plus className="w-3 h-3 md:w-4 md:h-4" />
                                        Добавить вручную
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleNextStep}
                                        className="flex items-center justify-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all text-sm md:text-base"
                                    >
                                        Продолжить
                                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5 md:gap-2">
                                {selectedProducts.map((productName, index) => {
                                    const isManual = isManualProduct(productName);
                                    return (
                                        <div
                                            key={`${productName}-${index}`}
                                            className={`flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg ${isManual
                                                ? 'bg-amber-500/10 border border-amber-500/20'
                                                : 'bg-blue-500/10 border border-blue-500/20'
                                                }`}
                                        >
                                            {isManual ? (
                                                <Edit2 className="w-2.5 h-2.5 md:w-3 md:h-3 text-amber-400" />
                                            ) : (
                                                <Package className="w-2.5 h-2.5 md:w-3 md:h-3 text-blue-400" />
                                            )}
                                            <span className={`text-xs md:text-sm ${isManual ? 'text-amber-300' : 'text-blue-300'} truncate max-w-[120px] md:max-w-[200px]`}>
                                                {productName}
                                            </span>
                                            <div className="flex items-center gap-0.5 md:gap-1">
                                                {isManual && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEditManualProduct(productName)}
                                                        className="text-amber-400 hover:text-amber-300 text-xs p-0.5"
                                                        title="Редактировать"
                                                    >
                                                        <Edit2 className="w-2.5 h-2.5 md:w-3 md:h-3" />
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveProduct(productName)}
                                                    className="text-slate-400 hover:text-red-400 text-xs p-0.5"
                                                    title="Удалить"
                                                >
                                                    <X className="w-2.5 h-2.5 md:w-3 md:h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Форма добавления товара вручную */}
                    {showManualAdd && (
                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 mb-6 md:mb-8 animate-fadeIn">
                            <div className="flex items-center justify-between mb-4 md:mb-6">
                                <div className="flex items-center gap-2 md:gap-3">
                                    <div className="p-1.5 md:p-2 bg-blue-500/10 rounded-lg">
                                        <Plus className="w-4 h-4 md:w-6 md:h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-base md:text-lg font-medium text-white">Добавление товара вручную</h3>
                                        <p className="text-xs md:text-sm text-slate-400">
                                            Добавьте товар, которого нет в каталоге
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowManualAdd(false)}
                                    className="text-slate-400 hover:text-white p-1.5"
                                >
                                    <X className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                            </div>

                            <div className="space-y-3 md:space-y-4">
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-slate-300 mb-1.5 md:mb-2">
                                        Название товара *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={manualProduct.name}
                                        onChange={handleManualProductChange}
                                        className="w-full px-3 md:px-4 py-2 md:py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-slate-500 text-sm md:text-base"
                                        placeholder="Например: Специальный раствор для кладки"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                    <div>
                                        <label className="block text-xs md:text-sm font-medium text-slate-300 mb-1.5 md:mb-2">
                                            Количество
                                        </label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={manualProduct.quantity}
                                            onChange={handleManualProductChange}
                                            className="w-full px-3 md:px-4 py-2 md:py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-slate-500 text-sm md:text-base"
                                            placeholder="10"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs md:text-sm font-medium text-slate-300 mb-1.5 md:mb-2">
                                            Единица измерения
                                        </label>
                                        <select
                                            name="unit"
                                            value={manualProduct.unit}
                                            onChange={handleManualProductChange}
                                            className="w-full px-3 md:px-4 py-2 md:py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-sm md:text-base"
                                        >
                                            <option value="шт">шт</option>
                                            <option value="кг">кг</option>
                                            <option value="л">л</option>
                                            <option value="м">м</option>
                                            <option value="м²">м²</option>
                                            <option value="м³">м³</option>
                                            <option value="упак">упак</option>
                                            <option value="рулон">рулон</option>
                                            <option value="мешок">мешок</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-slate-300 mb-1.5 md:mb-2">
                                        Примечания (необязательно)
                                    </label>
                                    <input
                                        type="text"
                                        name="notes"
                                        value={manualProduct.notes}
                                        onChange={handleManualProductChange}
                                        className="w-full px-3 md:px-4 py-2 md:py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-slate-500 text-sm md:text-base"
                                        placeholder="Например: определенный цвет, марка, размер"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                                    <button
                                        type="button"
                                        onClick={handleAddManualProduct}
                                        className="flex-1 flex items-center justify-center gap-1.5 md:gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-colors text-sm md:text-base"
                                    >
                                        <Plus className="w-3 h-3 md:w-4 md:h-4" />
                                        Добавить товар
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowManualAdd(false)}
                                        className="flex-1 flex items-center justify-center px-4 md:px-6 py-2.5 md:py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-colors text-sm md:text-base"
                                    >
                                        Отмена
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Поиск товаров */}
                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6">
                            <div className="mb-3 md:mb-0">
                                <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">Поиск товаров в каталоге</h3>
                                <p className="text-xs md:text-sm text-slate-400">
                                    Начните вводить название товара для поиска в базе
                                </p>
                            </div>

                            <div className="w-full md:w-auto">
                                <div className="relative">
                                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="Поиск товаров по названию..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-slate-500 text-sm md:text-base"
                                    />
                                    {isSearching && (
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            <Loader2 className="w-3 h-3 md:w-4 md:h-4 text-blue-400 animate-spin" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Состояние: до поиска */}
                        {!hasSearched && !isSearching && searchTerm.trim() === '' && (
                            <div className="text-center py-8 md:py-12">
                                <div className="inline-flex items-center justify-center p-3 md:p-4 bg-slate-800/50 rounded-full mb-3 md:mb-4">
                                    <SearchIcon className="w-8 h-8 md:w-12 md:h-12 text-slate-500" />
                                </div>
                                <p className="text-slate-400 text-base md:text-lg mb-1.5 md:mb-2">Начните поиск товаров</p>
                                <p className="text-slate-500 text-xs md:text-sm mb-3 md:mb-4">Введите название товара в поле поиска выше</p>
                                <button
                                    type="button"
                                    onClick={() => setShowManualAdd(true)}
                                    className="inline-flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-colors text-sm md:text-base"
                                >
                                    <Plus className="w-3 h-3 md:w-4 md:h-4" />
                                    Добавить товар вручную
                                </button>
                            </div>
                        )}

                        {/* Состояние: поиск */}
                        {isSearching && (
                            <div className="text-center py-8 md:py-12">
                                <Loader2 className="w-8 h-8 md:w-12 md:h-12 text-blue-400 animate-spin mx-auto mb-3 md:mb-4" />
                                <p className="text-slate-400 text-sm md:text-base">Поиск товаров...</p>
                            </div>
                        )}

                        {/* Состояние: результаты поиска */}
                        {hasSearched && !isSearching && (
                            <>
                                <div className="mb-3 md:mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 md:gap-2">
                                    <p className="text-slate-300 text-sm md:text-base">
                                        Найдено товаров: <span className="text-blue-400 font-medium">{totalItems}</span>
                                        {limit && (
                                            <span className="text-slate-500 text-xs md:text-sm ml-1 md:ml-2">
                                                (по {limit} на странице)
                                            </span>
                                        )}
                                    </p>

                                    <div className="flex items-center gap-2 md:gap-3">
                                        <p className="text-slate-400 text-xs md:text-sm">
                                            Страница {currentPage} из {totalPages}
                                        </p>
                                    </div>
                                </div>

                                {products.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
                                            {products.map((product, index) => (
                                                <div
                                                    key={product.id}
                                                    onClick={() => handleProductSelect(product.name)}
                                                    className={`relative p-3 md:p-4 rounded-xl border cursor-pointer transition-all duration-300 ${selectedProducts.includes(product.name)
                                                        ? 'bg-blue-500/10 border-blue-500/50 ring-2 ring-blue-500/20'
                                                        : 'bg-slate-800/30 border-slate-700 hover:border-slate-600 hover:bg-slate-800/50'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between mb-2 md:mb-3">
                                                        <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border flex items-center justify-center ${selectedProducts.includes(product.name)
                                                            ? 'bg-blue-500 border-blue-500'
                                                            : 'border-slate-600'
                                                            }`}>
                                                            {selectedProducts.includes(product.name) && (
                                                                <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                                                            )}
                                                        </div>
                                                        <div className="text-xs px-1.5 md:px-2 py-0.5 md:py-1 bg-slate-700/50 rounded text-slate-300">
                                                            {product.unit}
                                                        </div>
                                                    </div>

                                                    <h4 className="font-medium text-white text-sm md:text-base mb-1.5 md:mb-2 ">
                                                        {product?.category && (
                                                            <span className="text-xs text-slate-400 block mb-0.5">
                                                                {product.category} /
                                                            </span>
                                                        )}
                                                        {product.name}
                                                    </h4>

                                                    <div className="space-y-1 mb-2 md:mb-3">
                                                        <p className="text-xs md:text-sm text-blue-400 font-medium">
                                                            Цена: {formatPrice(product.purchase_price)}
                                                        </p>
                                                    </div>

                                                    {selectedProducts.includes(product.name) && (
                                                        <div className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2">
                                                            <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                                                <ShoppingCart className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Пагинация */}
                                        {totalPages > 1 && (
                                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4 pt-4 md:pt-6 border-t border-slate-800">
                                                <div className="text-xs md:text-sm text-slate-400">
                                                    Показано {products.length} из {totalItems} товаров
                                                </div>

                                                <div className="flex items-center gap-1 md:gap-2">
                                                    {/* Кнопка на предыдущую страницу */}
                                                    <button
                                                        onClick={() => handlePageChange(currentPage - 1)}
                                                        disabled={currentPage === 1}
                                                        className={`p-1.5 md:p-2 rounded-lg ${currentPage === 1
                                                            ? 'text-slate-600 cursor-not-allowed'
                                                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                                            }`}
                                                        title="Предыдущая страница"
                                                    >
                                                        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                                                    </button>

                                                    {/* Номера страниц */}
                                                    <div className="flex items-center gap-0.5 md:gap-1">
                                                        {getPageNumbers().map(pageNum => (
                                                            <button
                                                                key={pageNum}
                                                                onClick={() => handlePageChange(pageNum)}
                                                                className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg text-sm ${currentPage === pageNum
                                                                    ? 'bg-blue-600 text-white'
                                                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                                                    }`}
                                                            >
                                                                {pageNum}
                                                            </button>
                                                        ))}
                                                    </div>

                                                    {/* Кнопка на следующую страницу */}
                                                    <button
                                                        onClick={() => handlePageChange(currentPage + 1)}
                                                        disabled={currentPage === totalPages}
                                                        className={`p-1.5 md:p-2 rounded-lg ${currentPage === totalPages
                                                            ? 'text-slate-600 cursor-not-allowed'
                                                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                                            }`}
                                                        title="Следующая страница"
                                                    >
                                                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                                                    </button>
                                                </div>

                                                <div className="hidden sm:block">
                                                    <select
                                                        value={currentPage}
                                                        onChange={(e) => handlePageChange(parseInt(e.target.value))}
                                                        className="bg-slate-800 border border-slate-700 text-white rounded-lg px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    >
                                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                                                            <option key={pageNum} value={pageNum}>
                                                                Страница {pageNum}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : searchTerm.trim() !== '' ? (
                                    <div className="text-center py-8 md:py-12">
                                        <div className="inline-flex items-center justify-center p-3 md:p-4 bg-slate-800/50 rounded-full mb-3 md:mb-4">
                                            <SearchIcon className="w-8 h-8 md:w-12 md:h-12 text-slate-500" />
                                        </div>
                                        <p className="text-slate-400 text-base md:text-lg mb-1.5 md:mb-2">Товары не найдены</p>
                                        <p className="text-slate-500 text-xs md:text-sm mb-4 md:mb-6">Попробуйте изменить поисковый запрос или добавьте товар вручную</p>

                                        <button
                                            type="button"
                                            onClick={() => setShowManualAdd(true)}
                                            className="inline-flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all text-sm md:text-base"
                                        >
                                            <Plus className="w-3 h-3 md:w-5 md:h-5" />
                                            Добавить товар вручную
                                        </button>
                                    </div>
                                ) : null}
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Шаг 2: Проверка аккаунта */}
            {currentStep === 2 && (
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

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
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

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-0 pt-4 md:pt-6 border-t border-slate-800">
                            <button
                                onClick={handleBack}
                                className="flex items-center justify-center gap-1.5 md:gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-colors text-sm md:text-base w-full sm:w-auto"
                            >
                                <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
                                Вернуться к выбору товаров
                            </button>

                            <div className="text-xs md:text-sm text-slate-400">
                                Выбрано товаров: {selectedProducts.length}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Шаг 3: Регистрация */}
            {currentStep === 3 && (
                <div className="max-w-3xl mx-auto">
                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-0 mb-6 md:mb-8">
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-1.5 md:mb-2">Регистрация аккаунта</h3>
                                <p className="text-slate-400 text-sm md:text-base">
                                    Заполните данные для создания нового аккаунта
                                </p>
                            </div>
                            <div className="text-xs md:text-sm text-slate-400">
                                Выбрано товаров: {selectedProducts.length}
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
                                    Зарегистрироваться и продолжить
                                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Шаг 4: Успешная регистрация */}
            {currentStep === 4 && (
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
                                    onClick={() => window.location.href = 'https://app.usderp.uz/login'}
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

                            <div className="pt-4 md:pt-6 border-t border-slate-800">
                                <p className="text-xs md:text-sm text-slate-500 text-center">
                                    Выбрано товаров: {selectedProducts.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }

                @media (max-width: 300px) {
                    .text-xs-responsive {
                        font-size: 0.625rem !important;
                    }
                    
                    .p-2-responsive {
                        padding: 0.5rem !important;
                    }
                    
                    .w-4-responsive {
                        width: 0.875rem !important;
                        height: 0.875rem !important;
                    }
                }

                /* Утилиты для адаптивности */
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}