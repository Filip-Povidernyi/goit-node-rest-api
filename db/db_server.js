import { Sequelize } from 'sequelize';


const {DIALECT, USERNAME, DATABASE, PASSWORD, HOST, PORT, PROTOCOL} = process.env;

export const sequelize = new Sequelize({
    dialect: DIALECT,
    username: USERNAME,
    database: DATABASE,
    password: PASSWORD,
    host: HOST,
    port: PORT,
    protocol: PROTOCOL,
    dialectOptions: {
        ssl: true,
    }
});

export default sequelize;

