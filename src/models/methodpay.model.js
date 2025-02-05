import { db } from '../database/db.js '

const getMethodsPayments = async () => {
    const query = {
        text: `SELECT * FROM Gym_management.pay_methods`
    }
    const { rows } = await db.query(query);
    return rows;
}

const getMethodsPay = async ({ id }) => {
    const query = {
        text: `SELECT * FROM Gym_management.pay_methods WHERE id = $1`,
        values: [id]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const createMethodsPay = async ({ status }) => {
    const query = {
        text: `INSERT INTO Gym_management.pay_methods
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

const updateMethodsPay = async (id, { status }) => {
    const query = {
        text: `UPDATE Gym_management.pay_methods
        SET status=$1
        WHERE id= $2 RETURNING *`,
        values: [
            status, id
        ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const deleteMethodsPay = async ({ id }) => {
    const query = {
        text: `DELETE FROM Gym_management.pay_methods WHERE id = $1 RETURNING * `, values: [id]
    }
    const { rows } = await db.query(query);
    return rows;
}



export const methodPaymentModel = {
    getMethodsPayments,
    getMethodsPay,
    createMethodsPay,
    updateMethodsPay,
    deleteMethodsPay
}