import { difficultyModel } from "../models/routinedifficulty.model.js"

export const getDifficulties = async (req, res) => {
    try {
        const classes = await difficultyModel.getDifficulties();
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining roles " })
    }
}

export const getDifficulty = async (req, res) => {
    const { id } = req.params;
    try {
        const classes = await difficultyModel.getDifficulty({ id });
        if (!classes) {
            return res.status(404).json({ message: "role not found" })
        }
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining role " })
    }
}

export const createDifficulty = async (req, res) => {
    const { name } = req.body;
    try {
        const classes = await difficultyModel.createDifficulty({ name });
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        if (error.code === "23505") {
            return res.status(409).json({ message: "That role already exists" })
        }
        return res.status(500).json({ message: "Error creating role " })
    }
}

export const updateDifficulty = async (req, res) => {
    const { id } = req.params;
    const database = req.body;
    try {

        const classes = await difficultyModel.updateDifficulty(id, database)

        if (!classes) {
            return res.status(404).json({ message: 'role not found' });
        }
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating role" });
    }
};

export const deleteDifficulty = async (req, res) => {
    const { id } = req.params;
    try {
        const classes = await difficultyModel.deleteDifficulty({ id })
        if (!classes) {
            return res.status(404).json({ message: 'role not found' });
        }
        res.status(201).json(classes)

    } catch (error) {
        return res.status(500).json({ message: "Error Deleting roles " })
    }
}