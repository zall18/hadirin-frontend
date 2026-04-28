"use client";

import { Users, Plus } from "lucide-react";

export default function ClientHeader({ onAddClick }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-black text-slate-800 mb-2 flex items-center gap-2 tracking-tight">
          Manajemen Klien
        </h1>
        <p className="text-slate-500 font-medium">
          Kelola akses Organizer/Admin yang menggunakan platform Hadirin.
        </p>
      </div>
      <button 
        onClick={onAddClick}
        className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-2xl font-bold transition-colors shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center gap-2 text-sm"
      >
        <Plus className="w-4 h-4" /> Tambah Klien Baru
      </button>
    </div>
  );
}
