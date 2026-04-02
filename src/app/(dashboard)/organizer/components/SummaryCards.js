import { CalendarDays, Users, Globe, TrendingUp, UserCheck } from "lucide-react";

export default function SummaryCards({ summary }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Events */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
          <CalendarDays className="w-6 h-6" />
        </div>
        <div>
           <p className="text-2xl font-bold text-slate-900">{summary?.totalEvents || 0}</p>
           <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-0.5">Total Acara</p>
        </div>
      </div>

      {/* Total Guests */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
          <Users className="w-6 h-6" />
        </div>
        <div>
           <p className="text-2xl font-bold text-slate-900">{summary?.totalGuests || 0}</p>
           <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-0.5">Total Tamu</p>
        </div>
      </div>

      {/* Attendance Rate */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
          <UserCheck className="w-6 h-6" />
        </div>
        <div>
           <p className="text-2xl font-bold text-slate-900">{summary?.totalAttended || 0}</p>
           <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Tamu Hadir</p>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                 <TrendingUp className="w-3 h-3" /> {summary?.overallAttendanceRate || 0}%
              </span>
           </div>
        </div>
      </div>

      {/* Published Events */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
          <Globe className="w-6 h-6" />
        </div>
        <div>
           <p className="text-2xl font-bold text-slate-900">{summary?.publishedEvents || 0}</p>
           <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-0.5">Acara Rilis</p>
        </div>
      </div>
    </div>
  );
}
