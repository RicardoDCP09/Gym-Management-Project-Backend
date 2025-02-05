import { Router } from "express";
import { createUserRole, deleteUserRole, getUserRole, getUserRoles, updateUserRole } from "../controllers/userroles.controller.js";
import { verifyAdmin, verifyCoach, verifyToken } from "../middlewares/jwt.middleware.js"

const router = Router();


router.get("/user_roles", verifyToken, getUserRoles);
router.get("/user_roles/:id", verifyToken, getUserRole);
router.post("/user_roles", verifyToken, createUserRole);
router.put("/user_roles/:id", verifyToken, updateUserRole);
router.delete("/user_roles/:id", verifyToken, deleteUserRole);
export default router;