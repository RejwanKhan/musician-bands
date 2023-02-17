const sequelize = require("./src/connection");
const { Bands } = require("./models/Bands");
const { Musicians } = require("./models/Musicians");
const {} = require("./models/Songs");
Bands.hasMany(Musicians);
Musicians.belongsTo(Bands);

const main = async () => {
  await sequelize.sync({ force: true });

  //BulkCreateMusicians
  await Musicians.bulkCreate([
    { name: "Rejwan", instrument: "Piano" },
    { name: "Diogo", instrument: "Violin" },
    { name: "Rufus", instrument: "Trumpet" },
    { name: "John", instrument: "Flute" },
  ]);

  //BulkCreateBands
  await Bands.bulkCreate([
    { name: "ImagineDragons", genre: "Pop", showCount: 8 },
    { name: "BTS", genre: "KPOP", showCount: 4 },
    { name: "Maroon5", genre: "Pop", showCount: 2 },
    { name: "Wombats", genre: "Pop", showCount: 3 },
  ]);

  //adding musicians to band
  const firstBand = await Bands.findOne();
  const firstmusician = await Musicians.findOne();

  firstBand.addMusicians(firstmusician);

  //adding bands to muscians

  const john = await Musicians.findOne({ where: { name: "John" } });
  const Wombats = await Bands.findOne({ where: { name: "Wombats" } });
  console.log(Wombats);

  john.setBand(Wombats);
};

main();

module.exports = main;
