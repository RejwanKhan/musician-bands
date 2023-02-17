const sequelize = require("./src/connection");
const { Bands } = require("./models/Bands");
const { Musicians } = require("./models/Musicians");

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
});
