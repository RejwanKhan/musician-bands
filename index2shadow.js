const sequelize = require("./src/connection");
const { Bands } = require("./models/Bands");
const { Musicians } = require("./models/Musicians");
const { Songs } = require("./models/Songs");
const { BandSongs } = require("./models/BandSongs");

Bands.belongsToMany(Songs, { through: BandSongs });
Songs.belongsToMany(Bands, { through: BandSongs });

const manyToMany = async () => {
  await sequelize.sync({ force: true });

  //Bulk Create Songs

  await Songs.bulkCreate([
    { title: "Greek Tradegy", year: "2021" },
    { title: "Radioactive", year: "2011" },
    { title: "Bones", year: "2024" },
    { title: "PayPhone", year: "2011" },
    { title: "Memories", year: "2017" },
    { title: "Spring Day", year: "2016" },
  ]);
  //Bulk Create Bands
  await Bands.bulkCreate([
    { name: "ImagineDragons", genre: "Pop", showCount: 8 },
    { name: "BTS", genre: "KPOP", showCount: 4 },
    { name: "Maroon5", genre: "Pop", showCount: 2 },
    { name: "Wombats", genre: "Pop", showCount: 3 },
  ]);

  const ImagineDragons = await Bands.findByPk(1);
  const BTS = await Bands.findByPk(2);
  const Maroon5 = await Bands.findByPk(3);
  const Wombats = await Bands.findByPk(4);

  //Imagine Dragon songs
  ImagineDragons.addSong(2);
  ImagineDragons.addSong(3);

  //Wombats Songs
  Wombats.addSong(1);

  //Maroon5
  Maroon5.addSong(5);
  Maroon5.addSong(4);
  //bts songs
  BTS.addSong(6);
};

manyToMany();
