import {
  Plus,
  Download,
  MoreVertical,
  Menu as MenuIcon,
  Trash2,
  Filter,
  AlertCircle,
  History,
} from "lucide-react";
import { motion } from "motion/react";

const dishes = [
  {
    name: "Salad Gà Nướng",
    price: "125.000đ",
    options: "Combo: Nước ép cam, Khoai tây",
    status: "Còn",
    statusColor: "text-green-600",
    dot: "bg-green-500",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYX1nF6gKMG6_l9_BOOps34rZVW95xV2BTeVr6CBGgYJwzMowzz2BnHW7Li_Ocjkbxh48Dt05HKqsc-2cuxeLWIQb39hUnPGwv5xckA5-gZtXdnG6DveKdsVjsdcCzJTOxSXM4gyypEXPFjHQrzpASeaIuYPk6Rc51kr2RhsPeMmfM-OuoT71yCR3Y7Of_iZ-QA_ZwE_rdAGYKlKj7n3sU_HlHg-hBtBSh3ZboZgFG7EW9Gr_8V7EP2yNWrnDJAmQ0HQo_dUeJaBwi",
  },
  {
    name: "Burger Bò Mỹ",
    price: "185.000đ",
    options: "Tùy chọn: Thêm phô mai, Ít hành",
    status: "Hết",
    statusColor: "text-red-600",
    dot: "bg-red-500",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCiuADWC1k8b1zPdUeyQKAc8j4aLH_4sQ0rB0Hz_K0x67VDCT_dUknu4Kr7JgzG4Qd7NR_4FZ1Xu6eftLUl0x8ND-K-xLgx7avSQaFY-heEUOGC_d4eVBlWDwZsCgWKYKyrjEXP5lsxfR2xVGGbHH_JaiYIAf3xwPBzQi55EsEPnvvpJFoDvuzpjsiKl8YXxxwRy7PcVvqWrj8TjhEJiunSr91rCeaoe_jrB0OGuvNAwDly7Pab8WgJKeFQpkZQ2ym6iJS32-XZabOH",
  },
  {
    name: "Pasta Sốt Pesto",
    price: "145.000đ",
    options: "Tùy chọn: Thêm tôm (+30k)",
    status: "Còn",
    statusColor: "text-green-600",
    dot: "bg-green-500",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDkmlplT4ccljTsTgK4df_b0ctONQsyZNqLpNCrWz1SLf-G06-qWH4k8FhG6uhjlEX9e8RAZM9yZ3zKAoNW_0TNC5s6vtgwaQqxn9YXD9Ed5WNej5WW6dR5NZ30ZVX4yJ3wk57M5B88qbWpFJpA5foWFZRciKTJWdSOnOAfG393o9wKTZ1H5PRBT8Ir0moHP-cU_N_Rdxxagpd4YyXz1z4BmmRU8G87W2GwwQFtWcmZP1U-cF4Q3a_cJXNdx4Ed2mOcrZfCWap9gXpD",
  },
  {
    name: "Sườn Nướng BBQ",
    price: "220.000đ",
    options: "Combo: Khoai tây chiên, Pepsi",
    status: "Còn",
    statusColor: "text-green-600",
    dot: "bg-green-500",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDeJdBNv2ZgStPiTodwNwhko9Sx82l3ZaklUV1XlGLoVJBz0uZkLK_sKd5eYXiuR83tc1iHN9-u6AK1PEsatDbx3qvgeh8OqHCatcJoqnyc3RFwXC24TQRcMwV3Lx7xTOwoNYkJn-LGuJdwILcxGT-JSwn-qed7eO4B9yER3e7BY3rV2lbnTTOggrYAC9oAqEGbDnvHsHzeD5XDmkELx95eDjoAAY9OLHXku4FSn-EUK0vrRbbEyRgNtkRkPsXmN9IBhfZURMjejLij",
  },
];

export default function Inventory() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-[#0F4C5C]">
            Quản Lý Thực Đơn & Kho
          </h2>
          <p className="text-slate-500">
            Theo dõi trạng thái tồn kho và điều chỉnh thực đơn thời gian thực.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-[#0F4C5C] text-[#0F4C5C] rounded-lg font-bold text-sm bg-white hover:bg-slate-50">
            <Download size={18} /> Xuất Báo Cáo
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0F4C5C] text-white rounded-lg font-bold text-sm hover:opacity-95">
            <Plus size={18} /> Thêm Món Mới
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[#0F4C5C] flex items-center gap-2">
                <MenuIcon size={20} /> Danh Sách Món Ăn
              </h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black uppercase rounded-full">
                  42 Đang Bán
                </span>
                <span className="px-3 py-1 bg-red-50 text-red-700 text-[10px] font-black uppercase rounded-full">
                  3 Hết Hàng
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dishes.map((dish, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-100 rounded-xl p-4 flex gap-4 transition-all hover:border-[#0F4C5C] relative"
                >
                  <div
                    className={`absolute top-0 left-0 w-full h-1 rounded-t-xl ${dish.dot}`}
                  />
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-800 truncate">
                        {dish.name}
                      </h4>
                      <MoreVertical
                        size={16}
                        className="text-slate-400 cursor-pointer"
                      />
                    </div>
                    <p className="text-xs text-slate-400 truncate mb-2">
                      {dish.options}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="font-black text-sm text-[#0F4C5C]">
                        {dish.price}
                      </span>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-4 rounded-full p-0.5 transition-colors ${dish.status === "Còn" ? "bg-green-500" : "bg-slate-200"}`}
                        >
                          <div
                            className={`w-3 h-3 bg-white rounded-full shadow transition-transform ${dish.status === "Còn" ? "translate-x-4" : "translate-x-0"}`}
                          />
                        </div>
                        <span
                          className={`text-[10px] font-black uppercase ${dish.statusColor}`}
                        >
                          {dish.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <h3 className="font-bold text-[#0F4C5C] mb-6 flex items-center gap-2">
              <Plus size={20} /> Cấu Hình Combo & Tùy Chỉnh
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    <th className="py-4 px-4">Tên Tùy Chỉnh</th>
                    <th className="py-4">Loại</th>
                    <th className="py-4">Áp Dụng Cho</th>
                    <th className="py-4">Giá Thêm</th>
                    <th className="py-4 text-right px-4">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                  <tr>
                    <td className="py-4 px-4 font-bold">
                      Thêm Phô Mai Cheddar
                    </td>
                    <td>Topping</td>
                    <td>Tất cả Burger</td>
                    <td className="font-black text-[#0F4C5C]">+15.000đ</td>
                    <td className="text-right px-4">
                      <button className="text-[#0F4C5C] font-bold hover:underline">
                        Sửa
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-bold">
                      Combo Trưa Tiết Kiệm
                    </td>
                    <td>Combo</td>
                    <td>Món Chính + Nước</td>
                    <td className="font-black text-[#0F4C5C]">-20.000đ</td>
                    <td className="text-right px-4">
                      <button className="text-[#0F4C5C] font-bold hover:underline">
                        Sửa
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[#0F4C5C] flex items-center gap-2">
                <AlertCircle size={20} /> Tồn Kho
              </h3>
              <Filter size={18} className="text-slate-400 cursor-pointer" />
            </div>

            <div className="p-4 bg-red-50 border border-red-100 rounded-xl mb-6">
              <p className="text-sm font-bold text-red-800">
                Cảnh báo tồn kho thấp
              </p>
              <p className="text-xs text-red-600 mt-1">
                3 mặt hàng đã dưới ngưỡng an toàn.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  name: "Thịt Bò Mỹ (kg)",
                  val: "4.5 / 30",
                  pct: 15,
                  color: "bg-red-500",
                  status: "Cần nhập hàng",
                  sColor: "text-red-500",
                },
                {
                  name: "Phô Mai Cheddar (miếng)",
                  val: "420 / 500",
                  pct: 85,
                  color: "bg-green-500",
                  status: "Đầy đủ",
                  sColor: "text-green-500",
                },
                {
                  name: "Bánh Mì Brioche (cái)",
                  val: "20 / 50",
                  pct: 40,
                  color: "bg-orange-400",
                  status: "Sắp hết",
                  sColor: "text-orange-400",
                },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-700">
                      {item.name}
                    </span>
                    <span className={`font-black ${item.sColor}`}>
                      {item.val}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color}`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                  <p
                    className={`text-[10px] font-black uppercase ${item.sColor}`}
                  >
                    {item.status}
                  </p>
                </div>
              ))}
            </div>

            <button className="w-full py-3 mt-6 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-400 hover:border-[#0F4C5C] hover:text-[#0F4C5C] transition-all">
              XEM TẤT CẢ NGUYÊN LIỆU
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-[#0F4C5C] mb-6 flex items-center gap-2">
              <History size={20} /> Lịch Sử Sử Dụng
            </h3>
            <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-50">
              <div className="pl-8 relative">
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-[#0F4C5C] border-4 border-white shadow-sm flex items-center justify-center"></div>
                <p className="text-[10px] font-bold text-slate-400">
                  Hôm nay, 10:45 AM
                </p>
                <p className="text-sm font-bold text-slate-800">
                  Xuất kho: Thịt Bò Mỹ
                </p>
                <p className="text-xs text-slate-500">
                  -2.5kg cho đơn hàng #2405
                </p>
              </div>
              <div className="pl-8 relative">
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-green-500 border-4 border-white shadow-sm flex items-center justify-center"></div>
                <p className="text-[10px] font-bold text-slate-400">
                  Hôm nay, 08:30 AM
                </p>
                <p className="text-sm font-bold text-slate-800">
                  Nhập kho: Rau Củ Quả
                </p>
                <p className="text-xs text-slate-500">
                  +15kg từ nhà cung cấp DailyFresh
                </p>
              </div>
            </div>
            <button className="w-full mt-6 text-[10px] font-black text-[#0F4C5C] hover:underline uppercase tracking-widest text-center">
              XEM NHẬT KÝ ĐẦY ĐỦ
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
