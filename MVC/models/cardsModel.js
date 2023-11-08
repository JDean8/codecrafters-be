const db = require("../../db/connection");

exports.selectAllCards = () => {
  const sql = "SELECT * FROM cards";
  return db.query(sql).then(({ rows }) => {
    return rows;
  });
};

exports.selectCardById = (id) => {
  const sql = "SELECT * FROM cards WHERE card_id = $1";
  return db.query(sql, [id]).then(({ rows }) => {
    if (!rows.length)
      return Promise.reject({ status: 404, msg: "Card not found" });
    return rows[0];
  });
};

exports.insertCard = (card) => {
  if(!card.card_id || !card.country || !card.start_date || !card.end_date || !card.creator || !card.location) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  const sql =
    "INSERT INTO cards (card_id, country, start_date, end_date, creator, location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
  return db
    .query(sql, [
      card.card_id,
      card.country,
      card.start_date,
      card.end_date,
      card.creator,
      card.location,
    ])
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "Card not found" });
      return rows[0];
    });
};

exports.updateCard = (id, card) => {
  if(!card.country || !card.start_date || !card.end_date || !card.creator || !card.location) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  const sql =
    "UPDATE cards SET country = $1, start_date = $2, end_date = $3, creator = $4, location = $5 WHERE card_id = $6 RETURNING *";
  return db
    .query(sql, [
      card.country,
      card.start_date,
      card.end_date,
      card.creator,
      card.location,
      id,
    ])
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "Card not found" });
      return rows[0];
    });
}

exports.deleteCard = (id) => {
  const sql = "DELETE FROM cards WHERE card_id = $1 RETURNING *";
  return db.query(sql, [id])
    .then(({ rows }) => {
      if(rows.length === 0) return Promise.reject({ status: 404, msg: "Card not found" });
      else return rows[0];
    });
}