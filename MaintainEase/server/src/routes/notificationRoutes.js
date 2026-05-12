import { Router } from "express";
import { listNotifications, markRead, markAllRead } from "../controllers/notificationController.js";
import { authRequired, attachUser } from "../middleware/auth.js";

const r = Router();
r.use(authRequired, attachUser);
r.get("/", listNotifications);
r.post("/read", markRead);
r.post("/read-all", markAllRead);

export default r;
