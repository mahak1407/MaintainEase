import { Router } from "express";
import {
  createSuggestion,
  listSuggestions,
  listMySuggestions,
  updateSuggestionStatus,
} from "../controllers/suggestionController.js";
import { authRequired, attachUser, requireRoles } from "../middleware/auth.js";

const r = Router();
r.use(authRequired, attachUser);
r.post("/", requireRoles("resident"), createSuggestion);
r.get("/mine", requireRoles("resident"), listMySuggestions);
r.get("/all", requireRoles("admin", "sub_admin"), listSuggestions);
r.patch("/:id", requireRoles("admin", "sub_admin"), updateSuggestionStatus);

export default r;
