// app/berita/[slug]/page.tsx
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;  // Unwrap Promise
  const { slug } = resolvedParams;

  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("berita")
    .select("*")
    .eq("slug", slug)
    .single();


  if (!data) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-8">
        <Link href="/berita" passHref>
          <Button variant="outline">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Kembali ke Semua Berita
          </Button>
        </Link>
      </div>

      {data.gambar && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <Image
            src={data.gambar}
            alt={data.judul}
            width={800}
            height={450}
            className="w-full object-cover"
            priority
          />
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-bold mb-4">{data.judul}</h1>
      <p className="text-sm text-muted-foreground mb-8">{new Date(data.created_at).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      })}</p>
      
      <article
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: data.isi }}
      />
    </main>
  );
}
