import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';



dotenv.config();
const DB_PASS = process.env.DB_PASSWORD;

export const sequelize = new Sequelize(`postgresql://filip_povidernyi:${DB_PASS}@dpg-cqjmsf5ds78s73f2bgug-a.frankfurt-postgres.render.com/db_contacts_gjuf`, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

async function foo() {
  try {
    await sequelize.authenticate();
    
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  };
};

foo();