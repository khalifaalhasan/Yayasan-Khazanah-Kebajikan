import { Button } from "../ui/button";

export function ContactSection() {
  return (
    <section id="kontak" className="py-20 bg-blue-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Kontak Kami</h2>
        <p className="text-gray-600 mb-8">Hubungi kami untuk informasi pendaftaran dan kegiatan yayasan.</p>
        <Button size="lg" className="bg-primary text-white">Hubungi Sekarang</Button>
      </div>
    </section>
  )
}