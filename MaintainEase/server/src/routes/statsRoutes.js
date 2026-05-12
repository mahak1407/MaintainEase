import { Router } from "express";
import { dashboardStats } from "../controllers/statsController.js";
import { authRequired, attachUser, requireRoles } from "../middleware/auth.js";

const r = Router();
r.get("/", authRequired, attachUser, requireRoles("admin", "sub_admin"), dashboardStats);

export default r;
