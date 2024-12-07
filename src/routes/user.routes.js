import { Router } from "express";
import { createUsers, getUser, getUsers } from "../controllers/usersControllers.js";

const router = Router();


router.get("/users", getUsers);
router.get("/users/:id", getUser)
router.post("/users", createUsers)

export default router;