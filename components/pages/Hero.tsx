"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight, Info } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32 bg-slate-50/50"
    >
      {/* =========================================
          AURORA BACKGROUND (FOKUS DI TENGAH)
      ========================================= */}

      {/* Container khusus efek: 
          - top-28: Memberi jarak dari atas supaya TIDAK KENA NAVBAR
          - inset-x-0: Melebar penuh ke samping
          - h-[500px]: Membatasi tinggi efek hanya di area teks
      */}
      <div className="absolute top-28 left-0 right-0 h-[500px] flex justify-center items-center pointer-events-none -z-10 overflow-visible">
        {/* 1. Blob Biru (Bergerak) */}
        <motion.div
          animate={{
            x: [-40, 40, -40], // Gerak Kiri-Kanan lebih lebar
            y: [-20, 20, -20], // Gerak Atas-Bawah
            scale: [1, 1.2, 1], // Membesar-Mengecil
            opacity: [0.4, 0.6, 0.4], // Kedap-kedip halus
          }}
          transition={{
            duration: 8, // Dipercepat biar kelihatan geraknya
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-500/30 rounded-full blur-[100px] -translate-x-1/2"
        />

        {/* 2. Blob Amber (Bergerak Berlawanan) */}
        <motion.div
          animate={{
            x: [40, -40, 40], // Lawan arah biru
            y: [20, -20, 20],
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10, // Durasi beda biar gak sinkron (lebih natural)
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute w-[250px] h-[250px] md:w-[450px] md:h-[450px] bg-amber-400/30 rounded-full blur-[90px] translate-x-1/2"
        />
      </div>

      {/* Pattern Bintik (Tetap ada sebagai tekstur) */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(148,163,184,0.2)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-20" />

      {/* =========================================
          KONTEN UTAMA
      ========================================= */}

      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-white/70 backdrop-blur-sm px-3 py-1 text-sm font-medium text-blue-700 shadow-sm"
          >
            <span>✨ Yayasan Khazanah Kebajikan Palembang</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-slate-900 mb-6"
          >
            Membangun{" "}
            <span className="text-blue-700 relative inline-block">
              Generasi Beriman
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-blue-200 -z-10"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 9.5C60 2.5 235 -3.5 298 9.5"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br className="hidden md:block" /> dan{" "}
            <span className="text-amber-500">Berilmu Tinggi</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-700 font-medium leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Kami berkomitmen mencetak santri yang kuat iman dan taqwanya,
            berakhlak mulia, serta berilmu pengetahuan untuk membangun
            masyarakat Islami yang sejahtera.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center items-center gap-4"
          >
            <Button
              size="lg"
              className="bg-[#0F172A] text-white hover:bg-blue-800 rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-blue-900/10 transition-all hover:scale-105 active:scale-95 gap-2"
            >
              Lihat Program Unggulan <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-blue-700 rounded-full px-8 py-6 text-base font-semibold transition-all gap-2 bg-white/80"
            >
              Tentang Yayasan <Info className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="relative w-full max-w-5xl mx-auto mt-16 md:mt-20"
        >
          <div className="relative rounded-3xl border border-slate-200/80 bg-white/40 p-2 md:p-4 shadow-2xl shadow-blue-900/5 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-amber-500/5 pointer-events-none z-10 rounded-2xl"></div>

            <Image
              src="/images/hero-santri.jpg"
              alt="Santri belajar di Yayasan Khazanah Kebajikan"
              width={1200}
              height={800}
              priority
              className="rounded-2xl w-full h-auto max-h-[600px] object-cover object-center transform transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>

          <motion.div
            className="absolute -bottom-6 -right-4 sm:-right-8 bg-white/90 backdrop-blur-md border border-blue-100 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)] p-4 sm:p-6 w-auto z-20 flex items-center gap-4"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              👥
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                100+
              </p>
              <p className="text-sm text-slate-600 font-medium">
                Santri & Dhuafa Berprestasi
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
