import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 text-center">
      {/* Decorative Background Element */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] h-[70%] w-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[60%] w-[40%] rounded-full bg-blue-400/5 blur-[120px]" />
      </div>

      <div className="space-y-6 max-w-md">
        {/* Icon Container with Animation */}
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 animate-in zoom-in-50 duration-500">
          <FileQuestion className="h-12 w-12 text-primary" />
          <div className="absolute inset-0 rounded-full ring-1 ring-primary/20 animate-ping duration-[3s]" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-foreground">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-muted-foreground text-lg">
            Mohon maaf, halaman yang Anda cari sepertinya telah dipindahkan, dihapus, atau tidak pernah ada.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild size="lg" className="group">
            <Link href="/">
              <MoveLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Kembali ke Beranda
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/kontak">Hubungi Kami</Link>
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground pt-8">
          Kode Error: 404
        </p>
      </div>
    </div>
  );
}