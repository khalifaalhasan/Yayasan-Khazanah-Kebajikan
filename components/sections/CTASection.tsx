"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HeartHandshake, MessageCircle, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    // Section luar menggunakan bg-slate-50 agar kontras dengan card CTA yang gelap
    <section className="py-20 md:py-28 bg-slate-50 px-4 sm:px-6">
      <div className="container max-w-7xl mx-auto">
        {/* Floating Dark Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] bg-[#0F172A] px-6 py-16 md:px-16 md:py-20 text-center shadow-2xl shadow-blue-900/20"
        >
          {/* 🎨 Background Decoration (Glow Effects) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 opacity-50 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 opacity-30 blur-[80px] rounded-full pointer-events-none" />

          {/* Pattern Bintik Halus (Opsional) */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none mix-blend-overlay" />

          {/* 📝 Content */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm font-medium text-blue-100 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Mari Berkontribusi</span>
            </motion.div>

            {/* Heading */}
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Bersama Membangun Generasi <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
                Islami & Mandiri
              </span>
            </h2>

            {/* Paragraph */}
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Setiap rupiah yang Anda sisihkan adalah benih kebaikan yang akan
              tumbuh menjadi masa depan cerah bagi mereka yang membutuhkan.
            </p>

            {/* Buttons Action */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-white text-slate-900 hover:bg-blue-50 hover:scale-105 transition-all duration-300 rounded-full px-8 py-7 text-lg font-bold shadow-xl shadow-white/10"
              >
                <Link href="/donasi" className="flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-blue-600" />
                  Salurkan Donasi
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-slate-600 text-white bg-transparent hover:bg-white/10 hover:text-white rounded-full px-8 py-7 text-lg font-medium transition-all"
              >
                <Link
                  href="https://wa.me/628123456789"
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Tanya Admin
                </Link>
              </Button>
            </div>

            {/* Footer Text Kecil */}
            <p className="text-sm text-slate-400 mt-6">
              *Laporan penyaluran donasi akan dikirimkan secara berkala melalui
              email/WhatsApp.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
