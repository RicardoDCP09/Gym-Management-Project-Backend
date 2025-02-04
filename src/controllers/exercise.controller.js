import { exercisesModel } from "../models/exercise.model.js"

export const getExercises = async (req, res) => {
    try {
        const exercises = await exercisesModel.getExercises();
        res.status(201).json(exercises)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining Exercises" })
    }
}

export const getExercise = async (req, res) => {
    const { id } = req.params;
    try {
        const exercise = await exercisesModel.getExercise({ id });
        if (!exercise) {
            return res.status(404).json({ message: "Exercise not found" })
        }
        res.status(201).json(exercise)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining Exercise" })
    }
}

export const createExercise = async (req, res) => {
    const { name, description, type } = req.body;
    try {
        const exercise = await exercisesModel.createExercise({ name, description, type });
        res.status(201).json(exercise)
    } catch (error) {
        console.log(error)
        if (error.code === "23505") {
            return res.status(409).json({ message: "That Exercise already exists" })
        }
        return res.status(500).json({ message: "Error creating Exercise" })
    }
}

export const updateExercise = async (req, res) => {
    const { id } = req.params;
    const database = req.body;
    try {

        const exercise = await exercisesModel.updateExercise(id, database)

        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        res.status(201).json(exercise)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating Exercise" });
    }
};

export const deleteExercise = async (req, res) => {
    const { id } = req.params;
    try {
        const exercise = await exercisesModel.deleteExercise({ id })
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        res.status(201).json(exercise)

    } catch (error) {
        return res.status(500).json({ message: "Error Deleting Exercise" })
    }
}