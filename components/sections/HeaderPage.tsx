"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface HeaderConfig {
  title: string;
  subtitle: string;
}

// JSON konfigurasi heading tiap halaman
const headerConfig: Record<string, HeaderConfig> = {
  "/": {
    title: "Selamat Datang di Yayasan Khazanah Kebajikan",
    subtitle:
      "Membangun generasi berilmu, berkarakter, dan berakhlak mulia untuk masa depan bangsa.",
  },
  "/tentang": {
    title: "Tentang Khazanah Kebajikan",
    subtitle:
      "Lembaga pendidikan Islam yang menanamkan keseimbangan antara ilmu pengetahuan, spiritualitas, dan nilai sosial.",
  },
  "/program": {
    title: "Program Unggulan Kami",
    subtitle:
      "Menumbuhkan potensi santri melalui kegiatan yang mengembangkan ilmu, karakter, dan keterampilan.",
  },
  "/galeri": {
    title: "Galeri Kegiatan",
    subtitle:
      "Dokumentasi momen terbaik dalam setiap langkah pembelajaran dan pengabdian.",
  },
  "/berita": {
    title: "Berita & Kegiatan Terbaru",
    subtitle:
      "Ikuti berbagai kabar terbaru, kegiatan inspiratif, dan informasi penting seputar Yayasan Khazanah Kebajikan.",
  },
  "/kontak": {
    title: "Hubungi Kami",
    subtitle:
      "Kami siap menjawab pertanyaan dan menerima aspirasi Anda untuk bersama membangun pendidikan berkualitas.",
  },
};

export default function HeaderPage() {
  const pathname = usePathname();
  const config = headerConfig[pathname] || headerConfig["/"];

  return (
    <section className="relative w-full py-20 text-center overflow-hidden ">
      {/* Efek background lembut */}
      <div className="absolute inset-0"></div>

      <div className="relative container mx-auto px-6 md:px-12 max-w-4xl">
        {/* Judul */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-500 bg-clip-text text-transparent leading-snug"
        >
          {config.title}
        </motion.h1>

        {/* Subjudul */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 text-gray-700 text-base md:text-lg font-medium mx-auto max-w-2xl"
        >
          {config.subtitle}
        </motion.p>

        {/* Garis bawah dekoratif */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 h-1 w-28 mx-auto bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full origin-center"
        />
      </div>
    </section>
  );
}
