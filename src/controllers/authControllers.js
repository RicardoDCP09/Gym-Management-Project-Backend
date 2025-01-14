
import { createAccesToken } from "../libs/jwt.js";
import bcrypt from "bcryptjs";


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = dataBase[0].users;

        const existingUser = users.find(user => user.email === email);
        if (!existingUser) {
            return res.status(400).json({ message: 'Error: User not found' });
        }

        const isValidPassword = await (password === existingUser.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Error: Invalid Credentials' });
        }
        const token = await createAccesToken({ id: existingUser.id })
        res.cookie('token', token)
        res.json({
            id: existingUser.id,
            name: existingUser.name,
            lastname: existingUser.lastname,
            email: existingUser.email,
            password: existingUser.password,
            phone: existingUser.phone,
            fechaNac: existingUser.fechaNac,
            registerDate: existingUser.registerDate,
            typeMembership: existingUser.typeMembership,
            role: existingUser.role
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const register = async (req, res) => {
    try {
        const data = req.body;
        const users = dataBase[0].users;
        const existingUser = users.find(user => user.email === data.email);

        if (existingUser) {
            return res.status(409).json({ message: 'Error: User already exists' });
        }
        const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;

        const newUser = {
            id: newId,
            name: data.name,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            phone: data.phone,
            fechaNac: data.fechaNac,
            registerDate: new Date(),
            typeMembership: data.typeMembership,
            role: data.role
        };

        users.push(newUser);
        const token = await createAccesToken({ id: newUser.id })
        res.cookie('token', token)

        res.json({ token, newUser });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const logout = async (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.json({ message: "Logged out successfully" })
}