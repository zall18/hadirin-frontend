"use client";

import { useState, useEffect } from "react";
import { adminApi } from "@/api/admin";
import { Loader2 } from "lucide-react";
import SummaryStats from "@/components/dashboard/super-admin/SummaryStats";
import DashboardCharts from "@/components/dashboard/super-admin/DashboardCharts";
import RecentEventsTable from "@/components/dashboard/super-admin/RecentEventsTable";

export default function SuperAdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await adminApi.getDashboardOverview();
        if (responseData?.success) {
          setData(responseData.data);
        }
      } catch (err) {
        console.error("Dashboard Super Admin fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
     return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-rose-500" />
        <p className="text-slate-500 font-bold tracking-tight">Memuat metrik sistem...</p>
      </div>
    );
  }

  const summary = data?.summary || { totalAdmins: 0, totalEvents: 0, attendanceRate: "0.00" };
  const recentEvents = data?.recentEvents || [];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Global Dashboard</h1>
           <p className="text-slate-500 font-medium">
             Ringkasan performa dan aktivitas di seluruh jaringan platform Hadirin.
           </p>
        </div>
        <div className="hidden sm:flex bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm items-center gap-2 text-sm font-semibold text-slate-600">
           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
           Sistem berjalan optimal
        </div>
      </div>

      <SummaryStats summary={summary} />
      <DashboardCharts />
      <RecentEventsTable recentEvents={recentEvents} />
    </div>
  );
}
