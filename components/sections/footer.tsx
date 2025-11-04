export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Kolom 1: Logo & Deskripsi */}
          <div>
            <h3 className="text-2xl font-bold mb-3">Khazanah Kebajikan</h3>
            <p className="text-blue-100">
              Yayasan pendidikan Islam yang berkomitmen membangun generasi
              berilmu dan berakhlak mulia.
            </p>
          </div>

          {/* Kolom 2: Navigasi */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Navigasi</h4>
            <ul className="space-y-2 text-blue-100">
              <li>
                <a href="#tentang" className="hover:text-white transition">
                  Tentang
                </a>
              </li>
              <li>
                <a href="#program" className="hover:text-white transition">
                  Program
                </a>
              </li>
              <li>
                <a href="#berita" className="hover:text-white transition">
                  Berita
                </a>
              </li>
              <li>
                <a href="#kontak" className="hover:text-white transition">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Kontak</h4>
            <ul className="space-y-2 text-blue-100">
              <li>Jl. Contoh No. 45, Palembang</li>
              <li>Telp: (0711) 555-6789</li>
              <li>Email: info@khazanahkebajikan.or.id</li>
            </ul>
          </div>

          {/* Kolom 4: Media Sosial */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Ikuti Kami</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition"
              >
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition"
              >
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition"
              >
                <i className="ri-youtube-fill text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Garis bawah */}
        <div className="border-t border-white/20 mt-10 pt-6 text-center text-blue-100 text-sm">
          © {new Date().getFullYear()} Yayasan Khazanah Kebajikan. Semua Hak
          Dilindungi.
        </div>
      </div>
    </footer>
  );
}
