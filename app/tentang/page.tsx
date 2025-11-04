import { AboutSection } from "@/components/sections/About";
import HeaderPage from "@/components/sections/HeaderPage";
import LazySection from "@/components/utils/LazySection";

export default function AboutPage() {
  return (
    <>
      <>
      <HeaderPage />     
      </>
    <LazySection>
      <AboutSection />
    </LazySection>
      
    </>
  );
}
