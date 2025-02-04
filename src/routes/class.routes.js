import { Router } from "express";
import { createClasses, deleteClass, getClass, getClasses, updateClass } from "../controllers/class.controller.js";
import { verifyAdmin, verifyCoach, verifyToken } from "../middlewares/jwt.middleware.js"


const router = Router();


router.get("/classes", verifyToken, getClasses);
router.get("/classes/:id", verifyToken, getClass);
router.post("/classes", verifyToken, verifyCoach, createClasses);
router.put("/classes/:id", verifyToken, verifyCoach, updateClass);
router.delete("/classes/:id", verifyToken, verifyCoach, deleteClass);
export default router;