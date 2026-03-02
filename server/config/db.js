const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false
    }
);

// We need to create the database if it doesn't exist.
// A typical pattern with Sequelize is to connect without db name first to create it,
// but for simplicity we'll assume the db exists or we will create it via a script.

module.exports = sequelize;
