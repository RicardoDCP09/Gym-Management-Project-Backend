import { Router } from "express";
import { createClass, deleteClass, getClass, getClasses, updateClass, } from "../controllers/statusclass.controller.js";
import { verifyAdmin, verifyCoach, verifyToken } from "../middlewares/jwt.middleware.js"

const router = Router();


router.get("/statusClass", verifyToken, getClasses);
router.get("/statusClass/:id", verifyToken, getClass);
router.post("/statusClass", verifyToken, createClass);
router.put("/statusClass/:id", verifyToken, updateClass);
router.delete("/statusClass/:id", verifyToken, deleteClass);
export default router;