"use client";

import { useState } from "react";
import HeaderPage from "@/components/sections/HeaderPage";
import branding from "@/data/branding.json"; // Import data JSON
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Copy,
  CheckCircle2,
  Send,
  CreditCard,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function KontakPage() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", message: "" });

  // Fungsi Salin Rekening
  const handleCopyRek = () => {
    navigator.clipboard.writeText(branding.bank.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Fungsi Kirim ke WhatsApp
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, message } = formData;
    if (!name || !message) return;

    const text = `Assalamualaikum Admin, saya ${name}. %0A%0A${message}`;
    window.open(
      `https://wa.me/${branding.contact.whatsappAPI}?text=${text}`,
      "_blank"
    );
  };

  return (
    <>
      <section className="bg-slate-50 py-20 md:py-28 relative overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* ==========================
                KOLOM KIRI: Info & Donasi
                ========================== */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              {/* Info Kontak */}
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                  Informasi Kontak
                </h2>
                <div className="space-y-6">
                  {/* Alamat */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">
                        Alamat Yayasan
                      </h3>
                      <p className="text-slate-600 leading-relaxed mt-1">
                        {branding.organization.address}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">
                        Email
                      </h3>
                      <a
                        href={`mailto:${branding.contact.email}`}
                        className="text-slate-600 hover:text-blue-700 transition-colors mt-1 block"
                      >
                        {branding.contact.email}
                      </a>
                    </div>
                  </div>

                  {/* Telepon / WA */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">
                        WhatsApp / Telepon
                      </h3>
                      <a
                        href={branding.contact.whatsappUrl}
                        target="_blank"
                        className="text-slate-600 hover:text-blue-700 transition-colors mt-1 block"
                      >
                        {branding.contact.phoneDisplay} (Admin)
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ==========================
                KOLOM KANAN: Form & Map
                ========================== */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              {/* Form Kirim Pesan */}
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Kirim Pesan
                </h3>
                <p className="text-slate-500 mb-8">
                  Punya pertanyaan atau ingin berkolaborasi? Kirimkan pesan
                  langsung ke WhatsApp kami.
                </p>

                <form onSubmit={handleSendMessage} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">
                      Nama Lengkap
                    </label>
                    <Input
                      placeholder="Contoh: Hamba Allah"
                      className="rounded-xl border-slate-200 focus-visible:ring-blue-500 h-12 bg-slate-50"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">
                      Isi Pesan
                    </label>
                    <Textarea
                      placeholder="Tuliskan pesan, pertanyaan, atau konfirmasi donasi Anda di sini..."
                      className="rounded-xl border-slate-200 focus-visible:ring-blue-500 min-h-[140px] bg-slate-50 resize-none"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 rounded-full bg-green-600 hover:bg-green-700 text-white text-lg font-bold shadow-lg shadow-green-600/20 transition-all hover:scale-[1.02]"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Kirim via WhatsApp
                  </Button>
                </form>
              </div>

              {/* Google Maps Embed */}
              <div className="relative w-full h-64 md:h-80 rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3984.636249663199!2d104.7930082!3d-2.9205171!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b76d59bb63cab%3A0x35e588c1b04dc5c6!2sPondok%20Pesantren%20Khazanah%20Kebajikan!5e0!3m2!1sid!2sid!4v1766825067249!5m2!1sid!2sid" // Pastikan link ini benar link embed dari Google Maps
                  width="100%" // Ubah jadi 100% agar responsif mengikuti container
                  height="100%" // Ubah jadi 100% agar responsif
                  style={{ border: 0 }} // 👈 Perbaikan 1: Style harus object {{ }}
                  allowFullScreen // 👈 Perbaikan 2: allowfullscreen (huruf kecil) -> allowFullScreen (camelCase)
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" // 👈 Perbaikan 3: referrerpolicy -> referrerPolicy
                  className="grayscale hover:grayscale-0 transition-all duration-500" // Tambahan class style (opsional)
                />
                <Link
                  href="https://maps.app.goo.gl/WgqAXQRz51hxqyPn6" // Ganti dengan link map asli untuk arah
                  target="_blank"
                  className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-full shadow-md text-sm font-bold text-slate-800 flex items-center gap-2 hover:bg-blue-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Buka di Maps
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
