const sequelize = require("./src/connection");
const { DataTypes } = require("sequelize");
const { Bands } = require("./models/Bands");
const { Musicians } = require("./models/Musicians");
const { Songs } = require("./models/Songs");
const { BandSongs } = require("./models/BandSongs");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});
