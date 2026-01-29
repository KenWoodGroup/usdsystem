'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, Package, CheckCircle, Send, SearchIcon, Loader2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
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

        // Популярные поисковые запросы (можно добавить больше)
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

        // Добавляем популярные запросы, которые начинаются с введенного текста
        popularQueries.forEach(query => {
            if (query.toLowerCase().startsWith(termLower) ||
                transliterateToLatin(query).toLowerCase().startsWith(termLower)) {
                suggestionsSet.add(query);
            }
        });

        return Array.from(suggestionsSet).slice(0, 5); // Ограничиваем 5 подсказками
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
                    // Используем структуру из API
                    const items = data.data;
                    const paginationData = data.pagination;

                    // Создаем уникальные продукты с помощью Map
                    const uniqueProducts = new Map();

                    items.forEach(item => {
                        // Создаем уникальный ключ на основе id и batch
                        const uniqueKey = `${item.product.id}-${item.batch || 'no-batch'}`;

                        // Если продукт с таким ключом еще не добавлен, добавляем
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

                    // Преобразуем Map обратно в массив
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

        // Генерируем подсказки
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

    // Обработчик изменения страницы (без автоматического скролла)
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

        // Валидация
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
            // Отправка данных на бэкенд с именами продуктов
            const response = await axios.post('https://api.usderp.uz/crm/api/offers', {
                full_name: formData.full_name,
                phone_number: formData.phone_number,
                products: formData.products // Отправляем массив имен продуктов
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

    return (
        <div className="mt-16 mb-24">
            {/* Заголовок секции */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-full mb-4">
                    <ShoppingCart className="w-8 h-8 text-blue-400" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">Оставить заявку на товары</h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    Найдите нужные строительные материалы по названию и оставьте заявку. Наш менеджер свяжется с вами для уточнения деталей.
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                {/* Форма в центре */}
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 mb-8">
                    {message && (
                        <div className={`mb-6 p-4 rounded-xl ${message.includes('✅') ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
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
                                <div className="flex items-center gap-2 mb-3">
                                    <Package className="w-5 h-5 text-blue-400" />
                                    <span className="text-sm font-medium text-slate-300">
                                        Выбрано товаров: {selectedProducts.length}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProducts.map((productName, index) => {
                                        const product = products.find(p => p.name === productName);
                                        return (
                                            <div
                                                key={`${productName}-${index}`}
                                                className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-2 rounded-lg"
                                            >
                                                <span className="text-sm text-blue-300">{productName}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleProductSelect(productName)}
                                                    className="text-blue-400 hover:text-blue-300 text-xs"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 px-6 rounded-xl font-medium text-white flex items-center justify-center gap-2 transition-all duration-300 ${isSubmitting
                                ? 'bg-blue-600/50 cursor-not-allowed'
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
                                    Отправить заявку
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Список продуктов снизу */}
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Поиск и выбор товаров</h3>
                            <p className="text-slate-400 text-sm">
                                Начните вводить название товара для поиска
                            </p>
                        </div>

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

                    {/* Состояние: до поиска */}
                    {!hasSearched && !isSearching && searchTerm.trim() === '' && (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center p-4 bg-slate-800/50 rounded-full mb-4">
                                <SearchIcon className="w-12 h-12 text-slate-500" />
                            </div>
                            <p className="text-slate-400 text-lg mb-2">Начните поиск товаров</p>
                            <p className="text-slate-500 text-sm">Введите название товара в поле поиска выше</p>
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
                                <p className="text-slate-400 text-sm">
                                    Страница {currentPage} из {totalPages}
                                </p>
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
                                                {/* Кнопка на первую страницу */}
                                                <button
                                                    onClick={() => handlePageChange(1)}
                                                    disabled={currentPage === 1}
                                                    className={`p-2 rounded-lg ${currentPage === 1
                                                        ? 'text-slate-600 cursor-not-allowed'
                                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                                        }`}
                                                    title="Первая страница"
                                                >
                                                    <ChevronsLeft className="w-5 h-5" />
                                                </button>

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

                                                {/* Кнопка на последнюю страницу */}
                                                <button
                                                    onClick={() => handlePageChange(totalPages)}
                                                    disabled={currentPage === totalPages}
                                                    className={`p-2 rounded-lg ${currentPage === totalPages
                                                        ? 'text-slate-600 cursor-not-allowed'
                                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                                        }`}
                                                    title="Последняя страница"
                                                >
                                                    <ChevronsRight className="w-5 h-5" />
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
                                    <p className="text-slate-500 text-sm mb-4">Попробуйте изменить поисковый запрос</p>

                                    {suggestions.length > 0 && (
                                        <div className="max-w-md mx-auto">
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
                                </div>
                            ) : null}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}