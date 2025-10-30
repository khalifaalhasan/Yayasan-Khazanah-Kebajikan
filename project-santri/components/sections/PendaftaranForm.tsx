"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input, Button, Card, CardHeader, CardBody } from "@heroui/react";

export default function PendaftaranForm() {
  const [formData, setFormData] = useState({
    name: "",
    nisn: "",
    asal_sekolah: "",
    foto: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <Card className="p-4 shadow-lg">
        <CardHeader className="text-xl font-semibold text-center">
          Tambah Data Pendaftar
        </CardHeader>
        <CardBody className="space-y-4">
          <Input
            isRequired
            label="Nama Lengkap"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
          />
          <Input
            isRequired
            label="NISN"
            name="nisn"
            value={formData.nisn}
            onChange={handleChange}
            placeholder="Masukkan NISN"
          />
          <Input
            isRequired
            label="Asal Sekolah"
            name="asal_sekolah"
            value={formData.asal_sekolah}
            onChange={handleChange}
            placeholder="Masukkan asal sekolah"
          />
          <Input
            label="URL Foto"
            name="foto"
            value={formData.foto}
            onChange={handleChange}
            placeholder="Masukkan URL foto (opsional)"
          />

          <Button
            type="submit"
            color="primary"
            fullWidth
            isLoading={loading}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>

          {successMsg && (
            <p className="text-success text-center text-sm mt-2">{successMsg}</p>
          )}
        </CardBody>
      </Card>
    </form>
  );
}
