// app/berita/[slug]/page.tsx
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeaderPage from "@/components/sections/HeaderPage"; // Pastikan import ini benar
import { Calendar, User, ArrowRight, Tag, Clock } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";


type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Fungsi khusus Next.js untuk SEO Dinamis
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // 1. Ambil slug
  const { slug } = await params;
  
  // 2. Init Supabase (buat client baru di sini khusus metadata)
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

  // 3. Fetch data berita
  const { data: berita } = await supabase
    .from("berita")
    .select("judul, isi, thumbnail, created_at")
    .eq("slug", slug)
    .single();

  // 4. Fallback jika berita tidak ketemu
  if (!berita) {
    return {
      title: "Berita Tidak Ditemukan",
    };
  }

  // 5. Buat deskripsi singkat (Excerpt) dari isi HTML
  // Kita hilangkan tag HTML sederhana untuk jadi deskripsi
  const excerpt = berita.isi
    ? berita.isi.replace(/<[^>]+>/g, "").substring(0, 160) + "..."
    : "Baca selengkapnya berita ini di website Yayasan Khazanah Kebajikan.";

  // 6. Return Metadata
  return {
    title: berita.judul,
    description: excerpt,
    openGraph: {
      title: berita.judul,
      description: excerpt,
      // Jika ada thumbnail pakai itu, jika tidak pakai gambar default dari parent layout
      images: berita.thumbnail ? [berita.thumbnail] : (await parent).openGraph?.images || [],
      type: "article",
      publishedTime: berita.created_at,
    },
    twitter: {
      card: "summary_large_image",
      title: berita.judul,
      description: excerpt,
      images: berita.thumbnail ? [berita.thumbnail] : [],
    },
  };
}



// ... function Page() ...

// Inisialisasi Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1. Fetch berita utama
  const { data: current, error: err } = await supabase
    .from("berita")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!current || err) notFound();

  // 2. Fetch berita lain (untuk Sidebar - Limit 5)
  const { data: beritaLain } = await supabase
    .from("berita")
    .select("id, judul, slug, thumbnail, created_at")
    .neq("slug", slug)
    .order("created_at", { ascending: false })
    .limit(5);

  // 3. Fetch berita unggulan (Limit 3)
  const { data: unggulan } = await supabase
    .from("berita")
    .select("id, judul, slug, thumbnail, created_at")
    .eq("is_unggulan", true)
    .neq("slug", slug)
    .order("created_at", { ascending: false })
    .limit(3);

  // Helper Format Tanggal
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Integrasi HeaderPage
        Kita override title/subtitle manual di sini agar lebih spesifik 
        atau gunakan default dari mapping Anda jika props dikosongkan.
      */}
      <HeaderPage />

      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* =======================
                KONTEN UTAMA (Left - 8 Kolom)
                ======================= */}
            <main className="lg:col-span-8">
              {/* Meta Data Artikel */}
              <div className="mb-6">
                {" "}
                {/* Jarak bawah dikurangi sedikit */}
                <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-500 mb-4">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100 flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Berita
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(current.tanggal || current.created_at)}
                  </span>
                  {current.penulis && (
                    <span className="flex items-center gap-1 border-l border-slate-300 pl-3 ml-1">
                      <User className="w-4 h-4" />
                      {current.penulis}
                    </span>
                  )}
                </div>
                {/* PERBAIKAN JUDUL:
                   1. Ukuran font dikecilkan (lg:text-4xl) agar tidak terlalu raksasa.
                   2. font-extrabold diganti font-bold agar lebih elegan.
                   3. leading-tight diganti leading-snug agar jarak antar baris lebih lega.
                */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-snug">
                  {current.judul}
                </h1>
              </div>

              {/* Featured Image */}
              {current.thumbnail && (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-100 mb-10">
                  <Image
                    src={current.thumbnail}
                    alt={current.judul}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 800px"
                    priority
                  />
                </div>
              )}

              {/* Isi Artikel (Typography Plugin) */}
              <article
                className="prose prose-lg prose-slate max-w-none 
                prose-headings:font-bold prose-headings:text-slate-900 
                prose-p:text-slate-600 prose-p:leading-relaxed
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-2xl prose-img:shadow-md 
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-slate-50 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-lg prose-blockquote:not-italic"
                dangerouslySetInnerHTML={{ __html: current.isi }}
              />

              {/* Tombol Kembali */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <Link href="/berita">
                  <button className="text-slate-600 font-medium hover:text-blue-700 hover:underline flex items-center gap-2 transition-all">
                    <ArrowRight className="w-4 h-4 rotate-180" /> Kembali ke
                    Daftar Berita
                  </button>
                </Link>
              </div>
            </main>

            {/* =======================
                SIDEBAR (Right - 4 Kolom)
                ======================= */}
            <aside className="lg:col-span-4 space-y-10">
              {/* Sticky Container */}
              <div className="sticky top-28 space-y-10">
                {/* Widget 1: Berita Unggulan */}
                {unggulan && unggulan.length > 0 && (
                  <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <span className="w-1 h-6 bg-amber-500 rounded-full" />
                      Pilihan Redaksi
                    </h3>
                    <div className="space-y-6">
                      {unggulan.map((item) => (
                        <Link
                          href={`/berita/${item.slug}`}
                          key={item.id}
                          className="group block"
                        >
                          <div className="relative h-40 rounded-2xl overflow-hidden mb-3 bg-slate-200">
                            {item.thumbnail && (
                              <Image
                                src={item.thumbnail}
                                alt={item.judul}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            )}
                            <div className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                              <Clock className="w-3 h-3" /> POPULER
                            </div>
                          </div>
                          <h4 className="font-bold text-slate-800 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                            {item.judul}
                          </h4>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Widget 2: Berita Terbaru Lainnya */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-600 rounded-full" />
                    Berita Lainnya
                  </h3>
                  <div className="flex flex-col gap-6">
                    {beritaLain?.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/berita/${item.slug}`}
                        className="group flex gap-4 items-start"
                      >
                        {/* Thumbnail Kecil */}
                        <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                          {item.thumbnail && (
                            <Image
                              src={item.thumbnail}
                              alt={item.judul}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          )}
                        </div>

                        {/* Text Info */}
                        <div className="flex flex-col h-20 justify-between py-0.5">
                          <h4 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                            {item.judul}
                          </h4>
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(item.created_at)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
