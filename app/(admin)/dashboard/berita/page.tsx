import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function AdminBeritaPage() {
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
        <Input placeholder="Cari berita..." className="max-w-sm" />
      </div>

      {/* 🔹 DataTable dari Supabase */}
      <AdminBeritaPage />
    </div>
  );
}
