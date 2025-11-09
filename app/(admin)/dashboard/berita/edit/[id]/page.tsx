"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { id as indonesianLocale } from "date-fns/locale";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";




export default function EditBeritaPage({ params }: { params: { id: string } }) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const router = useRouter();
  const { id } = params;

  // State untuk form (terisi data lama, tetap stay di input)
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [kategori, setKategori] = useState("");
  const [penulis, setPenulis] = useState("");
  const [isUnggulan, setIsUnggulan] = useState(false);
  const [tanggal, setTanggal] = useState<Date | undefined>(undefined);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [oldThumbnail, setOldThumbnail] = useState<string | null>(null);
  type InitFormType = {
    judul: string;
    isi: string;
    kategori: string;
    penulis: string;
    isUnggulan: boolean;
    tanggal: Date | undefined;
    thumbnail: string | null;
  };

  const [initForm, setInitForm] = useState<InitFormType>({
    judul: "",
    isi: "",
    kategori: "",
    penulis: "",
    isUnggulan: false,
    tanggal: undefined,
    thumbnail: null,
  }); // Untuk recover cancel

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data lama saat mount
  useEffect(() => {
    const fetchBerita = async () => {
      setIsLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("berita")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        setError("Gagal memuat data berita. Mungkin berita tidak ditemukan.");
        setIsLoading(false);
        return;
      }
      if (data) {
        setJudul(data.judul ?? "");
        setIsi(data.isi ?? "");
        setKategori(data.kategori ?? "");
        setPenulis(data.penulis ?? "");
        setIsUnggulan(data.is_unggulan ?? false);
        setTanggal(data.tanggal ? new Date(data.tanggal) : undefined);
        setOldThumbnail(data.thumbnail ?? null);
        setPreviewUrl(data.thumbnail ?? null);
        setInitForm({
          judul: data.judul ?? "",
          isi: data.isi ?? "",
          kategori: data.kategori ?? "",
          penulis: data.penulis ?? "",
          isUnggulan: data.is_unggulan ?? false,
          tanggal: data.tanggal ? new Date(data.tanggal) : undefined,
          thumbnail: data.thumbnail ?? null,
        });
      }
      setIsLoading(false);
    };
    if (id) fetchBerita();
  }, [id, supabase]);

  // Handler file gambar baru
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setThumbnail(null);
    setPreviewUrl(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnail(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
  };

  // Handler cancel: recover semua state dari initial form
  const handleCancel = () => {
    if (window.confirm("Batalkan perubahan? Perubahan Anda tidak disimpan.")) {
      setJudul(initForm.judul);
      setIsi(initForm.isi);
      setKategori(initForm.kategori);
      setPenulis(initForm.penulis);
      setIsUnggulan(initForm.isUnggulan);
      setTanggal(initForm.tanggal);
      setOldThumbnail(initForm.thumbnail);
      setPreviewUrl(initForm.thumbnail);
      setThumbnail(null);
    }
  };

  // Handler submit update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!window.confirm("Anda yakin ingin menyimpan perubahan berita ini?")) {
      return;
    }
    if (!judul || !isi || !kategori || !penulis || !(thumbnail || oldThumbnail)) {
      toast.error("Semua field dan gambar wajib diisi.");
      return;
    }
    setIsSaving(true);
    try {
      let urlFinal = oldThumbnail;
      if (thumbnail) {
        const slug = generateSlug(judul);
        const fileExt = thumbnail.name.split(".").pop();
        const fileName = `${slug}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;
        const { error: uploadError } = await supabase.storage.from("berita-images").upload(filePath, thumbnail, { upsert: true });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from("berita-images").getPublicUrl(filePath);
        if (!urlData) throw new Error("Gagal mendapatkan public URL gambar.");
        urlFinal = urlData.publicUrl;
      }
      const updateData = {
        judul, slug: generateSlug(judul), isi, thumbnail: urlFinal, kategori, penulis,
        tanggal: tanggal ? tanggal.toISOString() : null,
        is_unggulan: isUnggulan,
      };
      const { error: updateError } = await supabase.from("berita").update(updateData).eq("id", id);
      if (updateError) throw updateError;
      toast.success("Berita berhasil diperbarui!");
      router.push("/dashboard/berita");
      router.refresh();
    } catch (err: unknown) {
      let msg = "Terjadi kesalahan tidak diketahui";
      if (err instanceof Error) msg = err.message;
      toast.error(`Gagal menyimpan: ${msg}`);
      setError(msg);
    } finally {
      setIsSaving(false);
    }
  };

  // --- UI Loading ---
  if (isLoading) return (
    <main className="py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <Card>
          <CardContent className="py-12">
            Memuat data berita...
          </CardContent>
        </Card>
      </div>
    </main>
  );

  // --- UI Error ---
  if (error) return (
    <main className="py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <Card>
          <CardContent className="py-12 text-red-600">
            {error}
            <Button onClick={() => router.back()} className="mt-4">Kembali</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );

  // --- UI utama: Form Edit ---
  return (
    <main className="py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Edit Berita</CardTitle>
            <CardDescription>Perbarui informasi artikel berita ini.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kolom Kiri */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="judul">Judul Berita</Label>
                  <Input id="judul" placeholder="Judul artikel..." value={judul} onChange={e => setJudul(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Gambar</Label>
                  <Input id="thumbnail" type="file" onChange={handleFileChange} accept="image/*" />
                  {(previewUrl || oldThumbnail) && (
                    <div className="mt-4 space-y-2">
                      <Label>Preview Gambar</Label>
                      <Image src={previewUrl || oldThumbnail!} alt="Preview thumbnail" className="w-full max-w-xs rounded-md border object-cover" width={100} height={50} />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="isi">Isi Berita</Label>
                  <Textarea id="isi" placeholder="Tulis isi lengkap artikel di sini..." value={isi} onChange={e => setIsi(e.target.value)} className="h-48" />
                </div>
              </div>
              {/* Kolom Kanan */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="kategori">Kategori</Label>
                  <Input id="kategori" placeholder="Mis: Kegiatan, Donasi" value={kategori} onChange={e => setKategori(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="penulis">Penulis</Label>
                  <Input id="penulis" placeholder="Nama penulis..." value={penulis} onChange={e => setPenulis(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tanggal">Tanggal Publikasi</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {tanggal ? (
                          format(tanggal, "PPP", { locale: indonesianLocale })
                        ) : (
                          <span>Pilih tanggal</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={tanggal} onSelect={setTanggal} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch id="is_unggulan" checked={isUnggulan} onCheckedChange={setIsUnggulan} />
                  <Label htmlFor="is_unggulan">Jadikan Berita Unggulan?</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleCancel} disabled={isSaving}>
                Batal
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}
