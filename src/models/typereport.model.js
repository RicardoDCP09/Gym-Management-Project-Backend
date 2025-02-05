import { db } from '../database/db.js '

const getReportTypes = async () => {
    const query = {
        text: `SELECT * FROM Gym_management.report_type`
    }
    const { rows } = await db.query(query);
    return rows;
}

const getReportType = async ({ id }) => {
    const query = {
        text: `SELECT * FROM Gym_management.report_type WHERE id = $1`,
        values: [id]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const createReportType = async ({ name }) => {
    const query = {
        text: `INSERT INTO Gym_management.report_type
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

const updateReportType = async (id, { name }) => {
    const query = {
        text: `UPDATE Gym_management.report_type
        SET name=$1
        WHERE id= $2 RETURNING *`,
        values: [
            name, id
        ]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

const deleteReportType = async ({ id }) => {
    const query = {
        text: `DELETE FROM Gym_management.report_type WHERE id = $1 RETURNING * `, values: [id]
    }
    const { rows } = await db.query(query);
    return rows;
}



export const reportTypeModel = {
    getReportTypes,
    getReportType,
    createReportType,
    updateReportType,
    deleteReportType
}