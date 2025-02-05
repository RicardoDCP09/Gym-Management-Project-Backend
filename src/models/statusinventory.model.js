import { db } from '../database/db.js '

const getItems = async () => {
    const query = {
        text: `SELECT * FROM Gym_management.status_inventory`
    }
    const { rows } = await db.query(query);
    return rows;
}

const getItem = async ({ id }) => {
    const query = {
        text: `SELECT * FROM Gym_management.status_inventory WHERE id = $1`,
        values: [id]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const createItem = async ({ status }) => {
    const query = {
        text: `INSERT INTO Gym_management.status_inventory
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

const updateItem = async (id, { status }) => {
    const query = {
        text: `UPDATE Gym_management.status_inventory
        SET status=$1
        WHERE id= $2 RETURNING *`,
        values: [
            status, id
        ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const deleteItem = async ({ id }) => {
    const query = {
        text: `DELETE FROM Gym_management.status_inventory WHERE id = $1 RETURNING * `, values: [id]
    }
    const { rows } = await db.query(query);
    return rows;
}



export const statusInventoryModel = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
}