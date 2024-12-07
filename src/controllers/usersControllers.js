import { dataBase } from "../db/db.js";

export const getUsers = async (req, res) => {
    const user = dataBase[0].users
    res.json(user);
}

export const getUser = async (req, res) => {
    const { id } = req.params;
    const users = dataBase[0].users;

    const user = users.find(user => user.id == id);

    if (!user) {
        return res.status(404).json({ message: 'User  not found' });
    }
    res.json(user);
}
export const createUsers = async (req, res) => {
    try {
        const data = req.body;
        const users = dataBase[0].users;
        const existingUser = users.find(user => user.email === data.email);

        if (existingUser) {
            return res.status(409).json({ message: 'Error: user already exists' });
        }

        const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;

        const newUser = {
            id: newId,
            name: data.name,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            phone: data.phone,
            fechaNac: data.fechaNac,
            registerDate: data.registerDate,
            typeMembership: data.typeMembership,
            role: data.role
        };

        users.push(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}