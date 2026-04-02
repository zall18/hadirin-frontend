import { Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 pt-20 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg">
              <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
            </div>
            <span className="font-extrabold text-2xl text-white tracking-tight">Hadirin</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 font-semibold text-slate-300">
             <Link href="#" className="hover:text-rose-400 transition-colors">Tentang Kami</Link>
             <Link href="#" className="hover:text-rose-400 transition-colors">Harga</Link>
             <Link href="#" className="hover:text-rose-400 transition-colors">Syarat & Ketentuan</Link>
             <Link href="#" className="hover:text-rose-400 transition-colors">Kebijakan Privasi</Link>
          </div>
        </div>
        
        <div className="border-t border-slate-800/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
           <p className="text-sm font-medium">© {new Date().getFullYear()} Hadirin SaaS. Hak Cipta Dilindungi.</p>
           <p className="text-sm text-slate-500">Dibuat dengan presisi untuk momen sempurna.</p>
        </div>
      </div>
    </footer>
  );
}
