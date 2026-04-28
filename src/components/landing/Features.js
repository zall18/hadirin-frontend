"use client";

import { motion } from "framer-motion";
import { Users, QrCode, Camera } from "lucide-react";

const features = [
  {
    icon: <Users className="w-7 h-7 text-rose-500" />,
    title: "Manajemen Tamu Cerdas",
    desc: "Kelola daftar tamu lintas acara dengan cepat. Mendukung import file Excel massal dan sinkronisasi real-time.",
    color: "bg-rose-50",
    border: "border-rose-100"
  },
  {
    icon: <QrCode className="w-7 h-7 text-indigo-500" />,
    title: "QR Check-in Instan",
    desc: "Validasi masuk hanya butuh sedetik! Hilangkan antrean panjang dan berikan pengalaman bintang lima di gerbang.",
    color: "bg-indigo-50",
    border: "border-indigo-100"
  },
  {
    icon: <Camera className="w-7 h-7 text-emerald-500" />,
    title: "Terintegrasi WhatsApp",
    desc: "Broadcast e-invitation dan broadcast pesan ucapan terima kasih secara otomatis. Mendukung Photobooth sync.",
    color: "bg-emerald-50",
    border: "border-emerald-100"
  },
];

export default function Features() {
  return (
    <section id="fitur" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight"
          >
            Semua yang Anda Butuhkan
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 leading-relaxed font-medium"
          >
            Ucapkan selamat tinggal pada buku tamu usang. Kami membawa acara perayaan Anda ke tingkat produktivitas dan eksklusivitas berikutnya.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 + 0.2 }}
              key={idx}
              className={`p-10 rounded-[2.5rem] border ${feature.border} bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] hover:shadow-[0_8px_32px_0_rgba(244,63,94,0.15)] hover:-translate-y-2 hover:bg-white/60 transition-all duration-300 group relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-slate-50 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
