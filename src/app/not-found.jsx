"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white px-4">
            <h1 className="text-6xl font-extrabold mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl mb-6">Страница не найдена</h2>
            <p className="text-slate-400 mb-8 text-center max-w-md">
                Упс! Кажется, такой страницы не существует. Возможно, она была удалена или ссылка неверна.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-bold transition-all duration-300"
            >
                Вернуться на главную
            </Link>
        </div>
    );
}
