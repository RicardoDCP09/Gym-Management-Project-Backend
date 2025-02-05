import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/orm.js';
import Users from './userorm.model.js';

class Progress extends Model { }

Progress.init({
    id_progress: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: 'id_user',
        },
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    weight: {
        type: DataTypes.NUMERIC(5, 2),
    },
    bodyfat: {
        type: DataTypes.NUMERIC(5, 2),
    },
    musclegain: {
        type: DataTypes.NUMERIC(5, 2),
    },
    benchpress: {
        type: DataTypes.NUMERIC(5, 2),
    },
    squats: {
        type: DataTypes.NUMERIC(5, 2),
    },
    deadlift: {
        type: DataTypes.NUMERIC(5, 2),
    },
}, {
    sequelize,
    modelName: 'Progress',
    tableName: 'progress',
    schema: 'gym_management',
    timestamps: false,

});

export default Progress;