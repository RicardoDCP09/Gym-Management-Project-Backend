import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboard.controller.js";
import { verifyToken } from "../middlewares/jwt.middleware.js"

const router = Router();


router.get('/dashboard', verifyToken, getDashboardStats);

export default router;