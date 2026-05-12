import { Router } from "express";
import { register, login, me } from "../controllers/authController.js";
import { authRequired, attachUser } from "../middleware/auth.js";

const r = Router();
r.post("/register", register);
r.post("/login", login);
r.get("/me", authRequired, attachUser, me);

export default r;
