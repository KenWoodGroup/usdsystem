'use client';

import React, { useState, useEffect } from 'react';
import { 
    User, 
    Phone, 
    Link, 
    Building2, 
    FileUp, 
    Send, 
    X,
    FileText,
    CheckCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

export default function ProjectRegisterPage() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        projectName: '',
        buildingInfo: ''
    });

    /* ================= SEO META ================= */
    useEffect(() => {
        document.title = "Регистрация проекта | USD Consulting";
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(prev => [...prev, ...selectedFiles]);
    };

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Package all info into a single 'note' for the general messages API
        const note = `
Project Name: ${formData.projectName}
Building Details: ${formData.buildingInfo}
Attached Files: ${files.length} file(s) ${files.map(f => f.name).join(', ')}
        `.trim();

        const data = {
            full_name: formData.fullName,
            phone: formData.phone,
            type: 'consulting',
            note: note
        };

        try {
            const res = await fetch("https://api.usderp.uz/broker/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Проект зарегистрирован!',
                    text: 'Ваша заявка на консалтинг успешно отправлена.',
                    background: '#0f172a',
                    color: '#fff',
                    confirmButtonColor: '#3b82f6'
                });
                // Reset form
                setFormData({ fullName: '', phone: '', projectName: '', buildingInfo: '' });
                setFiles([]);
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Ошибка',
                text: 'Не удалось отправить заявку. Пожалуйста, попробуйте еще раз.',
                background: '#0f172a',
                color: '#fff'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] pt-32 pb-24 text-white overflow-hidden relative">
            {/* Background Aesthetics */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[100px] rounded-full"></div>
            </div>

            <div className="container mx-auto px-4 relative">
                {/* Hero section */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Регистрация проекта
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Отправьте информацию о вашем здании и проекте для получения профессионального консалтинга от USD System.
                    </p>
                </div>

                {/* Form Section */}
                <div className="max-w-3xl mx-auto" data-aos="zoom-in">
                    <form onSubmit={handleSubmit} className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                        {/* Decorative ring */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full translate-x-16 -translate-y-16"></div>
                        
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <InputField 
                                label="Ваше имя" 
                                name="fullName" 
                                value={formData.fullName} 
                                onChange={handleChange} 
                                icon={<User size={18} />} 
                                placeholder="Иван Иванов" 
                                required 
                            />
                            <InputField 
                                label="Телефон" 
                                name="phone" 
                                value={formData.phone} 
                                onChange={handleChange} 
                                icon={<Phone size={18} />} 
                                placeholder="+998" 
                                required 
                            />
                        </div>

                        <div className="mb-8">
                            <InputField 
                                label="Название проекта" 
                                name="projectName" 
                                value={formData.projectName} 
                                onChange={handleChange} 
                                icon={<Building2 size={18} />} 
                                placeholder="Например: ЖК 'Солнечный'" 
                                required 
                            />
                        </div>

                        <div className="mb-8 space-y-2">
                            <label className="text-sm font-medium text-slate-400 flex items-center gap-2 mb-2">
                                <FileText size={18} className="text-blue-400" /> Информация о здании
                            </label>
                            <textarea 
                                name="buildingInfo"
                                value={formData.buildingInfo}
                                onChange={handleChange}
                                rows={4}
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500/40 outline-none transition placeholder:text-slate-600 text-slate-200"
                                placeholder="Опишите ваше здание (назначение, количество этажей, площадь и т.д.)"
                                required
                            />
                        </div>

                        {/* File Upload Area */}
                        <div className="mb-10 space-y-2">
                            <label className="text-sm font-medium text-slate-400 flex items-center gap-2 mb-2">
                                <FileUp size={18} className="text-blue-400" /> Файлы проекта
                            </label>
                            <div className="relative">
                                <input 
                                    type="file" 
                                    multiple 
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center bg-slate-800/20 hover:bg-slate-800/30 transition group">
                                    <div className="inline-flex items-center justify-center p-4 bg-blue-500/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                        <FileUp size={32} className="text-blue-400" />
                                    </div>
                                    <p className="text-slate-300 font-medium mb-1">Нажмите или перетащите файлы для загрузки</p>
                                    <p className="text-slate-500 text-xs uppercase tracking-widest">Макс. размер 50MB</p>
                                </div>
                            </div>

                            {/* Selected Files List */}
                            {files.length > 0 && (
                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {files.map((file, index) => (
                                        <div key={index} className="flex items-center justify-between bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 group">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="p-2 bg-blue-500/10 rounded-lg shrink-0">
                                                    <FileText size={16} className="text-blue-400" />
                                                </div>
                                                <span className="text-sm text-slate-300 truncate">{file.name}</span>
                                            </div>
                                            <button 
                                                type="button" 
                                                onClick={() => removeFile(index)}
                                                className="p-1 hover:bg-red-500/20 hover:text-red-400 text-slate-500 transition rounded"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full font-bold transition shadow-xl shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                <span>{loading ? 'Отправка...' : 'Отправить на проверку'}</span>
                                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </form>
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-8 mt-24">
                    <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-3xl" data-aos="fade-up" data-aos-delay="0">
                        <div className="p-4 bg-green-500/10 rounded-2xl inline-block mb-6">
                            <CheckCircle size={32} className="text-green-500" />
                        </div>
                        <h4 className="text-xl font-bold mb-3">Законное начало</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">Помогаем оформить все документы для законного начала строительных работ по вашему проекту.</p>
                    </div>
                    <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-3xl" data-aos="fade-up" data-aos-delay="100">
                        <div className="p-4 bg-blue-500/10 rounded-2xl inline-block mb-6">
                            <Building2 size={32} className="text-blue-500" />
                        </div>
                        <h4 className="text-xl font-bold mb-3">Экспертиза зданий</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">Наши специалисты проведут полный аудит проектной документации и состояния здания.</p>
                    </div>
                    <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-3xl" data-aos="fade-up" data-aos-delay="200">
                        <div className="p-4 bg-purple-500/10 rounded-2xl inline-block mb-6">
                            <FileUp size={32} className="text-purple-500" />
                        </div>
                        <h4 className="text-xl font-bold mb-3">Быстрая обработка</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">Загрузите файлы сейчас, и мы свяжемся с вами в течение 24 часов для обсуждения деталей.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const InputField = ({ label, icon, ...props }) => (
    <div className="space-y-2 w-full">
        <label className="text-sm font-medium text-slate-400 flex items-center gap-2 mb-2">
            <span className="text-blue-400">{icon}</span> {label}
        </label>
        <input 
            {...props}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500/40 outline-none transition placeholder:text-slate-600 text-slate-200"
        />
    </div>
);