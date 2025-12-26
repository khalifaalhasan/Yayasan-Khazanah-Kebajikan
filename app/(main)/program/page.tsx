import HeaderPage from "@/components/sections/HeaderPage";
import LazySection from "@/components/utils/LazySection";
import ProgramSection  from "@/components/sections/ProgramSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Program Unggulan",
  description: "Berbagai program kami: Pendidikan (Tahfidz/Sekolah), Sosial (Santunan Yatim/Dhuafa), dan Pemberdayaan Ekonomi Umat.",
};

export default function ProgramPage() {
  return (
    <>
      <>
        <HeaderPage />
      </>
      <LazySection>
  
        <ProgramSection />
      </LazySection>
    </>
  );
}
