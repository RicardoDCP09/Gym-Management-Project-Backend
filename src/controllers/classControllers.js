import { pool } from "../db.js";

export const getClasses = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM Gym_management.classes");
        res.json(rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining the Classses" })
    }
}

export const getClass = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query("SELECT * FROM Gym_management.classes WHERE id_class = $1", [id]);
        res.json(rows[0])
    } catch {
        if (rows.length === 0) {
            return res.status(404).json({ message: "Class not found" })
        }
        console.log(error)
        return res.status(500).json({ message: "Error obtaining Class" })
    }
}


export const createClasses = async (req, res) => {
    try {
        const data = req.body;

        const { rows: coachRows } = await pool.query(
            "SELECT * FROM Gym_management.users WHERE id_user = $1 AND role = 2",
            [data.coach_id]
        );

        if (coachRows.length === 0) {
            return res.status(404).json({ message: "Error creating Class: Coach doesn't exist or is not authorized" });
        }
        const { rows } = await pool.query("INSERT INTO Gym_management.classes (name,capacity,coach_id,class_time,status ) VALUES ($1,$2,$3,$4,$5) RETURNING *",
            [
                data.name,
                data.capacity,
                data.coach_id,
                data.class_time,
                data.status
            ]
        );
        return res.json(rows[0])
    } catch (error) {
        console.log(error)

        if (error.code === "23505") {
            return res.status(409).json({ message: "This Class already exists" })
        }
        return res.status(500).json({ message: "Error creating Class" })
    }
}


export const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const { rows: coachRows } = await pool.query(
            "SELECT * FROM Gym_management.users WHERE id_user = $1 AND role = 2",
            [data.coach_id]
        );

        if (coachRows.length === 0) {
            return res.status(404).json({ message: "Error Updating Class: Coach doesn't exist or is not authorized" });
        }
        const { rows } = await pool.query("UPDATE Gym_management.classes SET name= $1,capacity= $2,coach_id= $3,class_time= $4,status= $5 WHERE id_class= $6 RETURNING *",
            [
                data.name,
                data.capacity,
                data.coach_id,
                data.class_time,
                data.status,
                id
            ]
        );
        return res.json(rows[0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating Class" });
    }
};

export const deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        const { rowCount } = await pool.query(
            "DELETE FROM Gym_management.classes WHERE id_class = $1 RETURNING *", [id]);
        if (rowCount === 0) {
            return res.status(404).json({ message: "Class not found" })
        }
        return res.sendStatus(204);
    } catch {
        return res.status(500).json({ message: "Error Deleting Class" })
    }
}