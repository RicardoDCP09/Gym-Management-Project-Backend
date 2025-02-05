import { db } from '../database/db.js '

const getClasses = async () => {
    const query = {
        text: `SELECT * FROM Gym_management.status_class`
    }
    const { rows } = await db.query(query);
    return rows;
}

const getClass = async ({ id }) => {
    const query = {
        text: `SELECT * FROM Gym_management.status_class WHERE id = $1`,
        values: [id]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const createClass = async ({ status }) => {
    const query = {
        text: `INSERT INTO Gym_management.status_class
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

const updateClass = async (id, { status }) => {
    const query = {
        text: `UPDATE Gym_management.status_class
        SET status=$1
        WHERE id= $2 RETURNING *`,
        values: [
            status, id
        ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const deleteClass = async ({ id }) => {
    const query = {
        text: `DELETE FROM Gym_management.status_class WHERE id = $1 RETURNING * `, values: [id]
    }
    const { rows } = await db.query(query);
    return rows;
}



export const statusClassModel = {
    getClasses,
    getClass,
    createClass,
    updateClass,
    deleteClass
}