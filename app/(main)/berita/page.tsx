import BeritaSection from "@/components/pages/berita";
import HeaderPage from "@/components/sections/HeaderPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Berita & Artikel",
  description:
    "Kabar terbaru, artikel inspiratif, dan laporan kegiatan terkini dari lingkungan Yayasan.",
};
export default function BeritaPage() {
  return (
    <>
      <>
        <HeaderPage />
      </>
      <BeritaSection />
    </>
  );
}
