"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function PendaftaranForm() {
  const [formData, setFormData] = useState({
    name: "",
    nisn: "",
    asal_sekolah: "",
    foto: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // ✅ Tambahkan tipe React.ChangeEvent<HTMLInputElement>
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Tambahkan tipe React.FormEvent<HTMLFormElement>
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    const { error } = await supabase.from("pendaftaran").insert([formData]);

    setLoading(false);

    if (error) {
      console.error("Error inserting data:", error);
      alert("Gagal menambahkan data!");
    } else {
      setSuccessMsg("Data berhasil ditambahkan 🎉");
      setFormData({
        name: "",
        nisn: "",
        asal_sekolah: "",
        foto: "",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">
        Tambah Data Pendaftar
      </h2>

      <div>
        <Label className="pb-2" htmlFor="name">
          Nama Lengkap
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Masukkan nama lengkap"
          required
        />
      </div>

      <div>
        <Label className="pb-2" htmlFor="nisn">
          NISN
        </Label>
        <Input
          id="nisn"
          name="nisn"
          value={formData.nisn}
          onChange={handleChange}
          placeholder="Masukkan NISN"
          required
        />
      </div>

      <div>
        <Label className="pb-2" htmlFor="asal_sekolah">
          Asal Sekolah
        </Label>
        <Input
          id="asal_sekolah"
          name="asal_sekolah"
          value={formData.asal_sekolah}
          onChange={handleChange}
          placeholder="Masukkan asal sekolah"
          required
        />
      </div>

      <div>
        <Label className="pb-2" htmlFor="foto">
          URL Foto
        </Label>
        <Input
          id="foto"
          name="foto"
          value={formData.foto}
          onChange={handleChange}
          placeholder="Masukkan URL foto (opsional)"
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Menyimpan..." : "Simpan"}
      </Button>

      {successMsg && (
        <p className="text-green-600 text-center text-sm mt-2">{successMsg}</p>
      )}
    </form>
  );
}
