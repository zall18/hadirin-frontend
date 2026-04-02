"use client"; // WAJIB ADA

import { useState } from "react";
import { LogOut } from "lucide-react";

// Gunakan @ untuk path absolut yang aman ke root folder src/
import axiosInstance from "@/lib/axiosInstance";
import { clearAuthCookies } from "@/app/actions/auth";

export default function LogoutButton() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogout = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Coba memanggil API logout di backend (hanya opsional mengamankan sesi di backend)
            await axiosInstance.post("/api/auth/logout");
        } catch (err) {
            console.error("Logout API bypass:", err);
            // Tetap jalankan penghapusan cookie meskipun API gagal
        } finally {
            // Gunakan Server Action dari Next.js untuk menghapus cookie bahkan yang HttpOnly sekalipun!
            await clearAuthCookies();
            
            // Hard reload ke login agar sistem middleware tahu kalau cookie benar-benar terhapus
            window.location.href = '/login';
        }
    };

    return (
        <div className="p-4 border-t border-slate-800">
            {error && <p className="text-red-400 text-xs mb-2 px-2">{error}</p>}
            <button
                onClick={handleLogout}
                disabled={loading}
                className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-rose-500 transition-colors group text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <LogOut className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                {loading ? "Keluar..." : "Keluar Akun"}
            </button>
        </div>
    );
}