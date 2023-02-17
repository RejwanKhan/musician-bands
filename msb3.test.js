const sequelize = require("./src/connection");
const { DataTypes } = require("sequelize");
const { Bands } = require("./models/Bands");
const { Musicians } = require("./models/Musicians");
const { Songs } = require("./models/Songs");
const { BandSongs } = require("./models/BandSongs");

Bands.belongsToMany(Songs, { through: BandSongs });
Songs.belongsToMany(Bands, { through: BandSongs });
beforeAll(async () => {
  await sequelize.sync({ force: true });

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
});

// afterEach(async () => {
//   await sequelize.sync({ force: true });

//   await Songs.bulkCreate([
//     { title: "Greek Tradegy", year: "2021" },
//     { title: "Radioactive", year: "2011" },
//     { title: "Bones", year: "2024" },
//     { title: "PayPhone", year: "2011" },
//     { title: "Memories", year: "2017" },
//     { title: "Spring Day", year: "2016" },
//   ]);
//   //Bulk Create Bands
//   await Bands.bulkCreate([
//     { name: "ImagineDragons", genre: "Pop", showCount: 8 },
//     { name: "BTS", genre: "KPOP", showCount: 4 },
//     { name: "Maroon5", genre: "Pop", showCount: 2 },
//     { name: "Wombats", genre: "Pop", showCount: 3 },
//   ]);
// });

describe("testing MANY TO MANY relationships between Bands and Songs", () => {
  it("testing whether we can associate Songs to Bands", async () => {
    allBands = await Bands.findAll();

    allSongs = await Songs.findAll();

    const ImagineDragons = await Bands.findByPk(1);
    const Bts = await Bands.findByPk(2);
    const Maroon5 = await Bands.findByPk(3);
    const Wombats = await Bands.findByPk(4);

    await ImagineDragons.addSongs(2);
    await ImagineDragons.addSongs(3);
    await Wombats.addSongs(1);
    await Maroon5.addSongs(4);
    await Maroon5.addSongs(5);
    await Bts.addSongs(6);

    const firstBandSong = await BandSongs.findByPk(1);
    const secondBandSong = await BandSongs.findByPk(2);
    const thirdBandSong = await BandSongs.findByPk(3);
    const fourthBandSong = await BandSongs.findByPk(4);
    const fifthBandSong = await BandSongs.findByPk(5);
    const sixthBandSong = await BandSongs.findByPk(6);

    // console.table(firstBandSong);
    // console.table(secondBandSong);
    // console.table(thirdBandSong);
    // console.table(fourthBandSong);
    // console.table(fifthBandSong);
    // console.table(sixthBandSong);

    expect(firstBandSong.bandId).toEqual(1);
    expect(firstBandSong.SongId).toEqual(2);

    expect(secondBandSong.bandId).toEqual(1);
    expect(secondBandSong.SongId).toEqual(3);

    expect(thirdBandSong.bandId).toEqual(4);
    expect(thirdBandSong.SongId).toEqual(1);

    expect(fourthBandSong.bandId).toEqual(3);
    expect(fourthBandSong.SongId).toEqual(4);

    expect(fifthBandSong.bandId).toEqual(3);
    expect(fifthBandSong.SongId).toEqual(5);

    expect(sixthBandSong.bandId).toEqual(2);
    expect(sixthBandSong.SongId).toEqual(6);
  });

  it.only("test whether we can associate Bands to Songs", async () => {
    const firstSong = await Songs.findByPk(1);
    const secondSong = await Songs.findByPk(2);
    const thirdSong = await Songs.findByPk(3);
    const fourthSong = await Songs.findByPk(4);
    const fifthSong = await Songs.findByPk(5);
    const sixthSong = await Songs.findByPk(6);

    const allBands = await Bands.findAll();
    console.log(allBands);
    // await firstSong.addBands(4);
    // secondSong.addBand(1);
    console.table(firstSong);
    await firstSong.addBands(4);
    await secondSong.addBands(1);
    await thirdSong.addBands(1);
    await fourthSong.addBands(3);
    await fifthSong.addBands(3);
    await sixthSong.addBands(2);
    const b = await BandSongs.findByPk(2);

    //BAND SONGS
    const firstBandSong = await BandSongs.findByPk(1);
    const secondBandSong = await BandSongs.findByPk(2);
    const thirdBandSong = await BandSongs.findByPk(3);
    const fourthBandSong = await BandSongs.findByPk(4);
    const fifthBandSong = await BandSongs.findByPk(5);
    const sixthBandSong = await BandSongs.findByPk(6);

    console.table(fifthBandSong);

    expect(firstBandSong.bandId).toEqual(4);
    expect(firstBandSong.SongId).toEqual(1);

    expect(secondBandSong.bandId).toEqual(1);
    expect(secondBandSong.SongId).toEqual(2);

    expect(thirdBandSong.bandId).toEqual(1);
    expect(thirdBandSong.SongId).toEqual(3);

    expect(fourthBandSong.bandId).toEqual(3);
    expect(fourthBandSong.SongId).toEqual(4);

    expect(fifthBandSong.bandId).toEqual(3);
    expect(fifthBandSong.SongId).toEqual(5);

    expect(sixthBandSong.bandId).toEqual(2);
    expect(sixthBandSong.SongId).toEqual(6);
  });
});
