import { routineModel } from "../models/rutine.model.js"

export const getRoutines = async (req, res) => {
    try {
        const exercises = await routineModel.getRoutines();
        res.status(200).json(exercises)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining Routines" })
    }
}

export const getRoutine = async (req, res) => {
    const { id } = req.params;
    try {
        const exercise = await routineModel.getRoutine({ id });
        if (!exercise) {
            return res.status(404).json({ message: "Routine not found" })
        }
        res.status(200).json(exercise)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining Routine" })
    }
}

export const createRoutine = async (req, res) => {
    const { name, difficulty, objective, coach_id, exercise_id } = req.body;
    try {
        const exercise = await routineModel.createRoutine({ name, difficulty, objective, coach_id, exercise_id });
        res.status(201).json(exercise)
    } catch (error) {
        console.log(error)
        if (error.code === "23505") {
            return res.status(409).json({ message: "That Routine already exists" })
        }
        return res.status(500).json({ message: "Error creating Routine" })
    }
}

export const updateRoutine = async (req, res) => {
    const { id } = req.params;
    const database = req.body;
    try {

        const exercise = await routineModel.updateRoutine(id, database)

        if (!exercise) {
            return res.status(404).json({ message: 'Routine not found' });
        }
        res.status(201).json(exercise)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating Routine" });
    }
};

export const deleteRoutine = async (req, res) => {
    const { id } = req.params;
    try {
        const exercise = await routineModel.deleteRoutine({ id })
        if (!exercise) {
            return res.status(404).json({ message: 'Routine not found' });
        }
        res.status(200).json(exercise)

    } catch (error) {
        return res.status(500).json({ message: "Error Deleting Routine" })
    }
}