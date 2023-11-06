const format = require("pg-format");
const db = require("../connection");

const seed = ({}) => {
  return db.query(`DROP TABLE IF EXISTS users;`).then(() => {
    return db.query(`
      CREATE TABLE users (
        user_id integer PRIMARY KEY,
        usename VARCHAR,
        profile_pic VARCHAR,
        created_at TIMESTAMP
      );`);
  });
};

module.exports = seed;
