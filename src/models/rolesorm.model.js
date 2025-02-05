import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/orm.js';

class Role extends Model { }

Role.init({
    id_role: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name_role: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    schema: 'gym_management',
    timestamps: false, // Si no quieres que Sequelize maneje createdAt y updatedAt
});

export default Role;