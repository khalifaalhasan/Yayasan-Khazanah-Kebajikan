import HalamanDonasi from "@/components/pages/Donasi/donasipublic";
import HeaderPage from "@/components/sections/HeaderPage";
import LazySection from "@/components/utils/LazySection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donasi & Zakat",
  description:
    "Salurkan Zakat, Infaq, dan Sedekah Anda melalui Yayasan Khazanah Kebajikan. Amanah, transparan, dan berdampak langsung.",
};

// ... function Page() ...

export default function DonasiPage() {
  return (
    <>
      <>
        <HeaderPage />
      </>
      <LazySection>
        <main className="mt-20">
          <HalamanDonasi />
        </main>
      </LazySection>
    </>
  );
}
