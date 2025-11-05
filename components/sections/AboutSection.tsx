"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-10">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex-1 space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Tentang Yayasan Khazanah Kebajikan
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Yayasan Khazanah Kebajikan (YKK) Palembang merupakan lembaga sosial
            keagamaan yang mengasuh dan mendidik anak-anak yatim serta kaum
            dhuafa. Kami berfokus pada bidang sosial, pendidikan, dan ekonomi
            umat dengan menanamkan budaya tahajud, kajian Al-Qur’an, serta
            semangat berbagi melalui zakat dan sedekah.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Didirikan sejak tahun 2015, YKK berkomitmen untuk melahirkan
            generasi yang kuat iman, berilmu tinggi, dan berakhlak mulia.
          </p>
          <Button
            asChild
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
          >
            <Link href="/tentang">Selengkapnya</Link>
          </Button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 flex justify-center"
        >
          <div className="relative w-full md:w-4/5 lg:w-3/4 aspect-video rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/about-ykk.jpg"
              alt="Yayasan Khazanah Kebajikan"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
