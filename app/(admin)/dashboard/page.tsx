import data from "./data.json";

import AdminBeritaList from "./berita/page";
import { DataTable } from "@/components/data-table";
import DashboardPage from "@/components/pages/dashboard/Dashboard";
import AdminBeritaPage from "@/components/api/datatable-berita";

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2 ">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <DashboardPage />
          <AdminBeritaPage />
          <div className="px-4 lg:px-6"></div>
        </div>
      </div>
    </div>
  );
}
