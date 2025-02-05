import { Sequelize } from 'sequelize';
import { DB_USER, DB_HOST, DB_PASSWORD, DB_DATABASE, DB_PORT } from '../config.js';

// Configuración de la conexión
const sequelize = new Sequelize({
    database: DB_DATABASE,
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: false,
});

// Probar la conexión
sequelize
    .authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida correctamente.');
    })
    .catch((err) => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

export default sequelize; 