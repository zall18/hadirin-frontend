import { CheckCircle, TrendingUp } from "lucide-react";

export default function ActivityMetrics({ summary }) {
  return (
    <div className="space-y-4">
       <h2 className="text-lg font-bold text-slate-900">Aktivitas & Metrik</h2>
       <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <CheckCircle className="w-32 h-32" />
          </div>
          <div className="relative z-10">
             <h3 className="text-xl font-bold mb-1">Tingkat Konfirmasi Kehadiran</h3>
             <p className="text-sm text-slate-400 mb-6">Persentase undangan yang mengonfirmasi form RSVP dari total semua acara.</p>
             <div className="flex items-end gap-2">
                <span className="text-5xl font-black text-rose-400">{summary?.overallConfirmedRate || 0}%</span>
             </div>
          </div>
       </div>

       <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
             <TrendingUp className="w-5 h-5 text-emerald-500" /> Performa Tamu Hadir
          </h3>
          <div className="space-y-4">
             <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                   <span className="text-slate-600">Total Check-In Berhasil</span>
                   <span className="text-slate-900">{summary?.totalAttended || 0} / {summary?.totalGuests || 0}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                   <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${summary?.overallAttendanceRate || 0}%` }}></div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
