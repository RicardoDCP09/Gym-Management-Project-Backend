import { Router } from 'express';
import { getInvetory, getItem, createItems, updateInventory, deleteInventory } from "../controllers/inventory.controller.js";
import { verifyCoach, verifyToken } from "../middlewares/jwt.middleware.js"

const router = Router();

router.get("/inventory", verifyToken, verifyCoach, getInvetory);
router.get("/inventory/:id", verifyToken, verifyCoach, getItem);
router.post("/inventory", verifyToken, verifyCoach, createItems);
router.put("/inventory/:id", verifyToken, verifyCoach, updateInventory);
router.delete("/inventory/:id", verifyToken, verifyCoach, deleteInventory);
export default router;