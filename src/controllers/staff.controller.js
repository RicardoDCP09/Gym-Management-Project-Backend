import { staffModel } from "../models/staff.model.js"
import bcrypt from "bcryptjs";


export const getStaffs = async (req, res) => {
    try {
        const staffs = await staffModel.getStaffs()
        res.status(201).json(staffs)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining users" })
    }
}

export const getStaff = async (req, res) => {
    const { id } = req.params
    try {
        const staff = await staffModel.getStaff({ id })
        if (!staff) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(201).json(staff)
    } catch {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining user" })
    }
}

export const createStaff = async (req, res) => {
    try {
        const { name, lastname, email, password, phone, fechaNac, registerdate, typeMembership, role } = req.body;

        if (!name || !lastname || !email || !password || !fechaNac || !registerdate || !role) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        const hash = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, hash);

        const newUser = await staffModel.createStaff({ name, lastname, email, password: hashedPassword, phone, fechaNac, registerdate, typeMembership, role })

        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)

        if (error.code === "23505") {
            return res.status(409).json({ message: "Email already exists" })
        }
        return res.status(500).json({ message: "Error creating user" })
    }
}

export const updateStaff = async (req, res) => {
    try {
        const { id } = req.params
        const { name, lastname, email, password, phone, fechaNac, registerdate, typeMembership, role } = req.body;

        if (role !== 1 && role !== 2) {
            return res.status(400).json({ message: "El rol debe ser 1 o 2." });
        }
        if (!name || !lastname || !email || !password || !fechaNac || !registerdate || !role) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        const hash = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, hash);
        const updateUser = await staffModel.updateStaff(id, { name, lastname, email, password: hashedPassword, phone, fechaNac, registerdate, typeMembership, role })
        if (!updateUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(201).json(updateUser)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating user" });
    }
};

export const deleteStaff = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedstaff = await staffModel.deleteStaff({ id });

        if (!deletedstaff) {
            return res.status(404).json({ message: 'User  not found' });
        }
        res.status(201).json(deletedstaff);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting user" });
    }
};