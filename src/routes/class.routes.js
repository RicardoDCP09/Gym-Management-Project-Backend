import { Router } from "express";
import { createClasses, getClass, getClasses  } from "../controllers/classControllers.js";

const router = Router();


router.get("/classes", getClasses)
router.get("/classes/:id", getClass)
router.post("/classes", createClasses)

export default router;