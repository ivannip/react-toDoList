// Using Object Relationship Mapping ORM
const Sequelize = require('sequelize');
const dbconfig = require('../config/dbconfig');
const DISABLE_SEQUELIZE_DEFAULTS = {
  timestamps: false,
  freezeTableName: true,
};
var sequelize
const { DataTypes } = Sequelize;

sequelize = new Sequelize(process.env.DATABASE_URL)


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.lists = require("./list")(sequelize, Sequelize);
module.exports = db;