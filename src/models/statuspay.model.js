import { db } from '../database/db.js '

const getStatusPayments = async () => {
    const query = {
        text: `SELECT * FROM Gym_management.status_payment`
    }
    const { rows } = await db.query(query);
    return rows;
}

const getStatusPay = async ({ id }) => {
    const query = {
        text: `SELECT * FROM Gym_management.status_payment WHERE id = $1`,
        values: [id]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const createStatusPay = async ({ status }) => {
    const query = {
        text: `INSERT INTO Gym_management.status_payment
        (status ) 
        VALUES ($1) 
        RETURNING *
        `,
        values:
            [
                status
            ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const updateStatusPay = async (id, { status }) => {
    const query = {
        text: `UPDATE Gym_management.status_payment
        SET status=$1
        WHERE id= $2 RETURNING *`,
        values: [
            status, id
        ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const deleteStatusPay = async ({ id }) => {
    const query = {
        text: `DELETE FROM Gym_management.status_payment WHERE id = $1 RETURNING * `, values: [id]
    }
    const { rows } = await db.query(query);
    return rows;
}



export const statusPaymentModel = {
    getStatusPayments,
    getStatusPay,
    createStatusPay,
    updateStatusPay,
    deleteStatusPay
}