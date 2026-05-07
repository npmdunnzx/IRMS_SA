import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  FileText,
  Plus,
  MoreVertical,
  ShieldCheck,
  History,
  LogIn,
  Edit,
  Trash2,
  ChefHat,
  Monitor,
  Table as TableIcon,
  CreditCard,
  UserPlus,
} from "lucide-react";
import { motion } from "motion/react";

export default function Reports() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-[#0F4C5C]">
            Báo cáo & Phân tích
          </h2>
          <p className="text-slate-500">
            Theo dõi hiệu suất vận hành và xu hướng kinh doanh
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-[#0F4C5C] text-[#0F4C5C] rounded-lg font-bold text-sm bg-white hover:bg-slate-50 transition-all">
            <Download size={18} /> Xuất Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#0F4C5C] text-[#0F4C5C] rounded-lg font-bold text-sm bg-white hover:bg-slate-50 transition-all">
            <FileText size={18} /> Tải PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Revenue Summary */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-slate-100 p-8 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-[#0F4C5C]">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-black text-[#0F4C5C]">
                Biểu đồ Doanh thu
              </h3>
            </div>
            <div className="flex bg-slate-50 p-1 rounded-xl">
              <button className="px-4 py-2 text-xs font-black rounded-lg bg-white shadow-sm text-[#0F4C5C]">
                Ngày
              </button>
              <button className="px-4 py-2 text-xs font-black text-slate-400">
                Tuần
              </button>
              <button className="px-4 py-2 text-xs font-black text-slate-400">
                Tháng
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="p-5 bg-slate-50/50 rounded-2xl border-l-4 border-[#0F4C5C]">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                TỔNG DOANH THU
              </p>
              <p className="text-2xl font-black text-[#0F4C5C]">12.450.000đ</p>
              <p className="text-[10px] font-black text-green-600 mt-2 flex items-center gap-1">
                <TrendingUp size={12} /> +12% so với hôm qua
              </p>
            </div>
            <div className="p-5 bg-slate-50/50 rounded-2xl border-l-4 border-orange-500">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                ĐƠN HÀNG
              </p>
              <p className="text-2xl font-black text-[#0F4C5C]">142</p>
              <p className="text-[10px] font-black text-slate-400 mt-2">
                Trung bình: 87k/đơn
              </p>
            </div>
            <div className="p-5 bg-slate-50/50 rounded-2xl border-l-4 border-red-500">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                HỦY ĐƠN
              </p>
              <p className="text-2xl font-black text-[#0F4C5C]">03</p>
              <p className="text-[10px] font-black text-red-600 mt-2">
                Tỷ lệ: 2.1%
              </p>
            </div>
          </div>

          <div className="h-48 flex items-end justify-between px-4 pb-4">
            {[0.3, 0.45, 0.25, 0.7, 0.85, 0.95, 0.5, 0.4].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h * 100}%` }}
                className={`w-8 rounded-t-lg ${i === 5 ? "bg-orange-500" : "bg-[#0F4C5C]/20"}`}
              />
            ))}
          </div>
          <div className="flex justify-between px-4 mt-2 text-[10px] font-black text-slate-300">
            {[
              "08:00",
              "10:00",
              "12:00",
              "14:00",
              "16:00",
              "18:00",
              "20:00",
              "22:00",
            ].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>

        {/* Audit Log */}
        <div className="col-span-12 lg:col-span-4 bg-white border border-slate-100 p-8 rounded-2xl shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-[#0F4C5C]">
              Nhật ký Hệ thống
            </h3>
            <History size={20} className="text-slate-400" />
          </div>
          <div className="space-y-6 flex-1 overflow-y-auto pr-2">
            {[
              {
                icon: LogIn,
                color: "text-blue-600",
                bg: "bg-blue-50",
                msg: "Trần Văn A (Cashier) đã đăng nhập",
                time: "Hôm nay, 07:45 AM • IP: 192.168.1.15",
              },
              {
                icon: Edit,
                color: "text-orange-600",
                bg: "bg-orange-50",
                msg: "Lê Thị B cập nhật tồn kho",
                time: "Hôm nay, 08:12 AM • Mục: Thịt bò Úc",
              },
              {
                icon: Trash2,
                color: "text-red-600",
                bg: "bg-red-50",
                msg: "Nguyễn C xóa hóa đơn #HD992",
                time: "Hôm nay, 09:30 AM • Lý do: Nhập sai món",
              },
              {
                icon: CreditCard,
                color: "text-green-600",
                bg: "bg-green-50",
                msg: "Hoàn tất chốt ca sáng",
                time: "Hôm nay, 11:00 AM • Tổng: 4.520.000đ",
              },
            ].map((log, i) => (
              <div
                key={i}
                className="flex gap-4 pb-4 border-b border-slate-50 last:border-0 last:pb-0"
              >
                <div
                  className={`w-8 h-8 rounded-full ${log.bg} flex items-center justify-center shrink-0`}
                >
                  <log.icon size={14} className={log.color} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 leading-tight">
                    {log.msg}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-xs font-black text-[#0F4C5C] hover:bg-slate-50 border border-slate-100 rounded-xl transition-all">
            Xem tất cả nhật ký
          </button>
        </div>
      </div>
    </motion.div>
  );
}
