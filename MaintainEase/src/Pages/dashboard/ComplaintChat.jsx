import { useCallback, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function ComplaintChat({ complaintId, peerId }) {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const { data } = await api.get("/messages", { params: { complaintId } });
    setMessages(data);
  }, [complaintId]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!token) return undefined;
    const socket = io({ path: "/socket.io", auth: { token }, transports: ["websocket", "polling"] });
    const onMsg = (msg) => {
      const mid = String(msg.complaintId?._id || msg.complaintId || "");
      if (mid && mid === String(complaintId)) {
        setMessages((m) => (m.some((x) => x._id === msg._id) ? m : [...m, msg]));
      }
    };
    socket.on("message", onMsg);
    return () => {
      socket.off("message", onMsg);
      socket.disconnect();
    };
  }, [token, complaintId]);

  const send = async (e) => {
    e.preventDefault();
    setError("");
    if (!text.trim() || !peerId) {
      setError(peerId ? "Enter a message" : "Select a contact");
      return;
    }
    try {
      await api.post("/messages", { receiverId: peerId, text: text.trim(), complaintId });
      setText("");
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send");
    }
  };

  const sorted = useMemo(() => [...messages].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)), [messages]);

  return (
    <div className="mt-4 border border-slate-200 rounded-xl bg-slate-50/80 p-4">
      <h4 className="font-semibold text-slate-800 mb-2">Complaint chat</h4>
      <div className="max-h-48 overflow-y-auto space-y-2 mb-3">
        {sorted.length === 0 && <p className="text-sm text-slate-500">No messages yet.</p>}
        {sorted.map((m) => (
          <div key={m._id} className="text-sm">
            <span className="font-semibold text-teal-700">{m.senderId?.name || "User"}:</span>{" "}
            <span className="text-slate-700">{m.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={send} className="flex gap-2 flex-col sm:flex-row">
        <input
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          placeholder="Type a message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-lg bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-2 text-sm font-semibold hover:opacity-95"
        >
          Send
        </button>
      </form>
      {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
    </div>
  );
}
