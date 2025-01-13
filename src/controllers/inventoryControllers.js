import { pool } from "../db.js";

export const getInvetory = async (req, res) => {
    const items = dataBase[0].inventory
    const status = dataBase[0].status_inventory;

    const ItemsShowed = items.map(item => {
        const statuses = status.find(statuss => statuss.id === item.status);
        return {
            ...item,
            status: statuses ? `${statuses.id} (${statuses.status})` : 'Status no encontrado'
        };
    });
    res.json(ItemsShowed);
}

export const getItem = async (req, res) => {
    const { id } = req.params;
    const items = dataBase[0].inventory;
    const status = dataBase[0].status_inventory;

    const item = items.find(item => item.id == id);
    if (!item) {
        return res.status(404).json({ message: 'Item  not found' });
    }
    const statuses = status.find(statuss => statuss.id === item.status);

    const itemPrint = {
        ...item,
        status: statuses ? `${statuses.id} (${statuses.status})` : 'Status no encontrado' // Cambiar 'statuses.name' a 'statuses.status'
    };
    res.json(itemPrint);
}

export const createItems = async (req, res) => {
    try {
        const data = req.body;
        const items = dataBase[0].inventory;
        const existingItem = items.find(item => item.equipment_name === data.equipment_name);

        if (existingItem) {
            return res.status(409).json({ message: 'Error: Item already exists' });
        }

        const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;

        const newItem = {
            id: newId,
            equipment_name: data.equipment_name,
            quantity: data.quantity,
            status: data.status,
            day_use: data.day_use,
        };

        items.push(newItem);
        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}