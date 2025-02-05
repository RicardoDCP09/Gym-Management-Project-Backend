import { Router } from "express";
import { createDifficulty, deleteDifficulty, getDifficulties, getDifficulty, updateDifficulty } from "../controllers/routinedifficulty.controller.js";
import { verifyAdmin, verifyCoach, verifyToken } from "../middlewares/jwt.middleware.js"

const router = Router();


router.get("/status_difficulty", verifyToken, getDifficulties);
router.get("/status_difficulty/:id", verifyToken, getDifficulty);
router.post("/status_difficulty", verifyToken, createDifficulty);
router.put("/status_difficulty/:id", verifyToken, updateDifficulty);
router.delete("/status_difficulty/:id", verifyToken, deleteDifficulty);
export default router;