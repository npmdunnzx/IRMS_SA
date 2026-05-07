import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  pageTitle?: string;
}

export default function Layout({ pageTitle }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="ml-[260px] flex-1 flex flex-col min-h-screen relative">
        <Header title={pageTitle} />
        <div className="pt-16 p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
