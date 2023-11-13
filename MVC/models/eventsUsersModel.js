const db = require("../../db/connection");

exports.selectAllEventsUsers = () => {
  return db.query("SELECT * FROM events_users").then((result) => result.rows);
};

exports.selectEventsUsersByUserId = (user_id, sort_by, order, limit, page) => {
  const sort_byAux = ["location, date"].includes(sort_by)
    ? sort_by
    : "location";
  const orderAux = ["asc", "desc"].includes(order) ? order : "asc";
  const limitAux = limit ? limit : 10;
  const pageAux = page ? page : 1;
  const offsetAux = (pageAux - 1) * limitAux;
  return db
    .query(
      `SELECT * FROM events INNER JOIN events_users ON events.event_id = events_users.event_id WHERE events_users.user_id = $1 ORDER BY ${sort_byAux} ${orderAux} LIMIT ${limitAux} OFFSET ${offsetAux}`,
      [user_id]
    )
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "User has not any events lined up" });
    });
};

exports.insertEventsUsers = (event_id, user_id) => {
  if (!event_id) return Promise.reject({ status: 400, msg: "Bad request" });
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
    .query(
      `DELETE FROM events_users WHERE event_id = $1 AND user_id = $2 RETURNING *`,
      [event_id, user_id]
    )
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "Event not found" });
      return rows[0];
    });
};
