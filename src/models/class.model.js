import { db } from '../database/db.js '

const getClasses = async () => {
    const query = {
        text: `SELECT * FROM Gym_management.classes`,
    }
    const { rows } = await db.query(query);
    return rows;
}

const getClass = async ({ id }) => {
    const query = {
        text: `SELECT * FROM Gym_management.classes WHERE id_class = $1`,
        values: [id],
    }
    const { rows } = await db.query(query);
    return rows;
}

const createClass = async ({ name, capacity, coach_id, class_time, status }) => {
    const query = {

        text: `INSERT INTO Gym_management.classes 
        (name,capacity,coach_id,class_time,status ) 
        VALUES ($1,$2,$3,$4,$5) 
        RETURNING *`,
        values: [name, capacity, coach_id, class_time, status]
    }
    const { rows } = await db.query(query);
    return rows;
}

const updateClass = async (id, { name, capacity, coach_id, class_time, status }) => {
    const query = {
        text: `UPDATE Gym_management.classes SET name = $1, capacity = $2, coach_id = $3, class_time = $4, status = $5
         WHERE id_class = $6 RETURNING *`,
        values: [name, capacity, coach_id, class_time, status, id],
    }
    const { rows } = await db.query(query);
    return rows;
}

const deleteClass = async ({ id }) => {
    const query = {
        text: `DELETE FROM Gym_management.classes WHERE id_class = $1 RETURNING *`,
        values: [id],
    }
    const { rows } = await db.query(query);
    return rows;
}

const verifyCoach = async (id) => {
    const query = {
        text: `SELECT * FROM Gym_management.users WHERE id_user = $1 AND role = 2`,
        values: [id]
    }
    const { rows: coachRows } = await db.query(query)
    return coachRows.length > 0;
};

export const classModel = {
    getClasses,
    getClass,
    createClass,
    updateClass,
    deleteClass,
    verifyCoach
}
