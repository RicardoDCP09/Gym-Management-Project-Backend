import { statusInventoryModel } from "../models/statusinventory.model.js"

export const getItems = async (req, res) => {
    try {
        const classes = await statusInventoryModel.getItems();
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining roles " })
    }
}

export const getItem = async (req, res) => {
    const { id } = req.params;
    try {
        const classes = await statusInventoryModel.getItem({ id });
        if (!classes) {
            return res.status(404).json({ message: "role not found" })
        }
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining role " })
    }
}

export const createItem = async (req, res) => {
    const { value } = req.body;
    try {
        const classes = await statusInventoryModel.createItem({ value });
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        if (error.code === "23505") {
            return res.status(409).json({ message: "That role already exists" })
        }
        return res.status(500).json({ message: "Error creating role " })
    }
}

export const updateItem = async (req, res) => {
    const { id } = req.params;
    const database = req.body;
    try {

        const classes = await statusInventoryModel.updateItem(id, database)

        if (!classes) {
            return res.status(404).json({ message: 'role not found' });
        }
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating role" });
    }
};

export const deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        const classes = await statusInventoryModel.deleteItem({ id })
        if (!classes) {
            return res.status(404).json({ message: 'role not found' });
        }
        res.status(201).json(classes)

    } catch (error) {
        return res.status(500).json({ message: "Error Deleting roles " })
    }
}