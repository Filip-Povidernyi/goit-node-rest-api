import { Sequelize } from 'sequelize';



const {
    DB_DIALECT,
    DB_USERNAME,
    DB_DATABASE,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_PROTOCOL,
} = process.env;

export const sequelize = new Sequelize({
    dialect: DB_DIALECT,
    username: DB_USERNAME,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    protocol: DB_PROTOCOL,
    dialectOptions: {
        ssl: true,
    }
});



export default sequelize;

