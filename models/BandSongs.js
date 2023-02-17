const sequelize = require("../src/connection");
const { DataTypes } = require("sequelize");

const BandSongs = sequelize.define("bandSongs", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = { BandSongs };
