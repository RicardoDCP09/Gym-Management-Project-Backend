import { Router } from "express";
import { createClasses, deleteClass, getClass, getClasses, updateClass } from "../controllers/classControllers.js";

const router = Router();


router.get("/classes", getClasses);
router.get("/classes/:id", getClass);
router.post("/classes", createClasses);
router.put("/classes/:id", updateClass);
router.delete("/classes/:id", deleteClass);
export default router;