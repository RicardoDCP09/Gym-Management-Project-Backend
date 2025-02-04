import { db } from '../database/db.js '

const getReports = async () => {
    const query = {
        text: `SELECT * FROM Gym_management.reports`
    }
    const { rows } = await db.query(query);
    return rows;
}

const getReport = async ({ id }) => {
    const query = {
        text: `SELECT * FROM Gym_management.reports WHERE user_id = $1`,
        values: [id]
    }
    const { rows } = await db.query(query);
    return rows;
}

const createReport = async ({ type, user_id, description }) => {
    const query = {
        text: `INSERT INTO Gym_management.reports
        (type, user_id, description ) 
        SELECT $1,$2,$3
        WHERE EXISTS (SELECT 1 FROM Gym_management.report_type WHERE id = $1)
        RETURNING *
        `,
        values:
            [
                type, user_id, description
            ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const updateReport = async (id, { type, user_id, description }) => {
    const query = {
        text: `UPDATE Gym_management.reports
        SET type=$1, user_id=$2, description=$3 
        WHERE id_report= $4 RETURNING *`,
        values: [
            type, user_id, description, id
        ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const deleteReport = async ({ id }) => {
    const query = {
        text: `DELETE FROM Gym_management.reports WHERE id_report = $1 RETURNING * `, values: [id]
    }
    const { rows } = await db.query(query);
    return rows;
}



export const reportsModel = {
    getReports,
    getReport,
    createReport,
    updateReport,
    deleteReport
}