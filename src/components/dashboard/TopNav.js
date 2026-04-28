"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, QrCode, Bell, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { authApi } from "@/api/auth";
import ProfileModal from "@/components/dashboard/ProfileModal";

export default function TopNav({ userRole }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      // Ignore error, cookie deletion handled separately if needed
    }
    // Force reload to clear client state
    window.location.href = "/login";
  };

  const getRoleLabel = (role) => {
    if (role === 'ADMIN' || role === 'ORGANIZER') return 'Organizer';
    if (role === 'SUPER_ADMIN' || role === 'SUPERADMIN') return 'Super Admin';
    return 'Petugas Tamu';
  };

  return (
    <>
      <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8">
      {/* Mobile left side */}
      <div className="flex items-center gap-4 lg:hidden">
        <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-extrabold text-lg text-slate-800 flex items-center gap-2">
          <div className="bg-rose-500 p-1.5 rounded-lg text-white">
             <QrCode className="w-4 h-4" /> 
          </div>
          Hadirin
        </span>
      </div>

      {/* Desktop left side / Breadcrumb */}
      <div className="hidden lg:flex items-center gap-2 text-sm font-semibold text-slate-500">
        <span className="text-slate-400">Dashboard</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-800">{getRoleLabel(userRole)}</span>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3 sm:gap-5">
        <button className="relative p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 p-1.5 pr-3 hover:bg-slate-50 rounded-full transition-all border border-transparent hover:border-slate-200"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 border border-rose-200 flex items-center justify-center text-rose-600 font-bold text-sm shadow-sm">
              {userRole.substring(0, 1)}
            </div>
            <div className="hidden md:block text-left">
              <p className="font-bold text-slate-800 text-sm leading-tight">
                {getRoleLabel(userRole)}
              </p>
              <p className="text-xs text-emerald-500 font-medium flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden origin-top-right animate-in fade-in zoom-in-95 duration-200">
              <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                <p className="font-bold text-slate-800 text-sm">{getRoleLabel(userRole)} User</p>
                <p className="text-xs text-slate-500 truncate mt-0.5">admin@hadirin.com</p>
              </div>
              <div className="p-2 space-y-1">
                <button 
                  onClick={() => {
                     setIsDropdownOpen(false);
                     setIsProfileOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" /> Profil Saya
                </button>
              </div>
              <div className="p-2 border-t border-slate-50">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      </header>

      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}
