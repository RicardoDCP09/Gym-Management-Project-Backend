import { Router } from 'express';
import { recover, resetpassword } from '../controllers/recovPassword.controller.js';
import { verifyToken } from "../middlewares/jwt.middleware.js"
const router = Router();

router.post('/recover', recover);
router.post('/resetpassword/:token', verifyToken, resetpassword);

export default router;