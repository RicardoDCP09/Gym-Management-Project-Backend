import { db } from '../database/db.js '

const getTypesMemberships = async () => {
    const query = {
        text: `SELECT * FROM Gym_management.type_memberships`
    }
    const { rows } = await db.query(query);
    return rows;
}

const getTypeMembership = async ({ id }) => {
    const query = {
        text: `SELECT * FROM Gym_management.type_memberships WHERE id = $1`,
        values: [id]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const createTypeMemberships = async ({ name, duration, price }) => {
    const query = {
        text: `INSERT INTO Gym_management.type_memberships 
        (name,duration,price ) 
        VALUES ($1,$2,$3) 
        RETURNING *
        `,
        values:
            [
                name, duration, price
            ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const updateTypeMembership = async (id, { name, duration, price }) => {
    const query = {
        text: `UPDATE Gym_management.type_memberships 
        SET name= $1,duration= $2,price= $3 
        WHERE id= $4 RETURNING *`,
        values: [
            name, duration, price, id
        ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const deleteTypeMembership = async ({ id }) => {
    const query = {
        text: `DELETE FROM Gym_management.type_memberships WHERE id = $1 RETURNING * `, values: [id]
    }
    const { rows } = await db.query(query);
    return rows;
}



export const typeMembershipsModel = {
    getTypesMemberships,
    getTypeMembership,
    createTypeMemberships,
    updateTypeMembership,
    deleteTypeMembership
}