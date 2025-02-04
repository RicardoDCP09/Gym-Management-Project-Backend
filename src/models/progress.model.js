import { db } from '../database/db.js '


const getAllProgress = async () => {
    const query = {
        text: `SELECT * FROM Gym_management.progress`
    }
    const { rows } = await db.query(query);
    return rows;
}

const getProgress = async ({ id }) => {
    const query = {
        text: `SELECT * FROM gym_management.progress WHERE user_id = $1`,
        values: [id]
    }
    const { rows } = await db.query(query);
    return rows;
}

const createProgress = async ({ user_id, date, weight, bodyfat, musclegain, benchpress, squats, deadlift }) => {
    const query = {
        text: `INSERT INTO Gym_management.progress 
        (user_id,date,weight,bodyfat,musclegain,benchpress,squats,deadlift )
        SELECT $1, $2, $3, $4, $5, $6, $7, $8
        WHERE EXISTS (SELECT 1 FROM Gym_management.users WHERE id_user = $1) 
        RETURNING *
        `,
        values:
            [
                user_id, date, weight, bodyfat, musclegain, benchpress, squats, deadlift
            ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const updateProgress = async (id, { user_id, date, weight, bodyfat, musclegain, benchpress, squats, deadlift }) => {
    const query = {
        text: `UPDATE Gym_management.progress 
        SET user_id=$1, date=$2, weight=$3, bodyfat=$4, musclegain=$5, benchpress=$6, squats=$7, deadlift=$8 
        WHERE id_progress= $9 AND EXISTS (SELECT 1 FROM Gym_management.users WHERE id_user = $1)  RETURNING *`,
        values: [
            user_id, date, weight, bodyfat, musclegain, benchpress, squats, deadlift, id
        ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const deleteProgress = async ({ id }) => {
    const query = {
        text: `DELETE FROM Gym_management.progress WHERE id_progress = $1 RETURNING * `, values: [id]
    }
    const { rows } = await db.query(query);
    return rows;
}



export const progressModel = {
    getAllProgress,
    getProgress,
    createProgress,
    updateProgress,
    deleteProgress
}