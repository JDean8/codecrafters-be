const db = require("../../db/connection");

exports.selectAllInterests = () => {
  return db.query("SELECT * FROM interests").then((result) => {
    return result.rows;
  });
};
