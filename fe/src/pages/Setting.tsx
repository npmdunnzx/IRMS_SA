import {
  Lock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function Setting() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [error, setError] = useState("");

  const handleChangePassword = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/user/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword: currentPassword,
            newPassword,
          }),
        },
      );

      if (!response.ok) {
        console.log(error);
        const data = await response.json();
        throw new Error(data.message || "Thay đổi mật khẩu thất bại");
      }

      setShowConfirmModal(false);
      setShowSuccessModal(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-black text-[#0F4C5C]">Cài đặt</h2>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0F4C5C]/10 flex items-center justify-center">
            <ShieldCheck size={28} className="text-[#0F4C5C]" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800">
              Thay đổi mật khẩu
            </h2>
            <p className="text-sm text-slate-400 font-medium">
              Bảo vệ tài khoản của bạn bằng mật khẩu mạnh
            </p>
          </div>
        </div>

        <div className="p-8 space-y-4">
          {error && (
            <div className="flex items-start gap-3 p-4 mb-6 bg-red-50 border border-red-100 rounded-xl animate-in fade-in slide-in-from-top-1">
              <div className="flex-shrink-0 mt-0.5">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-red-500">
                  <span className="text-red-500 text-xs font-bold">!</span>
                </div>
              </div>

              <div className="text-[#374151] text-[15px] leading-relaxed">
                {error}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Mật khẩu hiện tại
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                size={18}
              />
              <input
                type="password"
                placeholder="••••••••"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-[#0F4C5C]/5 focus:border-[#0F4C5C] outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Mật khẩu mới
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                size={18}
              />
              <input
                type="password"
                placeholder="••••••••"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-[#0F4C5C]/5 focus:border-[#0F4C5C] outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                size={18}
              />
              <input
                type="password"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-[#0F4C5C]/5 focus:border-[#0F4C5C] outline-none transition-all text-sm"
              />
            </div>
          </div>

          <button
            onClick={() => {
              if (!currentPassword || !newPassword || !confirmPassword) {
                setError("Vui lòng điền đầy đủ thông tin");
                return;
              }
              if (newPassword !== confirmPassword) {
                setError("Mật khẩu xác nhận không khớp");
                return;
              }
              setError("");
              setShowConfirmModal(true);
            }}
            className="w-full py-4 bg-[#0F4C5C] text-white rounded-2xl font-black shadow-lg shadow-[#0F4C5C]/20 hover:opacity-95 transition-all"
          >
            THAY ĐỔI MẬT KHẨU
          </button>
        </div>
      </div>

      <AnimatePresence>
        {/* Confirm Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {setShowConfirmModal(false); setError('')}}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden" 
            >
              <div className="p-8 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-6">
                  <AlertTriangle size={42} className="text-orange-500" />
                </div>

                <h2 className="text-2xl font-black text-slate-800 mb-3">
                  Xác nhận thay đổi mật khẩu
                </h2>

                {error && (
                  <div className="flex items-start gap-3 p-4 mb-6 bg-red-50 border border-red-100 rounded-xl animate-in fade-in slide-in-from-top-1">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-red-500">
                        <span className="text-red-500 text-xs font-bold">
                          !
                        </span>
                      </div>
                    </div>

                    <div className="text-[#374151] text-[15px] leading-relaxed">
                      {error}
                    </div>
                  </div>
                )}

                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  Bạn có chắc chắn muốn thay đổi mật khẩu tài khoản?
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-600 font-black hover:bg-slate-50 transition-all"
                  >
                    HỦY
                  </button>

                  <button
                    onClick={handleChangePassword}
                    disabled={loading}
                    className="flex-1 py-4 bg-[#0F4C5C] text-white rounded-2xl font-black shadow-lg shadow-[#0F4C5C]/20 hover:opacity-95 transition-all disabled:opacity-50"
                  >
                    {loading ? "ĐANG XỬ LÝ..." : "XÁC NHẬN"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden" 
            >
              <div className="p-8 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <CheckCircle2 size={42} className="text-green-600" />
                </div>

                <h2 className="text-2xl font-black text-slate-800 mb-3">
                  Thành công!
                </h2>

                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  Mật khẩu tài khoản đã được thay đổi thành công.
                </p>

                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full py-4 bg-[#0F4C5C] text-white rounded-2xl font-black shadow-lg shadow-[#0F4C5C]/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 group"
                >
                  Quay lại trang Cài đặt
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
