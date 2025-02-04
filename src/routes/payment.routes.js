import { Router } from "express";
import { createPayment, deletePayment, getPayment, getPayments, updatePayment } from "../controllers/payment.controller.js";
import { verifyAdmin, verifyCoach, verifyToken } from "../middlewares/jwt.middleware.js"


const router = Router();
router.get("/payments", verifyToken, verifyCoach, getPayments);
router.get("/payments/:id", verifyToken, verifyCoach, getPayment)
router.post("/payments", verifyToken, verifyAdmin, createPayment)
router.put("/payments/:id", verifyToken, verifyAdmin, updatePayment)
router.delete("/payments/:id", verifyToken, verifyAdmin, deletePayment)
export default router;