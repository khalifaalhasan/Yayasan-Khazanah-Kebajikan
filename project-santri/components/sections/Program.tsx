export function ProgramSection() {
  const programs = [
    { title: "Tahfidz Al-Qur'an", desc: "Membina generasi penghafal Al-Qur'an yang berilmu dan berakhlak." },
    { title: "Madrasah Modern", desc: "Pendidikan umum berpadu nilai-nilai Islam dan teknologi modern." },
    { title: "Kegiatan Sosial", desc: "Menumbuhkan empati dan kepedulian melalui aksi sosial santri." },
  ]

  return (
    <section id="program" className="py-20 bg-blue-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-10">Program Unggulan</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((p, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-primary mb-2">{p.title}</h3>
              <p className="text-gray-600">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
