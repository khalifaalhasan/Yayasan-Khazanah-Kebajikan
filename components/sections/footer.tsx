import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import branding from "@/data/branding.json"; // 👈 Import Data Branding

export default function Footer() {
  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Tentang", href: "/tentang" },
    { name: "Program", href: "/program" },
    { name: "Galeri", href: "/galeri" },
    { name: "Berita", href: "/berita" },
    { name: "Kontak", href: "/kontak" },
    // { name: "Dashboard", href: "/dashboard" }, // Opsional, biasanya hidden di footer public
  ];

  return (
    <footer className="relative bg-[#0F172A] text-white pt-20 pb-10 overflow-hidden border-t border-slate-800">
      {/* Dekorasi Background Halus */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-900/20 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Grid 4 kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-slate-800 pb-12 mb-8">
          {/* 🔹 1. Logo & Deskripsi */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-bold tracking-tight">
                Khazanah <span className="text-blue-400">Kebajikan</span>
              </h3>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm">
              {branding.organization.description}
            </p>
          </div>

          {/* 🔹 2. Navigasi Cepat */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Navigasi</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-blue-400 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 🔹 3. Informasi Kontak (Dari JSON) */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Hubungi Kami</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>{branding.organization.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <a
                  href={branding.contact.whatsappUrl}
                  target="_blank"
                  className="hover:text-blue-400 transition-colors"
                >
                  {branding.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <a
                  href={`mailto:${branding.contact.email}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  {branding.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* 🔹 4. Media Sosial (Dari JSON) */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Ikuti Kami</h4>
            <div className="flex gap-3">
              {/* Instagram */}
              <Link
                href={branding.socials.instagram}
                target="_blank"
                className="w-10 h-10 flex items-center justify-center bg-slate-800 rounded-full hover:bg-pink-600 hover:text-white transition-all text-slate-400"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>

              {/* Facebook */}
              <Link
                href={branding.socials.facebook}
                target="_blank"
                className="w-10 h-10 flex items-center justify-center bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-all text-slate-400"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>

              {/* Youtube */}
              <Link
                href={branding.socials.youtube}
                target="_blank"
                className="w-10 h-10 flex items-center justify-center bg-slate-800 rounded-full hover:bg-red-600 hover:text-white transition-all text-slate-400"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-slate-500 text-sm">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-slate-300">
              {branding.organization.name}
            </span>
            . All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
