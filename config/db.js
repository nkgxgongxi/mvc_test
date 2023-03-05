//js

/* 
 * This file is based on my own refactor, I am trying to make the DB connection standalone, 
 * and then models and controller can refer to it
 */
const mysql = require('mysql2');

const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});

module.exports = pool.promise();