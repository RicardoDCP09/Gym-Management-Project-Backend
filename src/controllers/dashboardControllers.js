import { dataDash } from '../models/dashboard.model.js';

export const getDashboardStats = async (req, res) => {
    try {
        const userCountByRole = await dataDash.totalUserRole();
        const totalUsers = await dataDash.getTotalUsers();

        res.status(200).json({
            userCountByRole,
            totalUsers,
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ message: 'Error fetching statistics' });
    }
};