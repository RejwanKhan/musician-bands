const sequelize = require("./src/connection");
const { Bands } = require("./models/Bands");
const { Musicians } = require("./models/Musicians");

Bands.hasMany(Musicians);
Musicians.belongsTo(Bands);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

beforeEach(async () => {
  await Musicians.bulkCreate([
    { name: "Rejwan", instrument: "Piano" },
    { name: "Diogo", instrument: "Violin" },
    { name: "Rufus", instrument: "Trumpet" },
    { name: "John", instrument: "Flute" },
  ]);

  await Bands.bulkCreate([
    { name: "ImagineDragons", genre: "Pop", showCount: 8 },
    { name: "BTS", genre: "KPOP", showCount: 4 },
    { name: "Maroon5", genre: "Pop", showCount: 2 },
    { name: "Wombats", genre: "Pop", showCount: 3 },
  ]);

  //BulkCreateBands
});

afterEach(async () => {
  await sequelize.sync({ force: true });
});

describe("testing associations between Muscians and Bands", () => {
  it("testing whether muscians can be assigned to multiple bands", async () => {
    const firstBand = await Bands.findOne();
    let firstmusician = await Musicians.findOne();

    firstBand.addMusicians(firstmusician);
    firstmusician = await Musicians.findOne();

    expect(firstmusician.bandId).toEqual(1);
  });

  it("testing whether bands can be assigned to musicians", async () => {
    let john = await Musicians.findOne({ where: { name: "John" } });
    const allBands = await Bands.findAll();
    console.table(JSON.stringify(allBands));

    const Wombats = await Bands.findOne({ where: { name: "Wombats" } });

    john.setBand(Wombats);
    john = await Musicians.findOne({ where: { name: "John" } });

    expect(john.bandId).toEqual(4);
  });
});
