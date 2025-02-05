import { methodPaymentModel } from "../models/methodpay.model.js"

export const getMethodsPayments = async (req, res) => {
    try {
        const classes = await methodPaymentModel.getMethodsPayments();
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining roles " })
    }
}

export const getMethodsPay = async (req, res) => {
    const { id } = req.params;
    try {
        const classes = await methodPaymentModel.getMethodsPay({ id });
        if (!classes) {
            return res.status(404).json({ message: "role not found" })
        }
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining role " })
    }
}

export const createMethodsPay = async (req, res) => {
    const { value } = req.body;
    try {
        const classes = await methodPaymentModel.createMethodsPay({ value });
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        if (error.code === "23505") {
            return res.status(409).json({ message: "That role already exists" })
        }
        return res.status(500).json({ message: "Error creating role " })
    }
}

export const updateMethodsPay = async (req, res) => {
    const { id } = req.params;
    const database = req.body;
    try {

        const classes = await methodPaymentModel.updateMethodsPay(id, database)

        if (!classes) {
            return res.status(404).json({ message: 'role not found' });
        }
        res.status(201).json(classes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating role" });
    }
};

export const deleteMethodsPay = async (req, res) => {
    const { id } = req.params;
    try {
        const classes = await methodPaymentModel.deleteMethodsPay({ id })
        if (!classes) {
            return res.status(404).json({ message: 'role not found' });
        }
        res.status(201).json(classes)

    } catch (error) {
        return res.status(500).json({ message: "Error Deleting roles " })
    }
}