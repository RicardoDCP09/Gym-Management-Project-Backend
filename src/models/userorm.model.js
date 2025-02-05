import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/orm.js';
import Role from './rolesorm.model.js';

class User extends Model { }

User.init({
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(17),
    },
    fechanac: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    registerdate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    typemembership: {
        type: DataTypes.INTEGER,
    },
    role: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id_role',
        },
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    update_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    schema: 'gym_management',
    timestamps: false,

});

export default User;