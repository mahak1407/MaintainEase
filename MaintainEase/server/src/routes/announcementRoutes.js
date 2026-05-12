import { Router } from "express";
import {
  listAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementController.js";
import { authRequired, attachUser, requireRoles } from "../middleware/auth.js";

const r = Router();
r.get("/", authRequired, attachUser, listAnnouncements);
r.post("/", authRequired, attachUser, requireRoles("admin", "sub_admin"), createAnnouncement);
r.delete("/:id", authRequired, attachUser, requireRoles("admin", "sub_admin"), deleteAnnouncement);

export default r;
