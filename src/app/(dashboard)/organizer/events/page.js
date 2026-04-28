"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  CalendarDays, Plus, MapPin, Users, Copy, Trash2, 
  Settings, Loader2, Globe, Clock, Power, ShieldCheck,
  MoreVertical, Edit
} from "lucide-react";
import { eventsApi } from "@/api/events";

export default function OrganizerDashboard() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const responseData = await eventsApi.getMyEvents();
      if (responseData?.success) {
        setEvents(responseData.data.events || []);
      }
    } catch (err) {
      console.error("Gagal mengambil event organizer:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const toggleDropdown = (id) => {
    if (activeDropdown === id) setActiveDropdown(null);
    else setActiveDropdown(id);
  };

  const handleDuplicate = async (id, title) => {
    if (!confirm(`Duplikasi event "${title}"?`)) return;
    try {
      await eventsApi.duplicateEvent(id);
      fetchEvents();
    } catch (err) {
      alert("Gagal menduplikasi event.");
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Peringatan: Seluruh data untuk event "${title}" akan dihapus. Lanjutkan?`)) return;
    try {
      await eventsApi.deleteEvent(id);
      setEvents(events.filter(e => e.id !== id));
    } catch (err) {
      alert("Gagal menghapus event.");
    }
  };

  const handleTogglePublish = async (id) => {
    try {
       await eventsApi.togglePublish(id);
       fetchEvents(); // Refresh data immediately
    } catch (err) {
       alert("Gagal mengubah status rilis event.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-rose-500" />
        <p className="text-slate-500 animate-pulse font-medium">Memuat Event Anda...</p>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
             Event Saya 
             <span className="text-sm font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200">
               {events.length} Terdaftar
             </span>
          </h1>
          <p className="text-slate-500 text-sm">
            Kelola dan pantau seluruh acara pernikahan tamu Anda.
          </p>
        </div>
        
        {/* Tombol Buat Event (Tapped to Phase 6) */}
        <button 
          onClick={() => alert("Fitur Memori Create Event akan dikerjakan pada Fase 6!")}
          className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-[0_4px_14px_0_rgba(244,63,94,0.39)] flex items-center justify-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" /> Buat Acara Baru
        </button>
      </div>

      {/* Grid Events */}
      {events.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center py-20 text-center">
           <CalendarDays className="w-16 h-16 text-slate-300 mb-4" />
           <h3 className="text-xl font-bold text-slate-800 mb-2">Belum ada acara dikelola</h3>
           <p className="text-slate-500 max-w-sm mb-6 text-sm">Buat acara pernikahan baru untuk mulai mengundang tamu dan mengatur prosesi check-in.</p>
           <button 
             onClick={() => alert("Fitur Fase 6")}
             className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 text-sm"
           >
             <Plus className="w-4 h-4" /> Setup Event Pertama
           </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="relative bg-white rounded-2xl border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col group transition-all hover:shadow-md">
               
               {/* Event Image Cover */}
               <div className="h-40 w-full bg-slate-100 relative">
                 {/* Fallback pattern overlay if image fails or missing */}
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                 {event.coverImageUrl ? (
                    <img src={event.coverImageUrl} alt={event.weddingTitle} className="w-full h-full object-cover" />
                 ) : (
                    <div className="w-full h-full flex items-center justify-center bg-rose-50 text-rose-200">
                       <CalendarDays className="w-12 h-12" />
                    </div>
                 )}
                 
                 {/* Badges Overlay */}
                 <div className="absolute top-4 left-4 flex flex-col gap-2">
                   {event.status?.isPublished ? (
                     <span className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold bg-white/90 backdrop-blur text-emerald-600 rounded-lg shadow-sm border border-emerald-100">
                        <Globe className="w-3 h-3" /> PUBLISHED
                     </span>
                   ) : (
                     <span className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold bg-white/90 backdrop-blur text-slate-500 rounded-lg shadow-sm border border-slate-200">
                        <Power className="w-3 h-3" /> DRAFT
                     </span>
                   )}
                 </div>

                 {/* Dropdown Action Menu */}
                 <div className="absolute top-4 right-4">
                    <button 
                      onClick={() => toggleDropdown(event.id)}
                      className="p-1.5 bg-white/90 backdrop-blur rounded-lg shadow-sm text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {activeDropdown === event.id && (
                       <>
                         <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)}></div>
                         <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-20 py-2 origin-top-right animate-in fade-in zoom-in-95 duration-100">
                            <button 
                              onClick={() => { handleTogglePublish(event.id); setActiveDropdown(null); }}
                              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                            >
                              <Globe className={`w-4 h-4 ${event.status?.isPublished ? 'text-amber-500' : 'text-emerald-500'}`} /> 
                              {event.status?.isPublished ? "Tarik Publikasi" : "Publikasikan"}
                            </button>
                            <button 
                              onClick={() => { handleDuplicate(event.id, event.weddingTitle); setActiveDropdown(null); }}
                              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                            >
                              <Copy className="w-4 h-4 text-blue-500" /> Duplikat Acara
                            </button>
                            <div className="h-px bg-slate-100 my-1"></div>
                            <button 
                              onClick={() => { handleDelete(event.id, event.weddingTitle); setActiveDropdown(null); }}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                            >
                              <Trash2 className="w-4 h-4" /> Hapus Permanen
                            </button>
                         </div>
                       </>
                    )}
                 </div>
               </div>

               {/* Event Information */}
               <div className="p-5 flex-1 flex flex-col">
                  {/* Pasangan & Judul */}
                  <div className="mb-4">
                     <p className="text-xs font-bold text-rose-500 tracking-wider uppercase mb-1">{event.couple}</p>
                     <h3 className="text-lg font-extrabold text-slate-900 leading-tight mb-2 line-clamp-1">
                        {event.weddingTitle}
                     </h3>
                     <div className="flex flex-col gap-1.5 text-xs text-slate-500 font-medium">
                        <div className="flex items-center gap-1.5">
                           <CalendarDays className="w-3.5 h-3.5" />
                           {new Date(event.weddingDate).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-1.5">
                           <MapPin className="w-3.5 h-3.5" />
                           {event.venue?.city ? `${event.venue?.type || 'Lokasi'} di ${event.venue?.city}` : 'Venue belum diatur'}
                        </div>
                     </div>
                  </div>

                  {/* Statistik Grid */}
                  <div className="grid grid-cols-2 gap-2 mt-auto mb-5">
                     <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                        <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                           <Users className="w-3 h-3" /> <span className="text-[10px] font-bold uppercase">Undangan</span>
                        </div>
                        <p className="text-base font-extrabold text-slate-900">{event.stats?.totalGuests || 0}</p>
                     </div>
                     <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                        <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                           <Clock className="w-3 h-3" /> <span className="text-[10px] font-bold uppercase">Sesi Acara</span>
                        </div>
                        <p className="text-base font-extrabold text-slate-900">{event.stats?.sessionsCount || 0}</p>
                     </div>
                  </div>

                  {/* Primary Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100">
                     <button
                       onClick={() => alert("Fitur Event Builder akan dikerjakan di Fase 6")}
                       className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
                     >
                       <Settings className="w-3.5 h-3.5" /> Konfigurasi
                     </button>
                     <Link 
                       href={`/organizer/events/${event.id}/staff`}
                       className="flex items-center justify-center gap-2 py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold rounded-lg transition-colors"
                     >
                       <ShieldCheck className="w-3.5 h-3.5" /> Kelola Staff
                     </Link>
                  </div>
               </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
