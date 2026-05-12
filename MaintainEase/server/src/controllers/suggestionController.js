import { Suggestion } from "../models/Suggestion.js";
import { User } from "../models/User.js";
import { createNotification } from "../utils/notify.js";

export async function createSuggestion(req, res) {
  try {
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(400).json({ message: "Title and body required" });
    }
    const s = await Suggestion.create({ userId: req.user.id, title, body });
    const admins = await User.find({ role: { $in: ["admin", "sub_admin"] } }).select("_id");
    await Promise.all(
      admins.map((a) =>
        createNotification(a._id, {
          type: "suggestion",
          title: "New suggestion",
          body: title,
          meta: { suggestionId: s._id.toString() },
        })
      )
    );
    return res.status(201).json(s);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function listSuggestions(req, res) {
  try {
    const list = await Suggestion.find()
      .populate("userId", "name email apartmentNumber")
      .sort({ createdAt: -1 });
    return res.json(list);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function listMySuggestions(req, res) {
  try {
    const list = await Suggestion.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.json(list);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function updateSuggestionStatus(req, res) {
  try {
    const { status } = req.body;
    if (!["under_review", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const s = await Suggestion.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!s) return res.status(404).json({ message: "Not found" });
    await createNotification(s.userId, {
      type: "suggestion",
      title: "Suggestion updated",
      body: `Your suggestion "${s.title}" is now: ${status.replace("_", " ")}`,
      meta: { suggestionId: s._id.toString() },
    });
    return res.json(s);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
