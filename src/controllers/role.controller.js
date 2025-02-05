import { rolesModel } from "../models/role.model.js"

export const getRoles = async (req, res) => {
    try {
        const roles = await rolesModel.getRoles();
        res.status(201).json(roles)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining roles " })
    }
}

export const getRole = async (req, res) => {
    const { id } = req.params;
    try {
        const roles = await rolesModel.getRole({ id });
        if (!roles) {
            return res.status(404).json({ message: "role not found" })
        }
        res.status(201).json(roles)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining role " })
    }
}

export const createRole = async (req, res) => {
    const { name_role } = req.body;
    try {
        const roles = await rolesModel.createRole({ name_role });
        res.status(201).json(roles)
    } catch (error) {
        console.log(error)
        if (error.code === "23505") {
            return res.status(409).json({ message: "That role already exists" })
        }
        return res.status(500).json({ message: "Error creating role " })
    }
}

export const updateRole = async (req, res) => {
    const { id } = req.params;
    const database = req.body;
    try {

        const roles = await rolesModel.updateRole(id, database)

        if (!roles) {
            return res.status(404).json({ message: 'role not found' });
        }
        res.status(201).json(roles)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating role" });
    }
};

export const deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        const roles = await rolesModel.deleteRole({ id })
        if (!roles) {
            return res.status(404).json({ message: 'role not found' });
        }
        res.status(201).json(roles)

    } catch (error) {
        return res.status(500).json({ message: "Error Deleting roles " })
    }
}