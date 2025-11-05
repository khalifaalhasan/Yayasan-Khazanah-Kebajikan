"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto px-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Mari Bersama Membangun Generasi Islami & Mandiri
        </h2>
        <p className="text-white/80 mb-8">
          Dukung misi kami dalam menebar kebajikan melalui pendidikan, dakwah,
          dan pemberdayaan sosial umat.
        </p>
        <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8 py-3 font-semibold">
          <Link href="/donasi">Dukung Sekarang</Link>
        </Button>
      </motion.div>
    </section>
  )
}
