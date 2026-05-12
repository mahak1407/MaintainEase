import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, default: "" },
    apartmentNumber: { type: String, default: "" },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["resident", "admin", "sub_admin", "technician"],
      default: "resident",
    },
    skills: [{ type: String, trim: true }],
    availability: {
      type: String,
      enum: ["available", "busy", "off"],
      default: "available",
    },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
