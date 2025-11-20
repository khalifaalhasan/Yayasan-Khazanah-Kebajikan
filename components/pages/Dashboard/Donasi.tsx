"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useMemo, useState, useEffect, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

// --- Icons & Shadcn Components ---
import {
  MoreHorizontal,
  ArrowUpDown,
  FileSpreadsheet,
  FileText,
  CheckCircle,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// --- Interface Data ---
interface Donasi {
  id: string;
  created_at: string;
  nama_lengkap: string;
  nominal: number;
  doa_pesan?: string;
  no_wa?: string;
  metode_pembayaran: string;
  status: "PENDING" | "SELESAI";
}

export default function TableDonasi() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  // --- State ---
  const [donasiData, setDonasiData] = useState<Donasi[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // State Pencarian Global (Server-side logic)
  const [q, setQ] = useState("");

  // State Modal
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedDonasi, setSelectedDonasi] = useState<Donasi | null>(null);

  // --- 1. Fetch Data ---
  const fetchDonasi = useCallback(async () => {
    setLoading(true);

    let query = supabase
      .from("donasi")
      .select("*")
      .order("created_at", { ascending: false });

    if (q) {
      query = query.or(`nama_lengkap.ilike.%${q}%,status.ilike.%${q}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching donasi:", error);
    } else if (data) {
      setDonasiData(data as Donasi[]);
    }
    setLoading(false);
  }, [q, supabase]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchDonasi();
    }, 500); // Debounce agar tidak spam request saat mengetik
    return () => clearTimeout(debounceTimer);
  }, [fetchDonasi]);

  // --- 2. Logika Update Status ---
  const openUpdateModal = (donasi: Donasi) => {
    if (donasi.status === "SELESAI") return;
    setSelectedDonasi(donasi);
    setShowModal(true);
  };

  const confirmUpdateStatus = async () => {
    if (!selectedDonasi) return;
    setLoading(true);
    setShowModal(false);

    const { error } = await supabase
      .from("donasi")
      .update({ status: "SELESAI" })
      .eq("id", selectedDonasi.id);

    if (!error) {
      fetchDonasi();
    }
    setSelectedDonasi(null);
    setLoading(false);
  };

  // --- 3. Definisi Kolom (Shadcn Style) ---
  const columns = useMemo<ColumnDef<Donasi>[]>(
    () => [
      {
        accessorKey: "created_at",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="-ml-4 hover:bg-transparent" // Adjustment agar rata kiri
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Tanggal & Waktu
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) =>
          new Date(row.getValue("created_at")).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
      },
      {
        accessorKey: "nama_lengkap",
        header: "Donatur",
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("nama_lengkap")}</div>
        ),
      },
      {
        accessorKey: "nominal",
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="-ml-4 hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nominal
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("nominal"));
          const formatted = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(amount);
          return <div className="font-medium text-green-700">{formatted}</div>;
        },
      },
      {
        accessorKey: "metode_pembayaran",
        header: "Metode",
        cell: ({ row }) => (
          <span className="text-muted-foreground text-sm">
            {row.getValue("metode_pembayaran")}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return (
            <Badge
              variant={status === "PENDING" ? "secondary" : "default"}
              className={`
                ${
                  status === "PENDING"
                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200"
                    : "bg-green-100 text-green-800 hover:bg-green-200 border-green-200"
                }
              `}
            >
              {status}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const donasi = row.original;
          const isSelesai = donasi.status === "SELESAI";

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(donasi.id)}
                >
                  Salin ID Donasi
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {isSelesai ? (
                  <DropdownMenuItem disabled className="text-green-600">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Terverifikasi
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => openUpdateModal(donasi)}>
                    Verifikasi Dana Masuk
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  // --- 4. Table Setup ---
  const table = useReactTable({
    data: donasiData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  // --- 5. Export Functions ---
  const exportToExcel = () => {
    const dataToExport = donasiData.map((item) => ({
      Tanggal: new Date(item.created_at).toLocaleDateString("id-ID"),
      "Nama Lengkap": item.nama_lengkap,
      Nominal: item.nominal,
      Metode: item.metode_pembayaran,
      Status: item.status,
    }));
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Donasi");
    XLSX.writeFile(wb, "Laporan_Donasi.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Tanggal", "Nama", "Nominal", "Metode", "Status"];
    const tableRows: (string | number)[][] = [];
    donasiData.forEach((donasi) => {
      tableRows.push([
        new Date(donasi.created_at).toLocaleDateString("id-ID"),
        donasi.nama_lengkap,
        `Rp ${donasi.nominal.toLocaleString("id-ID")}`,
        donasi.metode_pembayaran,
        donasi.status,
      ]);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      headStyles: { fillColor: [15, 23, 42] }, // Slate-900 (Shadcn default dark)
    });
    doc.text("Laporan Data Donasi", 14, 15);
    doc.save(`Laporan_Donasi.pdf`);
  };

  return (
    <div className="w-full space-y-6">
      {/* --- Header & Toolbar --- */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Manajemen Donasi
          </h2>
          <p className="text-muted-foreground text-sm">
            Kelola semua data donasi masuk dan status pembayaran.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row items-end sm:items-center">
          <Input
            placeholder="Cari donatur..."
            value={q}
            onChange={(event) => setQ(event.target.value)}
            className="w-full sm:w-[250px]"
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={exportToExcel}
              title="Export Excel"
            >
              <FileSpreadsheet className="h-4 w-4 text-green-600" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={exportToPDF}
              title="Export PDF"
            >
              <FileText className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        </div>
      </div>

      {/* --- Table Component (Shadcn) --- */}
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex justify-center items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <span>Memuat data...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Tidak ada data ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-xs text-muted-foreground">
        Menampilkan {table.getRowModel().rows.length} data donasi.
      </div>

      {/* --- Modal Konfirmasi (Custom Overlay) --- */}
      {showModal && selectedDonasi && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-semibold">Verifikasi Donasi?</h3>
            <p className="text-sm text-gray-600">
              Apakah dana sebesar{" "}
              <span className="font-bold text-gray-900">
                Rp {selectedDonasi.nominal.toLocaleString("id-ID")}
              </span>{" "}
              dari{" "}
              <span className="font-bold text-gray-900">
                {selectedDonasi.nama_lengkap}
              </span>{" "}
              sudah masuk ke rekening?
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-xs text-yellow-700">
              Status akan berubah menjadi <b>SELESAI</b> dan tidak dapat
              dibatalkan.
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Batal
              </Button>
              <Button
                onClick={confirmUpdateStatus}
                className="bg-green-600 hover:bg-green-700"
              >
                Ya, Verifikasi
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
