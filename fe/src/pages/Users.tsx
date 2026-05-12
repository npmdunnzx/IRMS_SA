import { 
  UserPlus, 
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  X,
  Lock,
  Mail,
  CheckCircle2,
  ArrowRight,
  UserX,
  AlertTriangle,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Users() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('MANAGER');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [users, setUsers] = useState<any[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [page, setPage] = useState({
    size: 10,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  });
  const [searchName, setSearchName] = useState('');
  const [searchRole, setSearchRole] = useState('');

  const [showInactiveModal, setShowInactiveModal] = useState(false);
  const [inactiveLoading, setInactiveLoading] = useState(false);
  const [inactiveError, setInactiveError] = useState('');

  const handleOpenInactiveModal = (user: any) => {
    setSelectedUser(user);
    setShowInactiveModal(true);
  };

  const handleInactiveUser = async () => {
    if (!selectedUser) return;

    try {
      setInactiveLoading(true);
      setInactiveError('');

      const token = localStorage.getItem('token');

      const response = await fetch(
        `http://localhost:8080/api/user/${selectedUser.id}/inactive`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Vô hiệu hóa tài khoản thất bại');
      }

      setShowInactiveModal(false);
      setSuccessMessage('Tài khoản nhân viên đã được vô hiệu hóa thành công.');
      setShowSuccessModal(true);
      fetchUsers(page.number);

    } catch (err: any) {
      console.error(err);
      setInactiveError(err.message || 'Có lỗi xảy ra');
    } finally {
      setInactiveLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:8080/api/user/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Tạo người dùng thất bại');
      }

      console.log('Create user success:', data);

      setSuccessMessage('Nhân viên mới đã được tạo thành công trong hệ thống.');
      setShowSuccessModal(true);

      // reset form
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setRole('MANAGER');

      setShowAddModal(false);
      fetchUsers();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async (pageNumber = 0) => {
    try {
      setUsersLoading(true);

      const token = localStorage.getItem('token');

      let url = '';

      const hasName = searchName.trim() !== '';
      const hasRole = searchRole.trim() !== '';

      // Search API
      if (hasName || hasRole) {
        const params = new URLSearchParams({
          page: pageNumber.toString(),
          size: '10',
        });

        if (hasName) {
          params.append('name', searchName);
        }

        if (hasRole) {
          params.append('role', searchRole);
        }

        url = `http://localhost:8080/api/user/search?${params.toString()}`;
      }

      // Normal API
      else {
        url = `http://localhost:8080/api/user?page=${pageNumber}&size=10&sort=desc`;
      }
      console.log(url);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Lấy danh sách người dùng thất bại');
      }

      setUsers(data.content);
      setPage(data.page);
    } catch (err) {
      console.error(err);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(0);
  }, [searchName, searchRole]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-[#0F4C5C]">Quản lý Nhân sự</h2>
          <p className="text-slate-500">Phân quyền và quản lý tài khoản nhân viên trong hệ thống</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#0F4C5C] text-white rounded-xl font-bold hover:opacity-90 shadow-lg shadow-[#0F4C5C]/20 transition-all active:scale-95"
        >
          <UserPlus size={20} /> Thêm Nhân viên
        </button>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm nhân viên..." 
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none text-sm"
            />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-white transition-all">
              <Filter size={18} /> Bộ lọc
            </button>
            <select 
              value={searchRole}
              onChange={(e) => setSearchRole(e.target.value)}
              className="text-sm font-bold border-slate-200 rounded-xl py-2 px-4 focus:ring-[#0F4C5C]/20 outline-none bg-white"
            >
              <option value="">Tất cả vai trò</option>
              <option value="ADMIN">Admin</option>
              <option value="MANAGER">Manager</option>
              <option value="STAFF">Staff</option>
              <option value="CASHIER">Cashier</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#0F4C5C]/5 border-b border-slate-100">
              <tr className="text-[10px] font-black uppercase text-[#0F4C5C]/60 tracking-widest">
                <th className="px-8 py-5">Nhân viên</th>
                <th className="px-8 py-5">Vai trò</th>
                <th className="px-8 py-5">Trạng thái</th>
                <th className="px-8 py-5 text-right">Thao tác</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {usersLoading ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-slate-400 font-bold">
                    Đang tải danh sách nhân viên...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-slate-400 font-bold">
                    Không có nhân viên nào
                  </td>
                </tr>
              ) : (
                users.map((user, i) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0F4C5C]/10 flex items-center justify-center font-black text-[#0F4C5C] text-xs uppercase group-hover:bg-[#0F4C5C] group-hover:text-white transition-all">
                          {user.userName
                            ?.split(' ')
                            .map((n: string) => n[0])
                            .join('')}
                        </div>

                        <div>
                          <p className="text-sm font-bold text-slate-800">
                            {user.userName}
                          </p>

                          <p className="text-[10px] text-slate-400 font-bold">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      <span
                        className={`px-2 py-1 text-[10px] font-black rounded-lg uppercase tracking-wider
                          ${
                            user.role === 'ADMIN'
                              ? 'bg-red-50 text-red-700'
                              : user.role === 'MANAGER'
                              ? 'bg-teal-50 text-teal-700'
                              : user.role === 'CASHIER'
                              ? 'bg-purple-50 text-purple-700'
                              : 'bg-orange-50 text-orange-700'
                          }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            user.status === 'ACTIVE'
                              ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse'
                              : 'bg-slate-300'
                          }`}
                        ></span>

                        <span className="text-xs font-bold text-slate-600">
                          {user.status === 'ACTIVE'
                            ? 'Đang hoạt động'
                            : 'Ngưng hoạt động'}
                        </span>
                      </div>
                    </td>

                    <td className="px-8 py-5 text-right relative">
                      <div className="flex justify-end gap-2">
                        {/* <button
                          onClick={() => handleOpenPasswordModal(user)}
                          className="p-2 text-slate-400 hover:text-[#0F4C5C] hover:bg-slate-100 rounded-lg transition-all"
                          title="Đổi mật khẩu"
                        >
                          <Lock size={18} />
                        </button> */}

                        <button
                          onClick={() => handleOpenInactiveModal(user)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          title="Vô hiệu hóa tài khoản"
                        >
                          <UserX size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Hiển thị {users.length} trên tổng số {page.totalElements} nhân sự
          </p>

          <div className="flex gap-2">
            <button
              disabled={page.number === 0}
              onClick={() => fetchUsers(page.number - 1)}
              className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center bg-white hover:bg-slate-50 transition-all shadow-sm disabled:opacity-40"
            >
              <ChevronLeft size={18} className="text-slate-400" />
            </button>

            {[...Array(page.totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => fetchUsers(index)}
                className={`w-9 h-9 rounded-xl text-xs font-black transition-all ${
                  page.number === index
                    ? 'bg-[#0F4C5C] text-white shadow-lg shadow-[#0F4C5C]/20 scale-110'
                    : 'bg-white border border-slate-100 text-slate-400 hover:bg-slate-50'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={page.number + 1 >= page.totalPages}
              onClick={() => fetchUsers(page.number + 1)}
              className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center bg-white hover:bg-slate-50 transition-all shadow-sm disabled:opacity-40"
            >
              <ChevronRight size={18} className="text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
            >
              <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-[#0F4C5C] text-white">
                <div className="flex items-center gap-3">
                  <UserPlus size={24} />
                  <h3 className="text-xl font-black">Thêm Nhân viên mới</h3>
                </div>
                <button onClick={() => {setShowAddModal(false); setError('')}} 
                  className="p-2 hover:bg-white/10 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <form className="p-8 space-y-5 overflow-y-auto" onSubmit={handleCreateUser}>
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

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Email Nhân viên</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="email" 
                        placeholder="staff@irms.pro" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-[#0F4C5C]/5 focus:border-[#0F4C5C] outline-none transition-all text-sm" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Mật khẩu ban đầu</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-[#0F4C5C]/5 focus:border-[#0F4C5C] outline-none transition-all text-sm" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Tên Nhân viên</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="text" 
                        placeholder="Tùng" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-[#0F4C5C]/5 focus:border-[#0F4C5C] outline-none transition-all text-sm" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Họ và Tên đệm</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="text" 
                        placeholder="Nguyễn Thanh" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-[#0F4C5C]/5 focus:border-[#0F4C5C] outline-none transition-all text-sm" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Vai trò</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['MANAGER', 'STAFF', 'CASHIER'].map((itemRole) => (
                        <button 
                          key={itemRole}
                          type="button"
                          onClick={() => setRole(itemRole)}
                          className={`px-4 py-3 border rounded-xl text-[10px] font-black transition-all ${
                            role === itemRole
                              ? 'border-[#0F4C5C] bg-[#0F4C5C] text-white'
                              : 'border-slate-100 hover:border-[#0F4C5C] hover:text-[#0F4C5C]'
                          }`}
                        >
                          {itemRole}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <button 
                  type='submit'
                  disabled={loading}
                  className="w-full py-4 bg-[#0F4C5C] text-white rounded-2xl font-black shadow-lg shadow-[#0F4C5C]/20 hover:opacity-95 transition-all disabled:opacity-50"
                >
                  {loading ? 'ĐANG TẠO...' : 'TẠO TÀI KHOẢN'}
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* Inactive Modal */}
        {showInactiveModal && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4"> 
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {setShowInactiveModal(false); setInactiveError('')}}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden" 
            >  
              <div className="p-8 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-6">
                  <AlertTriangle size={42} className="text-red-600" />
                </div>

                <h2 className="text-2xl font-black text-slate-800 mb-3">
                  Xác nhận vô hiệu hóa
                </h2>

                {inactiveError && (
                  <div className="flex items-start gap-3 p-4 mb-6 bg-red-50 border border-red-100 rounded-xl animate-in fade-in slide-in-from-top-1">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-red-500">
                        <span className="text-red-500 text-xs font-bold">!</span>
                      </div>
                    </div>
                        
                    <div className="text-[#374151] text-[15px] leading-relaxed">
                      {inactiveError}
                    </div>
                  </div>
                )}

                <p className="text-slate-500 text-sm leading-relaxed mb-2">
                  Bạn có chắc chắn muốn vô hiệu hóa tài khoản {selectedUser.role}:
                </p>

                <p className="font-black text-[#0F4C5C] text-lg mb-8">
                  {selectedUser.userName}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => {setShowInactiveModal(false); setInactiveError('')}}
                    className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-600 font-black hover:bg-slate-50 transition-all"
                  >
                    HỦY
                  </button>

                  <button
                    onClick={handleInactiveUser}
                    disabled={inactiveLoading}
                    className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black shadow-lg shadow-red-500/20 hover:opacity-95 transition-all disabled:opacity-50"
                  >
                    {inactiveLoading
                      ? 'ĐANG XỬ LÝ...'
                      : 'XÁC NHẬN'}
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
                  {successMessage}
                </p>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full py-4 bg-[#0F4C5C] text-white rounded-2xl font-black shadow-lg shadow-[#0F4C5C]/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 group"
                >
                  Quay lại trang Quản lý Nhân sự
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
