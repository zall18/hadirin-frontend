"use client";

import { motion } from "framer-motion";
import { Flower2, Heart, Sparkles } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Decorative floral blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-rose-100 shadow-sm shadow-rose-100/50 mb-6">
              <Flower2 className="w-4 h-4 text-rose-500" />
              <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600">
                Tentang Hadirin
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              Lebih Dari Sekadar <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">
                Buku Tamu Digital
              </span>
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Hadirin adalah platform manajemen pernikahan inovatif yang dirancang khusus untuk mempermudah calon pengantin dan Wedding Organizer. Kami mengubah cara Anda mengelola undangan dan menyambut tamu.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Dengan sentuhan elegan dan teknologi QR check-in cerdas, setiap tamu Anda akan merasakan pengalaman eksklusif dan bebas hambatan sejak langkah pertama mereka di acara Anda.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400" />
                <span className="font-semibold text-slate-700">Elegan</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-400" />
                <span className="font-semibold text-slate-700">Cepat</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Glassmorphism Card */}
            <div className="relative rounded-[2.5rem] bg-white/30 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_0_rgba(244,63,94,0.1)] p-8 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-50/40 to-white/10" />
              
              {/* Floral corner decoration */}
              <Flower2 className="absolute -top-6 -right-6 w-32 h-32 text-rose-100/50 -rotate-12 group-hover:rotate-12 transition-transform duration-700" strokeWidth={1} />
              
              <div className="relative z-10 flex flex-col gap-6">
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                    <span className="text-xl">👩‍❤️‍👨</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Untuk Pengantin</h4>
                    <p className="text-sm text-slate-600 mt-1">Pantau RSVP dan kehadiran tamu secara real-time tanpa pusing menyusun daftar manual.</p>
                  </div>
                </div>
                
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                    <span className="text-xl">📋</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Untuk Wedding Organizer</h4>
                    <p className="text-sm text-slate-600 mt-1">Manajemen staf, scan QR super cepat, dan laporan kehadiran tamu yang akurat di ujung jari.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
