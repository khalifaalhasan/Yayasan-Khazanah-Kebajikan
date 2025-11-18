"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error ke layanan pelaporan error (sentry, console, dll)
    console.error("Terjadi kesalahan aplikasi:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 text-center">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[40%] left-[30%] h-[40%] w-[60%] rounded-full bg-red-500/5 blur-[120px]" />
      </div>

      <div className="space-y-6 max-w-md">
        {/* Icon Container */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
          <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-500" />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Terjadi Kesalahan Sistem
          </h2>
          <p className="text-muted-foreground text-lg">
            Mohon maaf, kami mengalami kendala teknis saat memproses permintaan Anda. Tim kami telah diberitahu.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button 
            onClick={() => reset()} 
            size="lg" 
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Coba Lagi
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Ke Beranda
            </Link>
          </Button>
        </div>

        {/* Technical Details (Opsional, bagus untuk debugging admin) */}
        <div className="pt-8">
          <div className="rounded-lg bg-muted p-4 text-left">
            <p className="text-xs font-mono text-muted-foreground mb-1">Detail Error (Developer):</p>
            <code className="text-xs font-mono text-red-500 block break-all">
              {error.message || "Unknown Error"}
            </code>
            {error.digest && (
              <code className="text-xs font-mono text-muted-foreground block mt-1">
                Digest: {error.digest}
              </code>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}