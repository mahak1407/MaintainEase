import { Complaint } from "../models/Complaint.js";
import { User } from "../models/User.js";
import { createNotification } from "../utils/notify.js";

const priorityOrder = { emergency: 0, high: 1, medium: 2, low: 3 };

export async function createComplaint(req, res) {
  try {
    const { title, description, category, priority, location, images } = req.body;
    if (!title || !description || !category) {
      return res.status(400).json({ message: "Title, description, and category are required" });
    }
    const c = await Complaint.create({
      title,
      description,
      category,
      priority: priority || "medium",
      location: location || "flat",
      images: Array.isArray(images) ? images.filter(Boolean).slice(0, 5) : [],
      userId: req.user.id,
    });
    const admins = await User.find({ role: { $in: ["admin", "sub_admin"] } }).select("_id");
    await Promise.all(
      admins.map((a) =>
        createNotification(a._id, {
          type: "complaint",
          title: "New complaint",
          body: title,
          meta: { complaintId: c._id.toString() },
        })
      )
    );
    return res.status(201).json(c);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function listMyComplaints(req, res) {
  try {
    const list = await Complaint.find({ userId: req.user.id })
      .populate("technicianId", "name email phone skills")
      .sort({ createdAt: -1 });
    return res.json(list);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function listAllComplaints(req, res) {
  try {
    const sorted = await Complaint.find()
      .populate("userId", "name email apartmentNumber phone")
      .populate("technicianId", "name email phone skills availability")
      .lean();
    sorted.sort((a, b) => {
      const pa = priorityOrder[a.priority] ?? 9;
      const pb = priorityOrder[b.priority] ?? 9;
      if (pa !== pb) return pa - pb;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return res.json(sorted);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function listTechnicianComplaints(req, res) {
  try {
    const list = await Complaint.find({ technicianId: req.user.id })
      .populate("userId", "name email apartmentNumber phone")
      .sort({ createdAt: -1 });
    return res.json(list);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function getComplaint(req, res) {
  try {
    const c = await Complaint.findById(req.params.id)
      .populate("userId", "name email apartmentNumber phone role")
      .populate("technicianId", "name email phone role skills");
    if (!c) return res.status(404).json({ message: "Not found" });
    const ownerId = (c.userId?._id || c.userId).toString();
    const techId = c.technicianId ? (c.technicianId._id || c.technicianId).toString() : null;
    const isOwner = ownerId === req.user.id;
    const isTech = techId === req.user.id;
    const isStaff = ["admin", "sub_admin"].includes(req.user.role);
    if (!isOwner && !isTech && !isStaff) {
      return res.status(403).json({ message: "Forbidden" });
    }
    return res.json(c);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function adminUpdateComplaint(req, res) {
  try {
    const { status, priority, technicianId, rejectReason } = req.body;
    const c = await Complaint.findById(req.params.id);
    if (!c) return res.status(404).json({ message: "Not found" });
    if (priority) c.priority = priority;
    if (status === "rejected") {
      c.status = "rejected";
      c.rejectReason = rejectReason || "";
      c.technicianId = null;
      await createNotification(c.userId, {
        type: "complaint",
        title: "Complaint rejected",
        body: c.rejectReason || "Your complaint was rejected.",
        meta: { complaintId: c._id.toString() },
      });
    }
    if (technicianId) {
      const tech = await User.findById(technicianId);
      if (!tech || tech.role !== "technician") {
        return res.status(400).json({ message: "Invalid technician" });
      }
      c.technicianId = technicianId;
      c.assignedBy = req.user.id;
      c.status = "assigned";
      await createNotification(technicianId, {
        type: "task",
        title: "New task assigned",
        body: c.title,
        meta: { complaintId: c._id.toString() },
      });
      await createNotification(c.userId, {
        type: "complaint",
        title: "Technician assigned",
        body: `A technician has been assigned to: ${c.title}`,
        meta: { complaintId: c._id.toString() },
      });
    }
    await c.save();
    return res.json(c);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function technicianUpdateStatus(req, res) {
  try {
    const { status } = req.body;
    const allowed = ["accepted", "in_progress", "waiting_parts", "completed"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const c = await Complaint.findById(req.params.id);
    if (!c) return res.status(404).json({ message: "Not found" });
    if (!c.technicianId || c.technicianId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    c.status = status;
    await c.save();
    await createNotification(c.userId, {
      type: "complaint",
      title: "Complaint status updated",
      body: `Your request "${c.title}" is now: ${status.replace("_", " ")}`,
      meta: { complaintId: c._id.toString() },
    });
    const admins = await User.find({ role: { $in: ["admin", "sub_admin"] } }).select("_id");
    await Promise.all(
      admins.map((a) =>
        createNotification(a._id, {
          type: "complaint",
          title: "Technician update",
          body: `${c.title}: ${status}`,
          meta: { complaintId: c._id.toString() },
        })
      )
    );
    return res.json(c);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function residentReopenOrRate(req, res) {
  try {
    const { action, rating, feedback } = req.body;
    const c = await Complaint.findById(req.params.id);
    if (!c) return res.status(404).json({ message: "Not found" });
    if (c.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (action === "reopen") {
      if (c.status !== "completed") {
        return res.status(400).json({ message: "Only completed complaints can be reopened" });
      }
      c.status = "reopened";
      c.technicianId = null;
      await c.save();
      await createNotification(c.userId, {
        type: "complaint",
        title: "Complaint reopened",
        body: c.title,
        meta: { complaintId: c._id.toString() },
      });
      const admins = await User.find({ role: { $in: ["admin", "sub_admin"] } }).select("_id");
      await Promise.all(
        admins.map((a) =>
          createNotification(a._id, {
            type: "complaint",
            title: "Complaint reopened by resident",
            body: c.title,
            meta: { complaintId: c._id.toString() },
          })
        )
      );
      return res.json(c);
    }
    if (action === "rate") {
      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating 1-5 required" });
      }
      c.rating = rating;
      c.feedback = feedback || "";
      await c.save();
      return res.json(c);
    }
    return res.status(400).json({ message: "Unknown action" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
