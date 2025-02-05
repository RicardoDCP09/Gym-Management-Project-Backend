import { reportTypeModel } from "../models/typereport.model.js"

export const getReportTypes = async (req, res) => {
    try {
        const classes = await reportTypeModel.getReportTypes();
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining roles " })
    }
}

export const getReportType = async (req, res) => {
    const { id } = req.params;
    try {
        const classes = await reportTypeModel.getReportType({ id });
        if (!classes) {
            return res.status(404).json({ message: "role not found" })
        }
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining role " })
    }
}

export const createReportType = async (req, res) => {
    const { name } = req.body;
    try {
        const classes = await reportTypeModel.createReportType({ name });
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        if (error.code === "23505") {
            return res.status(409).json({ message: "That role already exists" })
        }
        return res.status(500).json({ message: "Error creating role " })
    }
}

export const updateReportType = async (req, res) => {
    const { id } = req.params;
    const database = req.body;
    try {

        const classes = await reportTypeModel.updateReportType(id, database)

        if (!classes) {
            return res.status(404).json({ message: 'role not found' });
        }
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating role" });
    }
};

export const deleteReportType = async (req, res) => {
    const { id } = req.params;
    try {
        const classes = await reportTypeModel.deleteReportType({ id })
        if (!classes) {
            return res.status(404).json({ message: 'role not found' });
        }
        res.status(201).json(classes)

    } catch (error) {
        return res.status(500).json({ message: "Error Deleting roles " })
    }
}