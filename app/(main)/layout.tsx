import NavMain from "@/components/sections/NavMain";
import Footer from "@/components/sections/footer";
import { Toaster } from "sonner";
import type { Metadata } from "next";

const DOMAIN_URL =
  process.env.NEXT_PUBLIC_DOMAIN_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN_URL),
  title: {
    default: "Yayasan Khazanah Kebajikan",
    template: "%s | Khazanah Kebajikan", // Otomatis nambahin suffix di setiap page
  },
  description:
    "Lembaga sosial dan pendidikan Islam di Palembang yang fokus pada pembinaan anak yatim, dhuafa, dan pemberdayaan umat.",
  keywords: [
    "Yayasan Palembang",
    "Panti Asuhan Palembang",
    "Donasi Yatim",
    "Khazanah Kebajikan",
    "Pendidikan Islam",
    "Tahfidz Quran",
  ],
  authors: [{ name: "Tim IT YKK" }],
  openGraph: {
    title: "Yayasan Khazanah Kebajikan",
    description: "Membangun generasi berilmu dan berakhlak mulia.",
    url: DOMAIN_URL,
    siteName: "Yayasan Khazanah Kebajikan",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-default.jpg", // Pastikan kamu punya gambar ini di folder public
        width: 1200,
        height: 630,
        alt: "Yayasan Khazanah Kebajikan Palembang",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          {/* Navbar */}
          <NavMain />

          {/* Konten Utama */}
          <main className="grow">{children}</main>
          <Toaster richColors position="top-center" />

          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
