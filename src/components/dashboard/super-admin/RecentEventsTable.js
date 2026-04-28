"use client";

import { CheckCircle, MoreHorizontal } from "lucide-react";

export default function RecentEventsTable({ recentEvents }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
      <div className="p-6 sm:px-8 sm:py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
         <div>
            <h2 className="font-bold text-lg text-slate-800">Event Dibuat Baru-baru Ini</h2>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Monitoring event yang sedang berjalan di platform</p>
         </div>
         <button className="text-sm font-semibold text-rose-500 hover:text-rose-600 transition-colors">
            Lihat Semua
         </button>
      </div>
      <div className="overflow-x-auto">
         <table className="w-full text-left text-sm text-slate-600">
           <thead className="bg-slate-50/50 border-y border-slate-50 text-[11px] uppercase font-bold text-slate-400 tracking-wider">
              <tr>
                 <th className="px-8 py-4">Nama Event</th>
                 <th className="px-6 py-4">Pasangan</th>
                 <th className="px-6 py-4">Tanggal Acara</th>
                 <th className="px-6 py-4">Klien / Organizer</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-slate-50">
              {(!recentEvents || recentEvents.length === 0) ? (
                <tr>
                   <td colSpan="6" className="px-8 py-16 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
                         <span className="text-2xl">📭</span>
                      </div>
                      <p className="text-slate-500 font-medium">Belum ada data event di seluruh sistem.</p>
                   </td>
                </tr>
              ) : (
                recentEvents.map((event) => (
                   <tr key={event.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-4">
                         <p className="font-bold text-slate-800 mb-0.5">{event.weddingTitle}</p>
                         <p className="text-xs text-slate-400 font-mono bg-slate-100 inline-block px-2 py-0.5 rounded-md">ID: {event.slug}</p>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-600">
                         {event.groomName && event.brideName ? `${event.groomName} & ${event.brideName}` : "-"}
                      </td>
                      <td className="px-6 py-4">
                         <p className="text-slate-700 font-semibold mb-0.5">
                            {event.weddingDate ? new Date(event.weddingDate).toLocaleDateString("id-ID", { month: "long", day: "numeric", year: "numeric"}) : "-"}
                         </p>
                         <p className="text-xs text-rose-500 font-bold">{event.totalGuests} Tamu</p>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                             {event.owner?.name?.substring(0,2).toUpperCase() || "AD"}
                           </div>
                           <div>
                              <p className="text-slate-800 font-bold leading-none mb-1">{event.owner?.name || "Admin"}</p>
                              <p className="text-[11px] font-medium text-slate-500 leading-none">{event.owner?.email || "-"}</p>
                           </div>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Aktif
                         </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <button className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors opacity-0 group-hover:opacity-100">
                            <MoreHorizontal className="w-5 h-5" />
                         </button>
                      </td>
                   </tr>
                ))
              )}
           </tbody>
         </table>
      </div>
    </div>
  );
}
