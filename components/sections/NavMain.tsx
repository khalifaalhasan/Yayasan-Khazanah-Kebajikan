"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  ArrowTopRightOnSquareIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/16/solid";

const navItems = [
  { name: "Beranda", href: "#beranda" },
  { name: "Tentang", href: "#tentang" },
  { name: "Program", href: "#program" },
  { name: "Galeri", href: "#galeri" },
  { name: "Kontak", href: "#kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" } // deteksi tengah layar
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <header className="border-b border-gray-200 bg-white/70 backdrop-blur-md sticky top-0 z-50 px-4 md:px-20">
      <div className="container mx-auto flex items-center justify-between py-4 px-2 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Logo Yayasan"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-semibold text-lg text-gray-800">
            Yayasan Khazanah Kebajikan
          </span>
        </Link>

        {/* Tombol Hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        {/* Menu utama */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-all ${
                activeSection === item.href.replace("#", "")
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Tombol Bergabung */}
        <div className="hidden md:block">
          <Link href="/Pendaftaran" target="_blank">
            <Button className="bg-primary text-white hover:bg-primary/90">
              Bergabung Bersama Kami
              <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
          <nav className="flex flex-col space-y-2 p-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block text-sm font-medium py-2 px-3 rounded-md transition-colors ${
                  activeSection === item.href.replace("#", "")
                    ? "text-primary bg-primary/10"
                    : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                }`}
              >
                {item.name}
              </a>
            ))}
            <Link
              href="/Pendaftaran"
              target="_blank"
              onClick={() => setIsOpen(false)}
            >
              <Button className="w-full bg-primary text-white hover:bg-primary/90">
                Bergabung Bersama Kami
                <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
