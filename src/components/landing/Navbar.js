import { Heart } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_2px_20px_rgba(0,0,0,0.02)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-rose-400 to-rose-600 text-white p-2.5 rounded-2xl shadow-lg shadow-rose-200/50">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              Hadirin
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/login"
              className="text-slate-600 hover:text-rose-500 font-semibold transition-colors hidden sm:block"
            >
              Masuk
            </Link>
            <Link
              href="/login"
              className="relative inline-flex h-11 items-center justify-center px-6 py-2 overflow-hidden font-medium text-white transition-all bg-rose-500 rounded-full hover:bg-rose-600 hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(244,63,94,0.8)]"
            >
              <span className="relative">Coba Gratis</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
