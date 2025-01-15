import { Router } from 'express';
import { getInvetory, getItem, createItems, updateInventory, deleteInventory } from "../controllers/inventoryControllers.js";
import { verifyTokenInventory } from '../middlewares/inventory.middleware.js';

const router = Router();

router.get("/inventory", verifyTokenInventory, getInvetory);
router.get("/inventory/:id", verifyTokenInventory, getItem);
router.post("/inventory", verifyTokenInventory, createItems);
router.put("/inventory/:id", verifyTokenInventory, updateInventory);
router.delete("/inventory/:id", verifyTokenInventory, deleteInventory);
export default router;