import {Router} from 'express';
import {getInvetory,getItem,createItems}from "../controllers/inventoryControllers.js";

const router = Router();

router.get("/inventory",getInvetory);
router.get("/inventory/:id",getItem)
router.post("/inventory",createItems )

export default router;