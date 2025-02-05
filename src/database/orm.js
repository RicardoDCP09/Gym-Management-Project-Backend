import { Sequelize } from 'sequelize';
import { DB_DATABASE, DB_USER, DB_PASSWORD } from '../config.js'

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: '127.0.0.1',
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
