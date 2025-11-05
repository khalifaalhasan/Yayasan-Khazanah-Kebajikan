"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const gallery = [
  "/images/galeri1.jpg",
  "/images/galeri2.jpg",
  "/images/galeri3.jpg",
  "/images/galeri4.jpg",
]

export default function GaleriPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-10"
        >
          Galeri Kegiatan
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl shadow-lg group"
            >
              <Image
                src={src}
                alt={`Galeri ${i + 1}`}
                width={400}
                height={300}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>

        <Button asChild className="mt-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
          <Link href="/galeri">Lihat Semua</Link>
        </Button>
      </div>
    </section>
  )
}
