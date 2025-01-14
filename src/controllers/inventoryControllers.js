import { inventoryModel } from "../models/inventory.model.js"


export const getInvetory = async (req, res) => {
    try {
        const inventory = await inventoryModel.getInvetory()
        res.status(201).json(inventory)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining the inventory" })
    }
}

export const getItem = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await inventoryModel.getItem({ id })
        if (!item) {
            return res.status(404).json({ message: "Item not found" })
        }
        res.json(item)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining item" })
    }
}

export const createItems = async (req, res) => {
    const database = req.body;

    try {
        const item = await inventoryModel.createItem(database)
        res.status(201).json(item)
    } catch (error) {
        console.log(error)
        if (error.code === "23505") {
            return res.status(409).json({ message: "Email already exists" })
        }
        return res.status(500).json({ message: "Error creating user" })
    }
}

export const updateInventory = async (req, res) => {
    const { id } = req.params;
    const database = req.body;
    try {
        const item = await inventoryModel.updateInventory(id, database)
        if (!item) {
            return res.status(404).json({ message: "Item not found" })
        }
        res.status(201).json(item)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating user" });
    }
};

export const deleteInventory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedItem = await inventoryModel.deleteInventory({ id });
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" })
        }
        res.status(201).json(deletedItem)
    } catch {
        return res.status(500).json({ message: "Error Deleting user" })
    }
}



