import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

export default function UpcomingEvents({ upcomingEvents }) {
  return (
    <div className="lg:col-span-2 space-y-4">
       <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Acara Mendatang Terdekat</h2>
          <Link href="/organizer/events" className="text-sm font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1">
             Lihat Semua <ArrowRight className="w-4 h-4" />
          </Link>
       </div>
       
       {upcomingEvents && upcomingEvents.length > 0 ? (
         <div className="space-y-3">
           {upcomingEvents.map(event => (
              <div key={event.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                 <div>
                    <h3 className="text-base font-bold text-slate-900">{event.weddingTitle}</h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5" /> 
                      {new Date(event.weddingDate).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                 </div>
                 <div className="flex gap-4 w-full md:w-auto">
                    <div className="bg-slate-50 p-3 rounded-lg flex-1 min-w-[100px] border border-slate-100">
                       <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Undangan</p>
                       <p className="text-lg font-bold text-slate-800">{event.totalGuests}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg flex-1 min-w-[100px] border border-slate-100">
                       <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Konfirmasi</p>
                       <p className="text-lg font-bold text-slate-800">{event.confirmedCount}</p>
                    </div>
                 </div>
              </div>
           ))}
         </div>
       ) : (
         <div className="bg-white rounded-xl p-8 border border-slate-200 text-center flex flex-col items-center">
            <CalendarDays className="w-12 h-12 text-slate-300 mb-3" />
            <p className="text-slate-600 font-medium">Tidak ada acara yang dijadwalkan dalam waktu dekat.</p>
         </div>
       )}
    </div>
  );
}
