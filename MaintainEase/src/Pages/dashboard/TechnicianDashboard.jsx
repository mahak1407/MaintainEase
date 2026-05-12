import { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import ComplaintChat from "./ComplaintChat";

const nextStatus = {
  assigned: "accepted",
  accepted: "in_progress",
  in_progress: "waiting_parts",
  waiting_parts: "completed",
};

export default function TechnicianDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [peerByComplaint, setPeerByComplaint] = useState({});

  const load = useCallback(async () => {
    const { data } = await api.get("/complaints/technician");
    setComplaints(data);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const advance = async (id, current) => {
    const nxt = nextStatus[current];
    if (!nxt) return;
    await api.patch(`/complaints/${id}/technician`, { status: nxt });
    load();
  };

  const jump = async (id, status) => {
    await api.patch(`/complaints/${id}/technician`, { status });
    load();
  };

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Assigned work</h2>
        <div className="space-y-4">
          {complaints.length === 0 && <p className="text-slate-500 text-sm">No tasks assigned yet.</p>}
          {complaints.map((c) => (
            <div key={c._id} className="rounded-2xl border border-slate-100 p-4 bg-gradient-to-br from-white to-slate-50/80">
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{c.title}</p>
                  <p className="text-sm text-slate-600 mt-1">{c.description}</p>
                  <p className="text-xs text-slate-500 mt-2">
                    Resident: {c.userId?.name} · Unit {c.userId?.apartmentNumber} · Priority:{" "}
                    <span className="font-semibold capitalize">{c.priority}</span>
                  </p>
                  <p className="text-xs text-slate-500">Location: {c.location}</p>
                </div>
                <div className="flex flex-col gap-2 items-stretch min-w-[200px]">
                  <span className="text-xs font-bold uppercase text-teal-700">Status: {c.status.replace("_", " ")}</span>
                  {["assigned", "accepted", "in_progress", "waiting_parts"].includes(c.status) && (
                    <button
                      type="button"
                      className="rounded-lg bg-gradient-to-r from-teal-600 to-blue-600 text-white text-sm font-semibold py-2"
                      onClick={() => advance(c._id, c.status)}
                    >
                      Move to: {nextStatus[c.status]?.replace("_", " ") || "—"}
                    </button>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {["accepted", "in_progress", "waiting_parts", "completed"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        className="text-[11px] px-2 py-1 rounded-md bg-slate-100 hover:bg-teal-50 font-semibold capitalize"
                        onClick={() => jump(c._id, s)}
                      >
                        {s.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="text-sm font-semibold text-teal-700 hover:underline text-left"
                    onClick={() => setExpanded(expanded === c._id ? null : c._id)}
                  >
                    {expanded === c._id ? "Hide chat" : "Open chat with resident"}
                  </button>
                </div>
              </div>
              {expanded === c._id && (
                <div className="mt-3">
                  <label className="text-xs text-slate-600">Messaging</label>
                  <select
                    className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 text-sm bg-white"
                    value={peerByComplaint[c._id] || (c.userId?._id || c.userId)}
                    onChange={(e) => setPeerByComplaint({ ...peerByComplaint, [c._id]: e.target.value })}
                  >
                    <option value={c.userId?._id || c.userId}>Resident: {c.userId?.name}</option>
                  </select>
                  <ComplaintChat complaintId={c._id} peerId={peerByComplaint[c._id] || (c.userId?._id || c.userId)} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
