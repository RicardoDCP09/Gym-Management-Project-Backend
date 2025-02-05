import { Router } from "express";
import { createItem, deleteItem, getItem, getItems, updateItem } from "../controllers/statusinventory.controller.js";
import { verifyAdmin, verifyCoach, verifyToken } from "../middlewares/jwt.middleware.js"

const router = Router();


router.get("/status_inventory", verifyToken, getItems);
router.get("/status_inventory/:id", verifyToken, getItem);
router.post("/status_inventory", verifyToken, createItem);
router.put("/status_inventory/:id", verifyToken, updateItem);
router.delete("/status_inventory/:id", verifyToken, deleteItem);
export default router;