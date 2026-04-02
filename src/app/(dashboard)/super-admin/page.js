"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Loader2 } from "lucide-react";
import SummaryStats from "./components/SummaryStats";
import RecentEventsTable from "./components/RecentEventsTable";

export default function SuperAdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/dashboard/super-admin");
        if (response.data?.success) {
          setData(response.data.data);
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
        <p className="text-slate-500 animate-pulse font-medium">Memuat ringkasan sistem...</p>
      </div>
    );
  }

  const summary = data?.summary || { totalAdmins: 0, totalEvents: 0, attendanceRate: "0.00" };
  const recentEvents = data?.recentEvents || [];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Global Dashboard</h1>
        <p className="text-slate-500 text-sm">
          Ringkasan seluruh aktivitas di platform Hadirin (Super Admin)
        </p>
      </div>

      <SummaryStats summary={summary} />
      <RecentEventsTable recentEvents={recentEvents} />
    </>
  );
}
