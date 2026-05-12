import { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import ComplaintChat from "./ComplaintChat";

export default function AdminDashboard({ isAdmin }) {
  const [stats, setStats] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [techs, setTechs] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [peerByComplaint, setPeerByComplaint] = useState({});
  const [announceForm, setAnnounceForm] = useState({ title: "", description: "" });
  const [staffForm, setStaffForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "technician",
    skills: "plumbing,electrical",
  });
  const [banner, setBanner] = useState("");

  const load = useCallback(async () => {
    const [st, c, t, a, s] = await Promise.all([
      api.get("/stats"),
      api.get("/complaints/all"),
      api.get("/users/technicians"),
      api.get("/announcements"),
      api.get("/suggestions/all"),
    ]);
    setStats(st.data);
    setComplaints(c.data);
    setTechs(t.data);
    setAnnouncements(a.data);
    setSuggestions(s.data);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const postAnnouncement = async (e) => {
    e.preventDefault();
    setBanner("");
    try {
      await api.post("/announcements", announceForm);
      setAnnounceForm({ title: "", description: "" });
      setBanner("Announcement posted.");
      load();
    } catch (err) {
      setBanner(err.response?.data?.message || "Failed to post");
    }
  };

  const createStaff = async (e) => {
    e.preventDefault();
    setBanner("");
    try {
      const skills = staffForm.skills
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);
      await api.post("/users/staff", { ...staffForm, skills });
      setBanner("Staff user created.");
      setStaffForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "technician",
        skills: "plumbing,electrical",
      });
      load();
    } catch (err) {
      setBanner(err.response?.data?.message || "Failed to create staff");
    }
  };

  const assign = async (id, technicianId) => {
    if (!technicianId) return;
    await api.patch(`/complaints/${id}/admin`, { technicianId });
    load();
  };

  const reject = async (id) => {
    const reason = prompt("Reason for rejection?", "");
    if (reason === null) return;
    await api.patch(`/complaints/${id}/admin`, { status: "rejected", rejectReason: reason });
    load();
  };

  const setPriority = async (id, priority) => {
    await api.patch(`/complaints/${id}/admin`, { priority });
    load();
  };

  const removeAnnouncement = async (id) => {
    if (!confirm("Delete this announcement?")) return;
    await api.delete(`/announcements/${id}`);
    load();
  };

  const updateSuggestion = async (id, status) => {
    await api.patch(`/suggestions/${id}`, { status });
    load();
  };

  return (
    <div className="space-y-10">
      {banner && (
        <div className="rounded-xl border border-teal-200 bg-teal-50 text-teal-900 px-4 py-3 text-sm font-medium">
          {banner}
        </div>
      )}

      {stats && (
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            ["Total complaints", stats.totalComplaints],
            ["Residents", stats.totalResidents],
            ["Technicians", stats.totalTechnicians],
            ["Pending", stats.byStatus?.pending || 0],
          ].map(([label, val]) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <p className="text-sm text-slate-500 font-medium">{label}</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{val}</p>
            </div>
          ))}
        </section>
      )}

      <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Complaints queue</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-100">
                <th className="py-2 pr-4">Title</th>
                <th className="py-2 pr-4">Resident</th>
                <th className="py-2 pr-4">Priority</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Assign</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c._id} className="border-b border-slate-50 align-top">
                  <td className="py-3 pr-4">
                    <p className="font-semibold text-slate-900">{c.title}</p>
                    <p className="text-slate-500 text-xs mt-1 line-clamp-2">{c.description}</p>
                    <button
                      type="button"
                      className="text-xs font-semibold text-teal-700 mt-1 hover:underline"
                      onClick={() => setExpanded(expanded === c._id ? null : c._id)}
                    >
                      {expanded === c._id ? "Hide chat" : "Chat"}
                    </button>
                    {expanded === c._id && (
                      <div className="mt-2">
                        <label className="text-xs text-slate-600">Chat as admin with</label>
                        <select
                          className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1 text-xs bg-white"
                          value={peerByComplaint[c._id] || (c.userId?._id || c.userId)}
                          onChange={(e) => setPeerByComplaint({ ...peerByComplaint, [c._id]: e.target.value })}
                        >
                          <option value={c.userId?._id || c.userId}>Resident: {c.userId?.name}</option>
                          {c.technicianId && (
                            <option value={c.technicianId._id || c.technicianId}>
                              Technician: {c.technicianId.name}
                            </option>
                          )}
                        </select>
                        <ComplaintChat complaintId={c._id} peerId={peerByComplaint[c._id] || (c.userId?._id || c.userId)} />
                      </div>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-slate-700">
                    <div>{c.userId?.name}</div>
                    <div className="text-xs text-slate-500">Unit {c.userId?.apartmentNumber}</div>
                  </td>
                  <td className="py-3 pr-4">
                    <select
                      className="rounded-lg border border-slate-200 px-2 py-1 bg-white"
                      value={c.priority}
                      onChange={(e) => setPriority(c._id, e.target.value)}
                    >
                      {["low", "medium", "high", "emergency"].map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 pr-4 capitalize text-slate-700">{c.status.replace("_", " ")}</td>
                  <td className="py-3 pr-4">
                    <select
                      className="rounded-lg border border-slate-200 px-2 py-1 bg-white max-w-[160px]"
                      defaultValue=""
                      onChange={(e) => {
                        assign(c._id, e.target.value);
                        e.target.value = "";
                      }}
                    >
                      <option value="" disabled>
                        Select technician
                      </option>
                      {techs.map((t) => (
                        <option key={t._id} value={t._id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 pr-4 space-y-1">
                    {c.status === "pending" || c.status === "reopened" ? (
                      <button
                        type="button"
                        className="text-xs font-semibold text-red-600 hover:underline block"
                        onClick={() => reject(c._id)}
                      >
                        Reject
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">New announcement</h2>
          <form onSubmit={postAnnouncement} className="space-y-3">
            <input
              required
              placeholder="Title"
              className="w-full rounded-xl border border-slate-200 px-3 py-2"
              value={announceForm.title}
              onChange={(e) => setAnnounceForm({ ...announceForm, title: e.target.value })}
            />
            <textarea
              required
              rows={4}
              placeholder="Details…"
              className="w-full rounded-xl border border-slate-200 px-3 py-2"
              value={announceForm.description}
              onChange={(e) => setAnnounceForm({ ...announceForm, description: e.target.value })}
            />
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold px-6 py-3"
            >
              Publish
            </button>
          </form>
          <div className="mt-6 space-y-2">
            <h3 className="font-semibold text-slate-700 text-sm">Recent</h3>
            {announcements.map((a) => (
              <div key={a._id} className="flex justify-between gap-2 text-sm border border-slate-100 rounded-lg px-3 py-2">
                <span className="font-medium text-slate-800">{a.title}</span>
                {isAdmin && (
                  <button type="button" className="text-red-600 text-xs font-semibold" onClick={() => removeAnnouncement(a._id)}>
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Suggestions inbox</h2>
          <div className="space-y-3 max-h-[360px] overflow-y-auto">
            {suggestions.map((s) => (
              <div key={s._id} className="border border-slate-100 rounded-xl p-3">
                <p className="font-semibold text-slate-900">{s.title}</p>
                <p className="text-sm text-slate-600 mt-1">{s.body}</p>
                <p className="text-xs text-slate-400 mt-1">
                  From {s.userId?.name} · {s.status.replace("_", " ")}
                </p>
                <div className="flex gap-2 mt-2">
                  {["under_review", "accepted", "rejected"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      className="text-xs px-2 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 font-semibold capitalize"
                      onClick={() => updateSuggestion(s._id, st)}
                    >
                      {st.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isAdmin && (
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Create staff (technician / sub-admin)</h2>
          <p className="text-sm text-slate-500 mb-4">Only full administrators can add accounts.</p>
          <form onSubmit={createStaff} className="grid md:grid-cols-2 gap-3">
            <input
              required
              placeholder="Full name"
              className="rounded-xl border border-slate-200 px-3 py-2"
              value={staffForm.name}
              onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
            />
            <input
              required
              type="email"
              placeholder="Email"
              className="rounded-xl border border-slate-200 px-3 py-2"
              value={staffForm.email}
              onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
            />
            <input
              placeholder="Phone"
              className="rounded-xl border border-slate-200 px-3 py-2"
              value={staffForm.phone}
              onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
            />
            <input
              required
              type="password"
              placeholder="Temporary password"
              className="rounded-xl border border-slate-200 px-3 py-2"
              value={staffForm.password}
              onChange={(e) => setStaffForm({ ...staffForm, password: e.target.value })}
            />
            <select
              className="rounded-xl border border-slate-200 px-3 py-2 bg-white"
              value={staffForm.role}
              onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })}
            >
              <option value="technician">Technician</option>
              <option value="sub_admin">Sub-Admin</option>
            </select>
            <input
              placeholder="Skills (comma separated)"
              className="rounded-xl border border-slate-200 px-3 py-2 md:col-span-2"
              value={staffForm.skills}
              onChange={(e) => setStaffForm({ ...staffForm, skills: e.target.value })}
            />
            <button
              type="submit"
              className="md:col-span-2 rounded-xl bg-slate-900 text-white font-semibold px-6 py-3 w-fit"
            >
              Create account
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
