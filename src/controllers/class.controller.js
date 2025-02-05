import { classModel } from "../models/class.model.js";


export const getClasses = async (req, res) => {
    try {
        const classes = await classModel.getClasses();
        res.status(201).json(classes);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining the Classses" })
    }
}

export const getClass = async (req, res) => {
    const { id } = req.params
    try {
        const classData = await classModel.getClass({ id });
        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(201).json(classData);
    } catch {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining Class" })
    }
}

export const createClasses = async (req, res) => {
    try {
        const database = req.body;

        const isCoachValid = await classModel.verifyCoach(database.coach_id);

        if (!isCoachValid) {
            return res.status(404).json({ message: "Error creating Class: Coach doesn't exist or is not a Coach" });
        }

        const newClass = await classModel.createClass(database);
        res.status(201).json(newClass);

    } catch (error) {
        console.log(error)
        if (error.code === "23505") {
            return res.status(409).json({ message: "This Class already exists" })
        }
        return res.status(500).json({ message: "Error creating Class" })
    }
}


export const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const database = req.body;

        const isCoachValid = await classModel.verifyCoach(database.coach_id);

        if (!isCoachValid) {
            return res.status(404).json({ message: "Error creating Class: Coach doesn't exist or is not a Coach" });
        }

        const updatedClass = await classModel.updateClass(id, database);

        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(201).json(updatedClass);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating Class" });
    }
};

export const deleteClass = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedClass = await classModel.deleteClass({ id });
        if (!deletedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(201).json(deletedClass);
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Error Deleting Class" })
    }
}