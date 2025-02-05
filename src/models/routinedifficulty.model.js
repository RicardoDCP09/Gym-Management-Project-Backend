import { db } from '../database/db.js '

const getDifficulties = async () => {
    const query = {
        text: `SELECT * FROM Gym_management.status_difficulty`
    }
    const { rows } = await db.query(query);
    return rows;
}

const getDifficulty = async ({ id }) => {
    const query = {
        text: `SELECT * FROM Gym_management.status_difficulty WHERE id = $1`,
        values: [id]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const createDifficulty = async ({ name }) => {
    const query = {
        text: `INSERT INTO Gym_management.status_difficulty
        (name ) 
        VALUES ($1) 
        RETURNING *
        `,
        values:
            [
                name
            ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const updateDifficulty = async (id, { name }) => {
    const query = {
        text: `UPDATE Gym_management.status_difficulty
        SET name=$1
        WHERE id= $2 RETURNING *`,
        values: [
            name, id
        ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const deleteDifficulty = async ({ id }) => {
    const query = {
        text: `DELETE FROM Gym_management.status_difficulty WHERE id = $1 RETURNING * `, values: [id]
    }
    const { rows } = await db.query(query);
    return rows;
}



export const difficultyModel = {
    getDifficulties,
    getDifficulty,
    createDifficulty,
    updateDifficulty,
    deleteDifficulty
}