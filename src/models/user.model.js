import { db } from '../database/db.js '

const getUsers = async () => {
    const query = {
        text: `SELECT * FROM Gym_management.users`
    }
    const { rows } = await db.query(query);
    return rows;
}

const getUser = async ({ id }) => {
    const query = {
        text: `SELECT * FROM Gym_management.users WHERE id_user = $1`,
        values: [id]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const createUser = async ({ name, lastname, email, password, phone, fechaNac, registerdate, typeMembership, role }) => {
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

const updateUser = async (id, { name, lastname, email, password, phone, fechaNac, registerdate, typeMembership, role }) => {
    const query = {
        text: `UPDATE Gym_management.users 
        SET name= $1, lastname=$2, email= $3, password= $4, phone= $5, fechaNac= $6, registerdate= $7, typemembership= $8, role= $9 WHERE id_user = $10 
        RETURNING *`,
        values: [
            name, lastname, email, password, phone, fechaNac, registerdate, typeMembership, role, id
        ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const deleteUser = async ({ id }) => {
    const query = {
        text: `DELETE FROM Gym_management.users WHERE id_user = $1`, values: [id]
    }
    const { rowCount } = await db.query(query);
    return rowCount;
}


export const userModel = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}
