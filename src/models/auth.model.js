import { db } from '../database/db.js'


const register = async ({ name, lastname, email, password, phone, fechaNac, registerdate, typeMembership, role }) => {
    const query = {
        text: `INSERT INTO Gym_management.users (name, lastname, email, password, phone, fechaNac, registerdate, typeMembership, role) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) 
        RETURNING *
        `,
        values:
            [
                name, lastname, email, password, phone, fechaNac, registerdate, typeMembership, role
            ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}


const findOneByEmail = async (email) => {
    const query = {
        text: `SELECT * FROM Gym_management.users WHERE email = $1`,
        values: [email]
    }
    const { rows } = await db.query(query);
    return rows[0];
}
export const authModel = {
    register,
    findOneByEmail,
}
