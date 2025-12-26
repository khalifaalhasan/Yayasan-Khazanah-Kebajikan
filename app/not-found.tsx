import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Icon: Peta/Pencarian Hilang */}
        <div className="flex justify-center mb-6">
          <div className="bg-orange-50 p-4 rounded-full">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="64" 
              height="64" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#ea580c" // Orange Warning
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
              <path d="M10 8h2M10 12h2" strokeOpacity="0.5"/> 
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Halaman Tidak Ditemukan 🔍
        </h1>

        <p className="text-gray-500 mb-8 leading-relaxed">
          Waduh, sepertinya halaman yang Anda cari sudah pindah atau memang tidak pernah ada.
        </p>

        <Link 
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}