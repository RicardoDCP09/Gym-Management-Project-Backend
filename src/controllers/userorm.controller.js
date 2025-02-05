
import User from '../models/userorm.model.js';
import Progress from '../models/progressorm.model.js';

export async function createUser(req, res) {
    const { name, lastname, email, password, phone, fechanac, typemembership, role } = req.body;

    try {
        const newUser = await User.create({
            name,
            lastname,
            email,
            password,
            phone,
            fechanac,
            typemembership,
            role
        });
        return res.status(201).json(newUser);
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        return res.status(500).json({ error: 'Error al crear el usuario' });
    }
}

export async function updateUser(req, res) {
    const { id } = req.params;
    const { name, lastname, email, password, phone, fechanac, typemembership, role } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Actualizar el usuario
        await user.update({
            name,
            lastname,
            email,
            password,
            phone,
            fechanac,
            typemembership,
            role
        });

        return res.json(user);
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        return res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
}

export async function deleteUser(req, res) {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await user.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        return res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
}

//Joins

export async function getUserProgress(req, res) {
    try {
        const usersWithProgress = await User.findAll({
            include: [{
                model: Progress,
                required: true
            }]
        });
        return res.json(usersWithProgress);
    } catch (error) {
        console.error("Error al obtener usuarios con progreso:", error);
        return res.status(500).json({ error: 'Error al obtener usuarios con progreso' });
    }
}

export async function getUsersWithProgress(req, res) {
    try {
        const usersWithProgress = await User.findAll({
            include: [{
                model: Progress,
                required: false
            }]
        });
        return res.json(usersWithProgress);
    } catch (error) {
        console.error("Error al obtener usuarios con progreso:", error);
        return res.status(500).json({ error: 'Error al obtener usuarios con progreso' });
    }
}