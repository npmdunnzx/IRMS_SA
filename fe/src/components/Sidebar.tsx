import {
  LayoutDashboard,
  UtensilsCrossed,
  ChefHat,
  Table2,
  Package,
  BarChart3,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
  { icon: UtensilsCrossed, label: "Orders", to: "/orders" },
  { icon: ChefHat, label: "Kitchen", to: "/kitchen" },
  { icon: Table2, label: "Tables", to: "/tables" },
  { icon: Package, label: "Inventory", to: "/inventory" },
  { icon: BarChart3, label: "Reports", to: "/reports" },
  { icon: Users, label: "Users", to: "/users" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] z-50 bg-[#0F4C5C] flex flex-col border-r border-teal-900/50 shadow-2xl overflow-y-auto">
      <div className="p-6">
        <h1 className="text-xl font-black text-white tracking-widest uppercase">
          IRMS Pro
        </h1>
        <p className="text-teal-400 text-[10px] font-bold tracking-[0.2em] mt-1">
          OPERATIONAL EXCELLENCE
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg transition-all active:scale-[0.98]
              ${
                isActive
                  ? "bg-white/10 text-white border-l-4 border-orange-500 font-semibold"
                  : "text-teal-100/70 hover:text-white hover:bg-white/5"
              }
            `}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto p-4 border-t border-teal-900/30 space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-lg text-teal-100/70 hover:text-white hover:bg-white/5 transition-all
            ${isActive ? "bg-white/10 text-white" : ""}
          `}
        >
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </NavLink>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-teal-100/70 hover:text-white hover:bg-white/5 transition-all">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
