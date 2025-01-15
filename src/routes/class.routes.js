import { Router } from "express";
import { createClasses, deleteClass, getClass, getClasses, updateClass } from "../controllers/classControllers.js";
import { verifyTokenClass } from "../middlewares/class.middleware.js";

const router = Router();


router.get("/classes", verifyTokenClass, getClasses);
router.get("/classes/:id", verifyTokenClass, getClass);
router.post("/classes", verifyTokenClass, createClasses);
router.put("/classes/:id", verifyTokenClass, updateClass);
router.delete("/classes/:id", verifyTokenClass, deleteClass);
export default router;