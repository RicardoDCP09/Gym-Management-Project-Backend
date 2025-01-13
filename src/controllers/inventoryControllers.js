import { pool } from "../db.js";

export const getInvetory = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM Gym_management.inventory");
        res.json(rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error obtaining the inventory" })
    }
}

export const getItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query("SELECT * FROM Gym_management.inventory WHERE id_inventory = $1", [id]);
        res.json(rows[0])
    } catch {
        if (rows.length === 0) {
            return res.status(404).json({ message: "Item not found" })
        }
        console.log(error)
        return res.status(500).json({ message: "Error obtaining item" })
    }
}

export const createItems = async (req, res) => {
    try {
        const data = req.body;
        const { rows } = await pool.query("INSERT INTO Gym_management.inventory (equipment_name,quantity,location,status,day_use ) VALUES ($1,$2,$3,$4,$5) RETURNING *",
            [
                data.equipment_name,
                data.quantity,
                data.location,
                data.status,
                data.day_use
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

export const updateInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const { rows } = await pool.query("UPDATE Gym_management.inventory SET equipment_name= $1 ,quantity= $2,location= $3,status= $4,day_use= $5 WHERE id_inventory = $6 RETURNING *",
            [
                data.equipment_name,
                data.quantity,
                data.location,
                data.status,
                data.day_use,
                id
            ]
        );
        return res.json(rows[0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error updating user" });
    }
};

export const deleteInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const { rowCount } = await pool.query(
            "DELETE FROM Gym_management.inventory WHERE id_inventory = $1 RETURNING *", [id]);
        if (rowCount === 0) {
            return res.status(404).json({ message: "User not found" })
        }
        return res.sendStatus(204);
    } catch {
        return res.status(500).json({ message: "Error Deleting user" })
    }
}



