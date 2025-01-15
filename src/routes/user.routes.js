import { Router } from "express";
import { createUsers, deleteUsers, getUser, getUsers, updateUsers } from "../controllers/usersControllers.js";
import { verifyTokenUsers } from "../middlewares/users.middleware.js";


const router = Router();
router.get("/users", verifyTokenUsers, getUsers);
router.get("/users/:id", verifyTokenUsers, getUser)
router.post("/users", verifyTokenUsers, createUsers)
router.put("/users/:id", verifyTokenUsers, updateUsers)
router.delete("/users/:id", verifyTokenUsers, deleteUsers)
export default router;