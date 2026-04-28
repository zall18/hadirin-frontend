"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { adminApi } from "@/api/admin";
import SummaryCards from "./components/SummaryCards";
import UpcomingEvents from "./components/UpcomingEvents";
import ActivityMetrics from "./components/ActivityMetrics";

export default function OrganizerMainDashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOverview = async () => {
    setIsLoading(true);
    try {
      const responseData = await adminApi.getOrganizerOverview();
      if (responseData?.success) {
        setData(responseData.data);
      }
    } catch (err) {
      console.error("Gagal mengambil overview organizer:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-rose-500" />
        <p className="text-slate-500 animate-pulse font-medium">Memuat Dashboard Anda...</p>
      </div>
    );
  }

  const { summary, upcomingEvents, events } = data || {};

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Selamat Datang, Organizer!
        </h1>
        <p className="text-slate-500 text-sm">
          Berikut adalah ringkasan kinerja dari seluruh acara yang Anda kelola.
        </p>
      </div>

      {/* Summary Stats Grid */}
      <SummaryCards summary={summary} />

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Acara Mendatang */}
        <UpcomingEvents upcomingEvents={upcomingEvents} />

        {/* Quick Actions / Info */}
        <ActivityMetrics summary={summary} />

      </div>
    </>
  );
}
