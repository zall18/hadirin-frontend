import { Users, CalendarDays, Activity, ShieldCheck } from "lucide-react";

export default function SummaryStats({ summary }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[
        { label: "Total Klien / Admin", val: summary.totalAdmins, icon: ShieldCheck },
        { label: "Total Event Sistem", val: summary.totalEvents, icon: CalendarDays },
        { label: "Tingkat Kehadiran", val: `${summary.attendanceRate}%`, icon: Users },
        { label: "Status Server", val: "Online", icon: Activity, glow: "text-emerald-500 bg-emerald-100/50 border-emerald-200", iconGlow: "text-emerald-600" },
      ].map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-start gap-4">
          <div className={`p-3 rounded-xl border ${stat.glow ? stat.glow : "bg-rose-50 border-rose-100"}`}>
            <stat.icon className={`w-6 h-6 ${stat.iconGlow ? stat.iconGlow : "text-rose-500"}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {stat.val}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
