import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Ambil path saat ini
  const { pathname } = request.nextUrl;

  // ============================================================
  // BAGIAN 1: MAINTENANCE MODE CHECKER
  // ============================================================

  const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";

  // Daftar path yang BOLEH diakses saat maintenance (bypass)
  const isAllowedPath =
    pathname === "/maintenance" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".");

  if (isMaintenanceMode) {
    if (!isAllowedPath) {
      const url = request.nextUrl.clone();
      url.pathname = "/maintenance";
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // ============================================================
  // BAGIAN 2: SUPABASE AUTH & DASHBOARD PROTECTION
  // ============================================================

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  // Cek apakah user punya session (Login)
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Definisi Route
  const isDashboardRoute = pathname.startsWith("/dashboard"); // Menangkap /dashboard, /dashboard/settings, dll
  const isLoginPage = pathname === "/login";

  // --- LOGIKA PROTEKSI ---

  // 1. Jika User BELUM LOGIN dan mencoba akses DASHBOARD
  if (!session && isDashboardRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 2. Jika User SUDAH LOGIN dan mencoba akses halaman LOGIN
  if (session && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}

// ============================================================
// CONFIGURATION
// ============================================================

export const config = {
  // Matcher menangkap semua route agar maintenance mode efektif global
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
