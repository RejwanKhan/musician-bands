const sequelize = require("../src/connection");
const { DataTypes } = require("sequelize");

const Songs = sequelize.define("Songs", {
  title: DataTypes.STRING,
  year: DataTypes.NUMBER,
});

module.exports = { Songs };
