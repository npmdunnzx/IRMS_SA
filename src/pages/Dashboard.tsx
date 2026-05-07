import {
  TrendingUp,
  Receipt,
  Users,
  AlertTriangle,
  Lightbulb,
  ChevronRight,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { motion } from "motion/react";

const stats = [
  {
    label: "Doanh Thu Ngày",
    value: "45.280k",
    trend: "+12.5%",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    label: "Tổng Đơn Hàng",
    value: "142",
    trend: "+8%",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    label: "Bàn Đang Hoạt Động",
    value: "80%",
    subValue: "24/30",
    border: "border-orange-500",
  },
  {
    label: "Cảnh Báo Kho",
    value: "FR24",
    trend: "8 Mục",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-500",
  },
];

const popularDishes = [
  {
    name: "Phở Xào Bò",
    quantity: 124,
    revenue: "15.500k",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBTfbFVlk-rIsxILFE6TRUUlnAhR32mvJAmwleLNxvSU5a1hE-r-YYS1QquAGUNAlvz44S7MJioLn0PpOs2MC9cwm07uiLNPQHTsZR8aRstpYn8fZwCV0NUV3b9mxvNsPljEtl_MgTw4w0v1BNz91mSLzBbY75XXR4lgQjIO03rQK29G0ENZ3oLe8tkJ2fSd9zebivpYz8Ns7Z3Jf9P53HvW7nvW_d53jdE3XJe5oLIAQTXgw4CGyv8QhwpoD0bneom2E_jaW02LWog",
  },
  {
    name: "Nem Rán Giòn",
    quantity: 98,
    revenue: "8.200k",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB5ZbS_fgP_bwzCeNMkngwTq1StUrL1E0hMe8_a2QNEt-N5oQgAAbR4sf_gJ2CPDJi-TSqOiK0Rg1ub3SMNeZTxozHiPOGwfM8hxsW1L5yC2DE7HzLH-_rRsFlw_rPvSqyWEWkt9BQQRvS0E_wHGsartXcMAi0DZsqXuRXt6hgrgynQC5S-K7mI-ghouwh-qm6W5t9VyUGlFQsCtzYe6RkKeEylpDbarfna8zqqgvYBot7UaGcSDF8duvQn_yM5naeOBoVwW7aW1oCU",
  },
  {
    name: "Bún Chả Hà Nội",
    quantity: 86,
    revenue: "12.900k",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJalXxCAGB79pTU1e9QWPoDLYRON32Jqir7M1-inQflTtiUXD3qISUULBpK2kAPb_45eglIxCdMXHalYJAp2vqUaL5gzKYek_jT4HbYwCN_nONhqMcRRbp0pwpFqNrUE_bTz5pZV1NlUSd8g11rok75zu7V4fru-UCrBcFrzMBZ0Weln1HaQakY7Vwb-Tk-ayE8b653GE-GOfINU8qzHm08rGKNGqG47QbkgmQFFJDg6zwR-yPz7iSOm7BZ-k51ACmFjE5Pp_b3sco",
  },
];

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`bg-white p-6 rounded-xl shadow-sm border border-slate-100 ${stat.border ? `border-t-4 ${stat.border}` : ""} hover:shadow-md transition-shadow`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-lg">
                {i === 0 ? (
                  <TrendingUp size={20} className="text-[#0F4C5C]" />
                ) : i === 1 ? (
                  <Receipt size={20} className="text-[#0F4C5C]" />
                ) : i === 2 ? (
                  <Users size={20} className="text-[#0F4C5C]" />
                ) : (
                  <AlertTriangle size={20} className="text-red-500" />
                )}
              </div>
              {stat.trend && (
                <span
                  className={`text-xs font-bold ${stat.color} ${stat.bg} px-2 py-1 rounded-full`}
                >
                  {stat.trend}
                </span>
              )}
              {stat.subValue && (
                <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
                  {stat.subValue}
                </span>
              )}
            </div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              {stat.label}
            </p>
            <h2 className="text-3xl font-black text-[#0F4C5C] mt-1">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Charts & Peak Stats */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-[#0F4C5C]">
                Biểu Đồ Hiệu Suất Real-time
              </h3>
              <p className="text-xs text-slate-400">
                Doanh thu so với Đơn hàng theo giờ
              </p>
            </div>
            <select className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold px-3 py-2 outline-none">
              <option>Hôm nay</option>
              <option>7 ngày qua</option>
            </select>
          </div>

          <div className="h-64 flex items-end justify-between px-4 pb-8 border-b border-slate-50 relative">
            {[0.75, 0.5, 1, 0.8, 0.4, 0.6].map((h, i) => (
              <div
                key={i}
                className="w-12 bg-[#0F4C5C]/10 h-full rounded-t relative"
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${h * 100}%` }}
                  className="absolute inset-x-2 bottom-0 bg-[#0F4C5C] rounded-t"
                />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400">
                  {10 + i}:00
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-6 mt-8">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#0F4C5C] rounded-sm"></span>
              <span className="text-xs font-bold text-slate-500">
                Doanh Thu
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#0F4C5C]/20 rounded-sm"></span>
              <span className="text-xs font-bold text-slate-500">
                Số Đơn Hàng
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-[#0F4C5C] mb-8">
            Thống Kê Giờ Cao Điểm
          </h3>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase">
                  Trưa (11:00 - 13:00)
                </span>
                <span className="text-xs font-bold text-[#0F4C5C]">85%</span>
              </div>
              <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-400"
                  style={{ width: "85%" }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase">
                  Tối (18:30 - 21:00)
                </span>
                <span className="text-xs font-bold text-[#0F4C5C]">98%</span>
              </div>
              <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: "98%" }} />
              </div>
            </div>

            <div className="p-4 bg-teal-50 border border-teal-100 rounded-xl space-y-2 mt-8">
              <div className="flex items-center gap-2 font-bold text-[#0F4C5C] text-sm">
                <Lightbulb size={18} className="text-orange-500" />
                Insight Quản Lý
              </div>
              <p className="text-xs text-[#0F4C5C]/80 leading-relaxed">
                Lượng khách buổi tối tăng 15% so với tuần trước. Cần điều phối
                thêm 2 nhân viên Part-time cho khu vực sảnh A vào thứ 6 này.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Popular Dishes */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-xl border border-slate-100 shadow-sm">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-[#0F4C5C]">Món Ăn Phổ Biến</h3>
            <button className="text-xs font-bold text-[#0F4C5C] hover:underline">
              Xem tất cả
            </button>
          </div>
          <div className="p-6 space-y-6">
            {popularDishes.map((dish, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {dish.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {dish.revenue} doanh thu
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#0F4C5C]">
                    {dish.quantity}
                  </p>
                  <p className="text-[10px] text-green-500 font-bold uppercase">
                    Trending
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Log */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-xl border border-slate-100 shadow-sm">
          <div className="p-6 border-b border-slate-50">
            <h3 className="font-bold text-[#0F4C5C]">Hoạt Động Gần Đây</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                <CheckCircle2 size={16} />
              </div>
              <div className="border-b border-slate-50 pb-4 flex-1">
                <p className="text-sm font-bold text-slate-800">
                  Đơn hàng #4029 đã thanh toán
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <Clock size={12} /> 2 phút trước • Bàn 12
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                <Users size={16} />
              </div>
              <div className="border-b border-slate-50 pb-4 flex-1">
                <p className="text-sm font-bold text-slate-800">
                  Yêu cầu gọi món mới
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <Clock size={12} /> 10 phút trước • Bàn 04
                </p>
              </div>
            </div>
            <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-[#0F4C5C] rounded-lg border border-slate-200 transition-all">
              XEM TOÀN BỘ HOẠT ĐỘNG
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
