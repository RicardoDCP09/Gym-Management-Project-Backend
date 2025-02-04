import { db } from '../database/db.js';

const getRoutines = async () => {
    const query = {
        text: `SELECT * FROM Gym_management.routines`
    };
    const { rows } = await db.query(query);
    return rows;
};

const getRoutine = async ({ id }) => {
    const query = {
        text: `SELECT * FROM Gym_management.routines WHERE id_routine = $1`,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const createRoutine = async ({ name, difficulty, objective, coach_id, exercise_id }) => {
    const query = {
        text: `INSERT INTO Gym_management.routines (name, difficulty, objective, coach_id, exercise_id)
                SELECT $1, $2, $3, $4, $5
                WHERE EXISTS (SELECT 1 FROM Gym_management.status_difficulty WHERE id = $2) 
                AND EXISTS (SELECT 1 FROM Gym_management.users WHERE id_user = $4 AND role = 2)
                AND EXISTS (SELECT 1 FROM Gym_management.exercises WHERE id_exercise = $5)
                RETURNING *`,
        values: [name, difficulty, objective, coach_id, exercise_id]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const updateRoutine = async (id, { name, difficulty, objective, coach_id, exercise_id }) => {
    const query = {
        text: `UPDATE Gym_management.routines 
                SET name = $1, difficulty = $2, objective = $3, coach_id = $4, exercise_id = $5 
                WHERE id_routine = $6 
                AND EXISTS (SELECT 1 FROM Gym_management.status_difficulty WHERE id = $2) 
                AND EXISTS (SELECT 1 FROM Gym_management.exercises WHERE id_exercise = $5)
                AND EXISTS (SELECT 1 FROM Gym_management.users WHERE id_user = $4 AND role = 2)
                RETURNING *`,
        values: [name, difficulty, objective, coach_id, exercise_id, id]
    };

    const { rows } = await db.query(query);
    if (rows.length === 0) throw new Error("La rutina no es válida o no existe.");
    return rows[0];
};

const deleteRoutine = async ({ id }) => {
    const query = {
        text: `DELETE FROM Gym_management.routines WHERE id_routine = $1 RETURNING *`,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows;
};

export const routineModel = {
    getRoutines,
    getRoutine,
    createRoutine,
    updateRoutine,
    deleteRoutine
};