const db = require("../../db/connection");

exports.selectAllEventsUsers = () => {
  return db.query("SELECT * FROM events_users").then((result) => result.rows);
};

exports.selectEventsUsersByUserId = (user_id) => {
  return db
    .query("SELECT * FROM events_users WHERE user_id = $1", [user_id])
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "User not found" });
      return rows;
    });
};

exports.insertEventsUsers = (event_id, user_id) => {
  if(!event_id) return Promise.reject({ status: 400, msg: "Bad request" });
  return db
    .query(
      "INSERT INTO events_users (event_id, user_id) VALUES ($1, $2) RETURNING *",
      [event_id, user_id]
    )
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "Event not found" });
      return rows[0];
    });
};

exports.deleteEventsUsers = (event_id, user_id) => {
  return db
    .query(`DELETE FROM events_users WHERE event_id = $1 AND user_id = $2 RETURNING *`, [
      event_id,
      user_id,
    ])
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "Event not found" });
      return rows[0];
    });
};
