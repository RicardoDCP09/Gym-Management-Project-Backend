import { Router } from "express";
import { createReportType, deleteReportType, getReportType, getReportTypes, updateReportType } from "../controllers/typereport.controller.js";
import { verifyAdmin, verifyCoach, verifyToken } from "../middlewares/jwt.middleware.js"

const router = Router();


router.get("/report_type", verifyToken, getReportTypes);
router.get("/report_type/:id", verifyToken, getReportType);
router.post("/report_type", verifyToken, createReportType);
router.put("/report_type/:id", verifyToken, updateReportType);
router.delete("/report_type/:id", verifyToken, deleteReportType);
export default router;