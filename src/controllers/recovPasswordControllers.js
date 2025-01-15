// controllers/authController.js
import { createAccesToken } from "../libs/jwt.js";
import { passwordResetTokenModel } from '../models/recovPassword.model.js'
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

export const recover = async (req, res) => {
    const { email, phone, fechaNac } = req.body;
    try {
        const user = await passwordResetTokenModel.findUserbyData(email, phone, fechaNac);
        console.log('User  found:', user);
        if (!user) {
            console.log
            return res.status(404).json({ message: 'User  not found' });
        }
        console.log('User  ID to store:', user.id_user);
        const token = await createAccesToken({ userId: user.id_user });
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos

        await passwordResetTokenModel.storeToken(user.id_user, token, expiresAt);

        res.status(200).send({
            message: 'Generated token to reset password',
            token
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error' });
    }


};

export const resetpassword = async (req, res) => {
    const { newPassword } = req.body;
    const { token } = req.params;

    try {
        const storedToken = await passwordResetTokenModel.findToken(token);
        if (!storedToken) {
            return res.status(400).send({ message: 'Invalid or expired token' });
        }


        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decoded.userId;

        const hashPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await passwordResetTokenModel.updatePassword(userId, hashPassword);
        if (!updatedUser) {
            return res.status(404).send({ message: 'User  not found' });
        }


        await passwordResetTokenModel.deleteToken(token);

        res.status(200).send({
            message: 'Password updated successfully'
        });

    } catch (error) {
        console.error('Error during password reset:', error);
        return res.status(400).send({ message: 'Invalid or expired token' });
    }
};