// controllers/authController.js
import { createAccesToken } from "../libs/jwt.js";
import { passwordResetTokenModel } from '../models/recovPassword.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { sendEmail } from '../libs/mailer.js'; // Importar la función de envío de correo

export const recover = async (req, res) => {
    const { email } = req.body;
    try {
        // Buscar al usuario por sus datos
        const user = await passwordResetTokenModel.findUserbyData(email);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Generar un token de recuperación
        const token = await createAccesToken({ userId: user.id_user });
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Token expira en 10 minutos

        // Almacenar el token en la base de datos
        await passwordResetTokenModel.storeToken(user.id_user, token, expiresAt);

        // Crear el enlace de recuperación
        const resetLink = `http://localhost:4000/resetpassword/${token}`; // Cambia la URL según tu frontend

        // Crear el contenido del correo electrónico
        const emailSubject = 'Recuperación de Contraseña';
        const emailHtml = `
            <h1>Recuperación de Contraseña</h1>
            <p>Hola ${user.name},</p>
            <p>Hemos recibido una solicitud para restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
            <a href="${resetLink}">Restablecer Contraseña</a>
            <p>Si no solicitaste este cambio, ignora este correo.</p>
            <p>El enlace expirará en 10 minutos.</p>
        `;

        // Enviar el correo electrónico
        await sendEmail(user.email, emailSubject, emailHtml);

        res.status(200).send({
            message: 'Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.',
        });
    } catch (error) {
        console.error('Error en recover:', error);
        return res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
};

export const resetpassword = async (req, res) => {
    const { newPassword } = req.body;
    const { token } = req.params;

    try {
        // Verificar si el token es válido y no ha expirado
        const storedToken = await passwordResetTokenModel.findToken(token);
        if (!storedToken) {
            return res.status(400).send({ message: 'Token inválido o expirado' });
        }

        // Decodificar el token para obtener el ID del usuario
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decoded.userId;

        // Cifrar la nueva contraseña
        const hashPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña del usuario
        const updatedUser = await passwordResetTokenModel.updatePassword(userId, hashPassword);
        if (!updatedUser) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        // Eliminar el token de la base de datos
        await passwordResetTokenModel.deleteToken(token);

        res.status(200).send({
            message: 'Contraseña actualizada correctamente',
        });
    } catch (error) {
        console.error('Error en resetpassword:', error);
        return res.status(400).send({ message: 'Token inválido o expirado' });
    }
};