import { Router } from "express";
import { createPayment, deletePayment, getPayment, getPayments, updatePayment } from "../controllers/payment.controller.js";
import { verifyAdmin, verifyCoach, verifyToken } from "../middlewares/jwt.middleware.js"


const router = Router();
router.get("/payments", verifyToken, getPayments);
router.get("/payments/:id", verifyToken, getPayment)
router.post("/payments", verifyToken, createPayment)
router.put("/payments/:id", verifyToken, updatePayment)
router.delete("/payments/:id", verifyToken, deletePayment)
export default router;