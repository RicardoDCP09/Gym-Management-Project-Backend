import { Router } from "express";
import { createTypeMembership, deleteTypeMembership, getTypeMembership, getTypeMemberships, updateTypeMembership } from "../controllers/memberships.controller.js";
import { verifyAdmin, verifyCoach, verifyToken } from "../middlewares/jwt.middleware.js"

const router = Router();


router.get("/typememberships", verifyToken, getTypeMemberships);
router.get("/typememberships/:id", verifyToken, getTypeMembership);
router.post("/typememberships", verifyToken, verifyAdmin, createTypeMembership);
router.put("/typememberships/:id", verifyToken, verifyAdmin, updateTypeMembership);
router.delete("/typememberships/:id", verifyToken, verifyAdmin, deleteTypeMembership);
export default router;