import { Router } from "express";
import { listMessages, sendMessage } from "../controllers/messageController.js";
import { authRequired, attachUser } from "../middleware/auth.js";

const r = Router();
r.use(authRequired, attachUser);
r.get("/", listMessages);
r.post("/", sendMessage);

export default r;
