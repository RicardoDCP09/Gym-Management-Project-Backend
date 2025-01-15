import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboardControllers.js";
import { verifyTokenDashboard } from "../middlewares/dashboard.middleware.js";

const router = Router();


router.get('/dashboard', verifyTokenDashboard, getDashboardStats);

export default router;