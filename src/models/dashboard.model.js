
import { db } from '../database/db.js '


const totalUserRole = async () => {
    const query = `
        SELECT role AS role_name, COUNT(id_user) AS user_count
        FROM Gym_management.users
        GROUP BY role;
    `;

    const { rows } = await db.query(query);
    return rows;
};
const getTotalUsers = async () => {
    const query = `SELECT COUNT(*) AS total_users FROM Gym_management.users;`;
    const { rows } = await db.query(query);
    return rows[0].total_users;
};



// Exporta las funciones
export const dataDash = {
    totalUserRole,
    getTotalUsers,
};