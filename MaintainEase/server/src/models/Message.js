import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    complaintId: { type: mongoose.Schema.Types.ObjectId, ref: "Complaint", default: null },
    text: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

messageSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 });
messageSchema.index({ complaintId: 1, createdAt: 1 });

export const Message = mongoose.model("Message", messageSchema);
