import { GallerySection } from "@/components/pages/Gallery";
import HeaderPage from "@/components/sections/HeaderPage";
import LazySection from "@/components/utils/LazySection";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri Kegiatan",
  description: "Dokumentasi foto kegiatan santri, penyaluran donasi, dan acara-acara sosial di Yayasan Khazanah Kebajikan.",
};

// ... function Page() ...

export default function GaleriPage() {
  return (
    <>
      <>
        <HeaderPage />
      </>
      <LazySection>
        <GallerySection />
      </LazySection>
    </>
  );
}
