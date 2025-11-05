import HeroSection from "@/components/pages/Hero";
import AboutSection from "@/components/sections/AboutSection";
import BeritaPreview from "@/components/sections/BeritaSection";
import CTASection from "@/components/sections/CTASection";
import GaleriPreview from "@/components/sections/GaleriSection";
import ProgramPreview from "@/components/sections/ProgramSection";
import LazySection from "@/components/utils/LazySection";

export default function Home() {
  return (
    <>
      <>
        <HeroSection />
        <LazySection>
          <AboutSection />
          <ProgramPreview />
          <GaleriPreview />
          <BeritaPreview />
          <CTASection />
        </LazySection>
      </>
    </>
  );
}
