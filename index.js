const sequelize = require("./src/connection");
const { Bands } = require("./models/Bands");
const { Musicians } = require("./models/Musicians");

const main = async () => {
  await sequelize.sync({ force: true });
};

main();
