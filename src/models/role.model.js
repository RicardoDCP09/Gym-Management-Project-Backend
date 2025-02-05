import { db } from '../database/db.js '

const getRoles = async () => {
    const query = {
        text: `SELECT * FROM Gym_management.roles`
    }
    const { rows } = await db.query(query);
    return rows;
}

const getRole = async ({ id }) => {
    const query = {
        text: `SELECT * FROM Gym_management.roles WHERE id_role = $1`,
        values: [id]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const createRole = async ({ name_role }) => {
    const query = {
        text: `INSERT INTO Gym_management.roles
        (name_role ) 
        VALUES ($1) 
        RETURNING *
        `,
        values:
            [
                name_role
            ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const updateRole = async (id, { name_role }) => {
    const query = {
        text: `UPDATE Gym_management.roles
        SET name_role=$1
        WHERE id= $2 RETURNING *`,
        values: [
            name_role, id
        ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const deleteRole = async ({ id }) => {
    const query = {
        text: `DELETE FROM Gym_management.roles WHERE id_role = $1 RETURNING * `, values: [id]
    }
    const { rows } = await db.query(query);
    return rows;
}



export const rolesModel = {
    getRoles,
    getRole,
    createRole,
    updateRole,
    deleteRole
}