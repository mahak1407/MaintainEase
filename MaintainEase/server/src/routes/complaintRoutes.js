import { Router } from "express";
import {
  createComplaint,
  listMyComplaints,
  listAllComplaints,
  listTechnicianComplaints,
  getComplaint,
  adminUpdateComplaint,
  technicianUpdateStatus,
  residentReopenOrRate,
} from "../controllers/complaintController.js";
import { authRequired, attachUser, requireRoles } from "../middleware/auth.js";

const r = Router();
r.use(authRequired, attachUser);

r.post("/", requireRoles("resident"), createComplaint);
r.get("/mine", requireRoles("resident"), listMyComplaints);
r.get("/technician", requireRoles("technician"), listTechnicianComplaints);
r.get("/all", requireRoles("admin", "sub_admin"), listAllComplaints);
r.get("/:id", getComplaint);
r.patch("/:id/admin", requireRoles("admin", "sub_admin"), adminUpdateComplaint);
r.patch("/:id/technician", requireRoles("technician"), technicianUpdateStatus);
r.patch("/:id/resident", requireRoles("resident"), residentReopenOrRate);

export default r;
