import { Router } from "express";
import { createRole, deleteRole, getRole, getRoles, updateRole } from "../controllers/role.controller.js";
import { verifyAdmin, verifyCoach, verifyToken } from "../middlewares/jwt.middleware.js"

const router = Router();


router.get("/roles", verifyToken, getRoles);
router.get("/roles/:id", verifyToken, getRole);
router.post("/roles", verifyToken, createRole);
router.put("/roles/:id", verifyToken, updateRole);
router.delete("/roles/:id", verifyToken, deleteRole);
export default router;