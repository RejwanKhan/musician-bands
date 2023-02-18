const sequelize = require("./src/connection");
const { BandSongs } = require("./models/BandSongs");
const { Bands } = require("./models/Bands");
const { Musicians } = require("./models/Musicians");
const { Songs } = require("./models/Songs");

Bands.hasMany(Musicians, { as: "musicians" });
Musicians.belongsTo(Bands, { as: "band" });

Bands.belongsToMany(Songs, { through: BandSongs });
Songs.belongsToMany(Bands, { through: BandSongs });

const eagerLoad = async () => {
  await sequelize.sync({ force: true });

  //BULK CREATING

  //Bulk creating Bands

  await Bands.bulkCreate([
    { name: "ImagineDragons", genre: "Pop", showCount: 8 },
    { name: "BTS", genre: "KPOP", showCount: 4 },
    { name: "Maroon5", genre: "Pop", showCount: 2 },
    { name: "Wombats", genre: "Pop", showCount: 3 },
  ]);

  //Bulk Creating Musicians
  await Musicians.bulkCreate([
    { name: "Rejwan", instrument: "Piano" },
    { name: "Diogo", instrument: "Violin" },
    { name: "Rufus", instrument: "Trumpet" },
    { name: "John", instrument: "Flute" },
    { name: "Fatima", instrument: "Maracas" },
  ]);

  //Bulk Creating Songs

  await Songs.bulkCreate([
    { title: "Greek Tradegy", year: "2021" },
    { title: "Radioactive", year: "2011" },
    { title: "Bones", year: "2024" },
    { title: "PayPhone", year: "2011" },
    { title: "Memories", year: "2017" },
    { title: "Spring Day", year: "2016" },
  ]);

  //Make an EagerLoad with Muscians and Bands (COMPLETED)
  const ImagineDragons = await Bands.findByPk(1);
  const BTS = await Bands.findByPk(2);
  const Maroon5 = await Bands.findByPk(3);
  const Wombats = await Bands.findByPk(4);

  //Adding the Mucians to the bands

  ImagineDragons.addMusicians(1);
  ImagineDragons.addMusicians(2);
  BTS.addMusicians(3);
  Wombats.addMusicians(4);
  Maroon5.addMusicians(5);

  const BandMusicians = await Bands.findAll({
    include: { model: Musicians, as: "musicians" },
  });

  console.log(JSON.stringify(BandMusicians, null, 2));
};

eagerLoad();
