import { db } from '../database/db.js '

const getInvetory = async () => {
    const query = {
        text: `SELECT * FROM Gym_management.inventory`
    }
    const { rows } = await db.query(query);
    return rows;
}

const getItem = async ({ id }) => {
    const query = {
        text: `SELECT * FROM Gym_management.inventory WHERE id_inventory = $1`,
        values: [id]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const createItem = async ({ equipment_name, quantity, location, status, day_use }) => {
    const query = {
        text: `INSERT INTO Gym_management.inventory 
        (equipment_name,quantity,location,status,day_use ) 
        VALUES ($1,$2,$3,$4,$5) 
        RETURNING *
        `,
        values:
            [
                equipment_name, quantity, location, status, day_use
            ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const updateInventory = async (id, { equipment_name, quantity, location, status, day_use }) => {
    const query = {
        text: `UPDATE Gym_management.inventory 
        SET equipment_name= $1 ,quantity= $2,location= $3,status= $4,day_use= $5
        WHERE id_inventory = $6 
        RETURNING *`,
        values: [
            equipment_name, quantity, location, status, day_use, id
        ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const deleteInventory = async ({ id }) => {
    const query = {
        text: `DELETE FROM Gym_management.inventory WHERE id_inventory = $1 RETURNING *`, values: [id]
    }
    const { rowCount } = await db.query(query);
    return rowCount;
}


export const inventoryModel = {
    getInvetory,
    getItem,
    createItem,
    updateInventory,
    deleteInventory,
}