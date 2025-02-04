import { db } from '../database/db.js';

const getPayments = async () => {
    const query = {
        text: `SELECT * FROM Gym_management.payments`
    };
    const { rows } = await db.query(query);
    return rows;
};

const getPayment = async ({ id }) => {
    const query = {
        text: `SELECT * FROM Gym_management.payments WHERE id_payment = $1`,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const createPayment = async ({ user_id, amount, payment_method, status, daypayment }) => {
    const query = {
        text: `INSERT INTO Gym_management.payments (user_id, amount, payment_method, status, daypayment)
                SELECT $1, $2, $3, $4, $5
                WHERE EXISTS (SELECT 1 FROM Gym_management.users WHERE id_user = $1) 
                AND EXISTS (SELECT 1 FROM Gym_management.pay_methods WHERE id= = $3)
                AND EXISTS (SELECT 1 FROM Gym_management.status_payment WHERE id = $4)
                RETURNING *`,
        values: [user_id, amount, payment_method, status, daypayment]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const updatePayment = async (id, { user_id, amount, payment_method, status, daypayment }) => {
    const query = {
        text: `UPDATE Gym_management.payments 
                SET user_id = $1, amount = $2, payment_method = $3, status = $4, daypayment = $5 
                WHERE id_payment = $6 
                AND EXISTS (SELECT 1 FROM Gym_management.users WHERE id_user = $1) 
                AND EXISTS (SELECT 1 FROM Gym_management.pay_methods WHERE id= = $3)
                AND EXISTS (SELECT 1 FROM Gym_management.status_payment WHERE id = $4)
                RETURNING *`,
        values: [user_id, amount, payment_method, status, daypayment, id]
    };

    const { rows } = await db.query(query);
    if (rows.length === 0) throw new Error("La rutina no es válida o no existe.");
    return rows[0];
};

const deletePayment = async ({ id }) => {
    const query = {
        text: `DELETE FROM Gym_management.payments WHERE id_payment = $1 RETURNING *`,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows;
};

export const paymentModel = {
    getPayments,
    getPayment,
    createPayment,
    updatePayment,
    deletePayment

};