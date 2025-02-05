import app from "./app.js";
import { PORT } from "./config.js";
import Users from './models/userorm.model.js';
import Progress from './models/progressorm.model.js';
import Role from './models/rolesorm.model.js';
import sequelize from './database/orm.js';

Users.hasMany(Progress, { foreignKey: 'user_id' });
Progress.belongsTo(Users, { foreignKey: 'user_id' });
Users.belongsTo(Role, { foreignKey: 'role', as: 'roleDetails' });
Role.hasMany(Users, { foreignKey: 'role' });

app.listen(PORT);

console.log("Server on port: ", PORT);




sequelize.sync({ force: false }) // Cambia a true si deseas reiniciar la base de datos
    .then(() => {
        console.log("Base de datos sincronizada");
    })
    .catch((error) => {
        console.error("Error al sincronizar la base de datos:", error);
    });