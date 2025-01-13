import { Router } from "express";
import { createUsers, deleteUsers, getUser, getUsers, updateUsers } from "../controllers/usersControllers.js";


const router = Router();
router.get("/users", getUsers);
router.get("/users/:id", getUser)
router.post("/users", createUsers)
router.put("/users/:id", updateUsers)
router.delete("/users/:id", deleteUsers)
export default router;