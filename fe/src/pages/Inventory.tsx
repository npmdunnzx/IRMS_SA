import { 
  Plus, 
  Download, 
  MoreVertical, 
  Menu as MenuIcon, 
  Trash2,
  Filter,
  AlertCircle,
  History,
  Tag,
  Package,
  Layers,
  Settings2,
  X,
  Upload,
  ChevronRight,
  PlusCircle,
  EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const dishes = [
  { id: 1, name: 'Salad Gà Nướng', price: '125.000đ', options: 'Combo: Nước ép cam, Khoai tây', status: 'Còn', statusColor: 'text-green-600', dot: 'bg-green-500', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYX1nF6gKMG6_l9_BOOps34rZVW95xV2BTeVr6CBGgYJwzMowzz2BnHW7Li_Ocjkbxh48Dt05HKqsc-2cuxeLWIQb39hUnPGwv5xckA5-gZtXdnG6DveKdsVjsdcCzJTOxSXM4gyypEXPFjHQrzpASeaIuYPk6Rc51kr2RhsPeMmfM-OuoT71yCR3Y7Of_iZ-QA_ZwE_rdAGYKlKj7n3sU_HlHg-hBtBSh3ZboZgFG7EW9Gr_8V7EP2yNWrnDJAmQ0HQo_dUeJaBwi' },
  { id: 2, name: 'Burger Bò Mỹ', price: '185.000đ', options: 'Tùy chọn: Thêm phô mai, Ít hành', status: 'Hết', statusColor: 'text-red-600', dot: 'bg-red-500', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiuADWC1k8b1zPdUeyQKAc8j4aLH_4sQ0rB0Hz_K0x67VDCT_dUknu4Kr7JgzG4Qd7NR_4FZ1Xu6eftLUl0x8ND-K-xLgx7avSQaFY-heEUOGC_d4eVBlWDwZsCgWKYKyrjEXP5lsxfR2xVGGbHH_JaiYIAf3xwPBzQi55EsEPnvvpJFoDvuzpjsiKl8YXxxwRy7PcVvqWrj8TjhEJiunSr91rCeaoe_jrB0OGuvNAwDly7Pab8WgJKeFQpkZQ2ym6iJS32-XZabOH' },
  { id: 3, name: 'Pasta Sốt Pesto', price: '145.000đ', options: 'Tùy chọn: Thêm tôm (+30k)', status: 'Còn', statusColor: 'text-green-600', dot: 'bg-green-500', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkmlplT4ccljTsTgK4df_b0ctONQsyZNqLpNCrWz1SLf-G06-qWH4k8FhG6uhjlEX9e8RAZM9yZ3zKAoNW_0TNC5s6vtgwaQqxn9YXD9Ed5WNej5WW6dR5NZ30ZVX4yJ3wk57M5B88qbWpFJpA5foWFZRciKTJWdSOnOAfG393o9wKTZ1H5PRBT8Ir0moHP-cU_N_Rdxxagpd4YyXz1z4BmmRU8G87W2GwwQFtWcmZP1U-cF4Q3a_cJXNdx4Ed2mOcrZfCWap9gXpD' },
  { id: 4, name: 'Sườn Nướng BBQ', price: '220.000đ', options: 'Combo: Khoai tây chiên, Pepsi', status: 'Còn', statusColor: 'text-green-600', dot: 'bg-green-500', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeJdBNv2ZgStPiTodwNwhko9Sx82l3ZaklUV1XlGLoVJBz0uZkLK_sKd5eYXiuR83tc1iHN9-u6AK1PEsatDbx3qvgeh8OqHCatcJoqnyc3RFwXC24TQRcMwV3Lx7xTOwoNYkJn-LGuJdwILcxGT-JSwn-qed7eO4B9yER3e7BY3rV2lbnTTOggrYAC9oAqEGbDnvHsHzeD5XDmkELx95eDjoAAY9OLHXku4FSn-EUK0vrRbbEyRgNtkRkPsXmN9IBhfZURMjejLij' },
];

type TabType = 'dishes' | 'combos' | 'categories' | 'options';

export default function Inventory() {
  const [activeTab, setActiveTab] = useState<TabType>('dishes');
  const [showModal, setShowModal] = useState<string | null>(null);

  const tabs: {id: TabType, label: string, icon: any}[] = [
    { id: 'dishes', label: 'Món Ăn', icon: MenuIcon },
    { id: 'combos', label: 'Combo', icon: Package },
    { id: 'categories', label: 'Danh Mục', icon: Layers },
    { id: 'options', label: 'Tùy Chọn', icon: Settings2 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-[#0F4C5C]">Quản Lý Thực Đơn</h2>
          <p className="text-slate-500">Cấu hình món ăn, combo và các tùy chọn đi kèm.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-[#0F4C5C] text-[#0F4C5C] rounded-lg font-bold text-sm bg-white hover:bg-slate-50 transition-all active:scale-95">
            <Download size={18} /> Xuất Dữ Liệu
          </button>
          <button 
            onClick={() => setShowModal(activeTab)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0F4C5C] text-white rounded-lg font-bold text-sm hover:opacity-95 shadow-lg shadow-[#0F4C5C]/20 transition-all active:scale-95"
          >
            <Plus size={18} /> Thêm {tabs.find(t=>t.id === activeTab)?.label}
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-[#0F4C5C] shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <tab.icon size={18} />
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'dishes' && (
              <motion.div 
                key="dishes"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {dishes.map((dish) => (
                  <div key={dish.id} className="bg-white border border-slate-100 rounded-2xl p-4 flex gap-4 transition-all hover:border-[#0F4C5C] hover:shadow-xl hover:shadow-[#0F4C5C]/5 group relative overflow-hidden">
                    <img src={dish.image} alt={dish.name} className="w-24 h-24 rounded-xl object-cover group-hover:scale-105 transition-transform" />
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800 truncate">{dish.name}</h4>
                        <button className="p-1 hover:bg-slate-50 rounded-lg"><MoreVertical size={16} className="text-slate-400" /></button>
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Category: Beverage</p>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="font-black text-base text-[#0F4C5C]">{dish.price}</span>
                        <div className="flex items-center gap-2">
                           <span className={`text-[10px] font-black uppercase ${dish.statusColor}`}>{dish.status}</span>
                           <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${dish.status === 'Còn' ? 'bg-green-500' : 'bg-slate-200'}`}>
                             <div className={`w-3 h-3 bg-white rounded-full shadow transition-transform ${dish.status === 'Còn' ? 'translate-x-4' : 'translate-x-0'}`} />
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'combos' && (
               <motion.div 
                key="combos"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
               >
                 {[
                   { name: 'Combo Sinh Viên', price: '50.000đ', period: '10/05 - 20/05', items: '2x Trà sữa truyền thống', status: 'Active' },
                   { name: 'Gia Đình Cuối Tuần', price: '450.000đ', period: 'Thứ 7 & CN', items: '4x Burger, 2x Pasta, 4x Soda', status: 'Paused' }
                 ].map((combo, i) => (
                   <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 flex items-center justify-between group hover:border-[#0F4C5C] transition-all">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#0F4C5C]/5 rounded-xl flex items-center justify-center text-[#0F4C5C]">
                          <Package size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{combo.name}</h4>
                          <p className="text-xs text-slate-400 font-medium">{combo.items}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-8">
                        <div className="text-right">
                          <p className="text-[10px] font-black uppercase text-slate-300">Giá khuyến mãi</p>
                          <p className="font-black text-[#0F4C5C]">{combo.price}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black uppercase text-slate-300">Thời gian</p>
                          <p className="text-xs font-bold text-slate-600">{combo.period}</p>
                        </div>
                        <button className="p-2 hover:bg-slate-50 rounded-xl transition-all"><MoreVertical size={20} className="text-slate-400" /></button>
                     </div>
                   </div>
                 ))}
               </motion.div>
            )}

            {activeTab === 'categories' && (
              <motion.div 
                key="categories"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {[
                  { name: 'Beverage', count: 18, desc: 'Drinkable products', color: 'bg-blue-50 text-blue-600' },
                  { name: 'Main Dishes', count: 24, desc: 'Heavier dinner/lunch', color: 'bg-orange-50 text-orange-600' },
                  { name: 'Desserts', count: 12, desc: 'Sweat treats', color: 'bg-purple-50 text-purple-600' },
                  { name: 'Appetizers', count: 9, desc: 'Starter meals', color: 'bg-teal-50 text-teal-600' }
                ].map((cat, i) => (
                  <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-[#0F4C5C] transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.color}`}>
                        <Tag size={24} />
                      </div>
                      <button className="p-2 hover:bg-slate-50 rounded-xl transition-all"><MoreVertical size={20} className="text-slate-300" /></button>
                    </div>
                    <h4 className="font-black text-[#0F4C5C] text-lg">{cat.name}</h4>
                    <p className="text-xs text-slate-400 mb-4">{cat.desc}</p>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-black px-2 py-1 bg-slate-50 rounded-lg text-slate-400 uppercase tracking-widest">{cat.count} SẢN PHẨM</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'options' && (
               <motion.div 
                key="options"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden"
              >
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      <th className="py-5 px-8">Nhóm tùy chọn</th>
                      <th className="py-5">Cấu hình</th>
                      <th className="py-5">Lựa chọn</th>
                      <th className="py-5 text-right px-8">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { name: 'Kích cỡ ly', choices: 'Size S, M, L', config: 'Bắt buộc - Max: 1', status: 'Active' },
                      { name: 'Topping trà sữa', choices: 'Trân châu đen, Trân châu trắng, Thạch...', config: 'Tùy chọn - Max: 3', status: 'Active' },
                      { name: 'Mức độ đường', choices: '0%, 30%, 50%, 70%, 100%', config: 'Bắt buộc - Max: 1', status: 'Active' }
                    ].map((opt, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-all group">
                        <td className="py-5 px-8">
                          <p className="font-bold text-slate-800">{opt.name}</p>
                        </td>
                        <td>
                          <span className="text-[10px] font-black px-2 py-1 bg-[#0F4C5C]/5 text-[#0F4C5C] rounded-lg border border-[#0F4C5C]/10 uppercase">{opt.config}</span>
                        </td>
                        <td>
                          <p className="text-xs text-slate-400 truncate max-w-[200px]">{opt.choices}</p>
                        </td>
                        <td className="py-5 px-8 text-right">
                           <button className="text-xs font-black text-[#0F4C5C] hover:underline uppercase tracking-tight">Chi tiết</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[#0F4C5C] flex items-center gap-2">
                <AlertCircle size={20} /> Cảnh báo kho
              </h3>
              <Filter size={18} className="text-slate-400 cursor-pointer hover:text-[#0F4C5C]" />
            </div>
            
            <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl mb-6">
              <p className="text-xs font-bold text-orange-800 flex items-center gap-2">
                 <AlertCircle size={14} /> Kiểm tra nguyên liệu đầu vào
              </p>
              <p className="text-[10px] text-orange-600 mt-1 uppercase font-black">Tuần này có 3 món sắp hết hạn</p>
            </div>

            <div className="space-y-6">
              {[
                { name: 'Thịt Bò Mỹ', val: '4.5 / 30', pct: 15, color: 'bg-red-500', status: 'Cần nhập hàng', unit: 'kg' },
                { name: 'Sữa tươi', val: '12 / 50', pct: 24, color: 'bg-orange-500', status: 'Sắp hết', unit: 'lít' },
                { name: 'Trân châu đen', val: '85 / 100', pct: 85, color: 'bg-green-500', status: 'Đang đủ', unit: 'gói' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-700">{item.name}</span>
                    <span className="font-black text-slate-400">{item.val} {item.unit}</span>
                  </div>
                  <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.pct}%` }}
                      className={`h-full ${item.color}`} 
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full py-3 mt-8 border-2 border-dashed border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 hover:border-[#0F4C5C] hover:text-[#0F4C5C] hover:bg-slate-50 transition-all uppercase tracking-widest">
              XEM BÁO CÁO TỒN KHO
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
            <h3 className="font-black text-[#0F4C5C] text-sm mb-6 flex items-center gap-2 uppercase tracking-wide">
              <History size={18} /> Nhật ký thay đổi
            </h3>
            <div className="space-y-6 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100">
               {[
                 { time: '10:45 AM', action: 'Cập nhật giá', target: 'Salad Gà Nướng', author: 'Quản lý A', color: 'bg-[#0F4C5C]' },
                 { time: '08:30 AM', action: 'Ẩn món ăn', target: 'Burger Tôm', author: 'Quản lý B', color: 'bg-slate-300' },
               ].map((log, i) => (
                 <div key={i} className="pl-6 relative">
                    <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full ${log.color} border-2 border-white ring-1 ring-slate-100`} />
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">{log.time}</p>
                    <p className="text-xs font-bold text-slate-700">{log.action}: <span className="text-[#0F4C5C]">{log.target}</span></p>
                    <p className="text-[10px] text-slate-400 italic">Thực hiện bởi: {log.author}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-[#0F4C5C] text-white">
                <div className="flex items-center gap-3">
                  {tabs.find(t=>t.id === showModal)?.icon && (
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      {/* Using dynamic icons can be tricky with types, keeping it simple */}
                      <Plus size={20} />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-black">Thêm {tabs.find(t=>t.id === showModal)?.label} mới</h3>
                    <p className="text-[10px] text-teal-100/60 font-black uppercase tracking-widest">IRMS Inventory Management</p>
                  </div>
                </div>
                <button onClick={() => setShowModal(null)} className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 max-h-[70vh] overflow-y-auto">
                {showModal === 'dishes' && (
                  <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 md:col-span-1 space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tên món ăn</label>
                        <input type="text" placeholder="VD: Trà Sữa Trân Châu" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/5 outline-none transition-all text-sm font-bold" />
                      </div>
                      <div className="col-span-2 md:col-span-1 space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Giá bán</label>
                        <input type="number" placeholder="VD: 35000" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/5 outline-none transition-all text-sm font-bold" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Danh mục</label>
                      <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/5 outline-none transition-all text-sm font-bold appearance-none">
                        <option>Chọn danh mục...</option>
                        <option>Beverage</option>
                        <option>Main Dish</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hình ảnh món ăn</label>
                      <div className="border-2 border-dashed border-slate-100 rounded-3xl p-8 flex flex-col items-center justify-center gap-2 hover:border-[#0F4C5C] hover:bg-slate-50 transition-all cursor-pointer">
                        <Upload size={32} className="text-slate-300" />
                        <p className="text-xs font-bold text-slate-400 italic">Kéo thả hoặc nhấn để tải lên hình ảnh</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ghi chú công thức (Recipe Notes)</label>
                      <textarea placeholder="VD: Pha 70% đường, 50% đá" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/5 outline-none transition-all text-sm font-bold h-24" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Nhóm tùy chọn liên quan</label>
                      <div className="flex flex-wrap gap-2">
                        {['Kích cỡ ly', 'Topping trà sữa', 'Mức độ đường'].map(tag => (
                          <div key={tag} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black text-[#0F4C5C]">
                            {tag} <X size={12} className="cursor-pointer" />
                          </div>
                        ))}
                        <button type="button" className="inline-flex items-center gap-1 text-[10px] font-black text-[#0F4C5C] px-3 py-1.5 hover:underline">
                           + THÊM NHÓM
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {showModal === 'combos' && (
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tên Combo</label>
                      <input type="text" placeholder="VD: Combo Sinh Viên" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ngày bắt đầu</label>
                        <input type="datetime-local" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ngày kết thúc</label>
                        <input type="datetime-local" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Các món trong combo</label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <span className="flex-1 text-xs font-bold">Salad Gà Nướng</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-slate-300 uppercase">Số lượng:</span>
                            <input type="number" defaultValue={1} className="w-12 py-1 px-2 border rounded bg-white text-center text-xs font-black" />
                          </div>
                          <button type="button" className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                        </div>
                        <button type="button" className="w-full py-3 border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center gap-2 text-slate-300 hover:text-[#0F4C5C] hover:border-[#0F4C5C] transition-all">
                          <PlusCircle size={16} />
                          <span className="text-[10px] font-black uppercase">Click để thêm món vào combo</span>
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {showModal === 'categories' && (
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tên danh mục</label>
                      <input type="text" placeholder="VD: Đồ uống nóng" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mô tả</label>
                      <textarea placeholder="Giải thích về danh mục này..." className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none h-24" />
                    </div>
                  </form>
                )}

                {showModal === 'options' && (
                  <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tên Nhóm tùy chọn</label>
                        <input type="text" placeholder="VD: Kích cỡ ly" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none" />
                      </div>
                      <div className="space-y-2 flex items-center pt-6 gap-6">
                         <div className="flex items-center gap-2">
                           <input type="checkbox" id="isRequired" className="w-4 h-4 rounded border-slate-200" />
                           <label htmlFor="isRequired" className="text-xs font-bold text-slate-600">Bắt buộc</label>
                         </div>
                         <div className="flex items-center gap-2">
                           <span className="text-[10px] font-black text-slate-400 uppercase">Max Choice:</span>
                           <input type="number" defaultValue={1} className="w-12 py-1 px-2 border rounded bg-white text-center text-xs font-black" />
                         </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Các lựa chọn (Option Choices)</label>
                        <button type="button" className="text-[10px] font-black text-[#0F4C5C] uppercase tracking-widest flex items-center gap-1 hover:underline">
                          <PlusCircle size={14} /> Thêm Lựa Chọn
                        </button>
                      </div>
                      <div className="space-y-2">
                        {[
                          { name: 'Size S', price: '0đ', status: 'Còn hàng' },
                          { name: 'Size M', price: '+5,000đ', status: 'Còn hàng' },
                        ].map((choice, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                             <input type="text" defaultValue={choice.name} className="flex-1 bg-white border-0 py-2 px-3 rounded-lg text-xs font-bold outline-none" />
                             <input type="text" defaultValue={choice.price} className="w-24 bg-white border-0 py-2 px-3 rounded-lg text-xs font-black text-[#0F4C5C] outline-none" />
                             <div className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-[9px] font-black uppercase cursor-pointer hover:bg-red-100 hover:text-red-700 transition-colors group">
                                <span className="group-hover:hidden">Còn hàng</span>
                                <span className="hidden group-hover:block">Hết hàng</span>
                             </div>
                             <button type="button" className="p-1.5 text-slate-300 hover:text-red-400 transition-all"><Trash2 size={16} /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </form>
                )}
              </div>

              <div className="p-8 border-t border-slate-50 bg-slate-50/50 flex justify-end gap-3">
                <button 
                  onClick={() => setShowModal(null)}
                  className="px-8 py-3 text-sm font-black text-slate-400 hover:text-slate-600 transition-all uppercase tracking-widest"
                >
                  Hủy bỏ
                </button>
                <button className="px-10 py-3 bg-[#0F4C5C] text-white rounded-2xl font-black shadow-lg shadow-[#0F4C5C]/20 hover:opacity-95 transition-all text-sm uppercase tracking-widest">
                  Xác nhận lưu
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
