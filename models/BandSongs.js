const sequelize = require("../src/connection");
const { DataTypes } = require("sequelize");

const BandSongs = sequelize.define("bandSongs", {
  BandSongsId: {
    type: DataTypes.NUMBER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = { BandSongs };
