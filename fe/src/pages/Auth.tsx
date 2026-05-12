import { 
  Utensils, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  ArrowRight, 
  ShieldCheck, 
  ChefHat, 
  UserCircle,
  Zap,
  BarChart3,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { nav } from 'motion/react-client';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignupPage = location.pathname === '/signup';
  
  const [mode, setMode] = useState<'login' | 'signup'>(isSignupPage ? 'signup' : 'login');
  const [role, setRole] = useState('manager');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setMode(isSignupPage ? 'signup' : 'login');
  }, [isSignupPage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'signup') {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Đăng nhập thất bại');
      }

      console.log('Login success:', data);

      // Lưu access token
      localStorage.setItem('token', data.accessToken)

      // Lưu thông tin user
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = (newMode: 'login' | 'signup') => {
    setMode(newMode);
    navigate(newMode === 'login' ? '/login' : '/signup', { replace: true });
  };

  return (
    <div className="min-h-screen bg-background text-on-background relative flex items-center justify-center overflow-hidden font-sans">
      {/* Background with blur */}
      <div className="fixed inset-0 z-0">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIhrNbQ6hNfEbg5d-LrLSYBX2f3nExhXNvcbHCmbzczuzVYH7AP5AoUxRDXlThXJ3DpvKncXgzDegIOoD4Mo1050S40exjmc0jrtoXuJh6HqdDnPiWBJh6rXD74JjA5mEx3EyRZOl_YMKYY9zNycgTC-6BcCyrL0RmVbKyHluDC_L8zlKGb8zKFCNlFhiDMeKgalVASvOnN-CDAKEU4fGyBilvsPlhSp6oAALctb-8sOPZndhI9OQq25rkJyhBUHkGxjPToUGkOCOY" 
          alt="Restaurant Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#003441]/85 backdrop-blur-md"></div>
      </div>

      <motion.main 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-[1100px] flex shadow-2xl rounded-3xl overflow-hidden h-fit min-h-[600px] m-6 bg-white shrink-0"
      >
        {/* Left Side - Fixed Info Frame (40%) */}
        <section className="hidden lg:flex w-[40%] flex-col justify-between p-12 bg-[#0F4C5C] text-white overflow-hidden relative self-stretch">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-3">
              <Utensils className="text-orange-400" size={32} />
              <h1 className="text-2xl font-black tracking-widest uppercase">IRMS Pro</h1>
            </div>
            
            <AnimatePresence mode="wait">
              {mode === 'login' ? (
                <motion.div
                  key="login-text"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <h2 className="text-3xl font-bold leading-tight">Chào mừng trở lại trung tâm điều hành.</h2>
                  <p className="text-teal-100/60 text-sm">Quản lý nhà hàng của bạn với dữ liệu thời gian thực và độ chính xác tuyệt đối.</p>
                </motion.div>
              ) : (
                <motion.div
                  key="signup-text"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <h2 className="text-3xl font-bold leading-tight">Bắt đầu quản lý thông minh ngay hôm nay.</h2>
                  <p className="text-teal-100/60 text-sm">Gia nhập cộng đồng 1000+ nhà hàng đang tối ưu vận hành cùng IRMS Pro.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* <div className="space-y-4 relative z-10">
             <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-[#0F4C5C] shrink-0">
                  {mode === 'login' ? <Zap size={20} /> : <ShieldCheck size={20} />}
                </div>
                <p className="text-xs font-medium text-teal-50">
                  {mode === 'login' 
                    ? "Hệ thống đã sẵn sàng. Phiên bản Enterprise v2.4 đang hoạt động." 
                    : "Dùng thử 14 ngày miễn phí với đầy đủ tính năng Enterprise."}
                </p>
             </div>
          </div> */}

          <div className="text-[10px] text-teal-100/30 uppercase font-black tracking-widest flex justify-between items-center relative z-10">
            <span>© 2026 IRMS SYSTEM</span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
              Server Online
            </span>
          </div>
        </section>

        {/* Right Side - Form Section (60%) */}
        <section className="w-full lg:w-[60%] flex flex-col p-8 lg:p-12 overflow-y-auto bg-white min-h-[600px]">
          {/* Tabs */}
          {/* <div className="flex mb-10 border-b border-slate-100 sticky top-0 bg-white z-10 pt-2">
            <button 
              onClick={() => toggleMode('login')}
              className={`flex-1 pb-4 text-center text-sm transition-all ${
                mode === 'login' ? 'font-bold border-b-2 border-[#0F4C5C] text-[#0F4C5C]' : 'font-medium text-slate-400 hover:text-slate-600'
              }`}
            >
              Login
            </button>
            <button 
              onClick={() => toggleMode('signup')}
              className={`flex-1 pb-4 text-center text-sm transition-all ${
                mode === 'signup' ? 'font-bold border-b-2 border-[#0F4C5C] text-[#0F4C5C]' : 'font-medium text-slate-400 hover:text-slate-600 transition-all'
              }`}
            >
              Create Account
            </button>
          </div> */}

          <AnimatePresence mode="wait">
            {mode === 'login' ? (
              <motion.div
                key="login-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8 flex-grow"
              >
                <header>
                  <h2 className="text-3xl font-black text-slate-800">Đăng nhập</h2>
                  <p className="text-slate-500 mt-2">Vui lòng nhập thông tin để truy cập hệ thống.</p>
                </header>

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

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F4C5C] transition-colors" size={20} />
                      <input 
                        type="email" 
                        placeholder="manager@rms.pro" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#0F4C5C]/5 focus:border-[#0F4C5C] outline-none transition-all text-sm" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Password</label>
                      <button type="button" className="text-[10px] font-black text-[#0F4C5C] uppercase tracking-wider hover:underline">Forgot?</button>
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F4C5C] transition-colors" size={20} />
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#0F4C5C]/5 focus:border-[#0F4C5C] outline-none transition-all text-sm" 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                      >
                        <Eye size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center">
                      <input type="checkbox" id="remember" className="peer appearance-none w-5 h-5 rounded-lg border-2 border-slate-200 checked:bg-[#0F4C5C] checked:border-[#0F4C5C] transition-all cursor-pointer" />
                      <CheckCircle2 size={14} className="absolute left-0.5 pointer-events-none text-white opacity-0 peer-checked:opacity-100 transition-all" />
                    </div>
                    <label htmlFor="remember" className="text-xs font-bold text-slate-500 cursor-pointer">Ghi nhớ đăng nhập</label>
                  </div>

                  <button 
                    type='submit'
                    disabled={loading}
                    className="w-full py-4 bg-[#0F4C5C] text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-[#0F4C5C]/20 transition-all active:scale-[0.98] group disabled:opacity-50"
                  >
                    {loading ? 'ĐANG ĐĂNG NHẬP...' : 'VÀO HỆ THỐNG'}
                    {!loading && (
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                </form>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <BarChart3 className="text-[#0F4C5C] mb-2" size={20} />
                    <p className="text-[10px] font-black uppercase text-slate-400">Thống kê</p>
                    <p className="text-xs font-bold text-slate-600">Dữ liệu thời thực</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <ShieldCheck className="text-[#0F4C5C] mb-2" size={20} />
                    <p className="text-[10px] font-black uppercase text-slate-400">Bảo mật</p>
                    {/* <p className="text-xs font-bold text-slate-600">Mã hóa 256-bit</p> */}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="signup-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6 flex-grow"
              >
                <header>
                  <h2 className="text-3xl font-black text-slate-800">Đăng ký tài khoản</h2>
                  <p className="text-slate-500 mt-2">Điền thông tin để bắt đầu trải nghiệm IRMS Pro.</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Họ và Tên</label>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F4C5C] transition-colors" size={18} />
                        <input type="text" placeholder="Nguyễn Văn A" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-4 focus:ring-[#0F4C5C]/5 focus:border-[#0F4C5C] outline-none transition-all text-sm" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Email công việc</label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F4C5C] transition-colors" size={18} />
                        <input type="email" placeholder="name@company.com" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-4 focus:ring-[#0F4C5C]/5 focus:border-[#0F4C5C] outline-none transition-all text-sm" required />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Mật khẩu</label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F4C5C] transition-colors" size={18} />
                      <input type={showPassword ? 'text' : 'password'} placeholder="Tối thiểu 8 ký tự" className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-4 focus:ring-[#0F4C5C]/5 focus:border-[#0F4C5C] outline-none transition-all text-sm" required />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Vai trò của bạn</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'manager', label: 'Quản lý', icon: UserCircle },
                        { id: 'kitchen', label: 'Bếp trưởng', icon: ChefHat },
                        { id: 'server', label: 'Nhân viên', icon: User },
                      ].map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setRole(r.id)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                            role === r.id ? 'border-[#0F4C5C] bg-[#0F4C5C]/5 text-[#0F4C5C]' : 'border-slate-50 text-slate-400 hover:border-slate-100'
                          }`}
                        >
                          <r.icon size={20} />
                          <span className="text-[9px] font-bold uppercase tracking-tight">{r.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button className="w-full py-4 bg-[#0F4C5C] text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-[#0F4C5C]/20 transition-all active:scale-[0.98] mt-4">
                    ĐĂNG KÝ NGAY <ArrowRight size={20} />
                  </button>
                </form>

                <p className="text-center text-[10px] text-slate-400 mt-6 leading-relaxed">
                  Bằng việc đăng ký, bạn đồng ý với <a href="#" className="text-[#0F4C5C] font-bold">Điều khoản dịch vụ</a> và <a href="#" className="text-[#0F4C5C] font-bold">Chính sách bảo mật</a> của chúng tôi.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </motion.main>
    </div>
  );
}
