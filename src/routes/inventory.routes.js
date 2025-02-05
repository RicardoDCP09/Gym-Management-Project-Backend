import { Router } from 'express';
import { getInvetory, getItem, createItems, updateInventory, deleteInventory } from "../controllers/inventory.controller.js";
import { verifyCoach, verifyToken } from "../middlewares/jwt.middleware.js"

const router = Router();

router.get("/inventory", verifyToken, getInvetory);
router.get("/inventory/:id", verifyToken, getItem);
router.post("/inventory", verifyToken, createItems);
router.put("/inventory/:id", verifyToken, updateInventory);
router.delete("/inventory/:id", verifyToken, deleteInventory);
export default router;