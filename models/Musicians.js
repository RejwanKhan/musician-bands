const sequelize = require("../src/connection");
const { DataTypes } = require("sequelize");

const Musicians = sequelize.define("musicians", {
  name: DataTypes.STRING,
  instrument: DataTypes.STRING,
});

module.exports = { Musicians };
