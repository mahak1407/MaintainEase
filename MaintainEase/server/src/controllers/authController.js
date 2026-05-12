import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export async function register(req, res) {
  try {
    const { name, email, phone, apartmentNumber, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone || "",
      apartmentNumber: apartmentNumber || "",
      password: hash,
      role: "resident",
    });
    const token = signToken(user);
    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        apartmentNumber: user.apartmentNumber,
        role: user.role,
      },
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = signToken(user);
    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        apartmentNumber: user.apartmentNumber,
        role: user.role,
        skills: user.skills,
        availability: user.availability,
      },
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function me(req, res) {
  try {
    const u = req.dbUser;
    return res.json({
      id: u._id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      apartmentNumber: u.apartmentNumber,
      role: u.role,
      skills: u.skills,
      availability: u.availability,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
