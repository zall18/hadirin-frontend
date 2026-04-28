"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { CalendarDays, Users } from "lucide-react";

const data = [
  { name: 'Jan', events: 4, guests: 1200 },
  { name: 'Feb', events: 7, guests: 2100 },
  { name: 'Mar', events: 5, guests: 1600 },
  { name: 'Apr', events: 12, guests: 4500 },
  { name: 'Mei', events: 18, guests: 6800 },
  { name: 'Jun', events: 25, guests: 9000 },
];

export default function DashboardCharts() {
  return (
    <div className="grid lg:grid-cols-2 gap-6 mb-8">
      {/* Chart 1 */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-8">
           <div>
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                 <CalendarDays className="w-5 h-5 text-rose-500" /> Tren Pembuatan Event
              </h3>
              <p className="text-xs text-slate-500 mt-1">Jumlah event yang dibuat per bulan</p>
           </div>
           <select className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-slate-50 text-slate-700 font-medium focus:outline-none focus:border-rose-300">
              <option>Tahun Ini</option>
              <option>Tahun Lalu</option>
           </select>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }} 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} 
              />
              <Bar dataKey="events" fill="#f43f5e" radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2 */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-8">
           <div>
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                 <Users className="w-5 h-5 text-indigo-500" /> Volume Tamu Undangan
              </h3>
              <p className="text-xs text-slate-500 mt-1">Estimasi total tamu dari semua event</p>
           </div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGuests" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} 
              />
              <Area type="monotone" dataKey="guests" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorGuests)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
