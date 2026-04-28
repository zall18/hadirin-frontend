"use client";

import { motion } from "framer-motion";
import { CalendarPlus, Send, ScanLine, PieChart, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: <CalendarPlus className="w-8 h-8 text-rose-500" />,
    title: "Buat Acara",
    desc: "Daftar dan buat acara pernikahan Anda. Tambahkan detail, waktu, dan lokasi dengan mudah.",
  },
  {
    icon: <Send className="w-8 h-8 text-pink-500" />,
    title: "Undang Tamu",
    desc: "Import daftar tamu dari Excel. Kirim e-invitation lengkap dengan QR Code unik via WhatsApp.",
  },
  {
    icon: <ScanLine className="w-8 h-8 text-indigo-500" />,
    title: "Scan & Sambut",
    desc: "Di hari H, staff cukup scan QR code tamu menggunakan smartphone untuk check-in instan.",
  },
  {
    icon: <PieChart className="w-8 h-8 text-emerald-500" />,
    title: "Pantau Real-time",
    desc: "Lihat statistik kehadiran tamu yang masuk secara real-time melalui dashboard pintar.",
  },
];

export default function HowItWorks() {
  return (
    <section id="cara-kerja" className="py-24 relative overflow-hidden bg-rose-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-rose-200 text-sm font-bold text-rose-600 shadow-sm">
              Cara Kerja
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight"
          >
            4 Langkah Mudah Menuju
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
              Pernikahan Impian
            </span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-rose-200 via-pink-200 to-indigo-200 -z-10 -translate-y-12"></div>

          {steps.map((step, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 + 0.2 }}
              key={idx}
              className="relative group"
            >
              <div className="bg-white/40 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(244,63,94,0.1)] p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-white shadow-sm border border-rose-50 flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 to-transparent rounded-2xl"></div>
                  <div className="relative z-10">{step.icon}</div>

                  {/* Step number badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                    {idx + 1}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{step.desc}</p>
              </div>

              {/* Arrow for mobile between steps */}
              {idx < steps.length - 1 && (
                <div className="md:hidden flex justify-center py-4">
                  <ArrowRight className="w-6 h-6 text-rose-300 rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
