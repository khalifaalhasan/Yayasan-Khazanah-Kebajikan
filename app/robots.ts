// app/robots.js

export default function robots() {
  return {
    rules: {
      userAgent: "*", // Berlaku untuk semua bot (Google, Bing, dll)
      allow: "/", // Boleh akses semua halaman
      disallow: "/dashboard/", // (Opsional) Larang akses ke halaman admin jika ada
    },
    sitemap: "https://khazanahkebajikan.com/sitemap.xml", // Penting! Tunjukkan lokasi sitemap
  };
}
