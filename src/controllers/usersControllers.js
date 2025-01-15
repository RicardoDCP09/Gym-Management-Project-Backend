import { userModel } from "../models/user.model.js"



export const getUsers = async (req, res) => {
    try {
        const users = await userModel.getUsers()
        res.status(201).json(users)
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
    const database = req.body;
    try {
        const newUser = await userModel.createUser(database)
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
    const { id } = req.params
    const database = req.body;
    try {
        const updateUser = await userModel.updateUser(id, database)
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