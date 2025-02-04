import { Router } from "express";
import { createProgress, deleteProgress, getAllProgress, getProgress, updateProgress } from "../controllers/progress.controller.js";
import { verifyAdmin, verifyCoach, verifyToken } from "../middlewares/jwt.middleware.js"


const router = Router();
router.get("/progress", verifyToken, getAllProgress)
router.get("/progress/:id", verifyToken, getProgress)
router.post("/progress", verifyToken, verifyAdmin, createProgress)
router.put("/progress/:id", verifyToken, verifyAdmin, updateProgress)
router.delete("/progress/:id", verifyToken, verifyAdmin, deleteProgress)
export default router