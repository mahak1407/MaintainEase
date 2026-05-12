import { Message } from "../models/Message.js";
import { Complaint } from "../models/Complaint.js";
import { getIo } from "../realtime.js";

function canAccessComplaint(user, complaint) {
  const uid = user.id;
  if (["admin", "sub_admin"].includes(user.role)) return true;
  if (complaint.userId.toString() === uid) return true;
  if (complaint.technicianId && complaint.technicianId.toString() === uid) return true;
  return false;
}

export async function listMessages(req, res) {
  try {
    const { withUser, complaintId } = req.query;
    if (complaintId) {
      const c = await Complaint.findById(complaintId);
      if (!c) return res.status(404).json({ message: "Complaint not found" });
      if (!canAccessComplaint(req.user, c)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      const msgs = await Message.find({ complaintId })
        .sort({ createdAt: 1 })
        .populate("senderId", "name role")
        .populate("receiverId", "name role");
      return res.json(msgs);
    }
    if (!withUser) {
      return res.status(400).json({ message: "withUser or complaintId required" });
    }
    const me = req.user.id;
    const other = withUser;
    const msgs = await Message.find({
      complaintId: null,
      $or: [
        { senderId: me, receiverId: other },
        { senderId: other, receiverId: me },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("senderId", "name role")
      .populate("receiverId", "name role");
    return res.json(msgs);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function sendMessage(req, res) {
  try {
    const { receiverId, text, complaintId } = req.body;
    if (!receiverId || !text) {
      return res.status(400).json({ message: "receiverId and text required" });
    }
    if (complaintId) {
      const c = await Complaint.findById(complaintId);
      if (!c) return res.status(404).json({ message: "Complaint not found" });
      if (!canAccessComplaint(req.user, c)) {
        return res.status(403).json({ message: "Forbidden" });
      }
    }
    const msg = await Message.create({
      senderId: req.user.id,
      receiverId,
      complaintId: complaintId || null,
      text: text.trim(),
    });
    const populated = await Message.findById(msg._id)
      .populate("senderId", "name role")
      .populate("receiverId", "name role");
    const io = getIo();
    if (io) {
      io.to(`user_${receiverId.toString()}`).emit("message", populated.toObject ? populated.toObject() : populated);
      io.to(`user_${req.user.id.toString()}`).emit("message", populated.toObject ? populated.toObject() : populated);
    }
    return res.status(201).json(populated);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
