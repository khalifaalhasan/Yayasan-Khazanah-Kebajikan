"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, FileText } from "lucide-react";

// Tipe Data
interface Berita {
  id: string;
  judul: string;
  slug: string;
  thumbnail?: string;
  penulis?: string;
  created_at?: string; // Biasanya Supabase pakai created_at
}

// Animasi
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function BeritaPreview() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [latestBerita, setLatestBerita] = useState<Berita[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLatestBerita = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("berita")
        .select("id, judul, slug, thumbnail, penulis, created_at")
        .order("created_at", { ascending: false })
        .limit(3); // 🔹 LIMIT 3 UNTUK GRID

      if (error) {
        console.error("Fetch latest berita error:", error);
      } else {
        setLatestBerita(data || []);
      }
      setLoading(false);
    };

    fetchLatestBerita();
  }, [supabase]);

  // Helper Format Tanggal
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="py-24 md:py-32 bg-white relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 mb-4">
              <span>Wawasan & Informasi</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Berita & <span className="text-blue-700">Artikel</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Ikuti perkembangan terbaru, kisah inspiratif, dan artikel
              bermanfaat dari Yayasan kami.
            </p>
          </motion.div>

          {/* Tombol Desktop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:block pb-2"
          >
            <Button
              asChild
              variant="outline"
              className="rounded-full border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-blue-700 px-6"
            >
              <Link href="/berita" className="flex items-center gap-2">
                Lihat Semua Berita <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* SKELETON LOADING */}
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-[2rem] bg-slate-100 border border-slate-200 overflow-hidden h-[400px] flex flex-col"
              >
                <div className="h-48 bg-slate-200 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse" />
                  <div className="h-6 bg-slate-200 rounded w-full animate-pulse" />
                  <div className="h-6 bg-slate-200 rounded w-2/3 animate-pulse" />
                </div>
              </div>
            ))}

          {/* REAL DATA */}
          {!loading && latestBerita.length > 0
            ? latestBerita.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group flex flex-col h-full bg-white border border-slate-200 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-blue-900/5 hover:border-blue-100 transition-all duration-300"
                >
                  {/* Image Container */}
                  <Link
                    href={`/berita/${item.slug}`}
                    className="relative h-56 overflow-hidden"
                  >
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={item.judul}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <FileText className="w-12 h-12 opacity-50" />
                      </div>
                    )}
                    {/* Overlay Badge Tanggal (Opsional, modern look) */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-700 shadow-sm flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(item.created_at)}
                    </div>
                  </Link>

                  {/* Content Container */}
                  <div className="flex flex-col flex-1 p-6">
                    {/* Metadata Penulis */}
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-3">
                      <User className="w-3.5 h-3.5" />
                      <span>{item.penulis || "Admin Yayasan"}</span>
                    </div>

                    {/* Judul */}
                    <Link href={`/berita/${item.slug}`}>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 hover:text-blue-700 transition-colors">
                        {item.judul}
                      </h3>
                    </Link>

                    {/* Tombol Baca */}
                    <div className="mt-auto pt-4">
                      <Link
                        href={`/berita/${item.slug}`}
                        className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Baca Selengkapnya{" "}
                        <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            : null}

          {/* EMPTY STATE */}
          {!loading && latestBerita.length === 0 && (
            <div className="col-span-full py-12 text-center bg-slate-50 rounded-[2rem] border border-dashed border-slate-300">
              <p className="text-slate-500">
                Belum ada berita yang diterbitkan.
              </p>
            </div>
          )}
        </div>

        {/* Tombol Mobile */}
        <div className="mt-10 flex justify-center md:hidden">
          <Button
            asChild
            className="rounded-full bg-[#0F172A] text-white w-full py-6 shadow-lg"
          >
            <Link href="/berita">Lihat Semua Berita</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
