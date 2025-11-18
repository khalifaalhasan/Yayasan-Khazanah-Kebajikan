"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Bug, FileQuestion, AlertTriangle } from "lucide-react";

export default function TestErrorPage() {
  const [shouldError, setShouldError] = useState(false);

  // 1. Logika untuk memicu Error 500
  if (shouldError) {
    // Ini akan ditangkap oleh app/error.tsx
    throw new Error("Ini adalah Error simulasi untuk mengetes halaman 500!");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-6 w-6 text-primary" />
            Test Error Pages
          </CardTitle>
          <CardDescription>
            Gunakan tombol di bawah untuk melihat tampilan halaman error yang sudah Anda buat.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          
          {/* Tombol Test 404 */}
          <div className="p-4 border rounded-lg bg-blue-50 border-blue-100">
            <div className="flex items-center gap-2 mb-2 text-blue-800 font-semibold">
              <FileQuestion className="h-5 w-5" />
              Test 404 (Not Found)
            </div>
            <p className="text-sm text-blue-600 mb-4">
              Klik tombol ini untuk memanggil fungsi <code>notFound()</code> secara manual.
            </p>
            <Button 
              variant="secondary" 
              className="w-full bg-blue-200 hover:bg-blue-300 text-blue-800"
              onClick={() => notFound()}
            >
              Trigger 404
            </Button>
          </div>

          {/* Tombol Test 500 */}
          <div className="p-4 border rounded-lg bg-red-50 border-red-100">
            <div className="flex items-center gap-2 mb-2 text-red-800 font-semibold">
              <AlertTriangle className="h-5 w-5" />
              Test 500 (Server/Client Error)
            </div>
            <p className="text-sm text-red-600 mb-4">
              Klik tombol ini untuk memaksa komponen melakukan <code>throw Error</code>.
            </p>
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => setShouldError(true)}
            >
              Trigger 500 (Crash)
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}