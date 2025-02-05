import { typeExerciseModel } from "../models/typexercise.model.js"

export const getTypeExercises = async (req, res) => {
    try {
        const classes = await typeExerciseModel.getTypeExercises();
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining roles " })
    }
}

export const getTypeExercise = async (req, res) => {
    const { id } = req.params;
    try {
        const classes = await typeExerciseModel.getTypeExercise({ id });
        if (!classes) {
            return res.status(404).json({ message: "role not found" })
        }
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining role " })
    }
}

export const createTypeExercise = async (req, res) => {
    const { name } = req.body;
    try {
        const classes = await typeExerciseModel.createTypeExercise({ name });
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        if (error.code === "23505") {
            return res.status(409).json({ message: "That role already exists" })
        }
        return res.status(500).json({ message: "Error creating role " })
    }
}

export const updateTypeExercise = async (req, res) => {
    const { id } = req.params;
    const database = req.body;
    try {

        const classes = await typeExerciseModel.updateTypeExercise(id, database)

        if (!classes) {
            return res.status(404).json({ message: 'role not found' });
        }
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating role" });
    }
};

export const deleteTypeExercise = async (req, res) => {
    const { id } = req.params;
    try {
        const classes = await typeExerciseModel.deleteTypeExercise({ id })
        if (!classes) {
            return res.status(404).json({ message: 'role not found' });
        }
        res.status(201).json(classes)

    } catch (error) {
        return res.status(500).json({ message: "Error Deleting roles " })
    }
}