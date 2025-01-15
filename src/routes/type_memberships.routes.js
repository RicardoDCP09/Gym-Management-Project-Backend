import { Router } from "express";
import { createTypeMembership, deleteTypeMembership, getTypeMembership, getTypeMemberships, updateTypeMembership } from "../controllers/membershipsControllers.js";
import { verifyTokenTypeMemberships } from "../middlewares/typeMemberships.middleware.js";

const router = Router();


router.get("/typememberships", verifyTokenTypeMemberships, getTypeMemberships);
router.get("/typememberships/:id", verifyTokenTypeMemberships, getTypeMembership);
router.post("/typememberships", verifyTokenTypeMemberships, createTypeMembership);
router.put("/typememberships/:id", verifyTokenTypeMemberships, updateTypeMembership);
router.delete("/typememberships/:id", verifyTokenTypeMemberships, deleteTypeMembership);
export default router;