'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, Package, CheckCircle, Send, SearchIcon, Loader2, ChevronLeft, ChevronRight, Plus, X, Edit2 } from 'lucide-react';
import axios from 'axios';
import debounce from 'lodash/debounce';

export default function Offers() {
    const [formData, setFormData] = useState({
        full_name: '',
        phone_number: '',
        products: []
    });

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit, setLimit] = useState(15);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showManualAdd, setShowManualAdd] = useState(false);
    const [manualProduct, setManualProduct] = useState({
        name: '',
        quantity: '',
        unit: 'шт',
        notes: ''
    });

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

    // Функция транслитерации латиницы в кириллицу
    const transliterateToCyrillic = (text) => {
        const latinToCyrillic = {
            'a': 'а', 'b': 'б', 'v': 'в', 'g': 'г', 'd': 'д',
            'e': 'е', 'yo': 'ё', 'zh': 'ж', 'z': 'з', 'i': 'и',
            'y': 'й', 'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н',
            'o': 'о', 'p': 'п', 'r': 'р', 's': 'с', 't': 'т',
            'u': 'у', 'f': 'ф', 'h': 'х', 'ts': 'ц', 'ch': 'ч',
            'sh': 'ш', 'sch': 'щ', 'yu': 'ю', 'ya': 'я',
            'A': 'А', 'B': 'Б', 'V': 'В', 'G': 'Г', 'D': 'Д',
            'E': 'Е', 'Yo': 'Ё', 'Zh': 'Ж', 'Z': 'З', 'I': 'И',
            'Y': 'Й', 'K': 'К', 'L': 'Л', 'M': 'М', 'N': 'Н',
            'O': 'О', 'P': 'П', 'R': 'Р', 'S': 'С', 'T': 'Т',
            'U': 'У', 'F': 'Ф', 'H': 'Х', 'Ts': 'Ц', 'Ch': 'Ч',
            'Sh': 'Ш', 'Sch': 'Щ', 'Yu': 'Ю', 'Ya': 'Я'
        };

        let result = '';
        let i = 0;
        while (i < text.length) {
            // Проверяем двухбуквенные комбинации
            if (i + 1 < text.length) {
                const twoChars = text.substr(i, 2).toLowerCase();
                if (latinToCyrillic[twoChars]) {
                    const originalTwoChars = text.substr(i, 2);
                    const isUpperCase = originalTwoChars === originalTwoChars.toUpperCase();
                    const firstCharUpper = originalTwoChars[0] === originalTwoChars[0].toUpperCase();

                    let replacement = latinToCyrillic[twoChars];
                    if (isUpperCase) {
                        replacement = replacement.toUpperCase();
                    } else if (firstCharUpper) {
                        replacement = replacement.charAt(0).toUpperCase() + replacement.slice(1);
                    }

                    result += replacement;
                    i += 2;
                    continue;
                }
            }

            // Проверяем однобуквенные комбинации
            const char = text[i].toLowerCase();
            if (latinToCyrillic[char]) {
                const originalChar = text[i];
                if (originalChar === originalChar.toUpperCase()) {
                    result += latinToCyrillic[char].toUpperCase();
                } else {
                    result += latinToCyrillic[char];
                }
            } else {
                result += text[i];
            }
            i++;
        }
        return result;
    };

    // Генерация подсказок на основе ввода
    const generateSuggestions = (term) => {
        if (!term.trim() || term.length < 2) {
            return [];
        }

        const termLower = term.toLowerCase();
        const suggestionsSet = new Set();

        // Добавляем оригинальный запрос
        suggestionsSet.add(term);

        // Транслитерация из кириллицы в латиницу
        const latinTransliteration = transliterateToLatin(term);
        if (latinTransliteration !== term) {
            suggestionsSet.add(latinTransliteration);
        }

        // Транслитерация из латиницы в кириллицу
        const cyrillicTransliteration = transliterateToCyrillic(term);
        if (cyrillicTransliteration !== term) {
            suggestionsSet.add(cyrillicTransliteration);
        }

        // Популярные поисковые запросы
        const popularQueries = [
            'краска',
            'лак',
            'шпаклевка',
            'грунтовка',
            'цемент',
            'песок',
            'кирпич',
            'доска',
            'бетон',
            'арматура',
            'изоляция',
            'плитка',
            'клей',
            'гипсокартон',
            'профиль',
            'саморез',
            'дюбель',
            'краскораспылитель',
            'валик',
            'кисть'
        ];

        popularQueries.forEach(query => {
            if (query.toLowerCase().startsWith(termLower) ||
                transliterateToLatin(query).toLowerCase().startsWith(termLower)) {
                suggestionsSet.add(query);
            }
        });

        return Array.from(suggestionsSet).slice(0, 5);
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
                setSuggestions([]);
                return;
            }

            setIsSearching(true);
            try {
                const response = await axios.get(`https://api.usderp.uz/crm/api/stock/by-name/product/${term}/?page=${page}`);
                const data = response.data;

                if (data.data && Array.isArray(data.data) && data.pagination) {
                    const items = data.data;
                    const paginationData = data.pagination;

                    const uniqueProducts = new Map();
                    items.forEach(item => {
                        const uniqueKey = `${item.product.id}-${item.batch || 'no-batch'}`;
                        if (!uniqueProducts.has(uniqueKey)) {
                            uniqueProducts.set(uniqueKey, {
                                id: uniqueKey,
                                product_id: item.product.id,
                                name: item.product.name,
                                unit: item.product.unit,
                                quantity: item.quantity,
                                purchase_price: item.purchase_price,
                                barcode: item.barcode,
                                batch: item.batch,
                                category: item.category?.name || 'Без категории'
                            });
                        }
                    });

                    const formattedProducts = Array.from(uniqueProducts.values());
                    setProducts(formattedProducts);
                    setTotalItems(paginationData.totalCount);
                    setTotalPages(paginationData.totalPages);
                    setCurrentPage(paginationData.currentPage);
                    setLimit(paginationData.limit);
                    setHasSearched(true);
                } else {
                    setProducts([]);
                    setTotalItems(0);
                    setTotalPages(1);
                    setHasSearched(true);
                }
            } catch (error) {
                console.error('Ошибка при поиске:', error);
                setMessage('❌ Ошибка при поиске товаров');
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

        const newSuggestions = generateSuggestions(value);
        setSuggestions(newSuggestions);
        setShowSuggestions(newSuggestions.length > 0);

        if (value.trim()) {
            setCurrentPage(1);
            searchProducts(value, 1);
        } else {
            setProducts([]);
            setHasSearched(false);
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    // Обработчик выбора подсказки
    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion);
        setShowSuggestions(false);
        setCurrentPage(1);
        searchProducts(suggestion, 1);
    };

    // Обработчик изменения страницы
    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages || page === currentPage) return;
        setCurrentPage(page);
        searchProducts(searchTerm, page);
    };

    // Обработчик изменения полей формы
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
            setMessage('❌ Введите название товара');
            return;
        }

        const productString = manualProduct.quantity && manualProduct.quantity.trim() && manualProduct.unit
            ? `${manualProduct.name} (${manualProduct.quantity} ${manualProduct.unit}${manualProduct.notes ? ` - ${manualProduct.notes}` : ''})`
            : manualProduct.name;

        if (!selectedProducts.includes(productString)) {
            setSelectedProducts(prev => [...prev, productString]);
            setMessage('✅ Товар добавлен вручную');

            // Сброс формы
            setManualProduct({
                name: '',
                quantity: '',
                unit: 'шт',
                notes: ''
            });
            setShowManualAdd(false);
        } else {
            setMessage('⚠️ Этот товар уже добавлен');
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
        // Разбираем строку продукта на составляющие
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

    // Обновляем products в formData при изменении selectedProducts
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            products: selectedProducts
        }));
    }, [selectedProducts]);

    // Обработчик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.full_name.trim()) {
            setMessage('Пожалуйста, введите ваше имя');
            return;
        }

        if (!formData.phone_number.trim()) {
            setMessage('Пожалуйста, введите номер телефона');
            return;
        }

        if (formData.products.length === 0) {
            setMessage('Пожалуйста, выберите хотя бы один продукт');
            return;
        }

        setIsSubmitting(true);
        setMessage('');

        try {
            const response = await axios.post('https://api.usderp.uz/crm/api/offers', {
                full_name: formData.full_name,
                phone_number: formData.phone_number,
                products: formData.products
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                setMessage('✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');

                // Сброс формы
                setFormData({
                    full_name: '',
                    phone_number: '',
                    products: []
                });
                setSelectedProducts([]);
                setSearchTerm('');
                setProducts([]);
                setHasSearched(false);
                setCurrentPage(1);
                setTotalPages(1);
                setTotalItems(0);
                setLimit(15);
                setSuggestions([]);
                setShowSuggestions(false);
                setManualProduct({
                    name: '',
                    quantity: '',
                    unit: 'шт',
                    notes: ''
                });
                setShowManualAdd(false);
            } else {
                throw new Error('Ошибка при отправке');
            }

        } catch (error) {
            console.error('Ошибка при отправке:', error);
            setMessage('❌ Ошибка при отправке заявки. Попробуйте снова.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Закрытие подсказок при клике вне области
    useEffect(() => {
        const handleClickOutside = (event) => {
            const searchContainer = document.querySelector('.search-container');
            if (searchContainer && !searchContainer.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

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
        <div className="mt-16 mb-24">
            {/* Заголовок секции */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-full mb-4">
                    <ShoppingCart className="w-8 h-8 text-blue-400" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">Оставить заявку на товары</h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    Найдите нужные строительные материалы или добавьте свои вручную. Наш менеджер свяжется с вами для уточнения деталей.
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                {/* Форма в центре */}
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 mb-8">
                    {message && (
                        <div className={`mb-6 p-4 rounded-xl ${message.includes('✅') ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' :
                            message.includes('⚠️') ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400' :
                                'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
                            <div className="flex items-center gap-2">
                                {message.includes('✅') ? <CheckCircle className="w-5 h-5" /> : null}
                                <span>{message}</span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="full_name">
                                    Полное имя *
                                </label>
                                <input
                                    type="text"
                                    id="full_name"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-slate-500"
                                    placeholder="Иван Иванов"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="phone_number">
                                    Номер телефона *
                                </label>
                                <input
                                    type="tel"
                                    id="phone_number"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-slate-500"
                                    placeholder="+998 90 123 45 67"
                                    required
                                />
                            </div>
                        </div>

                        {/* Выбранные продукты */}
                        {selectedProducts.length > 0 && (
                            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <Package className="w-5 h-5 text-blue-400" />
                                        <span className="text-sm font-medium text-slate-300">
                                            Выбрано товаров: {selectedProducts.length}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowManualAdd(!showManualAdd)}
                                        className="flex items-center gap-2 text-sm px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 rounded-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Добавить вручную
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {selectedProducts.map((productName, index) => {
                                        const isManual = isManualProduct(productName);
                                        return (
                                            <div
                                                key={`${productName}-${index}`}
                                                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isManual
                                                    ? 'bg-amber-500/10 border border-amber-500/20'
                                                    : 'bg-blue-500/10 border border-blue-500/20'
                                                    }`}
                                            >
                                                {isManual ? (
                                                    <Edit2 className="w-3 h-3 text-amber-400" />
                                                ) : (
                                                    <Package className="w-3 h-3 text-blue-400" />
                                                )}
                                                <span className={`text-sm ${isManual ? 'text-amber-300' : 'text-blue-300'}`}>
                                                    {productName}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    {isManual && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleEditManualProduct(productName)}
                                                            className="text-amber-400 hover:text-amber-300 text-xs p-0.5"
                                                            title="Редактировать"
                                                        >
                                                            <Edit2 className="w-3 h-3" />
                                                        </button>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveProduct(productName)}
                                                        className="text-slate-400 hover:text-red-400 text-xs p-0.5"
                                                        title="Удалить"
                                                    >
                                                        <X className="w-3 h-3" />
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
                            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 animate-fadeIn">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Plus className="w-5 h-5 text-blue-400" />
                                        <span className="text-sm font-medium text-slate-300">
                                            Добавление товара вручную
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowManualAdd(false)}
                                        className="text-slate-400 hover:text-white p-1"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Название товара *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={manualProduct.name}
                                            onChange={handleManualProductChange}
                                            className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-slate-500"
                                            placeholder="Например: Специальный раствор для кладки"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Количество
                                            </label>
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={manualProduct.quantity}
                                                onChange={handleManualProductChange}
                                                className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-slate-500"
                                                placeholder="10"
                                                min="0"
                                                step="0.01"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Единица измерения
                                            </label>
                                            <select
                                                name="unit"
                                                value={manualProduct.unit}
                                                onChange={handleManualProductChange}
                                                className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
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
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Примечания (необязательно)
                                        </label>
                                        <input
                                            type="text"
                                            name="notes"
                                            value={manualProduct.notes}
                                            onChange={handleManualProductChange}
                                            className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-slate-500"
                                            placeholder="Например: определенный цвет, марка, размер"
                                        />
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={handleAddManualProduct}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Добавить товар
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowManualAdd(false)}
                                            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl font-medium transition-colors"
                                        >
                                            Отмена
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!showManualAdd && selectedProducts.length === 0 && (
                            <div className="text-center py-4">
                                <button
                                    type="button"
                                    onClick={() => setShowManualAdd(true)}
                                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Не нашли нужный товар? Добавьте его вручную
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting || selectedProducts.length === 0}
                            className={`w-full py-4 px-6 rounded-xl font-medium text-white flex items-center justify-center gap-2 transition-all duration-300 ${isSubmitting || selectedProducts.length === 0
                                ? 'bg-blue-600/30 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/20'
                                }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Отправка...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Отправить заявку ({selectedProducts.length} товаров)
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Список продуктов снизу */}
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Поиск товаров в каталоге</h3>
                            <p className="text-slate-400 text-sm">
                                Начните вводить название товара для поиска в базе
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            

                            <div className="relative search-container">
                                <div className="relative">
                                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="Поиск товаров по названию..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        onFocus={() => {
                                            if (suggestions.length > 0) {
                                                setShowSuggestions(true);
                                            }
                                        }}
                                        className="w-full md:w-80 pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-slate-500"
                                    />
                                    {isSearching && (
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                                        </div>
                                    )}
                                </div>

                                {/* Подсказки */}
                                {showSuggestions && suggestions.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-700 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                                        <div className="p-2">
                                            <div className="text-xs text-slate-400 px-3 py-2 mb-1 border-b border-slate-700">
                                                Возможно вы ищете:
                                            </div>
                                            {suggestions.map((suggestion, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => handleSuggestionClick(suggestion)}
                                                    className="w-full text-left px-3 py-2 hover:bg-slate-700/50 rounded-lg text-slate-300 hover:text-white transition-colors flex items-center gap-2"
                                                >
                                                    <SearchIcon className="w-3 h-3 text-slate-500" />
                                                    {suggestion}
                                                    {suggestion !== searchTerm && (
                                                        <span className="text-xs text-slate-500 ml-auto">
                                                            {suggestion === transliterateToLatin(searchTerm) ? 'латиница' :
                                                                suggestion === transliterateToCyrillic(searchTerm) ? 'кириллица' :
                                                                    'подсказка'}
                                                        </span>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Состояние: до поиска */}
                    {!hasSearched && !isSearching && searchTerm.trim() === '' && (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center p-4 bg-slate-800/50 rounded-full mb-4">
                                <SearchIcon className="w-12 h-12 text-slate-500" />
                            </div>
                            <p className="text-slate-400 text-lg mb-2">Начните поиск товаров</p>
                            <p className="text-slate-500 text-sm mb-4">Введите название товара в поле поиска выше</p>
                            <button
                                type="button"
                                onClick={() => setShowManualAdd(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Или добавьте товар вручную
                            </button>
                        </div>
                    )}

                    {/* Состояние: поиск */}
                    {isSearching && (
                        <div className="text-center py-12">
                            <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
                            <p className="text-slate-400">Поиск товаров...</p>
                        </div>
                    )}

                    {/* Состояние: результаты поиска */}
                    {hasSearched && !isSearching && (
                        <>
                            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <p className="text-slate-300">
                                    Найдено товаров: <span className="text-blue-400 font-medium">{totalItems}</span>
                                    {limit && (
                                        <span className="text-slate-500 text-sm ml-2">
                                            (по {limit} на странице)
                                        </span>
                                    )}
                                </p>

                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowManualAdd(true)}
                                        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors"
                                    >
                                        <Plus className="w-3 h-3" />
                                        Не нашли? Добавьте вручную
                                    </button>

                                    <p className="text-slate-400 text-sm">
                                        Страница {currentPage} из {totalPages}
                                    </p>
                                </div>
                            </div>

                            {products.length > 0 ? (
                                <>
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                        {products.map((product, index) => (
                                            <div
                                                key={product.id}
                                                onClick={() => handleProductSelect(product.name)}
                                                className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-300 ${selectedProducts.includes(product.name)
                                                    ? 'bg-blue-500/10 border-blue-500/50 ring-2 ring-blue-500/20'
                                                    : 'bg-slate-800/30 border-slate-700 hover:border-slate-600 hover:bg-slate-800/50'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${selectedProducts.includes(product.name)
                                                        ? 'bg-blue-500 border-blue-500'
                                                        : 'border-slate-600'
                                                        }`}>
                                                        {selectedProducts.includes(product.name) && (
                                                            <CheckCircle className="w-4 h-4 text-white" />
                                                        )}
                                                    </div>
                                                    <div className="text-xs px-2 py-1 bg-slate-700/50 rounded text-slate-300">
                                                        {product.unit}
                                                    </div>
                                                </div>

                                                <h4 className="font-medium text-white mb-2">
                                                    {product?.category && `${product.category} / `}
                                                    {product.name}
                                                </h4>

                                                <div className="space-y-1 mb-3">
                                                    <p className="text-sm text-blue-400 font-medium">
                                                        Цена: {formatPrice(product.purchase_price)}
                                                    </p>
                                                </div>

                                                {selectedProducts.includes(product.name) && (
                                                    <div className="absolute -top-2 -right-2">
                                                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                                            <ShoppingCart className="w-3 h-3 text-white" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Пагинация */}
                                    {totalPages > 1 && (
                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
                                            <div className="text-sm text-slate-400">
                                                Показано {products.length} из {totalItems} товаров
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {/* Кнопка на предыдущую страницу */}
                                                <button
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                    className={`p-2 rounded-lg ${currentPage === 1
                                                        ? 'text-slate-600 cursor-not-allowed'
                                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                                        }`}
                                                    title="Предыдущая страница"
                                                >
                                                    <ChevronLeft className="w-5 h-5" />
                                                </button>

                                                {/* Номера страниц */}
                                                <div className="flex items-center gap-1">
                                                    {getPageNumbers().map(pageNum => (
                                                        <button
                                                            key={pageNum}
                                                            onClick={() => handlePageChange(pageNum)}
                                                            className={`w-10 h-10 flex items-center justify-center rounded-lg ${currentPage === pageNum
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
                                                    className={`p-2 rounded-lg ${currentPage === totalPages
                                                        ? 'text-slate-600 cursor-not-allowed'
                                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                                        }`}
                                                    title="Следующая страница"
                                                >
                                                    <ChevronRight className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={currentPage}
                                                    onChange={(e) => handlePageChange(parseInt(e.target.value))}
                                                    className="bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                <div className="text-center py-12">
                                    <div className="inline-flex items-center justify-center p-4 bg-slate-800/50 rounded-full mb-4">
                                        <SearchIcon className="w-12 h-12 text-slate-500" />
                                    </div>
                                    <p className="text-slate-400 text-lg mb-2">Товары не найдены</p>
                                    <p className="text-slate-500 text-sm mb-6">Попробуйте изменить поисковый запрос или добавьте товар вручную</p>

                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        {suggestions.length > 0 && (
                                            <div>
                                                <p className="text-slate-400 mb-2">Возможно вы имели в виду:</p>
                                                <div className="flex flex-wrap gap-2 justify-center">
                                                    {suggestions.slice(0, 3).map((suggestion, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => handleSuggestionClick(suggestion)}
                                                            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors"
                                                        >
                                                            {suggestion}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-4 sm:mt-0">
                                            <button
                                                type="button"
                                                onClick={() => setShowManualAdd(true)}
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all"
                                            >
                                                <Plus className="w-5 h-5" />
                                                Добавить товар вручную
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </>
                    )}
                </div>
            </div>

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
            `}</style>
        </div>
    );
}