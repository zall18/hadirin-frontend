"use client";

import { Users, CalendarDays, Activity, ShieldCheck, TrendingUp } from "lucide-react";

export default function SummaryStats({ summary }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[
        { label: "Total Klien / Admin", val: summary.totalAdmins, icon: ShieldCheck, trend: "+12% bulan ini" },
        { label: "Total Event Sistem", val: summary.totalEvents, icon: CalendarDays, trend: "+34% bulan ini" },
        { label: "Rata-rata Kehadiran", val: `${summary.attendanceRate}%`, icon: Users, trend: "Stabil" },
        { label: "Status Server", val: "Optimal", icon: Activity, glow: "text-emerald-500 bg-emerald-50 border-emerald-100", iconGlow: "text-emerald-500", hideTrend: true },
      ].map((stat, i) => (
        <div key={i} className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(244,63,94,0.08)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-slate-50 to-rose-50 rounded-full blur-2xl group-hover:bg-rose-100 transition-colors duration-500 -z-10"></div>
          
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3.5 rounded-2xl border ${stat.glow ? stat.glow : "bg-gradient-to-br from-rose-50 to-pink-50 border-rose-100"}`}>
              <stat.icon className={`w-5 h-5 ${stat.iconGlow ? stat.iconGlow : "text-rose-500"}`} />
            </div>
            {!stat.hideTrend && (
               <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
               </span>
            )}
          </div>
          
          <div>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight mb-1">
              {stat.val}
            </h3>
            <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
