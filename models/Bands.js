const sequelize = require("../src/connection");
const { DataTypes } = require("sequelize");

const Bands = sequelize.define("bands", {
  name: DataTypes.STRING,
  genre: DataTypes.STRING,
  showCount: DataTypes.INTEGER,
});

module.exports = { Bands };
