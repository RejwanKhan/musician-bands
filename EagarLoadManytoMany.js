const sequelize = require("./src/connection");
const { BandSongs } = require("./models/BandSongs");
const { Bands } = require("./models/Bands");

const { Songs } = require("./models/Songs");

Bands.belongsToMany(Songs, { through: BandSongs });
Songs.belongsToMany(Bands, { through: BandSongs });

const MTOM = async () => {
  await sequelize.sync({ force: true });

  //BULK CREATING

  //Bulk creating Bands

  await Bands.bulkCreate([
    { name: "ImagineDragons", genre: "Pop", showCount: 8 },
    { name: "BTS", genre: "KPOP", showCount: 4 },
    { name: "Maroon5", genre: "Pop", showCount: 2 },
    { name: "Wombats", genre: "Pop", showCount: 3 },
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

  //ADDING THE SONGS
  await Wombats.addSongs(1);
  await ImagineDragons.addSongs(2);
  await ImagineDragons.addSongs(3);
  await Maroon5.addSongs(4);
  await Maroon5.addSongs(5);
  await BTS.addSongs(6);

  const bands = await Bands.findAll({
    include: [{ model: Songs }],
  });

  console.log(JSON.stringify(bands, null, 2));
};

// MTOM();
