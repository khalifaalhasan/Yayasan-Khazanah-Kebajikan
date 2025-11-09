import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies(); // <- pastikan await!

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: cookieStore,
    }
  );
}
