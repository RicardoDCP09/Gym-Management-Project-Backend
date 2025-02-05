import { progressModel } from "../models/progress.model.js"

export const getAllProgress = async (req, res) => {
    try {
        const all = await progressModel.getAllProgress()
        res.status(200).json(all)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining all progress" })
    }
}

export const getProgress = async (req, res) => {
    const { id } = req.params;
    try {
        const progress = await progressModel.getProgress({ id });
        if (!progress) {
            return res.status(404).json({ message: "Progress not found" })
        }
        res.status(200).json(progress)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining Progress" })
    }
}

export const createProgress = async (req, res) => {
    const { user_id, date, weight, bodyfat, musclegain, benchpress, squats, deadlift } = req.body;
    try {
        const exercise = await progressModel.createProgress({ user_id, date, weight, bodyfat, musclegain, benchpress, squats, deadlift });
        res.status(201).json(exercise)
    } catch (error) {
        console.log(error)
        if (error.code === "23505") {
            return res.status(409).json({ message: "That Progress already exists" })
        }
        return res.status(500).json({ message: "Error creating Progress" })
    }
}

export const updateProgress = async (req, res) => {
    const { id } = req.params;
    const database = req.body;
    try {

        const progress = await progressModel.updateProgress(id, database)

        if (!progress) {
            return res.status(404).json({ message: 'Progress not found' });
        }
        res.status(201).json(progress)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating Progress" });
    }
};

export const deleteProgress = async (req, res) => {
    const { id } = req.params;
    try {
        const progress = await progressModel.deleteProgress({ id })
        if (!progress) {
            return res.status(404).json({ message: 'Progress not found' });
        }
        res.status(200).json(progress)

    } catch (error) {
        return res.status(500).json({ message: "Error Deleting Progress" })
    }
}