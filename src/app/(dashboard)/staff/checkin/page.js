"use client";

import { useState } from "react";
import { Search, QrCode, UserCheck, X } from "lucide-react";
import clsx from "clsx";

export default function CheckinPage() {
  const [mode, setMode] = useState("QR"); // QR or MANUAL
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  // Dummy check-in function
  const handleCheckIn = (id) => {
    alert(`Guest ID ${id} di-check-in secara simulasi!`);
  };

  // Dummy mock search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if(e.target.value.length > 2) {
       // Mock data matching
       setSearchResults([
          { id: 1, name: "Budi Alonso", count: 2, status: "INVITED" },
          { id: 4, name: "Sari Dewi", count: 1, status: "ATTENDED" }
       ]);
    } else {
       setSearchResults([]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Check-in Tamu</h1>
          <p className="text-slate-500 text-sm">Pindai QR Code atau cari nama tamu</p>
        </div>
        
        {/* Toggle Mode */}
        <div className="bg-slate-200/60 p-1 rounded-xl inline-flex self-start">
          <button
            onClick={() => setMode("QR")}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all",
              mode === "QR" ? "bg-white text-rose-500 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <QrCode className="w-4 h-4" />
            Scanner
          </button>
          <button
             onClick={() => setMode("MANUAL")}
             className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all",
              mode === "MANUAL" ? "bg-white text-rose-500 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <Search className="w-4 h-4" />
            Manual
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {mode === "QR" ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50">
             <div className="w-full max-w-sm aspect-square bg-slate-900 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center border-4 border-slate-800 shadow-2xl">
                {/* QR Scanner Placeholder */}
                <div className="absolute inset-0 border-[40px] border-black/40 z-10"></div>
                <div className="w-3/4 h-3/4 border-2 border-rose-500 rounded-2xl z-20 relative">
                   <div className="absolute inset-x-0 top-1/2 h-0.5 bg-rose-500 shadow-[0_0_8px_#f43f5e] animate-[bounce_3s_infinite]"></div>
                </div>
                <p className="absolute bottom-6 z-30 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
                  Kamera Aktif
                </p>
                {/* You will mount <div> id="reader" for html5-qrcode here later */}
             </div>
             <p className="text-slate-500 mt-8 text-center max-w-xs">
                Arahkan QR Code undangan tamu ke dalam kotak di atas untuk melakukan check-in otomatis.
             </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col p-6 sm:p-8">
             <div className="relative mb-6">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                 <Search className="h-5 w-5" />
               </div>
               <input
                 type="text"
                 value={searchQuery}
                 onChange={handleSearch}
                 className="block w-full pl-12 pr-10 py-4 text-lg border border-slate-200 rounded-2xl focus:ring-rose-500 focus:border-rose-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-colors"
                 placeholder="Ketik nama atau No. WA..."
                 autoFocus
               />
               {searchQuery && (
                 <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                 >
                   <X className="h-5 w-5" />
                 </button>
               )}
             </div>

             <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                {searchResults.length > 0 ? (
                  searchResults.map(guest => (
                    <div key={guest.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors">
                       <div>
                          <p className="font-bold text-slate-900 text-lg">{guest.name}</p>
                          <p className="text-sm text-slate-500">Undangan untuk {guest.count} orang</p>
                       </div>
                       {guest.status === "ATTENDED" ? (
                          <div className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 font-semibold text-sm inline-flex items-center gap-1.5 border border-emerald-100">
                            <UserCheck className="w-4 h-4" /> Hadir
                          </div>
                       ) : (
                          <button 
                            onClick={() => handleCheckIn(guest.id)}
                            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-rose-500 transition-colors shadow-sm"
                          >
                            Check-in
                          </button>
                       )}
                    </div>
                  ))
                ) : searchQuery.length > 2 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                     <Search className="w-12 h-12 mb-4 opacity-20" />
                     <p>Pencarian tidak ditemukan.</p>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                     <UserCheck className="w-12 h-12 mb-4 opacity-20" />
                     <p>Mulai ketik nama atau scan QR tamu</p>
                  </div>
                )}
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
