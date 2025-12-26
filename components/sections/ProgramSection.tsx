"use client";

import { motion, Variants } from "framer-motion"; // Import Variants untuk Type Safety
import Link from "next/link";
import { Heart, BookOpen, Users, ArrowRight } from "lucide-react";

// Data Program
const programs = [
  {
    icon: <Heart className="w-8 h-8" />, // Hapus text-blue-600
    title: "Program Sosial",
    desc: "Memberdayakan masyarakat dhuafa melalui kegiatan berbagi, santunan yatim, dan bakti sosial rutin.",
    link: "/program/sosial",
  },
  {
    icon: <BookOpen className="w-8 h-8" />, // Hapus text-blue-600
    title: "Program Pendidikan",
    desc: "Pembinaan santri dalam bidang tahsin, tahfidz, dan pendidikan umum yang berkarakter Islami.",
    link: "/program/pendidikan",
  },
  {
    icon: <Users className="w-8 h-8" />, // Hapus text-blue-600
    title: "Program Pemberdayaan",
    desc: "Pelatihan kewirausahaan dan ekonomi kreatif untuk mendukung kemandirian umat secara finansial.",
    link: "/program/pemberdayaan",
  },
];

// Animasi Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ProgramPreview() {
  return (
    <section className="py-24 md:py-32 bg-white relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER SECTION (Sama seperti sebelumnya) */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 mb-4"
          >
            <span>Program Unggulan</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
          >
            Wujud Nyata <span className="text-blue-700">Kepedulian</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            Melalui berbagai pilar kebaikan, kami berkomitmen menyalurkan amanah
            Anda menjadi manfaat yang berkelanjutan.
          </motion.p>
        </div>

        {/* CARDS GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {programs.map((item, i) => (
            <motion.div key={i} variants={itemVariants} className="h-full">
              <Link href={item.link} className="block h-full group">
                <div className="relative flex flex-col h-full bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-blue-900/10 group-hover:-translate-y-2 group-hover:border-blue-100">
                  {/* ICON WRAPPER 
                      - Menggunakan transition-all agar perubahan warna halus
                      - Menambahkan group-hover:scale-110 agar ikon sedikit 'pop-up'
                  */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 
                                  bg-blue-50 text-blue-600 
                                  group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-600/30"
                  >
                    {/* Clone element ikon agar bisa inherit warna dari parent (text-white saat hover) */}
                    {item.icon}
                  </div>

                  {/* CONTENT */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
                    {item.desc}
                  </p>

                  {/* LINK FOOTER */}
                  <div className="mt-auto flex items-center text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    Pelajari Selengkapnya
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
