import { Router } from "express"
import { logout, register, login, profile } from "../controllers/auth.controller.js"
import { verifyToken } from "../middlewares/jwt.middleware.js"

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.get('/profile', verifyToken, profile)
router.get('/logout', verifyToken, logout)

export default router