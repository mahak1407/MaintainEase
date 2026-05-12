import { Notification } from "../models/Notification.js";
import { getIo } from "../realtime.js";

export async function createNotification(userId, { type = "info", title, body = "", meta = {} }) {
  const doc = await Notification.create({ userId, type, title, body, meta });
  const io = getIo();
  if (io) {
    io.to(`user_${userId.toString()}`).emit("notification", doc.toObject());
  }
  return doc;
}
