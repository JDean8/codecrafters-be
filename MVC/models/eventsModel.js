const db = require("../../db/connection");

exports.selectAllEvents = () => {
  return db.query("SELECT * FROM events").then((result) => result.rows);
}

exports.selectEventById = (id) => {
  return db
    .query("SELECT * FROM events WHERE event_id = $1", [id])
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "Event not found" });
      return rows[0];
    });
}

exports.insertEvent = (event) => {
    if (
        !event.event_id ||
        !event.creator_id ||
        !event.date ||
        !event.short_description ||
        !event.description ||
        !event.location
    ) {
        return Promise.reject({ status: 400, msg: "Bad request" });
  }
  return db
    .query(
      `INSERT INTO events (event_id, creator_id, date, short_description, description, location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [
            event.event_id,
            event.creator_id,
            event.date,
            event.short_description,
            event.description,
            event.location,
        ]
    )
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "Event not found" });
      return rows[0];
    });
}

exports.updateEvent = (id, event) => {
    if (
        !event.event_id ||
        !event.creator_id ||
        !event.date ||
        !event.short_description ||
        !event.description ||
        !event.location
    ) {
        return Promise.reject({ status: 400, msg: "Bad request" });
    }
    return db
        .query(
        "UPDATE events SET event_id = $1, creator_id = $2, date = $3, short_description = $4, description = $5, location = $6 WHERE event_id = $7 RETURNING *",
        [
            event.event_id,
            event.creator_id,
            event.date,
            event.short_description,
            event.description,
            event.location,
            id,
        ]
        )
        .then(({ rows }) => {
        if (!rows.length)
            return Promise.reject({ status: 404, msg: "Event not found" });
        return rows[0];
        });
    };

exports.deleteEvent = (id) => {
    return db
        .query("DELETE FROM events WHERE event_id = $1 RETURNING *", [id])
        .then(({ rows }) => {
        if (rows.length === 0)
            return Promise.reject({ status: 404, msg: "Event not found" });
        return rows[0];
        });
    }