import { AboutSection } from "@/components/sections/About";
import { ContactSection } from "@/components/sections/Contact";
import FeatureProgram from "@/components/sections/FeatureProgram";
import { GallerySection } from "@/components/sections/Gallery";
import HeroSection from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeatureProgram />
      <GallerySection />
      <ContactSection />
    </>
  );
}
