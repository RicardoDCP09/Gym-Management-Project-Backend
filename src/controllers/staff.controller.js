import { staffModel } from "../models/staff.model.js"



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
    const database = req.body;
    try {
        const newstaff = await staffModel.createStaff(database)
        res.status(201).json(newstaff)
    } catch (error) {
        console.log(error)

        if (error.code === "23505") {
            return res.status(409).json({ message: "Email already exists" })
        }
        return res.status(500).json({ message: "Error creating user" })
    }
}

export const updateStaff = async (req, res) => {
    const { id } = req.params
    const database = req.body;
    if (database.role !== 1 && database.role !== 2) {
        return res.status(400).json({ message: "El rol debe ser 1 o 2." });
    }
    try {
        const updateUser = await staffModel.updateStaff(id, database)
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