import { Router } from "express";
import { createStaff, deleteStaff, getStaff, getStaffs, updateStaff } from "../controllers/staff.controller.js";
import { verifyAdmin, verifyCoach, verifyToken } from "../middlewares/jwt.middleware.js"


const router = Router();
router.get("/staff", verifyToken, getStaffs);
router.get("/staff/:id", verifyToken, getStaff)
router.post("/staff", verifyToken, createStaff)
router.put("/staff/:id", verifyToken, updateStaff)
router.delete("/staff/:id", verifyToken, deleteStaff)
export default router