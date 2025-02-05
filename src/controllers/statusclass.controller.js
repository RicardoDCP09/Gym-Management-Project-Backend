import { statusClassModel } from "../models/statusclass.model.js"

export const getClasses = async (req, res) => {
    try {
        const classes = await statusClassModel.getClasses();
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining roles " })
    }
}

export const getClass = async (req, res) => {
    const { id } = req.params;
    try {
        const classes = await statusClassModel.getClass({ id });
        if (!classes) {
            return res.status(404).json({ message: "role not found" })
        }
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining role " })
    }
}

export const createClass = async (req, res) => {
    const { value } = req.body;
    try {
        const classes = await statusClassModel.createClass({ value });
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        if (error.code === "23505") {
            return res.status(409).json({ message: "That role already exists" })
        }
        return res.status(500).json({ message: "Error creating role " })
    }
}

export const updateClass = async (req, res) => {
    const { id } = req.params;
    const database = req.body;
    try {

        const classes = await statusClassModel.updateClass(id, database)

        if (!classes) {
            return res.status(404).json({ message: 'role not found' });
        }
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating role" });
    }
};

export const deleteClass = async (req, res) => {
    const { id } = req.params;
    try {
        const classes = await statusClassModel.deleteClass({ id })
        if (!classes) {
            return res.status(404).json({ message: 'role not found' });
        }
        res.status(201).json(classes)

    } catch (error) {
        return res.status(500).json({ message: "Error Deleting roles " })
    }
}