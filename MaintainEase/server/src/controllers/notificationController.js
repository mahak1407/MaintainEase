import { Notification } from "../models/Notification.js";

export async function listNotifications(req, res) {
  try {
    const list = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(100);
    return res.json(list);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function markRead(req, res) {
  try {
    await Notification.updateMany(
      { userId: req.user.id, _id: { $in: req.body.ids || [] } },
      { $set: { read: true } }
    );
    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function markAllRead(req, res) {
  try {
    await Notification.updateMany({ userId: req.user.id, read: false }, { $set: { read: true } });
    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
