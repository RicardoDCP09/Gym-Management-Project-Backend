import { paymentModel } from "../models/payment.model.js"



export const getPayments = async (req, res) => {
    try {
        const payment = await paymentModel.getPayments()
        res.status(200).json(payment)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining Payments" })
    }
}

export const getPayment = async (req, res) => {
    const { id } = req.params
    try {
        const payment = await paymentModel.getPayment({ id })
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" })
        }
        res.status(200).json(payment)
    } catch {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining Payment" })
    }
}

export const createPayment = async (req, res) => {
    const database = req.body;
    try {
        const newsPay = await paymentModel.createPayment(database)
        res.status(201).json(newsPay)
    } catch (error) {
        console.log(error)

        if (error.code === "23505") {
            return res.status(409).json({ message: "Payment already exists" })
        }
        return res.status(500).json({ message: "Error creating Payment" })
    }
}

export const updatePayment = async (req, res) => {
    const { id } = req.params
    const database = req.body;
    try {
        const updatedPay = await paymentModel.updatePayment(id, database)
        if (!updatedPay) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(201).json(updatedPay)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating Payment" });
    }
};

export const deletePayment = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPay = await paymentModel.deletePayment({ id })

        if (!deletedPay) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(deletedPay);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting Payment" });
    }
};