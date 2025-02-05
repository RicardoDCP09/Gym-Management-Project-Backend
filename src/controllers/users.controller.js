import { userModel } from "../models/user.model.js"
import bcrypt from "bcryptjs";


export const getUsers = async (req, res) => {
    try {
        const users = await userModel.getUsers()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining users" })
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModel.getUser({ id })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(201).json(user)
    } catch {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining user" })
    }
}

export const createUsers = async (req, res) => {
    try {
        const { name, lastname, email, password, phone, fechaNac, registerdate, typeMembership, role } = req.body;

        if (!name || !lastname || !email || !password || !fechaNac || !registerdate || !role) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        const hash = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, hash);

        const newUser = await userModel.createUser({ name, lastname, email, password: hashedPassword, phone, fechaNac, registerdate, typeMembership, role })

        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)

        if (error.code === "23505") {
            return res.status(409).json({ message: "Email already exists" })
        }
        return res.status(500).json({ message: "Error creating user" })
    }
}

export const updateUsers = async (req, res) => {
    try {
        const { id } = req.params
        const { name, lastname, email, password, phone, fechaNac, registerdate, typeMembership, role } = req.body;
        if (role !== 3) {
            return res.status(400).json({ message: "El rol debe ser 3." });
        }

        const hash = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, hash);
        const updateUser = await userModel.updateUser(id, { name, lastname, email, password: hashedPassword, phone, fechaNac, registerdate, typeMembership, role })
        if (!updateUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(201).json(updateUser)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating user" });
    }
};

export const deleteUsers = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await userModel.deleteUser({ id });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User  not found' });
        }
        res.status(201).json(deletedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting user" });
    }
};