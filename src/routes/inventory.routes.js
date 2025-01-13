import { Router } from 'express';
import { getInvetory, getItem, createItems, updateInventory, deleteInventory } from "../controllers/inventoryControllers.js";

const router = Router();

router.get("/inventory", getInvetory);
router.get("/inventory/:id", getItem);
router.post("/inventory", createItems);
router.put("/inventory/:id", updateInventory);
router.delete("/inventory/:id", deleteInventory);
export default router;