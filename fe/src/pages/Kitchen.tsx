import { Play, Check, Hourglass, Info, Plus } from "lucide-react";
import { motion } from "motion/react";

const kdsTickets = [
  {
    table: "BÀN 08",
    orderId: "#4521",
    time: "14:20",
    status: "DELAYED",
    delayTime: "15'",
    note: "Không cay",
    items: [
      { name: "Phở Bò Tái Lăn", qty: 2, status: "PENDING" },
      { name: "Gỏi Cuốn Tôm Thịt", qty: 1, status: "PREPARING" },
    ],
    border: "border-red-500",
    bg: "bg-red-50",
  },
  {
    table: "BÀN 15",
    orderId: "#4524",
    time: "08:45",
    status: "PREPARING",
    items: [
      { name: "Bún Chả Hà Nội", qty: 1, status: "PREPARING" },
      { name: "Nem Rán (Chả Giò)", qty: 2, status: "DONE" },
    ],
    border: "border-orange-500",
    bg: "bg-orange-50",
  },
  {
    table: "BÀN 02",
    orderId: "#4526",
    time: "02:10",
    status: "NEW",
    note: "* Ít cơm, nhiều đồ chua",
    items: [{ name: "Cơm Tấm Sườn Bì Chả", qty: 4, status: "PENDING" }],
    border: "border-[#0F4C5C]",
    bg: "bg-slate-50",
  },
];

export default function Kitchen() {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-[#0F4C5C]">
            Hệ Thống Hiển Thị Bếp (KDS)
          </h2>
          <p className="text-slate-500 font-medium">
            Đang xử lý 14 đơn hàng trực tiếp
          </p>
        </div>
        <div className="flex bg-slate-100 rounded-lg p-1">
          <button className="px-4 py-2 bg-white shadow-sm rounded-md text-xs font-bold text-[#0F4C5C]">
            Tất cả
          </button>
          <button className="px-4 py-2 text-xs font-medium text-slate-500">
            Khai vị
          </button>
          <button className="px-4 py-2 text-xs font-medium text-slate-500">
            Món chính
          </button>
          <button className="px-4 py-2 text-xs font-medium text-slate-500">
            Đồ uống
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {kdsTickets.map((ticket, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col shadow-sm border-t-4 ${ticket.border}`}
          >
            <div
              className={`p-4 ${ticket.bg} flex justify-between items-start`}
            >
              <div>
                <span className="text-[10px] font-black uppercase text-slate-500">
                  {ticket.table} • ĐƠN {ticket.orderId}
                </span>
                <h3 className="text-2xl font-black text-[#0F4C5C]">
                  {ticket.time}
                </h3>
              </div>
              <div className="text-right">
                {ticket.status === "DELAYED" && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-[10px] font-black animate-pulse">
                    QUÁ GIỜ: {ticket.delayTime}
                  </span>
                )}
                {ticket.status === "PREPARING" && (
                  <span className="bg-orange-500 text-white px-2 py-1 rounded text-[10px] font-black">
                    ĐANG CHẾ BIẾN
                  </span>
                )}
                {ticket.status === "NEW" && (
                  <span className="bg-[#0F4C5C] text-white px-2 py-1 rounded text-[10px] font-black">
                    MỚI
                  </span>
                )}
                {ticket.note && (
                  <p className="text-[10px] text-slate-500 mt-2 font-medium italic">
                    {ticket.note}
                  </p>
                )}
              </div>
            </div>

            <div className="flex-1 p-4 space-y-4">
              {ticket.items.map((item, j) => (
                <div
                  key={j}
                  className={`flex justify-between items-start ${item.status === "DONE" ? "opacity-40" : ""}`}
                >
                  <div className="flex-1">
                    <p
                      className={`font-bold text-slate-800 flex items-center gap-2 ${item.status === "DONE" ? "line-through" : ""}`}
                    >
                      <span className="bg-[#0F4C5C] text-white w-6 h-6 rounded flex items-center justify-center text-[10px]">
                        {item.qty}
                      </span>
                      {item.name}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {item.status === "PENDING" && (
                      <button className="w-8 h-8 rounded-full border border-[#0F4C5C] text-[#0F4C5C] flex items-center justify-center hover:bg-[#0F4C5C] hover:text-white transition-all">
                        <Play size={14} />
                      </button>
                    )}
                    {item.status === "PREPARING" && (
                      <button className="w-8 h-8 rounded-full bg-[#0F4C5C] text-white flex items-center justify-center">
                        <Hourglass
                          size={14}
                          className="animate-spin duration-high"
                        />
                      </button>
                    )}
                    <button
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${item.status === "DONE" ? "bg-green-500 text-white" : "bg-slate-50 text-slate-300"}`}
                    >
                      <Check size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="m-4 py-3 bg-[#0F4C5C] text-white font-bold rounded-xl text-sm hover:opacity-90 active:scale-[0.98] transition-all">
              HOÀN TẤT ĐƠN
            </button>
          </motion.div>
        ))}
      </div>

      {/* Floating Status Bar */}
      <div className="fixed bottom-6 right-6 flex items-center gap-4">
        <div className="bg-white/90 backdrop-blur shadow-xl border border-slate-200 rounded-full px-6 py-3 flex items-center gap-8">
          <div className="flex items-center gap-2 border-r border-slate-100 pr-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
              HỆ THỐNG TRỰC TUYẾN
            </span>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400">CHỜ</p>
              <p className="text-sm font-black text-[#0F4C5C]">05</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400">CHẾ BIẾN</p>
              <p className="text-sm font-black text-orange-500">08</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400">QUÁ TẢI</p>
              <p className="text-sm font-black text-red-500">01</p>
            </div>
          </div>
        </div>
        <button className="w-14 h-14 bg-orange-500 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
          <Plus size={32} />
        </button>
      </div>
    </div>
  );
}
import { useEffect, useMemo, useState } from "react";
// import { Play, Check, Hourglass, Plus, Info } from "lucide-react";
// import { motion } from "motion/react";
// import { useMenuStatusSocket } from "../hooks/useMenuStatusSocket";

// type TicketItem = {
//   name: string;
//   qty: number;
//   status: "PENDING" | "PREPARING" | "DONE";
// };

// type KDSTicket = {
//   table: string;
//   orderId: string;
//   time: string;
//   status: "NEW" | "PREPARING" | "DELAYED";
//   delayTime?: string;
//   note?: string;
//   items: TicketItem[];
//   border: string;
//   bg: string;
// };

// const kdsTickets: KDSTicket[] = [
//   {
//     table: "BÀN 08",
//     orderId: "#4521",
//     time: "14:20",
//     status: "DELAYED",
//     delayTime: "15'",
//     note: "Không cay",
//     items: [
//       { name: "Phở Bò Tái Lăn", qty: 2, status: "PENDING" },
//       { name: "Gỏi Cuốn Tôm Thịt", qty: 1, status: "PREPARING" },
//     ],
//     border: "border-red-500",
//     bg: "bg-red-50",
//   },
//   {
//     table: "BÀN 15",
//     orderId: "#4524",
//     time: "08:45",
//     status: "PREPARING",
//     items: [
//       { name: "Bún Chả Hà Nội", qty: 1, status: "PREPARING" },
//       { name: "Nem Rán (Chả Giò)", qty: 2, status: "DONE" },
//     ],
//     border: "border-orange-500",
//     bg: "bg-orange-50",
//   },
//   {
//     table: "BÀN 02",
//     orderId: "#4526",
//     time: "02:10",
//     status: "NEW",
//     note: "* Ít cơm, nhiều đồ chua",
//     items: [{ name: "Cơm Tấm Sườn Bì Chả", qty: 4, status: "PENDING" }],
//     border: "border-[#0F4C5C]",
//     bg: "bg-slate-50",
//   },
// ];

// export default function Kitchen() {
//   const token = localStorage.getItem("token");
//   const lastUpdate = useMenuStatusSocket(token);
//   const [liveMessage, setLiveMessage] = useState<string>("");

//   useEffect(() => {
//     if (!lastUpdate) return;

//     setLiveMessage(`Món ${lastUpdate.itemName} hiện đã ${lastUpdate.status}`);
//   }, [lastUpdate]);

//   const stats = useMemo(() => {
//     return {
//       waiting: 5,
//       preparing: 8,
//       delayed: 1,
//     };
//   }, []);

//   return (
//     <div className="space-y-8">
//       <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
//         <div>
//           <h2 className="text-3xl font-black text-[#0F4C5C]">
//             Hệ Thống Hiển Thị Bếp (KDS)
//           </h2>
//           <p className="text-slate-500 font-medium">
//             Đang xử lý 14 đơn hàng trực tiếp
//           </p>
//         </div>

//         <div className="flex bg-slate-100 rounded-lg p-1 w-fit">
//           <button className="px-4 py-2 bg-white shadow-sm rounded-md text-xs font-bold text-[#0F4C5C]">
//             Tất cả
//           </button>
//           <button className="px-4 py-2 text-xs font-medium text-slate-500">
//             Khai vị
//           </button>
//           <button className="px-4 py-2 text-xs font-medium text-slate-500">
//             Món chính
//           </button>
//           <button className="px-4 py-2 text-xs font-medium text-slate-500">
//             Đồ uống
//           </button>
//         </div>
//       </header>

//       {liveMessage && (
//         <div className="rounded-xl border border-slate-200 bg-white shadow-sm px-4 py-3 flex items-start gap-3">
//           <div className="mt-0.5 rounded-full bg-[#0F4C5C] text-white p-2">
//             <Info size={16} />
//           </div>
//           <div>
//             <p className="text-sm font-bold text-slate-800">Cập nhật realtime</p>
//             <p className="text-sm text-slate-600">{liveMessage}</p>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {kdsTickets.map((ticket, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className={`bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col shadow-sm border-t-4 ${ticket.border}`}
//           >
//             <div className={`p-4 ${ticket.bg} flex justify-between items-start`}>
//               <div>
//                 <span className="text-[10px] font-black uppercase text-slate-500">
//                   {ticket.table} • ĐƠN {ticket.orderId}
//                 </span>
//                 <h3 className="text-2xl font-black text-[#0F4C5C]">
//                   {ticket.time}
//                 </h3>
//               </div>

//               <div className="text-right">
//                 {ticket.status === "DELAYED" && (
//                   <span className="bg-red-500 text-white px-2 py-1 rounded text-[10px] font-black animate-pulse">
//                     QUÁ GIỜ: {ticket.delayTime}
//                   </span>
//                 )}
//                 {ticket.status === "PREPARING" && (
//                   <span className="bg-orange-500 text-white px-2 py-1 rounded text-[10px] font-black">
//                     ĐANG CHẾ BIẾN
//                   </span>
//                 )}
//                 {ticket.status === "NEW" && (
//                   <span className="bg-[#0F4C5C] text-white px-2 py-1 rounded text-[10px] font-black">
//                     MỚI
//                   </span>
//                 )}
//                 {ticket.note && (
//                   <p className="text-[10px] text-slate-500 mt-2 font-medium italic">
//                     {ticket.note}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="flex-1 p-4 space-y-4">
//               {ticket.items.map((item, j) => (
//                 <div
//                   key={j}
//                   className={`flex justify-between items-start gap-4 ${
//                     item.status === "DONE" ? "opacity-40" : ""
//                   }`}
//                 >
//                   <div className="flex-1">
//                     <p
//                       className={`font-bold text-slate-800 flex items-center gap-2 ${
//                         item.status === "DONE" ? "line-through" : ""
//                       }`}
//                     >
//                       <span className="bg-[#0F4C5C] text-white w-6 h-6 rounded flex items-center justify-center text-[10px]">
//                         {item.qty}
//                       </span>
//                       {item.name}
//                     </p>
//                   </div>

//                   <div className="flex gap-2">
//                     {item.status === "PENDING" && (
//                       <button className="w-8 h-8 rounded-full border border-[#0F4C5C] text-[#0F4C5C] flex items-center justify-center hover:bg-[#0F4C5C] hover:text-white transition-all">
//                         <Play size={14} />
//                       </button>
//                     )}

//                     {item.status === "PREPARING" && (
//                       <button className="w-8 h-8 rounded-full bg-[#0F4C5C] text-white flex items-center justify-center">
//                         <Hourglass size={14} className="animate-spin" />
//                       </button>
//                     )}

//                     <button
//                       className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
//                         item.status === "DONE"
//                           ? "bg-green-500 text-white"
//                           : "bg-slate-50 text-slate-300"
//                       }`}
//                     >
//                       <Check size={14} />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <button className="m-4 py-3 bg-[#0F4C5C] text-white font-bold rounded-xl text-sm hover:opacity-90 active:scale-[0.98] transition-all">
//               HOÀN TẤT ĐƠN
//             </button>
//           </motion.div>
//         ))}
//       </div>

//       <div className="fixed bottom-6 right-6 flex items-center gap-4">
//         <div className="bg-white/90 backdrop-blur shadow-xl border border-slate-200 rounded-full px-6 py-3 flex items-center gap-8">
//           <div className="flex items-center gap-2 border-r border-slate-100 pr-6">
//             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//             <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
//               HỆ THỐNG TRỰC TUYẾN
//             </span>
//           </div>

//           <div className="flex gap-8">
//             <div className="text-center">
//               <p className="text-[10px] font-black text-slate-400">CHỜ</p>
//               <p className="text-sm font-black text-[#0F4C5C]">{stats.waiting}</p>
//             </div>
//             <div className="text-center">
//               <p className="text-[10px] font-black text-slate-400">CHẾ BIẾN</p>
//               <p className="text-sm font-black text-orange-500">
//                 {stats.preparing}
//               </p>
//             </div>
//             <div className="text-center">
//               <p className="text-[10px] font-black text-slate-400">QUÁ TẢI</p>
//               <p className="text-sm font-black text-red-500">{stats.delayed}</p>
//             </div>
//           </div>
//         </div>

//         <button className="w-14 h-14 bg-orange-500 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
//           <Plus size={32} />
//         </button>
//       </div>
//     </div>
//   );
// }