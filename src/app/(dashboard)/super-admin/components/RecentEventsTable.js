import { CheckCircle } from "lucide-react";

export default function RecentEventsTable({ recentEvents }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
         <h2 className="font-bold text-lg text-slate-900">Event Dibuat Baru-baru Ini</h2>
      </div>
      <div className="overflow-x-auto">
         <table className="w-full text-left text-sm text-slate-600">
           <thead className="bg-slate-50 border-y border-slate-100 text-xs uppercase font-semibold text-slate-500">
              <tr>
                 <th className="px-6 py-4">Nama Event</th>
                 <th className="px-6 py-4">Pasangan</th>
                 <th className="px-6 py-4">Tanggal Acara</th>
                 <th className="px-6 py-4">Dimiliki Oleh</th>
                 <th className="px-6 py-4">Status</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-slate-100">
              {recentEvents.length === 0 ? (
                <tr>
                   <td colSpan="5" className="px-6 py-10 text-center text-slate-400">
                      Belum ada data event di seluruh sistem.
                   </td>
                </tr>
              ) : (
                recentEvents.map((event) => (
                   <tr key={event.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                         <p className="font-medium text-slate-900">{event.weddingTitle}</p>
                         <p className="text-xs text-slate-400 mt-1">ID: {event.slug}</p>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">
                         {event.groomName && event.brideName ? `${event.groomName} & ${event.brideName}` : "-"}
                      </td>
                      <td className="px-6 py-4">
                         <p className="text-slate-800 font-medium">
                            {event.weddingDate ? new Date(event.weddingDate).toLocaleDateString("id-ID", { month: "long", day: "numeric", year: "numeric"}) : "-"}
                         </p>
                         <p className="text-xs text-rose-500 font-medium mt-1">{event.totalGuests} Tamu Diundang</p>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-2.5">
                           <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                             {event.owner?.name?.substring(0,2).toUpperCase() || "AD"}
                           </div>
                           <div>
                              <p className="text-slate-900 font-medium leading-none mb-1">{event.owner?.name || "Admin"}</p>
                              <p className="text-[10px] text-slate-500 leading-none">{event.owner?.email || "-"}</p>
                           </div>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Aktif
                         </span>
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
