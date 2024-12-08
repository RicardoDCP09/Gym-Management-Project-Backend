import {Router} from "express"

import {logout,register,login} from "../controllers/authControllers.js"

const router = Router()

router.post ('/login',login)
router.post ('/register',register)
router.post('/logout',logout)

export default router