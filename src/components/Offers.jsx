'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, Package, CheckCircle, Send, SearchIcon, Loader2 } from 'lucide-react';
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

    // Функция поиска продуктов
    const searchProducts = useCallback(
        debounce(async (term) => {
            if (!term.trim()) {
                setProducts([]);
                setHasSearched(false);
                return;
            }

            setIsSearching(true);
            try {
                const response = await axios.get(`https://api.usderp.uz/crm/api/stock/by-name/product/${term}`);
                const data = response.data;

                if (Array.isArray(data)) {
                    // Создаем уникальные продукты с помощью Map
                    const uniqueProducts = new Map();

                    data.forEach(item => {
                        // Создаем уникальный ключ на основе id и batch
                        const uniqueKey = `${item.product.id}-${item.batch || 'no-batch'}`;

                        // Если продукт с таким ключом еще не добавлен, добавляем
                        if (!uniqueProducts.has(uniqueKey)) {
                            uniqueProducts.set(uniqueKey, {
                                id: uniqueKey, // Используем уникальный ключ
                                product_id: item.product.id,
                                name: item.product.name,
                                unit: item.product.unit,
                                quantity: item.quantity,
                                purchase_price: item.purchase_price,
                                barcode: item.barcode,
                                batch: item.batch,
                                category: item.product.category_id || 'Без категории'
                            });
                        }
                    });

                    // Преобразуем Map обратно в массив
                    const formattedProducts = Array.from(uniqueProducts.values());
                    setProducts(formattedProducts);
                } else {
                    setProducts([]);
                }
                setHasSearched(true);
            } catch (error) {
                console.error('Ошибка при поиске:', error);
                setMessage('❌ Ошибка при поиске товаров');
                setProducts([]);
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
        searchProducts(value);
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

    // Получение выбранных продуктов для отображения
    const selectedProductDetails = selectedProducts.map(productName =>
        products.find(p => p.name === productName)
    ).filter(Boolean);

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
                                                key={`${productName}-${index}`} // Используем уникальный ключ
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

                        <div className="relative">
                            <div className="relative">
                                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Поиск товаров по названию..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-full md:w-80 pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-slate-500"
                                />
                                {isSearching && (
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Состояние: до поиска */}
                    {!hasSearched && !isSearching && (
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
                            <div className="mb-4">
                                <p className="text-slate-300">
                                    Найдено товаров: <span className="text-blue-400 font-medium">{products.length}</span>
                                </p>
                            </div>

                            {products.length > 0 ? (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {products.map((product, index) => (
                                        <div
                                            key={product.id} // Используем уникальный id из данных
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

                                            <h4 className="font-medium text-white mb-2">{product.name}</h4>

                                            <div className="space-y-1 mb-3">
                                                <p className="text-sm text-blue-400 font-medium">
                                                    Цена: {formatPrice(product.purchase_price)}
                                                </p>
                                                <p className="text-xs text-slate-400">
                                                    Количество: {product.quantity} {product.unit}
                                                </p>
                                                {product.batch && (
                                                    <p className="text-xs text-slate-500">
                                                        Партия: {product.batch}
                                                    </p>
                                                )}
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
                            ) : (
                                <div className="text-center py-12">
                                    <div className="inline-flex items-center justify-center p-4 bg-slate-800/50 rounded-full mb-4">
                                        <SearchIcon className="w-12 h-12 text-slate-500" />
                                    </div>
                                    <p className="text-slate-400 text-lg mb-2">Товары не найдены</p>
                                    <p className="text-slate-500 text-sm">Попробуйте изменить поисковый запрос</p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Информация о формате данных */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-500">
                        Данные отправляются в формате:{' '}
                        <code className="bg-slate-800 px-2 py-1 rounded text-slate-300 text-xs">
                            {"{full_name, phone_number, products: ['Название товара 1', 'Название товара 2']}"}
                        </code>
                    </p>
                </div>
            </div>
        </div>
    );
}