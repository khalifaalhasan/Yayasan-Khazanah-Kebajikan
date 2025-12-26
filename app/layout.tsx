import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Yayasan Khazanah Kebajikan",
  description: "Website resmi Yayasan Khazanah Kebajikan",
  // Konfigurasi Open Graph Global
  openGraph: {
    title: "Yayasan Khazanah Kebajikan", // sesuaikan title dan description dengan app kalian
    description: "Mari berbagi kebaikan bersama kami.",
    url: "https://khazanahkebajikan.com", //domain kalian
    siteName: "Yayasan Khazanah Kebajikan",
    images: [
      {
        url: "/banner-utama.png", // Pastikan file ada di folder public
        width: 1200,
        height: 630,
        alt: "Banner Yayasan Khazanah Kebajikan",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-blue from-blue-100 via-white to-white`}
      >
        <div className="flex flex-col min-h-screen">
          {/* Navbar */}

          {/* Konten Utama */}
          <main className="grow">{children}</main>
          <Toaster richColors position="top-center" />

          {/* Footer */}
        </div>
      </body>
    </html>
  );
}
