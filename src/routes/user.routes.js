import { Router } from "express";
import { createUsers, deleteUsers, getUser, getUsers, updateUsers } from "../controllers/users.controller.js";
import { verifyAdmin, verifyCoach, verifyToken } from "../middlewares/jwt.middleware.js"


const router = Router();
router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUser)
router.post("/users", verifyToken, createUsers)
router.put("/users/:id", verifyToken, updateUsers)
router.delete("/users/:id", verifyToken, deleteUsers)
export default router;