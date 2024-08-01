import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';



dotenv.config();
const DB_PASS = process.env.DB_PASSWORD;

export const sequelize = new Sequelize({
    dialect: 'postgres',
    username: "filip_povidernyi",
    database: "db_contacts_gjuf",
    password: "82rfF0iHMVvWfUbQx6uvKZGyT1ti60X6",
    host: "dpg-cqjmsf5ds78s73f2bgug-a.frankfurt-postgres.render.com",
    port: "5432",
    protocol: 'postgres',
    dialectOptions: {
        ssl: true,
    }
});

export default sequelize;

