import { Sequelize } from "sequelize";
const db = new Sequelize('infinite_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

db.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

export default db;
