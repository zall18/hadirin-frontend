import { Users, Plus } from "lucide-react";

export default function ClientHeader({ onAddClick }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
          <Users className="w-8 h-8 text-rose-500" /> Manajemen Klien
        </h1>
        <p className="text-slate-500 text-sm">
          Kelola akses Organizer/Admin yang menggunakan platform Hadirin
        </p>
      </div>
      <button 
        onClick={onAddClick}
        className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-[0_4px_14px_0_rgba(15,23,42,0.39)] flex items-center gap-2 text-sm"
      >
        <Plus className="w-4 h-4" /> Tambah Klien Baru
      </button>
    </div>
  );
}
