import express from 'express';
import {
    getUserProgress,
    getUsersWithProgress,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/userorm.controller.js"

const router = express.Router();

router.get('/userprogressOrm', getUserProgress);
router.get('/userswithprogressOrm', getUsersWithProgress);
router.post('/usersOrm', createUser);
router.put('/usersOrm/:id', updateUser);
router.delete('/usersOrm/:id', deleteUser);

export default router;



