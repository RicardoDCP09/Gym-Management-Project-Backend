import { dataBase } from "../db/db.js";

export const getMemberships = async (req, res) => {
    const memberships = dataBase[0].type_memberships
    res.json(memberships);
}

export const getMembership = async (req, res) => {
    const { id } = req.params;
    const memberships = dataBase[0].type_memberships;

    const membership = memberships.find(membership => membership.id == id);

    if (!membership) {
        return res.status(404).json({ message: 'User  not found' });
    }
    res.json(membership);
}

export const createMemberships = async (req, res) => {
    try {
        const data = req.body;
        const memberships = dataBase[0].type_memberships;
        const existingMembership = memberships.find(membership => membership.name === data.name);

        if (existingMembership) {
            return res.status(409).json({ message: 'Error: This type of membership already exists' });
        }

        const newId = memberships.length > 0 ? Math.max(...memberships.map(membership => membership.id)) + 1 : 1;

        const newMembership = {
            id: newId,
            name: data.name,
            duration: data.duration,
            price: data.price,
        };

        memberships.push(newMembership);
        res.status(201).json(newMembership);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}