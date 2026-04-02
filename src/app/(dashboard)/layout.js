import { cookies } from "next/headers";
import Link from "next/link";
import { Home, Users, QrCode, Settings, CalendarRange, Menu } from "lucide-react";
import LogoutButton from "./components/Logout"; // Sesuaikan path folder components kamu

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const userRole = cookieStore.get("userRole")?.value || "ADMIN";

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
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <aside className="w-64 bg-slate-900 text-white flex-col hidden lg:flex fixed inset-y-0 z-10 transition-transform shadow-xl">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="bg-rose-500 text-white p-1.5 rounded-lg">
              <QrCode className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Hadirin <span className="text-rose-500 font-normal text-sm">PRO</span>
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="px-2 mb-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Menu Navigasi
          </div>
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors group text-sm font-medium"
              >
                <Icon className="w-5 h-5 text-slate-400 group-hover:text-rose-400 transition-colors" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Cukup panggil komponennya, nggak usah kirim fungsi handleLogout lagi */}
        <LogoutButton />
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen relative">
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 lg:hidden">
            <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-rose-500" /> Hadirin
            </span>
          </div>
          <div className="hidden lg:block text-sm font-medium text-slate-600">
            Dashboard / <span className="text-slate-800">{userRole.replace('_', ' ')}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 font-bold text-sm">
              {userRole.substring(0, 1)}
            </div>
            <div className="hidden md:block text-sm">
              <p className="font-medium text-slate-800 leading-none mb-1">
                {userRole === 'ADMIN' ? 'Organizer' : userRole === 'SUPER_ADMIN' ? 'Super Admin' : 'Petugas Tamu'}
              </p>
              <p className="text-xs text-slate-500">Active Session</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );  
}