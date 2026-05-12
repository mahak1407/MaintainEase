import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import DashboardLayout from "../components/DashboardLayout";

export default function NotificationsPage() {
  const [items, setItems] = useState([]);

  const load = useCallback(async () => {
    const { data } = await api.get("/notifications");
    setItems(data);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const markAll = async () => {
    await api.post("/notifications/read-all");
    load();
  };

  return (
    <DashboardLayout title="Notifications">
      <div className="flex justify-between items-center mb-6">
        <p className="text-slate-600">Stay updated on complaints, announcements, and tasks.</p>
        <button
          type="button"
          onClick={markAll}
          className="text-sm font-semibold text-teal-700 hover:text-teal-900"
        >
          Mark all read
        </button>
      </div>
      <div className="space-y-3">
        {items.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-500">
            No notifications yet.
          </div>
        )}
        {items.map((n) => (
          <div
            key={n._id}
            className={`bg-white rounded-2xl border p-4 shadow-sm ${
              n.read ? "border-slate-100 opacity-80" : "border-teal-200 ring-1 ring-teal-100"
            }`}
          >
            <div className="flex justify-between gap-2">
              <div>
                <p className="font-semibold text-slate-800">{n.title}</p>
                {n.body && <p className="text-slate-600 text-sm mt-1">{n.body}</p>}
                <p className="text-xs text-slate-400 mt-2">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
              {!n.read && (
                <button
                  type="button"
                  className="text-xs font-semibold text-teal-600 shrink-0 h-fit"
                  onClick={async () => {
                    await api.post("/notifications/read", { ids: [n._id] });
                    load();
                  }}
                >
                  Mark read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link to="/dashboard" className="text-teal-700 font-semibold hover:underline">
          ← Back to dashboard
        </Link>
      </div>
    </DashboardLayout>
  );
}
