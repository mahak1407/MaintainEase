import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "./models/User.js";

async function run() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/maintainease";
  await mongoose.connect(uri);

  const password = await bcrypt.hash("Admin@123", 10);
  const techPass = await bcrypt.hash("Tech@123", 10);

  const users = [
    {
      name: "System Admin",
      email: "admin@maintainease.com",
      phone: "919876543210",
      apartmentNumber: "A-0",
      password,
      role: "admin",
      skills: [],
    },
    {
      name: "Society Sub-Admin",
      email: "subadmin@maintainease.com",
      phone: "919876543211",
      apartmentNumber: "A-0",
      password,
      role: "sub_admin",
      skills: [],
    },
    {
      name: "Ravi Technician",
      email: "tech@maintainease.com",
      phone: "919876543212",
      apartmentNumber: "T-1",
      password: techPass,
      role: "technician",
      skills: ["plumbing", "electrical", "hvac"],
      availability: "available",
    },
  ];

  for (const u of users) {
    const existing = await User.findOne({ email: u.email });
    if (existing) {
      console.log("Skip existing:", u.email);
      continue;
    }
    await User.create(u);
    console.log("Created:", u.email);
  }

  console.log("\nDemo logins:");
  console.log("  Admin:     admin@maintainease.com / Admin@123");
  console.log("  Sub-Admin: subadmin@maintainease.com / Admin@123");
  console.log("  Tech:      tech@maintainease.com / Tech@123");
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
