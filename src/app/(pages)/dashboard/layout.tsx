import { ReactNode } from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
      <div className="flex w-full bg-gray-100">
        <Sidebar />

        <div className="flex flex-col w-full">
          <Header />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
  );
}
