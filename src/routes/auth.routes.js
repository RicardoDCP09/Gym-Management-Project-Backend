import { Router } from "express"

import { logout, register, login, profile } from "../controllers/authControllers.js"
import { verifyToken } from "../middlewares/jwt.middleware.js"

const router = Router()

router.get('/login', login)
router.post('/register', register)
router.get('/profile', verifyToken, profile)
router.post('/logout', logout)

export default router