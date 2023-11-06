const testData = require("../data/test-data/index");
const seed = require("./seed.js");
const db = require("../connection.js");

const runSeed = () => {
  return seed(testData).then(() => db.end());
};

runSeed();
