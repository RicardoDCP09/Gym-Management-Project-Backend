import { Router } from "express";
import { createStatusPay, deleteStatusPay, getStatusPay, getStatusPayments, updateStatusPay } from "../controllers/statuspay.controller.js";
import { verifyAdmin, verifyCoach, verifyToken } from "../middlewares/jwt.middleware.js"

const router = Router();


router.get("/status_payment", verifyToken, getStatusPayments);
router.get("/status_payment/:id", verifyToken, getStatusPay);
router.post("/status_payment", verifyToken, createStatusPay);
router.put("/status_payment/:id", verifyToken, updateStatusPay);
router.delete("/status_payment/:id", verifyToken, deleteStatusPay);
export default router;