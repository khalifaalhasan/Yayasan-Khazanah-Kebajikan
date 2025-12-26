"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { ArrowRight, Instagram, Image as ImageIcon } from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function GaleriPreview() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const fetchBerita = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("berita")
        .select("thumbnail")
        .order("created_at", { ascending: false })
        .limit(8); // 🔹 LIMIT 8 FOTO TERBARU AGAR RAPI

      if (error) {
        console.error("Error fetching Images:", error);
        setImages([]);
      } else if (mounted && data) {
        setImages(data.map((item) => item.thumbnail));
      }
      setLoading(false);
    };
    fetchBerita();

    return () => {
      mounted = false;
    };
  }, [supabase]);

  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      {/* Dekorasi Background Halus */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl mix-blend-multiply" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 mb-4">
              <span>Dokumentasi</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Momen <span className="text-blue-700">Berharga</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Rekam jejak kegiatan sosial, pendidikan, dan pemberdayaan yang
              telah terlaksana.
            </p>
          </motion.div>

          {/* Tombol Desktop (Hidden on Mobile) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:block pb-2"
          >
            <Button
              asChild
              variant="outline"
              className="rounded-full border-slate-300 text-slate-700 hover:bg-white hover:text-blue-700 px-6"
            >
              <Link href="/galeri" className="flex items-center gap-2">
                Lihat Semua Galeri <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* GRID GALLERY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {/* SKELETON LOADING STATE */}
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-[2rem] bg-slate-200 animate-pulse"
              />
            ))}

          {/* REAL DATA */}
          {!loading &&
            images.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-[2rem] bg-white shadow-sm aspect-square cursor-pointer"
              >
                <Image
                  src={src}
                  alt={`Kegiatan Yayasan ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Hover Effect */}
                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/40 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Tombol Mobile (Visible on Mobile Only) */}
        <div className="mt-10 flex justify-center md:hidden">
          <Button
            asChild
            className="rounded-full bg-[#0F172A] text-white w-full py-6"
          >
            <Link href="/galeri">Lihat Semua Galeri</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
