import { Complaint } from "../models/Complaint.js";
import { User } from "../models/User.js";

export async function dashboardStats(req, res) {
  try {
    const byStatus = await Complaint.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const totalUsers = await User.countDocuments({ role: "resident" });
    const totalTech = await User.countDocuments({ role: "technician" });
    const totalComplaints = await Complaint.countDocuments();
    return res.json({
      totalComplaints,
      totalResidents: totalUsers,
      totalTechnicians: totalTech,
      byStatus: byStatus.reduce((acc, x) => {
        acc[x._id] = x.count;
        return acc;
      }, {}),
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
