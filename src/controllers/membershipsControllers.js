import { pool } from "../db.js";

export const getTypeMemberships = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM Gym_management.type_memberships");
        res.json(rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining Types" })
    }
}

export const getTypeMembership = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query("SELECT * FROM Gym_management.type_memberships WHERE id = $1", [id]);
        res.json(rows[0])
    } catch {
        if (rows.length === 0) {
            return res.status(404).json({ message: "Type not found" })
        }
        console.log(error)
        return res.status(500).json({ message: "Error obtaining Type" })
    }
}

export const createTypeMembership = async (req, res) => {
    try {
        const data = req.body;
        const { rows } = await pool.query("INSERT INTO Gym_management.type_memberships (name,duration,price ) VALUES ($1,$2,$3) RETURNING *",
            [
                data.name,
                data.duration,
                data.price,
            ]
        );
        return res.json(rows[0])
    } catch (error) {
        console.log(error)

        if (error.code === "23505") {
            return res.status(409).json({ message: "That Memberships already exists" })
        }
        return res.status(500).json({ message: "Error creating Membership" })
    }
}


export const updateTypeMembership = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const { rows } = await pool.query("UPDATE Gym_management.type_memberships SET name= $1,duration= $2,price= $3 WHERE id= $4 RETURNING *",
            [
                data.name,
                data.duration,
                data.price,
                id
            ]
        );
        return res.json(rows[0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating Type" });
    }
};

export const deleteTypeMembership = async (req, res) => {
    try {
        const { id } = req.params;
        const { rowCount } = await pool.query(
            "DELETE FROM Gym_management.type_memberships WHERE id = $1 RETURNING *", [id]);
        if (rowCount === 0) {
            return res.status(404).json({ message: "Type not found" })
        }
        return res.sendStatus(204);
    } catch {
        return res.status(500).json({ message: "Error Deleting Type" })
    }
}