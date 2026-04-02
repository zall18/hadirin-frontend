import { Mail, Phone, Power, Edit, Trash2, Loader2 } from "lucide-react";

export default function ClientTable({ clients, isLoading, onToggleStatus, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
         <table className="w-full text-left text-sm text-slate-600">
           <thead className="bg-slate-50 border-b border-slate-100 text-xs uppercase font-semibold text-slate-500">
              <tr>
                 <th className="px-6 py-4">Nama Organizer</th>
                 <th className="px-6 py-4">Kontak</th>
                 <th className="px-6 py-4">Status & Statistik</th>
                 <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-rose-500 mx-auto" />
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                    Belum ada pendaftaran akun Klien/Admin.
                  </td>
                </tr>
              ) : clients.map((client) => (
                 <tr key={client.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                       <p className="font-bold text-slate-900 text-base flex items-center gap-2">
                         {client.name}
                         {!client.isActive && <span className="px-2 py-0.5 rounded-md text-[10px] bg-red-100 text-red-600 font-bold">INACTIVE</span>}
                       </p>
                       <p className="text-xs text-slate-400 mt-1">Terdaftar: {new Date(client.createdAt).toLocaleDateString("id-ID", { dateStyle: "medium" })}</p>
                    </td>
                    <td className="px-6 py-4">
                       <p className="text-slate-700 font-medium flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400"/> {client.email}</p>
                       <p className="text-slate-500 text-xs mt-1.5 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400"/> {client.phone || "Belum diatur"}</p>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex flex-col items-start gap-1.5">
                         <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                             Event Dibuat: {client._count?.ownedEvents || 0}
                         </span>
                         {client.lastLoginAt && (
                           <span className="text-[10px] text-slate-400">
                             Last Login: {new Date(client.lastLoginAt).toLocaleDateString("id-ID")}
                           </span>
                         )}
                       </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-2">
                         <button 
                           onClick={() => onToggleStatus(client.id, client.isActive)}
                           title={client.isActive ? "Nonaktifkan Akses" : "Aktifkan Akses"}
                           className={`p-2 rounded-lg transition-colors ${client.isActive ? "text-emerald-600 hover:bg-emerald-50" : "text-slate-400 hover:bg-slate-100"}`}
                         >
                           <Power className="w-4 h-4" />
                         </button>
                         <button 
                           onClick={() => onEdit(client)}
                           title="Edit Detail"
                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                         >
                           <Edit className="w-4 h-4" />
                         </button>
                         <button 
                           onClick={() => onDelete(client.id, client.name)}
                           title="Hapus Klien"
                           className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
