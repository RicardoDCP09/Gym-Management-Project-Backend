import { typeMembershipsModel } from "../models/typememberships.model.js"

export const getTypeMemberships = async (req, res) => {
    try {
        const types = await typeMembershipsModel.getTypesMemberships();
        res.status(201).json(types)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining Types" })
    }
}

export const getTypeMembership = async (req, res) => {
    const { id } = req.params;
    try {
        const typeMemberships = await typeMembershipsModel.getTypeMembership({ id });
        if (!typeMemberships) {
            return res.status(404).json({ message: "Type not found" })
        }
        res.status(201).json(typeMemberships)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining Type" })
    }
}

export const createTypeMembership = async (req, res) => {
    const { name, duration, price } = req.body;
    try {
        const typeMemberships = await typeMembershipsModel.createTypeMemberships({ name, duration, price });
        res.status(201).json(typeMemberships)
    } catch (error) {
        console.log(error)
        if (error.code === "23505") {
            return res.status(409).json({ message: "That Memberships already exists" })
        }
        return res.status(500).json({ message: "Error creating Membership" })
    }
}

export const updateTypeMembership = async (req, res) => {
    const { id } = req.params;
    const database = req.body;
    try {

        const typeMemberships = await typeMembershipsModel.updateTypeMembership(id, database)

        if (!typeMemberships) {
            return res.status(404).json({ message: 'Type Membership not found' });
        }
        res.status(201).json(typeMemberships)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating Type" });
    }
};

export const deleteTypeMembership = async (req, res) => {
    const { id } = req.params;
    try {
        const typeMemberships = await typeMembershipsModel.deleteTypeMembership({ id })
        if (!typeMemberships) {
            return res.status(404).json({ message: 'Type Membership not found' });
        }
        res.status(201).json(typeMemberships)

    } catch (error) {
        return res.status(500).json({ message: "Error Deleting Type" })
    }
}