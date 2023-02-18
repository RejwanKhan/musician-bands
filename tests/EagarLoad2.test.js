const sequelize = require("../src/connection");
const { BandSongs } = require("../models/BandSongs");
const { Bands } = require("../models/Bands");

const { Songs } = require("../models/Songs");

Bands.belongsToMany(Songs, { through: BandSongs });
Songs.belongsToMany(Bands, { through: BandSongs });

beforeAll(async () => {
  await sequelize.sync({ force: true });

  await Bands.bulkCreate([
    { name: "ImagineDragons", genre: "Pop", showCount: 8 },
    { name: "BTS", genre: "KPOP", showCount: 4 },
    { name: "Maroon5", genre: "Pop", showCount: 2 },
    { name: "Wombats", genre: "Pop", showCount: 3 },
  ]);

  await Songs.bulkCreate([
    { title: "Greek Tradegy", year: "2021" },
    { title: "Radioactive", year: "2011" },
    { title: "Bones", year: "2024" },
    { title: "PayPhone", year: "2011" },
    { title: "Memories", year: "2017" },
    { title: "Spring Day", year: "2016" },
  ]);
});

describe("Testing EagarLoading between Many to Many relationships", () => {
  it("testing eagarLoading with bands and Songs", async () => {
    const firstBand = await Bands.findByPk(1);

    await firstBand.addSongs(2);

    const fetchBand = await Bands.findOne({ include: [{ model: Songs }] });

    const Radioactive = (fetchBand.Songs[0].title = "Radioactive");

    expect(Radioactive).toEqual("Radioactive");
  });
});
