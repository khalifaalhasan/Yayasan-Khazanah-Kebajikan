
import AboutGoals from "@/components/sections/About/AboutGoals";
import AboutIntro from "@/components/sections/About/AboutIntro";
import AboutVisionMission from "@/components/sections/About/AboutVisionMission";
import HeaderPage from "@/components/sections/HeaderPage";
import LazySection from "@/components/utils/LazySection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beranda - Membangun Generasi Beriman",
  description: "Selamat datang di Yayasan Khazanah Kebajikan Palembang. Pusat kegiatan sosial, pendidikan Islam, dan pemberdayaan masyarakat.",
};

export default function AboutPage() {
  return (
    <>
      <>
        <HeaderPage />
      </>
      <LazySection>
        <AboutIntro />
        <AboutVisionMission />
        <AboutGoals />
      </LazySection>
    </>
  );
}
