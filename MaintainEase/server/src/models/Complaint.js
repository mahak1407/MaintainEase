import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "emergency"],
      default: "medium",
    },
    location: { type: String, default: "flat", trim: true },
    status: {
      type: String,
      enum: [
        "pending",
        "rejected",
        "assigned",
        "accepted",
        "in_progress",
        "waiting_parts",
        "completed",
        "reopened",
      ],
      default: "pending",
    },
    images: [{ type: String }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    technicianId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    rejectReason: { type: String, default: "" },
    rating: { type: Number, min: 1, max: 5, default: null },
    feedback: { type: String, default: "" },
  },
  { timestamps: true }
);

complaintSchema.index({ status: 1, priority: 1, createdAt: -1 });

export const Complaint = mongoose.model("Complaint", complaintSchema);
