import { Router } from "express";
import { createExercise, deleteExercise, getExercise, getExercises, updateExercise } from "../controllers/exercise.controller.js";
import { verifyCoach, verifyToken } from "../middlewares/jwt.middleware.js"


const router = Router();
router.get("/exercises", verifyToken, getExercises);
router.get("/exercises/:id", verifyToken, getExercise)
router.post("/exercises", verifyToken, verifyCoach, createExercise)
router.put("/exercises/:id", verifyToken, verifyCoach, updateExercise)
router.delete("/exercises/:id", verifyToken, verifyCoach, deleteExercise)
export default router;