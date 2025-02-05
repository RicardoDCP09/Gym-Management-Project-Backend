import { db } from '../database/db.js '

const getUserRoles = async () => {
    const query = {
        text: `SELECT * FROM Gym_management.user_roles`
    }
    const { rows } = await db.query(query);
    return rows;
}

const getUserRole = async ({ id }) => {
    const query = {
        text: `SELECT * FROM Gym_management.user_roles WHERE id= $1`,
        values: [id]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const createUserRole = async ({ user_id, role_id }) => {
    const query = {
        text: `INSERT INTO Gym_management.user_roles
        (name_role ) 
        VALUES ($1) 
        RETURNING *
        `,
        values:
            [
                user_id, role_id
            ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const updateUserRole = async (id, { user_id, role_id }) => {
    const query = {
        text: `UPDATE Gym_management.user_roles
        SET  user_id=$1, role_id=$2 
        WHERE id= $3 RETURNING *`,
        values: [
            user_id, role_id, id
        ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const deleteUserRole = async ({ id }) => {
    const query = {
        text: `DELETE FROM Gym_management.user_roles WHERE id = $1 RETURNING * `, values: [id]
    }
    const { rows } = await db.query(query);
    return rows;
}



export const userRolesModel = {
    getUserRoles,
    getUserRole,
    createUserRole,
    updateUserRole,
    deleteUserRole
}