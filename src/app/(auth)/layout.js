import { Flower2, Heart } from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans relative overflow-hidden">
      {/* Global Floral Ambient Background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/floral-flourish.png')] opacity-5 mix-blend-multiply"></div>

      {/* Decorative Blur Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-rose-200/50 rounded-full mix-blend-multiply filter blur-[120px] z-0 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[40%] bg-pink-200/50 rounded-full mix-blend-multiply filter blur-[100px] z-0 animate-blob animation-delay-2000"></div>

      {/* Decorative Floral SVGs at the edges */}
      <Flower2 className="absolute top-[10%] left-[5%] w-48 h-48 text-rose-100/50 -rotate-12 blur-[2px] z-0" strokeWidth={0.5} />
      <Heart className="absolute bottom-[10%] right-[5%] w-64 h-64 text-pink-100/40 rotate-12 blur-[2px] z-0" strokeWidth={0.5} />

      {/* Main Centered Container */}
      <div className="w-full max-w-lg z-10 p-4">
        
        {/* Branding Info positioned above the card */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-4 bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 shadow-sm">
             <div className="bg-gradient-to-br from-rose-400 to-rose-600 p-1.5 rounded-lg shadow-inner">
               <Heart className="w-4 h-4 text-white fill-current" />
             </div>
             <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                Hadirin
             </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-slate-800 mb-2">
            Momen bahagia,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">tersusun rapi.</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-medium">
            Masuk untuk mulai mengelola acara perayaan Anda.
          </p>
        </div>

        {/* Glassmorphism Card for Form */}
        <div className="relative rounded-[2rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_20px_60px_-15px_rgba(244,63,94,0.1)] p-8 sm:p-10 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-50/30 to-white/10" />
          
          <div className="relative z-20">
            {children}
          </div>
        </div>
        
      </div>
    </div>
  );
}
