"use client";

import { Mail, Phone, Power, Edit, Trash2, Loader2, ArrowUpRight } from "lucide-react";

export default function ClientTable({ clients, isLoading, onToggleStatus, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
      <div className="overflow-x-auto">
         <table className="w-full text-left text-sm text-slate-600">
           <thead className="bg-slate-50/50 border-b border-slate-50 text-[11px] uppercase font-bold text-slate-400 tracking-wider">
              <tr>
                 <th className="px-8 py-5">Nama Organizer</th>
                 <th className="px-6 py-5">Kontak Utama</th>
                 <th className="px-6 py-5">Status & Aktivitas</th>
                 <th className="px-8 py-5 text-right">Manajemen</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-16 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-rose-500 mx-auto" />
                    <p className="text-sm text-slate-500 mt-4 font-medium">Memuat data klien...</p>
                  </td>
                </tr>
              ) : (!clients || clients.length === 0) ? (
                <tr>
                  <td colSpan="4" className="px-8 py-16 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
                       <span className="text-2xl">📭</span>
                    </div>
                    <p className="text-slate-500 font-medium text-base">Belum ada akun Klien/Admin terdaftar.</p>
                  </td>
                </tr>
              ) : clients.map((client) => (
                 <tr key={client.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                       <p className="font-bold text-slate-800 text-base mb-1 flex items-center gap-2">
                         {client.name}
                         {!client.isActive && <span className="px-2 py-0.5 rounded-md text-[10px] bg-red-100 text-red-600 font-bold tracking-wider">INACTIVE</span>}
                       </p>
                       <p className="text-xs font-semibold text-slate-400">Terdaftar: {new Date(client.createdAt).toLocaleDateString("id-ID", { month: "long", day: "numeric", year: "numeric" })}</p>
                    </td>
                    <td className="px-6 py-5">
                       <p className="text-slate-700 font-semibold mb-1 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-slate-400"/> {client.email}
                       </p>
                       <p className="text-slate-500 text-xs font-medium flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400"/> {client.phone || "Belum diatur"}
                       </p>
                    </td>
                    <td className="px-6 py-5">
                       <div className="flex flex-col items-start gap-2">
                         <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold tracking-wider bg-indigo-50 text-indigo-600 border border-indigo-100">
                             Total Event: {client._count?.ownedEvents || 0}
                         </span>
                         {client.lastLoginAt && (
                           <span className="text-xs font-semibold text-slate-400">
                             Akses Terakhir: {new Date(client.lastLoginAt).toLocaleDateString("id-ID")}
                           </span>
                         )}
                       </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                       <div className="flex items-center justify-end gap-2">
                         <button 
                           onClick={() => onToggleStatus(client.id, client.isActive)}
                           title={client.isActive ? "Nonaktifkan Akses" : "Aktifkan Akses"}
                           className={`p-2.5 rounded-xl border transition-all ${client.isActive ? "border-emerald-100 text-emerald-600 hover:bg-emerald-50 bg-white shadow-sm" : "border-slate-200 text-slate-400 hover:bg-slate-50 bg-slate-50"}`}
                         >
                           <Power className="w-4 h-4" />
                         </button>
                         <button 
                           onClick={() => onEdit(client)}
                           title="Edit Detail"
                           className="p-2.5 bg-white border border-slate-100 shadow-sm text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                         >
                           <Edit className="w-4 h-4" />
                         </button>
                         <button 
                           onClick={() => onDelete(client.id, client.name)}
                           title="Hapus Klien"
                           className="p-2.5 bg-white border border-slate-100 shadow-sm text-red-500 hover:bg-red-50 rounded-xl transition-all"
                         >
                           <Trash2 className="w-4 h-4" />
                         </button>
                       </div>
                    </td>
                 </tr>
              ))}
           </tbody>
         </table>
      </div>
    </div>
  );
}
