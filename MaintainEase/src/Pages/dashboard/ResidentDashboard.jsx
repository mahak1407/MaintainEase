import { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import ComplaintChat from "./ComplaintChat";

const categories = ["Plumbing", "Electrical", "HVAC", "Civil", "Cleaning", "Security", "Other"];
const priorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "emergency", label: "Emergency" },
];
const locations = ["Flat", "Parking", "Lift", "Common area", "Roof", "Other"];

const statusColors = {
  pending: "bg-amber-100 text-amber-800",
  rejected: "bg-red-100 text-red-800",
  assigned: "bg-blue-100 text-blue-800",
  accepted: "bg-indigo-100 text-indigo-800",
  in_progress: "bg-purple-100 text-purple-800",
  waiting_parts: "bg-orange-100 text-orange-800",
  completed: "bg-emerald-100 text-emerald-800",
  reopened: "bg-rose-100 text-rose-800",
};

export default function ResidentDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [staff, setStaff] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [peerByComplaint, setPeerByComplaint] = useState({});

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Plumbing",
    priority: "medium",
    location: "Flat",
    image: "",
  });
  const [suggestForm, setSuggestForm] = useState({ title: "", body: "" });
  const [msg, setMsg] = useState("");

  const loadAll = useCallback(async () => {
    const [c, a, s, st] = await Promise.all([
      api.get("/complaints/mine"),
      api.get("/announcements"),
      api.get("/suggestions/mine"),
      api.get("/users/staff-chat"),
    ]);
    setComplaints(c.data);
    setAnnouncements(a.data);
    setSuggestions(s.data);
    setStaff(st.data);
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const submitComplaint = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const images = form.image ? [form.image] : [];
      await api.post("/complaints", {
        title: form.title,
        description: form.description,
        category: form.category,
        priority: form.priority,
        location: form.location.toLowerCase().replace(/\s+/g, "_"),
        images,
      });
      setForm({
        title: "",
        description: "",
        category: "Plumbing",
        priority: "medium",
        location: "Flat",
        image: "",
      });
      setMsg("Complaint submitted successfully.");
      loadAll();
    } catch (err) {
      setMsg(err.response?.data?.message || "Could not submit complaint.");
    }
  };

  const submitSuggestion = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await api.post("/suggestions", suggestForm);
      setSuggestForm({ title: "", body: "" });
      setMsg("Suggestion sent.");
      loadAll();
    } catch (err) {
      setMsg(err.response?.data?.message || "Could not send suggestion.");
    }
  };

  const pickDefaultPeer = (complaint) => {
    if (complaint.technicianId?._id) return complaint.technicianId._id;
    const admin = staff.find((x) => x.role === "admin" || x.role === "sub_admin");
    return admin?._id || "";
  };

  return (
    <div className="space-y-10">
      {msg && (
        <div className="rounded-xl border border-teal-200 bg-teal-50 text-teal-900 px-4 py-3 text-sm font-medium">
          {msg}
        </div>
      )}

      <section className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Raise a complaint</h2>
          <form onSubmit={submitComplaint} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Title</label>
              <input
                required
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Description</label>
              <textarea
                required
                rows={3}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-600">Category</label>
                <select
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 bg-white"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Priority</label>
                <select
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 bg-white"
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                >
                  {priorities.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Location</label>
              <select
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 bg-white"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              >
                {locations.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Image (optional, one file)</label>
              <input
                type="file"
                accept="image/*"
                className="mt-1 w-full text-sm"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) {
                    setForm({ ...form, image: "" });
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = () => setForm({ ...form, image: String(reader.result || "") });
                  reader.readAsDataURL(file);
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold px-6 py-3 hover:opacity-95 shadow-md"
            >
              Submit complaint
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Announcements</h2>
          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {announcements.length === 0 && <p className="text-slate-500 text-sm">No announcements yet.</p>}
            {announcements.map((a) => (
              <article key={a._id} className="rounded-xl border border-slate-100 p-4 bg-slate-50/60">
                <h3 className="font-semibold text-slate-800">{a.title}</h3>
                <p className="text-sm text-slate-600 mt-1 whitespace-pre-wrap">{a.description}</p>
                <p className="text-xs text-slate-400 mt-2">{new Date(a.createdAt).toLocaleString()}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">My complaints</h2>
        <div className="space-y-4">
          {complaints.length === 0 && <p className="text-slate-500 text-sm">You have not raised any complaints yet.</p>}
          {complaints.map((c) => (
            <div key={c._id} className="rounded-2xl border border-slate-100 p-4 bg-gradient-to-br from-white to-slate-50/80">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-slate-900">{c.title}</p>
                  <p className="text-sm text-slate-600 mt-1">{c.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2 text-xs">
                    <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-700">{c.category}</span>
                    <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-700">{c.priority}</span>
                    <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-700">{c.location}</span>
                    <span className={`px-2 py-1 rounded-full font-semibold capitalize ${statusColors[c.status] || "bg-slate-100"}`}>
                      {c.status.replace("_", " ")}
                    </span>
                  </div>
                  {c.technicianId && (
                    <p className="text-xs text-slate-500 mt-2">
                      Technician: {c.technicianId.name} ({c.technicianId.email})
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 items-stretch sm:items-end">
                  <button
                    type="button"
                    className="text-sm font-semibold text-teal-700 hover:underline"
                    onClick={() => setExpanded(expanded === c._id ? null : c._id)}
                  >
                    {expanded === c._id ? "Hide details" : "Details & chat"}
                  </button>
                  {c.status === "completed" && (
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="text-xs font-semibold px-3 py-1 rounded-lg bg-amber-100 text-amber-900"
                        onClick={async () => {
                          await api.patch(`/complaints/${c._id}/resident`, { action: "reopen" });
                          loadAll();
                        }}
                      >
                        Reopen
                      </button>
                      <button
                        type="button"
                        className="text-xs font-semibold px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900"
                        onClick={async () => {
                          const rating = Number(prompt("Rate 1-5", "5"));
                          const feedback = prompt("Feedback (optional)", "") || "";
                          if (rating >= 1 && rating <= 5) {
                            await api.patch(`/complaints/${c._id}/resident`, { action: "rate", rating, feedback });
                            loadAll();
                          }
                        }}
                      >
                        Rate service
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {expanded === c._id && (
                <div className="mt-4">
                  <label className="text-xs font-semibold text-slate-600">Chat with</label>
                  <select
                    className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 text-sm bg-white"
                    value={peerByComplaint[c._id] || pickDefaultPeer(c)}
                    onChange={(e) => setPeerByComplaint({ ...peerByComplaint, [c._id]: e.target.value })}
                  >
                    {staff.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name} ({s.role})
                      </option>
                    ))}
                  </select>
                  <ComplaintChat complaintId={c._id} peerId={peerByComplaint[c._id] || pickDefaultPeer(c)} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Suggestions & feedback</h2>
        <form onSubmit={submitSuggestion} className="grid md:grid-cols-2 gap-4">
          <input
            required
            placeholder="Title"
            className="rounded-xl border border-slate-200 px-3 py-2"
            value={suggestForm.title}
            onChange={(e) => setSuggestForm({ ...suggestForm, title: e.target.value })}
          />
          <textarea
            required
            placeholder="Your idea…"
            rows={2}
            className="rounded-xl border border-slate-200 px-3 py-2 md:col-span-2"
            value={suggestForm.body}
            onChange={(e) => setSuggestForm({ ...suggestForm, body: e.target.value })}
          />
          <button
            type="submit"
            className="md:col-span-2 w-full sm:w-auto rounded-xl bg-slate-800 text-white font-semibold px-6 py-3 hover:bg-slate-900"
          >
            Submit suggestion
          </button>
        </form>
        <div className="mt-6 space-y-2">
          {suggestions.map((s) => (
            <div key={s._id} className="flex justify-between gap-2 text-sm border border-slate-100 rounded-lg px-3 py-2">
              <span className="font-medium text-slate-800">{s.title}</span>
              <span className="text-slate-500 capitalize">{s.status.replace("_", " ")}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
