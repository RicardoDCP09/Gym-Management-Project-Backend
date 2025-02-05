import { db } from '../database/db.js';


const storeToken = async (user_id, token, expiresAt) => {
    const query = {
        text: `INSERT INTO Gym_management.password_recovery(user_id, token, expires_at) VALUES($1, $2, $3) RETURNING *`,
        values: [user_id, token, expiresAt]
    };
    const { rows } = await db.query(query);
    return rows[0];
};


const findToken = async (token) => {
    const query = {
        text: `SELECT * FROM Gym_management.password_recovery WHERE token = $1 AND expires_at > CURRENT_TIMESTAMP`,
        values: [token]
    };
    const { rows } = await db.query(query);
    return rows[0];
};


const deleteToken = async (token) => {
    const query = {
        text: `DELETE FROM Gym_management.password_recovery WHERE token = $1`,
        values: [token]
    };
    const { rows } = await db.query(query);
    return rows;
};

const updatePassword = async (id, newPassword) => {
    const query = {
        text: ` UPDATE Gym_management.users SET password = $1 WHERE id_user = $2 RETURNING *`,
        values: [newPassword, id]
    };
    const { rows } = await db.query(query);
    return rows[0];
};



const findUserbyData = async (email) => {
    const query = {
        text: `SELECT * FROM Gym_management.users WHERE email = $1`,
        values: [email]
    };
    const { rows } = await db.query(query);
    return rows[0];
}


export const passwordResetTokenModel = {
    storeToken,
    findToken,
    deleteToken,
    findUserbyData,
    updatePassword
};