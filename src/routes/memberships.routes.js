import { Router } from "express";
import { createMemberships,getMembership,getMemberships  } from "../controllers/membershipsControllers.js";

const router = Router();


router.get("/memberships", getMemberships)
router.get("/memberships/:id",getMembership)
router.post("/memberships",createMemberships )

export default router;