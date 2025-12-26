import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Ambil path saat ini
  const { pathname } = request.nextUrl

  // ============================================================
  // BAGIAN 1: MAINTENANCE MODE CHECKER
  // ============================================================
  
  // Cek apakah env variable aktif
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true'

  // Daftar path yang BOLEH diakses saat maintenance (bypass)
  const isAllowedPath = 
    pathname === '/maintenance' ||         // Halaman maintenance itu sendiri
    pathname.startsWith('/_next') ||       // File internal Next.js
    pathname.startsWith('/static') ||      // Folder static
    pathname.includes('.')                 // File berekstensi (gambar, favicon, dll)

  if (isMaintenanceMode) {
    // Jika path bukan yang dikecualikan, rewrite ke halaman maintenance
    if (!isAllowedPath) {
      const url = request.nextUrl.clone()
      url.pathname = '/maintenance'
      return NextResponse.rewrite(url)
    }
    
    // Jika user sedang membuka '/maintenance' atau aset, biarkan lewat
    return NextResponse.next()
  }

  // ============================================================
  // BAGIAN 2: SUPABASE AUTH (Hanya jalan jika TIDAK Maintenance)
  // ============================================================

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Refresh session
  const { data: { session } } = await supabase.auth.getSession()

  // LOGIKA PROTEKSI RUTE (DASHBOARD VS LOGIN)
  
  // Kasus 1: Belum Login akses Dashboard
  if (!session && (pathname === '/dashboard' || pathname.startsWith('/dashboard/'))) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Kasus 2: Sudah Login akses halaman Login
  if (session && pathname === '/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return response
}

// ============================================================
// CONFIGURATION
// ============================================================

export const config = {
  // PENTING: Matcher harus diubah agar mencakup SELURUH website.
  // Jika pakai matcher lama, maintenance mode hanya akan jalan di /dashboard & /login.
  // Matcher di bawah ini akan menangkap semua route KECUALI file aset/api.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}