import Image from "next/image";

export function GallerySection() {
  return (
    <section id="galeri" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-10">Galeri Kegiatan</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="overflow-hidden rounded-xl shadow hover:scale-105 transition">
              <Image
                src={`/images/galeri-${n}.jpg`}
                alt={`Galeri ${n}`}
                width={400}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
