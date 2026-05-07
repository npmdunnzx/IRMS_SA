import { Search, Bell, HelpCircle } from "lucide-react";

interface HeaderProps {
  title?: string;
  userName?: string;
  role?: string;
  avatarUrl?: string;
}

export default function Header({
  title,
  userName = "Nguyễn Quản Lý",
  role = "Manager",
  avatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBgLAx20It9xVEfkYc6itfU2R624nzNWS-gd1-OE2KccY74Ixd4bHNTRjUOXJCCkhZhEIS0eUpaEBdOFzg_IIC_woP3BQnC5xciQYhXyA1QM43SP1GBsJLrMypfBEUI5AR8o6tLXhk4W9xC-UuradnICc-QoEM6S60QX4n61kH6nWqB2ILrjmdQi8buIBvC6zDVJaVq16B0Vbh5l3xT594agS1gvGwcQw7hIELyYBUwyi5ZJS9Ik54HTgM79IMOv8gbnxPOtl0BUqEL",
}: HeaderProps) {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-260px)] z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm flex justify-between items-center px-8 h-16">
      <div className="flex items-center gap-4 flex-1">
        {title && (
          <span className="text-lg font-bold text-[#0F4C5C] mr-4 whitespace-nowrap">
            {title}
          </span>
        )}
        <div className="relative w-full max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Tìm kiếm dữ liệu..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0F4C5C] focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-slate-500">
          <button className="hover:bg-slate-50 p-2 rounded-lg transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="hover:bg-slate-50 p-2 rounded-lg transition-colors">
            <HelpCircle size={20} />
          </button>
        </div>
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-[#0F4C5C]">{userName}</p>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
              {role}
            </p>
          </div>
          <img
            src={avatarUrl}
            alt={userName}
            className="h-10 w-10 rounded-full object-cover border-2 border-[#0F4C5C]/20"
          />
        </div>
      </div>
    </header>
  );
}
