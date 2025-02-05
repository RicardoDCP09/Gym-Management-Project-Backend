import { userRolesModel } from "../models/userroles.model.js"

export const getUserRoles = async (req, res) => {
    try {
        const userRoles = await userRolesModel.getUserRoles();
        res.status(201).json(userRoles)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining roles " })
    }
}

export const getUserRole = async (req, res) => {
    const { id } = req.params;
    try {
        const userRoles = await userRolesModel.getUserRole({ id });
        if (!userRoles) {
            return res.status(404).json({ message: "role not found" })
        }
        res.status(201).json(userRoles)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining role " })
    }
}

export const createUserRole = async (req, res) => {
    const { user_id, role_id } = req.body;
    try {
        const userRoles = await userRolesModel.createUserRole({ user_id, role_id });
        res.status(201).json(userRoles)
    } catch (error) {
        console.log(error)
        if (error.code === "23505") {
            return res.status(409).json({ message: "That role already exists" })
        }
        return res.status(500).json({ message: "Error creating role " })
    }
}

export const updateUserRole = async (req, res) => {
    const { id } = req.params;
    const database = req.body;
    try {

        const userRoles = await userRolesModel.updateUserRole(id, database)

        if (!userRoles) {
            return res.status(404).json({ message: 'role not found' });
        }
        res.status(201).json(userRoles)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating role" });
    }
};

export const deleteUserRole = async (req, res) => {
    const { id } = req.params;
    try {
        const userRoles = await userRolesModel.deleteUserRole({ id })
        if (!userRoles) {
            return res.status(404).json({ message: 'role not found' });
        }
        res.status(201).json(userRoles)

    } catch (error) {
        return res.status(500).json({ message: "Error Deleting roles " })
    }
}