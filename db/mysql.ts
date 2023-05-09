
import { Sequelize } from 'sequelize';


const { DB_NAME = '', DB_USER = '', DB_PASS = '', DB_HOST = '', DB_PORT = 3306 } = process.env;

const mysql = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
    port: Number(DB_PORT)
});


export default mysql;