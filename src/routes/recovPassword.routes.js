import { Router } from 'express';
import { recover, resetpassword } from '../controllers/recovPasswordControllers.js';
import { verifyTokenRecovPassword } from '../middlewares/recovPassword.middleware.js'
const router = Router();

router.post('/recover', recover);
router.post('/resetpassword/:token', verifyTokenRecovPassword, resetpassword);

export default router;