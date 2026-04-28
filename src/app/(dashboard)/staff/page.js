"use client";

import { useState, useEffect } from "react";
import { eventsApi } from "@/api/events";
import { Loader2, ArrowRight, QrCode, MapPin, Calendar, Users, Briefcase } from "lucide-react";
import Link from "next/link";

export default function StaffDashboard() {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In actual implementation, staff is assigned to an event. Here we fetch event ID=2 based on PRD.
    const fetchEvent = async () => {
      try {
        const responseData = await eventsApi.getEventOverview(2);
        if (responseData?.success) {
          setEventData(responseData.data);
        }
      } catch (error) {
        // Fallback dummy data
        setEventData({
          weddingTitle: "The Wedding of Andi & Sari",
          weddingDate: "2026-12-20T09:00:00.000Z",
          venue: {
             name: "Hotel Santika Ballroom",
             address: "Jl. Ir. H. Juanda No. 123",
          },
          counters: {
            totalGuests: 300,
            attendedCount: 120
          }
        });
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, []);

  if (loading) {
     return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Header Illustration / Cover */}
        <div className="h-48 bg-slate-900 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-900/60 to-slate-900/80 z-10"></div>
          <div className="absolute inset-x-6 bottom-6 z-20">
             <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-100 text-xs font-medium mb-3 backdrop-blur-md">
                <Briefcase className="w-3.5 h-3.5" />
                Penugasan Aktif
             </div>
             <h1 className="text-3xl font-bold text-white drop-shadow-lg">
               {eventData?.weddingTitle || "Acara Pernikahan"}
             </h1>
          </div>
        </div>

        {/* Details Content */}
        <div className="p-6 sm:p-8">
           <div className="grid sm:grid-cols-2 gap-8 mb-10">
              <div className="space-y-6">
                 <div>
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Jadwal Acara</h3>
                    <div className="flex items-start gap-3">
                       <Calendar className="w-5 h-5 text-rose-500 shrink-0" />
                       <p className="font-medium text-slate-800">
                         {eventData?.weddingDate ? new Date(eventData.weddingDate).toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "Belum diatur"}
                       </p>
                    </div>
                 </div>
                 
                 <div>
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Lokasi</h3>
                    <div className="flex items-start gap-3">
                       <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                       <div>
                         <p className="font-medium text-slate-800">{eventData?.venue?.name}</p>
                         <p className="text-sm text-slate-500">{eventData?.venue?.address}</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-center items-center text-center">
                 <Users className="w-8 h-8 text-slate-400 mb-2" />
                 <p className="text-sm font-medium text-slate-500">Progress Kedatangan Tamu</p>
                 <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl font-bold text-slate-900">{eventData?.counters?.attendedCount || 0}</span>
                    <span className="text-lg text-slate-400">/ {eventData?.counters?.totalGuests || 0}</span>
                 </div>
              </div>
           </div>

           {/* Call to Action */}
           <div className="flex flex-col sm:flex-row gap-4 border-t border-slate-100 pt-8 mt-4">
               <Link
                 href="/staff/checkin"
                 className="flex-1 flex justify-center items-center gap-2 py-4 px-6 rounded-xl shadow-sm shadow-rose-200/50 text-white bg-rose-500 hover:bg-rose-600 font-semibold transition-all hover:-translate-y-0.5"
               >
                 <QrCode className="w-5 h-5" />
                 Mulai Check-in Tamu
                 <ArrowRight className="w-5 h-5 ml-2" />
               </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
