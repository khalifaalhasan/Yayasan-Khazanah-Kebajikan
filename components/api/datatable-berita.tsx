"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Plus, Loader2 } from "lucide-react";

interface Berita {
  id: string;
  judul: string;
  slug: string;
  isi: string;
  thumbnail: string;
  kategori: string;
  is_unggulan: boolean;
  penulis: string;
  tanggal: string;
  created_at: string;
}

export default function AdminBeritaPage() {
  const [data, setData] = useState<Berita[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch data dari Supabase
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("berita")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching berita:", error);
      else setData(data ?? []);

      setLoading(false);
    };

    fetchData();
  }, []);

  // 🔹 Hapus data
  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus berita ini?")) return;
    const { error } = await supabase.from("berita").delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus data");
      return;
    }
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  // 🔹 Kolom DataTable
  const columns: ColumnDef<Berita>[] = [
    {
      accessorKey: "judul",
      header: "Judul",
      cell: ({ row }) => (
        <div className="font-medium max-w-[240px] truncate">
          {row.original.judul}
        </div>
      ),
    },
    {
      accessorKey: "kategori",
      header: "Kategori",
      cell: ({ row }) => <span>{row.original.kategori}</span>,
    },
    {
      accessorKey: "penulis",
      header: "Penulis",
    },
    {
      accessorKey: "tanggal",
      header: "Tanggal",
      cell: ({ row }) => {
        const tanggal = new Date(row.original.tanggal).toLocaleDateString(
          "id-ID",
          { day: "2-digit", month: "long", year: "numeric" }
        );
        return <span>{tanggal}</span>;
      },
    },
    {
      accessorKey: "is_unggulan",
      header: "Unggulan",
      cell: ({ row }) => (
        <span
          className={
            row.original.is_unggulan
              ? "text-green-600 font-semibold"
              : "text-gray-400"
          }
        >
          {row.original.is_unggulan ? "Ya" : "Tidak"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link href={`/admin/dashboard/berita/edit/${row.original.id}`}>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(row.original.id)}
          >
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  // 🔹 Filter hasil pencarian
  const filteredData = data.filter((item) =>
    item.judul.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 px-4 py-6 lg:px-6">
      {/* 🔹 Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Daftar Berita</h1>
        <Link href="/admin/dashboard/berita/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Tambah Berita
          </Button>
        </Link>
      </div>

      {/* 🔹 Search */}
      <div className="flex items-center justify-between">
        <Input
          placeholder="Cari berita..."
          className="max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🔹 Tabel */}
      {loading ? (
        <div className="flex justify-center py-10 text-gray-500">
          <Loader2 className="animate-spin mr-2" /> Memuat data...
        </div>
      ) : filteredData.length > 0 ? (
        <DataTable columns={columns} data={filteredData} />
      ) : (
        <p className="text-gray-400 italic text-center mt-10">
          Tidak ada data berita ditemukan.
        </p>
      )}
    </div>
  );
}
