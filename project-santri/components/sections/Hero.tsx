import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center bg-gradient-to-b from-blue-50 to-white pt-24 pb-0">
      {/* Konten teks utama */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Membangun Generasi{" "}
          <span className="text-primary">Berilmu dan Berakhlak Mulia</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Yayasan Khazanah Kebajikan berkomitmen untuk mencetak santri yang
          berwawasan luas, berkarakter kuat, dan berakhlak mulia melalui
          pendidikan Islam terpadu.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="bg-primary text-white hover:bg-primary/90 transition-all"
          >
            Daftar Sekarang
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 transition-all"
          >
            Pelajari Lebih Lanjut
          </Button>
        </div>
      </div>

      {/* Gambar full width di bawah hero */}
      <div className="mt-16 w-auto relative">
        <div className="absolute inset-0 bg-gradient-to-blue from-white via-transparent to-transparent z-10" />
        <Image
          src="/images/hero-santri.png"
          alt="Santri Khazanah"
          width={1700}
          height={800}
          className="w-full h-[400px] md:h-[600px] object-cover rounded-t-3xl shadow-lg"
          priority
        />
      </div>
    </section>
  );
}
