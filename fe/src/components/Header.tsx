import { Search, Bell, HelpCircle, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useHeaderNotifications } from "../hooks/useHeaderNotifications";

interface HeaderProps {
  title?: string;
  userName?: string;
  role?: string;
  avatarUrl?: string;
}

export default function Header({
  title,
  avatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBgLAx20It9xVEfkYc6itfU2R624nzNWS-gd1-OE2KccY74Ixd4bHNTRjUOXJCCkhZhEIS0eUpaEBdOFzg_IIC_woP3BQnC5xciQYhXyA1QM43SP1GBsJLrMypfBEUI5AR8o6tLXhk4W9xC-UuradnICc-QoEM6S60QX4n61kH6nWqB2ILrjmdQi8buIBvC6zDVJaVq16B0Vbh5l3xT594agS1gvGwcQw7hIELyYBUwyi5ZJS9Ik54HTgM79IMOv8gbnxPOtl0BUqEL",
}: HeaderProps) {
  const [userInfo, setUserInfo] = useState<{
    userName?: string;
    role?: string;
  }>({});
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationPanelRef = useRef<HTMLDivElement | null>(null);

  const normalizedRole = useMemo(
    () => userInfo.role?.trim().toUpperCase(),
    [userInfo.role],
  );
  const { canViewNotifications, connected, notifications, unreadCount } =
    useHeaderNotifications(normalizedRole);

  useEffect(() => {
    try {
      const data = localStorage.getItem("user");
      if (data) {
        const user = JSON.parse(data);
        setUserInfo({
          userName: user.userName || user.email,
          role: user.role,
        });
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    }
  }, []);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (
        notificationPanelRef.current &&
        !notificationPanelRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    }

    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, []);

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-260px)] z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm flex justify-between items-center px-8 h-16">
      <div className="flex items-center gap-4 flex-1">
        {title && (
          <span className="text-lg font-bold text-[#0F4C5C] mr-4 whitespace-nowrap">
            {title}
          </span>
        )}
        <div className="relative w-full max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Tìm kiếm dữ liệu..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0F4C5C] focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-slate-500">
          {canViewNotifications && (
            <div className="relative" ref={notificationPanelRef}>
              <button
                type="button"
                onClick={() => setIsNotificationOpen((current) => !current)}
                className="hover:bg-slate-50 p-2 rounded-lg transition-colors relative"
                aria-label="Mở thông báo"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 min-w-4 h-4 px-1 bg-orange-500 text-white text-[10px] leading-4 rounded-full border-2 border-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-3 w-[360px] max-w-[calc(100vw-2rem)] bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-[#0F4C5C]">
                        Thông báo
                      </p>
                      {/* <p className="text-xs text-slate-500">
                        {connected
                          ? "Đang nhận realtime từ websocket"
                          : "Đang chờ kết nối websocket"}
                      </p> */}
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsNotificationOpen(false)}
                      className="p-2 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
                      aria-label="Đóng thông báo"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="max-h-[420px] overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-8 text-center text-sm text-slate-500">
                        Chưa có thông báo mới.
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-100">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="px-4 py-3 hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-slate-800">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                                  {notification.message}
                                </p>
                              </div>
                              <span className="shrink-0 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                                {notification.topic === "menu-item-status"
                                  ? "Món"
                                  : "Tùy chọn"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          <button className="hover:bg-slate-50 p-2 rounded-lg transition-colors">
            <HelpCircle size={20} />
          </button>
        </div>
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-[#0F4C5C]">
              {userInfo.userName}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
              {userInfo.role}
            </p>
          </div>
          <img
            src={avatarUrl}
            alt={userInfo.userName}
            className="h-10 w-10 rounded-full object-cover border-2 border-[#0F4C5C]/20"
          />
        </div>
      </div>
    </header>
  );
}
