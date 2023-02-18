const sequelize = require("../src/connection");
const { Bands } = require("../models/Bands");
const { Musicians } = require("../models/Musicians");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterEach(async () => {
  await sequelize.sync({ force: true });
});

//Test Creating a band

describe("testing bands/Musicians functionality and relationships", () => {
  it("testing if you can create a band", async () => {
    const band1 = await Bands.create({
      name: "BTS",
      genre: "Kpop",
      showCount: 4,
    });

    const bts = await Bands.findOne({ where: { name: "BTS" } });
    expect(bts.name).toBe("BTS");
  });

  it("testing if you can create new Musician", async () => {
    const musicians = await Musicians.create({
      name: "Rejwan",
      instrument: "Piano",
    });

    expect(musicians.name).toBe("Rejwan");
  });

  it("test whether you can delete an Instance", async () => {
    await Bands.bulkCreate([
      { name: "BTS", genre: "KPOP", showCount: 8 },
      { name: "ImagineDragons", genre: "POP", showCount: 4 },
      { name: "Linkin Park", genre: "Rock", showCount: 6 },
    ]);

    const allBands = await Bands.findAll();
    console.log(allBands);

    // Destroying BTS instance
    await Bands.destroy({ where: { name: "BTS" } });
    const Bts = await Bands.findOne({ where: { name: "BTS" } });
    expect(Bts).toBeFalsy();

    //ImagineDragons should still remain
    const ImagineDragons = await Bands.findOne({
      where: { name: "ImagineDragons" },
    });
    expect(ImagineDragons.name).toEqual("ImagineDragons");
  });

  //testing whether you can update an Instance

  it("testing whether you can update an instance", async () => {
    await Musicians.bulkCreate([
      { name: "Rejwan", instrument: "Piano" },
      { name: "Diogo", instrument: "Violin" },
      { name: "John", instrument: "Trumpet" },
    ]);

    await Musicians.findOne({ where: { name: "Diogo" } });
    const Diogo = await Musicians.findOne({ where: { name: "Diogo" } });
    expect(Diogo.name).toEqual("Diogo");

    await Musicians.update({ name: "Fatima" }, { where: { name: "Diogo" } });
    const Fatima = await Musicians.findOne({ where: { name: "Fatima" } });

    const seeIfDiogoUpdated = await Musicians.findOne({
      where: { name: "Diogo" },
    });
    expect(seeIfDiogoUpdated).toBeFalsy();

    expect(Fatima.name).toEqual("Fatima");
  });
});

//MUSCIANS AND BANDS PART2
