import {
  Plus,
  AppWindow,
  Calendar,
  Search,
  Bell,
  Mail,
  Lock,
  Eye,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  CreditCard,
  Wallet,
  Banknote,
  Split,
  Printer,
  Users as UsersIcon,
  Heart,
  Table2,
  Trash2,
  Edit3,
} from "lucide-react";
import { motion } from "motion/react";

const tables = [
  {
    id: "T01",
    guests: 4,
    amount: "1.450.000đ",
    status: "OCCUPIED",
    time: "45p",
  },
  { id: "T02", guests: 4, status: "EMPTY", seats: 4 },
  { id: "T03", guests: 2, status: "RESERVED", time: "19:30", name: "Anh Tuấn" },
  { id: "T04", guests: 6, status: "EMPTY", seats: 6 },
  { id: "T05", guests: 4, amount: "850.000đ", status: "OCCUPIED", time: "20p" },
  { id: "T06", guests: 2, status: "EMPTY", seats: 2 },
];

export default function Tables() {
  return (
    <div className="flex gap-8 h-[calc(100vh-90px)]">
      <div className="flex-1 flex flex-col gap-8 overflow-y-auto pr-4">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
          <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-green-50 text-green-600">
            <span className="w-2 h-2 rounded-full bg-green-500" /> Trống
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-red-50 text-red-600">
            <span className="w-2 h-2 rounded-full bg-red-500" /> Có khách
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> Đã đặt
          </span>
          <div className="ml-auto flex gap-2">
            <button className="bg-[#0F4C5C] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:opacity-95">
              <Plus size={16} /> Tạo đơn mới
            </button>
            <button className="bg-white border border-[#0F4C5C] text-[#0F4C5C] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-50">
              <Calendar size={16} /> Đặt chỗ
            </button>
          </div>
        </div>

        <section className="grid grid-cols-2 xl:grid-cols-3 gap-6">
          {tables.map((table, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-t-4 transition-all cursor-pointer relative
                ${table.status === "OCCUPIED" ? "border-red-500" : table.status === "RESERVED" ? "border-blue-500" : "border-green-500"}
              `}
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-black text-slate-300">
                  TABLE
                </span>
                <span className="text-xl font-black text-[#0F4C5C]">
                  {table.id}
                </span>
              </div>

              <div className="flex justify-center py-4">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center border-4 relative
                  ${table.status === "OCCUPIED" ? "border-red-50 border-red-100/50" : "border-slate-50"}
                `}
                >
                  {table.status === "OCCUPIED" ? (
                    <>
                      <UsersIcon className="text-red-500" size={32} />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center border-2 border-white font-black">
                        {table.guests}
                      </span>
                    </>
                  ) : table.status === "RESERVED" ? (
                    <Calendar className="text-blue-500" size={32} />
                  ) : (
                    <Table2 className="text-slate-200" size={32} />
                  )}
                </div>
              </div>

              <div className="mt-4 text-center">
                {table.status === "OCCUPIED" ? (
                  <>
                    <p className="text-sm font-black text-slate-800">
                      {table.amount}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-widest">
                      Đang phục vụ • {table.time}
                    </p>
                  </>
                ) : table.status === "RESERVED" ? (
                  <>
                    <p className="text-sm font-black text-blue-600">
                      Đặt lúc {table.time}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-widest">
                      {table.name} • {table.guests} khách
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-black text-green-600">
                      Sẵn sàng
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-widest">
                      {table.seats} Chỗ ngồi
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mt-auto">
          <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-[#0F4C5C] flex items-center gap-2">
              <UsersIcon size={18} /> Danh sách chờ (4)
            </h3>
            <button className="text-xs font-black text-[#0F4C5C] hover:underline">
              Thêm khách
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { name: "Chị Lan", info: "4 người • Chờ 15p" },
              { name: "Anh Hoàng", info: "2 người • Chờ 5p" },
            ].map((wait, i) => (
              <div
                key={i}
                className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#0F4C5C] font-black">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">
                      {wait.name}
                    </h4>
                    <p className="text-xs text-slate-500">{wait.info}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                    <CheckCircle2 size={20} />
                  </button>
                  <button className="p-2 text-slate-300 hover:bg-slate-100 rounded-lg">
                    <Plus size={20} className="rotate-45" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="w-[450px] bg-white rounded-2xl border border-slate-100 shadow-2xl flex flex-col overflow-hidden relative overflow-y-auto">
        <div className="p-8 border-b border-slate-50">
          <div className="flex justify-between items-center mb-2">
            <span className="bg-red-50 text-red-600 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">
              Đang hoạt động
            </span>
            <span className="text-slate-400 text-xs font-bold">#ORD-9402</span>
          </div>
          <h2 className="text-2xl font-black text-[#0F4C5C]">
            Bàn T01 • 4 Khách
          </h2>
        </div>

        <div className="flex-1 p-8 space-y-6">
          <div className="flex gap-4 group">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCygWPLoP1XiPP58P0oBBcmJgpMXDkaMvOxqm_pJR_YQ23TzrKKwbC59hH7dy9Rf2uQ9ewvOReLhV0HRjzpAaF0YkCKrPvi3t4Gtmg99RAsSc6i_Zk5Ee8t0den08T534Ijg89gC-0xKY92JFHsmLFJ7XbuUI8TbUK08Svoh2dR36U28_tvolh5cn2gHRyU93KlGVERmM3oJEjne4j58NzDm4mDRAjF_p37KtvQFtenbSKNfnk_fEHu04PQaa9E6LMlryVKTrPU0trP"
              alt="Food"
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-bold text-slate-800">Phở Bò Đặc Biệt</h4>
                <span className="font-black text-[#0F4C5C]">125.000đ</span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-3 bg-slate-100 rounded-full px-3 py-1">
                  <button className="text-slate-400 hover:text-[#0F4C5C]">
                    <Plus size={14} className="rotate-45" />
                  </button>
                  <span className="text-xs font-bold">02</span>
                  <button className="text-slate-400 hover:text-[#0F4C5C]">
                    <Plus size={14} />
                  </button>
                </div>
                <Edit3
                  size={14}
                  className="text-slate-300 hover:text-[#0F4C5C] cursor-pointer"
                />
                <Trash2
                  size={14}
                  className="text-slate-300 hover:text-red-500 cursor-pointer"
                />
              </div>
              <p className="text-[10px] text-orange-600 bg-orange-50 px-2 py-1 rounded mt-2 inline-flex items-center font-bold">
                * Không cay, ít bánh
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3RQZhlBsPYmM7ME6FKwheMcSOy0pUtRiXtlAwLtHwseA4QrzOamQ75n7UvmWoYaM68T6mwnQbHs_WrH6cGCWZXttDdRYPdlXe5EWx7q6C1CLdS9twmlzGnSTBanv64EBK7wvvWWfn8cTMEWXXA8gR5MF-LZEM9Oa8kAHFeoZfjAIlqzmoC5vnK_dR8pGVuG52ugSgLwaCKLH347TSH3a5xpLO4IRRBnjW8cXoDo6hUlznYPzN1HbKr_wrluHYTAHMkidkxtEjyU8N"
              alt="Food"
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-bold text-slate-800">Gỏi Cuốn Tôm Thịt</h4>
                <span className="font-black text-[#0F4C5C]">85.000đ</span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-3 bg-slate-100 rounded-full px-3 py-1">
                  <button className="text-slate-400 hover:text-[#0F4C5C]">
                    <Plus size={14} className="rotate-45" />
                  </button>
                  <span className="text-xs font-bold">03</span>
                  <button className="text-slate-400 hover:text-[#0F4C5C]">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-slate-50/80 border-t border-slate-100 space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-bold text-slate-400">
              <span>Tạm tính</span>
              <span>505.000đ</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-400">
              <span>VAT (10%)</span>
              <span>50.500đ</span>
            </div>
            <div className="flex justify-between text-2xl font-black text-[#0F4C5C] pt-4">
              <span>Tổng cộng</span>
              <span>555.500đ</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white border border-slate-200 py-3 rounded-xl text-xs font-black text-slate-600 hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
              <Split size={14} /> Tách hóa đơn
            </button>
            <button className="bg-white border border-slate-200 py-3 rounded-xl text-xs font-black text-slate-600 hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
              <Printer size={14} /> In tạm tính
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button className="flex flex-col items-center gap-2 bg-[#0F4C5C] text-white p-4 rounded-xl hover:opacity-95 active:scale-95 transition-all">
              <Banknote size={20} />
              <span className="text-[10px] font-black uppercase">Tiền mặt</span>
            </button>
            <button className="flex flex-col items-center gap-2 bg-orange-500 text-white p-4 rounded-xl hover:opacity-95 active:scale-95 transition-all">
              <CreditCard size={20} />
              <span className="text-[10px] font-black uppercase">Thẻ/POS</span>
            </button>
            <button className="flex flex-col items-center gap-2 bg-teal-500 text-white p-4 rounded-xl hover:opacity-95 active:scale-95 transition-all">
              <Wallet size={20} />
              <span className="text-[10px] font-black uppercase">E-Wallet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
