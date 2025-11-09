// app/berita/[slug]/page.tsx
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  // 2. Fetch berita lain (10 lainnya, kecuali berita sekarang)
  const { data: beritaLain } = await supabase
    .from("berita")
    .select("id, judul, slug, thumbnail")
    .neq("slug", slug)
    .order("created_at", { ascending: false })
    .limit(10);

  // 3. Fetch berita unggulan (is_unggulan == true, skip current)
  const { data: unggulan } = await supabase
    .from("berita")
    .select("id, judul, slug, thumbnail")
    .eq("is_unggulan", true)
    .neq("slug", slug)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 py-10 px-4 pt-25 ">
      {/* Kolom konten utama */}
      <main className="lg:col-span-3 h-auto ">
        {current.thumbnail && (
          <Image
            src={current.thumbnail}
            alt={current.judul}
            width={1200} // sesuaikan lebar max sesuai kebutuhan desain
            height={600} // tinggi yang sesuai untuk menjaga aspect ratio ideal
            className="rounded-2xl object-contain w-full h-auto"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        )}
        <h1 className="py-5 text-3xl font-bold mb-3">{current.judul}</h1>
        <div className="text-sm text-gray-500 mb-6">
          {current.penulis && <span>{current.penulis} • </span>}
          {new Date(current.tanggal ?? current.created_at).toLocaleDateString(
            "id-ID",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}
        </div>
        <article
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: current.isi }}
        />
      </main>
      {/* Sidebar */}

      <aside className="space-y-10">
        {/* Berita Lainnya */}
        <section>
          <h2 className="text-base font-semibold text-indigo-800 mb-3">
            Berita Lainnya
          </h2>
          <ul className="space-y-4">
            {beritaLain?.map((item) => (
              <li key={item.slug} className="flex gap-3">
                <Link
                  href={`/berita/${item.slug}`}
                  title={item.judul}
                  className="group flex items-center gap-3 w-full"
                >
                  <div className="w-32 h-20 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                    {item.thumbnail && (
                      <img
                        src={item.thumbnail}
                        alt={item.judul}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <span className="text-xs text-slate-700 group-hover:text-indigo-700 font-medium line-clamp-2">
                    {item.judul}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Berita Unggulan */}
        {unggulan && unggulan.length > 0 && (
          <section>
            <h2 className="text-base font-semibold text-red-700 mb-3">
              Berita Unggulan
            </h2>
            <ul className="space-y-4">
              {unggulan.map((item) => (
                <li key={item.slug} className="flex gap-3">
                  <Link
                    href={`/berita/${item.slug}`}
                    title={item.judul}
                    className="group flex items-center gap-3 w-full"
                  >
                    <div className="w-14 h-10 bg-red-100 rounded flex-shrink-0 overflow-hidden ring-2 ring-red-200">
                      {item.thumbnail && (
                        <Image
                          src={item.thumbnail}
                          alt={item.judul}
                          className="w-full h-full object-cover"
                          width={112}
                          height={80}
                        />
                      )}
                    </div>
                    <span className="text-xs text-red-700 font-semibold group-hover:underline line-clamp-2">
                      {item.judul}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </aside>
    </div>
  );
}
