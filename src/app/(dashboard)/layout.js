import { cookies } from "next/headers";
import Sidebar from "@/components/dashboard/Sidebar";
import TopNav from "@/components/dashboard/TopNav";

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const userRole = cookieStore.get("userRole")?.value || "ADMIN";

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans selection:bg-rose-500 selection:text-white">
      {/* Sidebar (Desktop) */}
      <Sidebar userRole={userRole} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen relative">
        {/* Top Navigation */}
        <TopNav userRole={userRole} />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          {/* Subtle background pattern for dashboard */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply -z-10"></div>

          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}