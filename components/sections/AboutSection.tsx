"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

// Variabel animasi agar kode lebih bersih

// 👈 3. Tambahkan tipe ': Variants' di sini juga
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function AboutSection() {
  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      {/* Dekorasi Background Halus (Opsional) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl mix-blend-multiply" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl mix-blend-multiply" />
      </div>

      {/* Container utama dibatasi max-w-7xl sesuai request */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* 🟦 KOLOM KIRI: Teks & Konten */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8"
          >
            {/* Badge Kecil */}
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              <span>Tentang Kami</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Mengabdi untuk Ummat, <br />
              <span className="text-blue-700">Membangun Peradaban.</span>
            </h2>

            {/* Deskripsi Utama */}
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              Yayasan Khazanah Kebajikan (YKK) adalah lembaga sosial keagamaan
              yang didirikan sejak 2015. Kami berfokus mengasuh anak yatim &
              dhuafa serta mencetak generasi yang kuat iman dan berilmu tinggi.
            </p>

            {/* Poin-poin Fitur (Biar lebih modern daripada paragraf panjang) */}
            <div className="space-y-4 w-full max-w-md">
              {[
                "Pendidikan Karakter & Tahfidz Qur'an",
                "Pemberdayaan Ekonomi Umat",
                "Penyaluran Zakat, Infaq, & Sedekah",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-slate-100"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Tombol Action */}
            <div className="pt-4">
              <Button
                asChild
                className="bg-[#0F172A] hover:bg-blue-800 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-slate-900/10 transition-all hover:scale-105"
              >
                <Link href="/tentang" className="flex items-center gap-2">
                  Selengkapnya <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* 🟨 KOLOM KANAN: Gambar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative flex justify-center lg:justify-end"
          >
            {/* Frame Gambar dengan Style 'Card' */}
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Elemen Dekoratif di belakang gambar */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-amber-50 rounded-[2.5rem] rotate-3 opacity-70 -z-10" />

              <div className="bg-white p-2 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
                <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-slate-100">
                  <Image
                    src="/images/about/icon.jpg"
                    alt="Kegiatan Yayasan Khazanah Kebajikan"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />

                  {/* Overlay Gradient Halus */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />

                  {/* Teks di atas gambar (Opsional, menambah kesan modern) */}
                  <div className="absolute bottom-6 left-6 text-white text-left">
                    <p className="text-sm font-medium opacity-90">Sejak 2015</p>
                    <p className="text-xl font-bold">Menebar Kebaikan</p>
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
