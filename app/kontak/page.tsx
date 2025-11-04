import ContactSection from "@/components/sections/Contact";
import HeaderPage from "@/components/sections/HeaderPage";
import LazySection from "@/components/utils/LazySection";

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
