
import { createAccesToken } from "../libs/jwt.js";
import bcrypt from "bcryptjs";
import { authModel } from "../models/auth.model.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await authModel.findOneByEmail(email)

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" })
        }

        const token = await createAccesToken({ email: user.email, role: user.role, id: user.id })

        const { password: _, ...userWithoutPassword } = user
        const userToSend = {
            ...userWithoutPassword,
            id: user.id_user, // <-- aquí haces el mapeo
        }
        return res.json({ token, user: userToSend })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const register = async (req, res) => {
    try {
        const { name, lastname, email, password, phone, fechaNac, registerdate, typeMembership, role } = req.body;

        if (!name || !lastname || !email || !password || !fechaNac || !registerdate || !role) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        const user = await authModel.findOneByEmail(email)
        if (user) {
            return res.status(409).json({ ok: false, message: "Email already exists" });
        }

        const hash = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, hash);

        const newUser = await authModel.register({ name, lastname, email, password: hashedPassword, phone, fechaNac, registerdate, typeMembership, role })

        const token = await createAccesToken({ email: newUser.email, role: newUser.role })

        return res.status(201).json({ token, newUser });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

export const profile = async (req, res) => {
    try {
        const user = await authModel.findOneByEmail(req.email)

        return res.json({ ok: true, msg: user })

    } catch (error) {

    }
}

export const logout = async (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.json({ message: "Logged out successfully" })
}