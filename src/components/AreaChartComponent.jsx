'use client';
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Янв', savdo: 4000, foyda: 2400 },
    { name: 'Фев', savdo: 3000, foyda: 1398 },
    { name: 'Мар', savdo: 2000, foyda: 9800 },
    { name: 'Апр', savdo: 2780, foyda: 3908 },
    { name: 'Май', savdo: 1890, foyda: 4800 },
    { name: 'Июн', savdo: 2390, foyda: 3800 },
];

export default function AreaChartComponent() {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorSavdo" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="savdo" stroke="#3b82f6" fill="url(#colorSavdo)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
