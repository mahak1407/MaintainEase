import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

export async function listTechnicians(req, res) {
  try {
    const techs = await User.find({ role: "technician" }).select("name email phone skills availability");
    return res.json(techs);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function listStaffForChat(req, res) {
  try {
    const staff = await User.find({ role: { $in: ["admin", "sub_admin", "technician"] } })
      .select("name email role")
      .limit(50);
    return res.json(staff);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function listResidents(req, res) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const users = await User.find({ role: "resident" }).select("name email phone apartmentNumber createdAt");
    return res.json(users);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

/** Admin-only: create staff user (technician or sub_admin) */
export async function createStaffUser(req, res) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const { name, email, phone, password, role, skills, apartmentNumber } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "name, email, password, role required" });
    }
    if (!["technician", "sub_admin"].includes(role)) {
      return res.status(400).json({ message: "role must be technician or sub_admin" });
    }
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ message: "Email already in use" });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone || "",
      apartmentNumber: apartmentNumber || "",
      password: hash,
      role,
      skills: Array.isArray(skills) ? skills : [],
    });
    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      skills: user.skills,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
