"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Tentang", href: "#tentang" },
  { name: "Program", href: "#program" },
  { name: "Galeri", href: "#galeri" },
  { name: "Kontak", href: "#kontak" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-gray-200 bg-white/70 backdrop-blur-md sticky top-0 z-50 px-20">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
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

        {/* Menu */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Tombol Login */}
        <div className="hidden md:block">
          <Link href="/Pendaftaran" target="_blank">
            <Button className="bg-primary text-white hover:bg-primary/90">
              Bergabung Bersama Kami
              <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
