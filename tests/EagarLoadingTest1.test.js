//THIS WILL TEST EagarLoading for Bands and Musicians

const sequelize = require("../src/connection");
const { Musicians } = require("../models/Musicians");
const { Bands } = require("../models/Bands");

Bands.hasMany(Musicians, { as: "musicians" });
Musicians.belongsTo(Bands, { as: "band" });

beforeAll(async () => {
  await sequelize.sync({ force: true });

  await Musicians.create({
    name: "Rejwan",
    instrument: "Piano",
  });

  await Bands.create({
    name: "ImagineDragons",
    genre: "Pop",
    showCount: 5,
  });
});

describe("testing eagarLoading One to Many relationship", () => {
  it("testing if Band and Musician eagarloaded", async () => {
    const firstBand = await Bands.findByPk(1);

    await firstBand.addMusicians(1);

    const fetchedMusician = await Bands.findAll({
      include: [{ model: Musicians, as: "musicians" }],
    });

    const Musicanname = fetchedMusician[0].musicians[0].name;
    console.log(JSON.stringify(fetchedMusician, null, 2));
    expect(Musicanname).toEqual("Rejwan");
  });
});
