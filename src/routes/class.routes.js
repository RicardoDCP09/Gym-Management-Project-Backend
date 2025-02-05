import { Router } from "express";
import { createClasses, deleteClass, getClass, getClasses, updateClass } from "../controllers/class.controller.js";
import { verifyAdmin, verifyCoach, verifyToken } from "../middlewares/jwt.middleware.js"


const router = Router();


router.get("/classes", getClasses);
router.get("/classes/:id", getClass);
router.post("/classes", verifyToken, createClasses);
router.put("/classes/:id", verifyToken, updateClass);
router.delete("/classes/:id", verifyToken, deleteClass);
export default router;