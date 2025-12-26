"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Tentang Kami", href: "/tentang" },
  { name: "Galeri", href: "/galeri" },
  { name: "Berita", href: "/berita" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Header dibuat absolute agar background halaman (hero section) 
        bisa terlihat di belakangnya, memberi kesan modern.
        Tidak pakai 'fixed', jadi tidak sticky.
      */}
      <header className="absolute top-0 left-0 w-full z-50 pt-4 md:pt-6 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* 🔹 KIRI: Logo */}
          <Link href="/" className="flex items-center gap-3 z-20 group">
            {/* Wrapper gambar agar rapi, rounded, dan ada border halus */}
            <div className="relative w-15 h-15  group-hover:border-blue-200 transition-colors">
              <Image
                src="/images/about/icon.jpg"
                alt="Logo Yayasan Khazanah Kebajikan"
                width={200} // Sesuaikan dengan w-10 (40px)
                height={200} // Sesuaikan dengan h-10 (40px)
                className="object-cover w-full h-full" // Agar gambar tidak gepeng (stretch)
              />
            </div>

            <span className="font-bold text-lg text-slate-900 tracking-tight hidden sm:block group-hover:text-blue-700 transition-colors">
              Khazanah Kebajikan Palembang
            </span>
          </Link>

          {/* 🔹 TENGAH: Menu Desktop (Floating Pill Container) */}
          {/* Container ini yang membuat efek 'Menu Float' seperti referensi */}
          <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-white/60 backdrop-blur-md border border-white/40 shadow-sm rounded-full px-2 py-1.5 flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-blue-700 bg-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* 🔹 KANAN: Actions (Icons + CTA) */}
          <div className="hidden md:flex items-center gap-3 z-20">
            {/* Search Icon (Dummy) */}
            <button className="p-2 text-slate-500 hover:text-blue-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Divider Kecil */}
            <div className="h-4 w-px bg-slate-300 mx-1"></div>

            <Link href="/donasi">
              <Button className="bg-amber-500 hover:bg-blue-800 text-white rounded-full px-6 shadow-lg shadow-slate-900/10 transition-all active:scale-95">
                Donasi Sekarang
              </Button>
            </Link>
          </div>

          {/* 🔹 Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-700 bg-white/50 backdrop-blur-md rounded-full border border-white/20 hover:bg-white transition-colors z-20"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* 🔹 MOBILE MENU (Floating Card Style) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 md:hidden p-4 space-y-2"
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl ${
                    pathname === item.href
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-slate-600 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="h-px bg-gray-100 my-2" />
              <Link href="/donasi" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-[#0F172A] text-white rounded-xl py-6 shadow-lg">
                  <HeartHandshake className="mr-2 w-5 h-5" /> Donasi Sekarang
                </Button>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
