import { statusPaymentModel } from "../models/statuspay.model.js"

export const getStatusPayments = async (req, res) => {
    try {
        const classes = await statusPaymentModel.getStatusPayments();
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining roles " })
    }
}

export const getStatusPay = async (req, res) => {
    const { id } = req.params;
    try {
        const classes = await statusPaymentModel.getStatusPay({ id });
        if (!classes) {
            return res.status(404).json({ message: "role not found" })
        }
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining role " })
    }
}

export const createStatusPay = async (req, res) => {
    const { value } = req.body;
    try {
        const classes = await statusPaymentModel.createStatusPay({ value });
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        if (error.code === "23505") {
            return res.status(409).json({ message: "That role already exists" })
        }
        return res.status(500).json({ message: "Error creating role " })
    }
}

export const updateStatusPay = async (req, res) => {
    const { id } = req.params;
    const database = req.body;
    try {

        const classes = await statusPaymentModel.updateStatusPay(id, database)

        if (!classes) {
            return res.status(404).json({ message: 'role not found' });
        }
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating role" });
    }
};

export const deleteStatusPay = async (req, res) => {
    const { id } = req.params;
    try {
        const classes = await statusPaymentModel.deleteStatusPay({ id })
        if (!classes) {
            return res.status(404).json({ message: 'role not found' });
        }
        res.status(201).json(classes)

    } catch (error) {
        return res.status(500).json({ message: "Error Deleting roles " })
    }
}