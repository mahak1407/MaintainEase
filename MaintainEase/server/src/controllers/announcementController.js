import { Announcement } from "../models/Announcement.js";
import { User } from "../models/User.js";
import { createNotification } from "../utils/notify.js";

export async function listAnnouncements(req, res) {
  try {
    const list = await Announcement.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    return res.json(list);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function createAnnouncement(req, res) {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description required" });
    }
    const a = await Announcement.create({
      title,
      description,
      createdBy: req.user.id,
    });
    const residents = await User.find({ role: "resident" }).select("_id");
    await Promise.all(
      residents.map((r) =>
        createNotification(r._id, {
          type: "announcement",
          title: "New announcement",
          body: title,
          meta: { announcementId: a._id.toString() },
        })
      )
    );
    return res.status(201).json(a);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function deleteAnnouncement(req, res) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can delete announcements" });
    }
    await Announcement.findByIdAndDelete(req.params.id);
    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
