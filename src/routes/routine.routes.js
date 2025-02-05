import { Router } from "express";
import { createRoutine, deleteRoutine, getRoutine, getRoutines, updateRoutine } from "../controllers/rutine.controller.js";
import { verifyCoach, verifyToken } from "../middlewares/jwt.middleware.js"


const router = Router();
router.get("/routines", verifyToken, getRoutines);
router.get("/routines/:id", verifyToken, getRoutine);
router.post("/routines", verifyToken, createRoutine);
router.put("/routines/:id", verifyToken, updateRoutine);
router.delete("/routines/:id", verifyToken, deleteRoutine);
export default router