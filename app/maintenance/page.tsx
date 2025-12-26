import type { Metadata } from "next";

// Agar tab browser menampilkan judul yang sesuai
export const metadata: Metadata = {
  title: "Under Maintenance",
  description: "Kami sedang melakukan perbaikan sistem.",
  robots: {
    index: false, // Memberitahu Google agar halaman ini jangan di-index
    follow: false,
  },
};

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon Ilustrasi */}
        <div className="flex justify-center">
          <div className="bg-blue-50 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M12 18v-6" />
              <path d="M12 12h.01" />
              <path d="m16 16-4 4-4-4" />
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Sedang Dalam Perbaikan
          </h1>
          <p className="text-gray-500">
            Kami sedang melakukan pembaruan sistem untuk meningkatkan performa.
            Mohon kembali lagi dalam beberapa saat.
          </p>
        </div>

        {/* Optional: Footer / Contact info */}
        <div className="pt-8 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Nama Perusahaan Kamu
        </div>
      </div>
    </div>
  );
}
