import { Router } from "express";
import { createTypeMembership, deleteTypeMembership, getTypeMembership, getTypeMemberships, updateTypeMembership } from "../controllers/membershipsControllers.js";

const router = Router();


router.get("/typememberships", getTypeMemberships);
router.get("/typememberships/:id", getTypeMembership);
router.post("/typememberships", createTypeMembership);
router.put("/typememberships/:id", updateTypeMembership);
router.delete("/typememberships/:id", deleteTypeMembership);
export default router;