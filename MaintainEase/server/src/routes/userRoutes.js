import { Router } from "express";
import { listTechnicians, listResidents, createStaffUser, listStaffForChat } from "../controllers/userController.js";
import { authRequired, attachUser, requireRoles } from "../middleware/auth.js";

const r = Router();
r.use(authRequired, attachUser);
r.get("/staff-chat", listStaffForChat);
r.get("/technicians", requireRoles("admin", "sub_admin"), listTechnicians);
r.get("/residents", requireRoles("admin", "sub_admin"), listResidents);
r.post("/staff", requireRoles("admin"), createStaffUser);

export default r;
