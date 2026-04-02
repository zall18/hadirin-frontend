"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-50">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[50%] rounded-full bg-rose-200/40 blur-[120px]" />
        <div className="absolute top-[20%] -left-[10%] w-[30%] h-[40%] rounded-full bg-indigo-200/40 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-rose-100 shadow-sm shadow-rose-100 mb-8"
        >
          <Sparkles className="w-4 h-4 text-rose-500" />
          <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600">
            Platform Manajemen Pernikahan Digital Era Baru
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-slate-900 tracking-tight leading-[1.1] max-w-5xl mx-auto mb-8"
        >
          Momen Sempurna, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500 pb-2">
            Tanpa Antrean Panjang.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
        >
          Hadirin membantu calon pengantin dan Wedding Organizer mengelola
          tamu undangan, RSVP digital, dan sistem check-in QR secara presisi dan elegan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 hidden-hover overflow-y-visible"
        >
          <Link
            href="/login"
            className="group w-full sm:w-auto flex justify-center items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:shadow-slate-900/30 hover:-translate-y-1"
          >
            Mulai Sekarang 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#fitur"
            className="w-full sm:w-auto flex justify-center items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-full font-bold text-lg transition-all border border-slate-200 hover:border-slate-300 shadow-sm"
          >
            Pelajari Fitur
          </a>
        </motion.div>
      </div>

      {/* Abstract Mockup inside Hero for visually stunning display */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        className="mt-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20"
      >
        <div className="relative rounded-[2rem] sm:rounded-[2.5rem] bg-white/40 backdrop-blur-3xl border border-white/80 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.1)] p-3 sm:p-6 ring-1 ring-slate-900/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-50/50 to-white/20" />
          <div className="relative aspect-[16/9] bg-slate-50 rounded-[1.5rem] overflow-hidden border border-slate-200/60 shadow-inner flex flex-col pt-8 items-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] hidden sm:flex">
             {/* Decorative Window dots */}
             <div className="w-full flex items-center px-6 mb-8 gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
             </div>
             {/* Mockup Elements */}
             <div className="w-full max-w-4xl px-8 flex gap-8">
               <div className="w-1/3 bg-white rounded-t-2xl shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.05)] border-x border-t border-slate-100 p-6 h-64 flex flex-col gap-4">
                  <div className="h-4 w-1/2 bg-slate-100 rounded-full" />
                  <div className="h-12 w-full bg-slate-50 rounded-xl" />
                  <div className="h-12 w-full bg-slate-50 rounded-xl" />
                  <div className="h-12 w-full bg-slate-50 rounded-xl" />
               </div>
               <div className="w-2/3 bg-white rounded-t-3xl shadow-[0_-20px_50px_-5px_rgba(0,0,0,0.1)] border-x border-t border-slate-100 p-8 h-72 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50/50 rounded-full blur-3xl -mr-20 -mt-20" />
                  <div className="h-8 w-1/3 bg-slate-100 rounded-full mb-8 relative z-10" />
                  <div className="flex gap-6 relative z-10">
                     <div className="flex-1 bg-gradient-to-br from-rose-50 to-rose-100/50 p-6 rounded-2xl border border-rose-100">
                        <div className="text-4xl font-extrabold text-rose-600 mb-2">450</div>
                        <div className="text-sm font-semibold text-rose-500/80 uppercase tracking-wide">Undangan</div>
                     </div>
                     <div className="flex-1 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 rounded-2xl border border-emerald-100">
                        <div className="text-4xl font-extrabold text-emerald-600 mb-2">320</div>
                        <div className="text-sm font-semibold text-emerald-500/80 uppercase tracking-wide">Hadir</div>
                     </div>
                  </div>
               </div>
             </div>
          </div>
          <div className="aspect-square sm:hidden bg-slate-100 rounded-2xl flex items-center justify-center p-8 bg-gradient-to-tr from-rose-50 to-indigo-50 border border-slate-200 shadow-inner">
             <div className="text-center space-y-4">
               <Sparkles className="w-12 h-12 text-rose-400 mx-auto" />
               <p className="font-bold text-slate-700 text-lg">Smart Dashboard</p>
             </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
