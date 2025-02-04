import { db } from '../database/db.js';

const getExercises = async () => {
    const query = {
        text: `SELECT * FROM Gym_management.exercises`
    };
    const { rows } = await db.query(query);
    return rows;
};

const getExercise = async ({ id }) => {
    const query = {
        text: `SELECT * FROM Gym_management.exercises WHERE id_exercise = $1`,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const createExercise = async ({ name, description, type }) => {
    const query = {
        text: `INSERT INTO Gym_management.exercises (name, description, type)
                SELECT $1, $2, $3
                WHERE EXISTS (SELECT 1 FROM Gym_management.type_exercises WHERE id_texercises = $3)
               RETURNING *`,
        values: [name, description, type]
    };
    const { rows } = await db.query(query);
    if (rows.length === 0) throw new Error("El tipo de ejercicio no es válido.");
    return rows[0];
};

const updateExercise = async (id, { name, description, type }) => {
    const query = {
        text: `UPDATE Gym_management.exercises 
                SET name = $1, description = $2, type = $3 
                WHERE id_exercise = $4 
                AND EXISTS (SELECT 1 FROM Gym_management.type_exercises WHERE id_texercises = $3)
               RETURNING *`,
        values: [name, description, type, id]
    };
    const { rows } = await db.query(query);
    if (rows.length === 0) throw new Error("El tipo de ejercicio no es válido o el ejercicio no existe.");
    return rows[0];
};

const deleteExercise = async ({ id }) => {
    const query = {
        text: `DELETE FROM Gym_management.exercises WHERE id_exercise = $1 RETURNING *`,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows;
};

export const exercisesModel = {
    getExercises,
    getExercise,
    createExercise,
    updateExercise,
    deleteExercise
};
