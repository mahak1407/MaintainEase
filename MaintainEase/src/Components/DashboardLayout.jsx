import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { FaBell, FaGem, FaSignOutAlt, FaHome } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const roleLabels = {
  resident: "Resident",
  admin: "Admin",
  sub_admin: "Sub-Admin",
  technician: "Technician",
};

export default function DashboardLayout({ title, children }) {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get("/notifications");
        if (!cancelled) {
          setUnread(data.filter((n) => !n.read).length);
        }
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!token) return undefined;
    const socket = io({
      path: "/socket.io",
      auth: { token },
      transports: ["websocket", "polling"],
    });
    socket.on("notification", () => {
      setUnread((u) => u + 1);
    });
    return () => socket.disconnect();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-teal-50/50">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center shadow-sm">
                <FaGem className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent hidden sm:inline">
                MaintainEase
              </span>
            </Link>
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold truncate">
                {roleLabels[user?.role] || "Dashboard"}
              </p>
              <h1 className="text-lg font-bold text-slate-800 truncate">{title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium"
            >
              <FaHome /> Site
            </Link>
            <button
              type="button"
              className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              title="Notifications"
              onClick={() => navigate("/dashboard/notifications")}
            >
              <FaBell className="text-xl" />
              {unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unread > 9 ? "9+" : unread}
                </span>
              )}
            </button>
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold text-slate-800 leading-tight">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate max-w-[140px]">{user?.email}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-900 transition"
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}
