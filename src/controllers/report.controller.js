import { reportsModel } from "../models/report.model.js"

export const getReports = async (req, res) => {
    try {
        const reports = await reportsModel.getReports()
        res.status(200).json(reports)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining all Reports" })
    }
}

export const getReport = async (req, res) => {
    const { id } = req.params;
    try {
        const reports = await reportsModel.getReport({ id });
        if (!reports) {
            return res.status(404).json({ message: "Report not found" })
        }
        res.status(200).json(reports)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining Report" })
    }
}

export const createReport = async (req, res) => {
    const { type, user_id, description } = req.body;
    try {
        const reports = await reportsModel.createReport({ type, user_id, description });
        res.status(201).json(reports)
    } catch (error) {
        console.log(error)
        if (error.code === "23505") {
            return res.status(409).json({ message: "That Report already exists" })
        }
        return res.status(500).json({ message: "Error creating Report" })
    }
}

export const updateReport = async (req, res) => {
    const { id } = req.params;
    const database = req.body;
    try {

        const reports = await reportsModel.updateReport(id, database)

        if (!reports) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(201).json(reports)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating Reports" });
    }
};

export const deleteReport = async (req, res) => {
    const { id } = req.params;
    try {
        const reports = await reportsModel.deleteReport({ id })
        if (!reports) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(reports)

    } catch (error) {
        return res.status(500).json({ message: "Error Deleting Report" })
    }
}