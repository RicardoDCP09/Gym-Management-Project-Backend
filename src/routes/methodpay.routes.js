import { Router } from "express";
import { createMethodsPay, deleteMethodsPay, getMethodsPay, getMethodsPayments, updateMethodsPay } from "../controllers/methodpay.controller.js";
import { verifyAdmin, verifyCoach, verifyToken } from "../middlewares/jwt.middleware.js"

const router = Router();


router.get("/pay_methods", verifyToken, getMethodsPayments);
router.get("/pay_methods/:id", verifyToken, getMethodsPay);
router.post("/pay_methods", verifyToken, createMethodsPay);
router.put("/pay_methods/:id", verifyToken, updateMethodsPay);
router.delete("/pay_methods/:id", verifyToken, deleteMethodsPay);
export default router;