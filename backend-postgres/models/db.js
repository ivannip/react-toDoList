// Using Object Relationship Mapping ORM
const Sequelize = require('sequelize');
const dbconfig = require('../config/dbconfig');
const DISABLE_SEQUELIZE_DEFAULTS = {
  timestamps: false,
  freezeTableName: true,
};
var sequelize
const { DataTypes } = Sequelize;
if (process.env.DATABASE_URL) {
  console.log(process.env.DATABASE_URL)
  sequelize = new Sequelize(process.env.DATABASE_URL)
} else {
  sequelize = new Sequelize({
    database: dbconfig.database,
    username: dbconfig.user,
    host: dbconfig.host,
    port: dbconfig.port,
    password: dbconfig.password,
    dialect: 'postgres',
    operatorsAliases: false
  });
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.lists = require("./list")(sequelize, Sequelize);
module.exports = db;