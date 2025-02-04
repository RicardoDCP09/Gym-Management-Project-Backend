import { Router } from "express";
import { createUsers, deleteUsers, getUser, getUsers, updateUsers } from "../controllers/users.controller.js";
import { verifyAdmin, verifyCoach, verifyToken } from "../middlewares/jwt.middleware.js"


const router = Router();
router.get("/users", verifyToken, verifyCoach, getUsers);
router.get("/users/:id", verifyToken, verifyCoach, getUser)
router.post("/users", verifyToken, verifyAdmin, createUsers)
router.put("/users/:id", verifyToken, verifyAdmin, updateUsers)
router.delete("/users/:id", verifyToken, verifyAdmin, deleteUsers)
export default router;