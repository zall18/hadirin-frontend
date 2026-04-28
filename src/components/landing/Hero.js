"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Flower2, Heart } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-50">
      {/* Background blobs & Floral */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[50%] rounded-full bg-rose-200/40 blur-[120px]" />
        <div className="absolute top-[20%] -left-[10%] w-[30%] h-[40%] rounded-full bg-pink-200/40 blur-[100px]" />
        <Flower2 className="absolute top-[10%] left-[5%] w-64 h-64 text-rose-100/40 -rotate-12 blur-sm" strokeWidth={0.5} />
        <Heart className="absolute bottom-[20%] right-[10%] w-48 h-48 text-pink-100/40 rotate-12 blur-sm" strokeWidth={0.5} />
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

    </section>
  );
}
