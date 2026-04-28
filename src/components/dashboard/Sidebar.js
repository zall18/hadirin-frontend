"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, QrCode, Settings, CalendarRange } from "lucide-react";
import LogoutButton from "@/app/(dashboard)/components/Logout"; // We'll move this later if needed

export default function Sidebar({ userRole }) {
  const pathname = usePathname();

  const getNavItems = (role) => {
    switch (role) {
      case "SUPERADMIN":
      case "SUPER_ADMIN":
        return [
          { name: "Global Dashboard", href: "/super-admin", icon: Home },
          { name: "Semua Klien", href: "/super-admin/clients", icon: Users },
          { name: "Pengaturan Platform", href: "/super-admin/settings", icon: Settings },
        ];
      case "ADMIN":
      case "ORGANIZER":
        return [
          { name: "Dashboard", href: "/organizer", icon: Home },
          { name: "Event Saya", href: "/organizer/events", icon: CalendarRange },
          { name: "Manajemen Tamu", href: "/organizer/guests", icon: Users },
          { name: "Staff & Petugas", href: "/organizer/staff", icon: QrCode },
          { name: "Pengaturan Event", href: "/organizer/settings", icon: Settings },
        ];
      case "STAFF":
      default:
        return [
          { name: "Detail Event", href: "/staff", icon: CalendarRange },
          { name: "Mode Check-in", href: "/staff/checkin", icon: QrCode },
        ];
    }
  };

  const navItems = getNavItems(userRole);

  return (
    <aside className="w-64 bg-slate-900 text-white flex-col hidden lg:flex fixed inset-y-0 z-30 transition-transform shadow-[4px_0_24px_rgba(0,0,0,0.05)] border-r border-slate-800">
      <div className="h-20 flex items-center px-8 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-rose-500 to-rose-600 text-white p-2 rounded-xl shadow-lg shadow-rose-500/20">
            <QrCode className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">
            Hadirin <span className="text-rose-400 font-medium text-sm ml-1">PRO</span>
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto custom-scrollbar">
        <div className="px-4 mb-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Main Menu
        </div>
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={idx}
              href={item.href}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-semibold ${isActive
                  ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
            >
              <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-rose-400" : "text-slate-500 group-hover:text-slate-300"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <LogoutButton />
      </div>
    </aside>
  );
}
