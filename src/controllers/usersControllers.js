import { pool } from "../db.js";


export const getUsers = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM Gym_management.users");
        res.json(rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining users" })
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query("SELECT * FROM Gym_management.users WHERE id_user = $1", [id]);
        res.json(rows[0])
    } catch {
        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" })
        }
        console.log(error)
        return res.status(500).json({ message: "Error obtaining user" })
    }
}

export const createUsers = async (req, res) => {
    try {
        const data = req.body;
        const { rows } = await pool.query("INSERT INTO Gym_management.users (name, lastname, email, password, phone, fechaNac, registerdate, typeMembership, role) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
            [
                data.name,
                data.lastname,
                data.email,
                data.password,
                data.phone,
                data.fechaNac,
                data.registerdate,
                data.typeMembership,
                data.role
            ]
        );
        return res.json(rows[0])
    } catch (error) {
        console.log(error)

        if (error.code === "23505") {
            return res.status(409).json({ message: "Email already exists" })
        }
        return res.status(500).json({ message: "Error creating user" })
    }
}

export const updateUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const { rows } = await pool.query("UPDATE Gym_management.users SET name= $1, lastname=$2, email= $3, password= $4, phone= $5, fechaNac= $6, registerdate= $7, typemembership= $8, role= $9 WHERE id_user = $10 RETURNING *",
            [
                data.name,
                data.lastname,
                data.email,
                data.password,
                data.phone,
                data.fechaNac,
                data.registerdate,
                data.typemembership,
                data.role,
                id
            ]
        );
        return res.json(rows[0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating user" });
    }
};

export const deleteUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const { rowCount } = await pool.query(
            "DELETE FROM Gym_management.users WHERE id_user = $1 RETURNING *", [id]);
        if (rowCount === 0) {
            return res.status(404).json({ message: "User not found" })
        }
        return res.sendStatus(204);
    } catch {
        return res.status(500).json({ message: "Error Deleting user" })
    }
}