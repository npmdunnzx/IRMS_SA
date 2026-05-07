import {
  UserPlus,
  MoreVertical,
  ShieldCheck,
  ChefHat,
  Monitor,
  Table as TableIcon,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
} from "lucide-react";
import { motion } from "motion/react";

export default function Users() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-[#0F4C5C]">
            Quản lý Nhân sự
          </h2>
          <p className="text-slate-500">
            Phân quyền và quản lý tài khoản nhân viên trong hệ thống
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#0F4C5C] text-white rounded-xl font-bold hover:opacity-90 shadow-lg shadow-[#0F4C5C]/20 transition-all active:scale-95">
          <UserPlus size={20} /> Thêm Nhân viên
        </button>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Tìm kiếm nhân viên..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none text-sm"
            />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-white transition-all">
              <Filter size={18} /> Bộ lọc
            </button>
            <select className="text-sm font-bold border-slate-200 rounded-xl py-2 px-4 focus:ring-[#0F4C5C]/20 outline-none bg-white">
              <option>Tất cả vai trò</option>
              <option>Manager</option>
              <option>Server</option>
              <option>Kitchen</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#0F4C5C]/5 border-b border-slate-100">
              <tr className="text-[10px] font-black uppercase text-[#0F4C5C]/60 tracking-widest">
                <th className="px-8 py-5">Nhân viên</th>
                <th className="px-8 py-5">Vai trò</th>
                <th className="px-8 py-5">Quyền hạn</th>
                <th className="px-8 py-5">Trọng thái</th>
                <th className="px-8 py-5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                {
                  name: "Trần Anh",
                  email: "anh.tran@irms.pro",
                  role: "Manager",
                  rColor: "bg-teal-50 text-teal-700",
                  status: "Online",
                  icons: [ShieldCheck, CreditCard, UserPlus],
                },
                {
                  name: "Lê Bình",
                  email: "binh.le@irms.pro",
                  role: "Server",
                  rColor: "bg-orange-50 text-orange-700",
                  status: "Online",
                  icons: [TableIcon, CreditCard],
                },
                {
                  name: "Nguyễn Cường",
                  email: "cuong.n@irms.pro",
                  role: "Kitchen",
                  rColor: "bg-blue-50 text-blue-700",
                  status: "Break",
                  icons: [ChefHat, Monitor],
                },
                {
                  name: "Võ Dung",
                  email: "dung.vo@irms.pro",
                  role: "Cashier",
                  rColor: "bg-purple-50 text-purple-700",
                  status: "Online",
                  icons: [CreditCard],
                },
                {
                  name: "Phạm Minh",
                  email: "minh.p@irms.pro",
                  role: "Server",
                  rColor: "bg-orange-50 text-orange-700",
                  status: "Offline",
                  icons: [TableIcon, CreditCard],
                },
              ].map((staff, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0F4C5C]/10 flex items-center justify-center font-black text-[#0F4C5C] text-xs uppercase group-hover:bg-[#0F4C5C] group-hover:text-white transition-all">
                        {staff.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {staff.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold">
                          {staff.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span
                      className={`px-2 py-1 ${staff.rColor} text-[10px] font-black rounded-lg uppercase tracking-wider`}
                    >
                      {staff.role}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex gap-2">
                      {staff.icons.map((Icon, idx) => (
                        <Icon
                          key={idx}
                          size={16}
                          className="text-slate-300 group-hover:text-[#0F4C5C]/40 transition-all"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          staff.status === "Online"
                            ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse"
                            : staff.status === "Break"
                              ? "bg-orange-500"
                              : "bg-slate-300"
                        }`}
                      ></span>
                      <span className="text-xs font-bold text-slate-600">
                        {staff.status === "Online"
                          ? "Đang làm việc"
                          : staff.status === "Break"
                            ? "Nghỉ ca"
                            : "Ngoại tuyến"}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-slate-300 hover:text-[#0F4C5C] hover:bg-slate-100 rounded-lg transition-all">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Hiển thị 1-5 trên tổng số 24 nhân sự
          </p>
          <div className="flex gap-2">
            <button className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center bg-white hover:bg-slate-50 transition-all shadow-sm">
              <ChevronLeft size={18} className="text-slate-400" />
            </button>
            <button className="w-9 h-9 rounded-xl bg-[#0F4C5C] text-white text-xs font-black shadow-lg shadow-[#0F4C5C]/20 scale-110">
              1
            </button>
            <button className="w-9 h-9 rounded-xl bg-white border border-slate-100 text-xs font-black text-slate-400 hover:bg-slate-50 transition-all">
              2
            </button>
            <button className="w-9 h-9 rounded-xl bg-white border border-slate-100 text-xs font-black text-slate-400 hover:bg-slate-50 transition-all">
              3
            </button>
            <button className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center bg-white hover:bg-slate-50 transition-all shadow-sm">
              <ChevronRight size={18} className="text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
