import { db } from '../database/db.js '

const getStaffs = async () => {
    const query = {
        text: `SELECT * FROM Gym_management.users WHERE (role =1 OR role=2)`
    }
    const { rows } = await db.query(query);
    return rows;
}

const getStaff = async ({ id }) => {
    const query = {
        text: `SELECT * FROM Gym_management.users WHERE id_user = $1 AND (role = 1 OR role = 2)`,
        values: [id]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const createStaff = async ({ name, lastname, email, password, phone, fechaNac, registerdate, typeMembership, role }) => {
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

const updateStaff = async (id, { name, lastname, email, password, phone, fechaNac, registerdate, typeMembership, role }) => {
    const query = {
        text: `UPDATE Gym_management.users 
        SET name= $1, lastname=$2, email= $3, password= $4, phone= $5, fechaNac= $6, registerdate= $7, typemembership= $8, role= $9 
        WHERE id_user = $10 AND (role = 1 OR role = 2 )
        RETURNING *`,
        values: [
            name, lastname, email, password, phone, fechaNac, registerdate, typeMembership, role, id
        ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const deleteStaff = async ({ id }) => {
    const query = {
        text: `DELETE FROM Gym_management.users WHERE id_user = $1 AND (role = 1 or role = 2 )RETURNING *`,
        values: [id],
    }
    const { rows } = await db.query(query);
    return rows;
}


export const staffModel = {
    getStaffs,
    getStaff,
    createStaff,
    updateStaff,
    deleteStaff
}
