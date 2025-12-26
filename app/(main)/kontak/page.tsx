import ContactSection from "@/components/pages/Contact";
import HeaderPage from "@/components/sections/HeaderPage";
import LazySection from "@/components/utils/LazySection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description:
    "Lokasi, kontak WhatsApp, dan formulir pesan Yayasan Khazanah Kebajikan Palembang. Kami siap melayani aspirasi Anda.",
};

// ... function Page() ...

export default function ContactPage() {
  return (
    <>
      <>
        <HeaderPage />
      </>
      <LazySection>
        <ContactSection />
      </LazySection>
    </>
  );
}
