const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: process.env.DIACLECT,
  host: process.env.HOST,
  username: 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  logging: false,
});

module.exports = { db };
