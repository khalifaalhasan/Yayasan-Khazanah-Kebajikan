"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const news = [
  {
    title: "Kegiatan Santunan Yatim Ramadhan 2025",
    desc: "Ratusan anak yatim mendapat santunan dalam acara berbagi berkah Ramadhan di Yayasan Khazanah Kebajikan.",
    date: "Maret 2025",
    link: "/berita/santunan-yatim-ramadhan",
  },
  {
    title: "Pelatihan Wirausaha Santri",
    desc: "Santri YKK mengikuti pelatihan wirausaha kreatif untuk meningkatkan kemandirian ekonomi.",
    date: "Februari 2025",
    link: "/berita/wirausaha-santri",
  },
  {
    title: "Kajian Bulanan & Doa Bersama",
    desc: "Kegiatan rutin bulanan dalam rangka mempererat ukhuwah Islamiyah antar pengurus dan santri.",
    date: "Januari 2025",
    link: "/berita/kajian-bulanan",
  },
]

export default function BeritaPreview() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-10"
        >
          Berita Terbaru
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {news.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <p className="text-sm text-blue-600 font-medium mb-2">{item.date}</p>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-5">{item.desc}</p>
              <Link href={item.link} className="text-blue-600 hover:underline font-medium">
                Baca Selengkapnya →
              </Link>
            </motion.div>
          ))}
        </div>

        <Button asChild className="mt-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
          <Link href="/berita">Lihat Semua Berita</Link>
        </Button>
      </div>
    </section>
  )
}
