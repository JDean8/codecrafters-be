const db = require("../../db/connection");

exports.selectAllEventsSavedByUser = (user_id, sort_by, order, limit, page) => {
  const sort_byAux = ["location", "date"].includes(sort_by)
    ? sort_by
    : "location"; // location, date (default location)
  const orderAux = ["asc", "desc"].includes(order) ? order : "asc"; // asc, desc (default asc)
  const limitAux = limit || 10; // 10, 20, 30, 40, 50, 60, 70, 80, 90
  const pageAux = page || 1; // 1, 2, 3, 4, 5, 6, 7, 8, 9
  const offsetAux = (pageAux - 1) * limitAux;

  if (!user_id) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  return db
    .query(
      `SELECT * FROM events INNER JOIN events_saved ON events.event_id = events_saved.event_id WHERE events_saved.user_id = $1 ORDER BY ${sort_byAux} ${orderAux} LIMIT ${limitAux} OFFSET ${offsetAux} `,
      [user_id]
    )
    .then(({ rows }) => {
      if (!rows.length)
        return [];
      return rows;
    });
};

exports.selectEventSavedByByEventId = (event_id, user_id) => {
  if (!event_id || !user_id) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  return db
    .query(
      "SELECT * FROM events INNER JOIN events_saved ON events.event_id = events_saved.event_id WHERE events_saved.event_id = $1 AND events_saved.user_id = $2",
      [event_id, user_id]
    )
    .then(({ rows }) => {
      if (!rows.length)
        return {};
      return rows[0];
    });
};

exports.insertEventSaved = (event_id, user_id) => {
  if (!event_id || !user_id) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  return db
    .query(
      "INSERT INTO events_saved (event_id, user_id) VALUES ($1, $2) RETURNING *",
      [event_id, user_id]
    )
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "Event not created" });
      return rows[0];
    });
};

exports.deleteEventSavedModel = (event_id, user_id) => {
  if (!event_id || !user_id) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  return db
    .query(
      "DELETE FROM events_saved WHERE event_id = $1 AND user_id = $2 RETURNING *",
      [event_id, user_id]
    )
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "Event not deleted" });
      return rows[0];
    });
};
