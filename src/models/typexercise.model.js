import { db } from '../database/db.js '

const getTypeExercises = async () => {
    const query = {
        text: `SELECT * FROM Gym_management.type_exercises`
    }
    const { rows } = await db.query(query);
    return rows;
}

const getTypeExercise = async ({ id }) => {
    const query = {
        text: `SELECT * FROM Gym_management.type_exercises WHERE id_exercises = $1`,
        values: [id]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const createTypeExercise = async ({ name }) => {
    const query = {
        text: `INSERT INTO Gym_management.type_exercises
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

const updateTypeExercise = async (id, { name }) => {
    const query = {
        text: `UPDATE Gym_management.type_exercises
        SET name=$1
        WHERE id= $2 RETURNING *`,
        values: [
            name, id
        ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const deleteTypeExercise = async ({ id }) => {
    const query = {
        text: `DELETE FROM Gym_management.type_exercises WHERE id_exercises = $1 RETURNING * `, values: [id]
    }
    const { rows } = await db.query(query);
    return rows;
}



export const typeExerciseModel = {
    getTypeExercises,
    getTypeExercise,
    createTypeExercise,
    updateTypeExercise,
    deleteTypeExercise
}