import { Router } from "express";
import { createTypeExercise, deleteTypeExercise, getTypeExercise, getTypeExercises, updateTypeExercise } from "../controllers/typexercise.controller.js";
import { verifyAdmin, verifyCoach, verifyToken } from "../middlewares/jwt.middleware.js"
import { getExercise, getExercises } from "../controllers/exercise.controller.js";

const router = Router();


router.get("/type_exercises", verifyToken, getTypeExercises);
router.get("/type_exercises/:id", verifyToken, getTypeExercise);
router.post("/type_exercises", verifyToken, createTypeExercise);
router.put("/type_exercises/:id", verifyToken, updateTypeExercise);
router.delete("/type_exercises/:id", verifyToken, deleteTypeExercise);
export default router;