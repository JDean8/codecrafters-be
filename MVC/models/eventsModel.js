const db = require("../../db/connection");

exports.selectAllEvents = (sort_by, order, limit, page) => {
  const orderAux = ["asc", "desc"].includes(order) ? order : "asc"; // asc, desc (default asc)
  const limitAux = limit || 10; 
  const pageAux = page || 1; 
  const offsetAux = (pageAux - 1) * limitAux; // 0, 10, 20, 30, 40, 50, 60, 70, 80, 90
  const sort_byAux = ["location"].includes(sort_by) ? sort_by : "location"; // location (default location)
  let SQL  = `SELECT * FROM events ORDER BY ${sort_byAux} ${orderAux} LIMIT $1 OFFSET $2`;
  return db.query(SQL, [limitAux, offsetAux]).then((result) => result.rows);
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
        !event.location ||
        !event.latitude ||
        !event.longitude ||
        !event.event_picture
    ) {
        return Promise.reject({ status: 400, msg: "Bad request" });
    }
    return db
        .query(
        "INSERT INTO events (event_id, creator_id, date, short_description, description, location, latitude, longitude, event_picture) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
        [
            event.event_id,
            event.creator_id,
            event.date,
            event.short_description,
            event.description,
            event.location,
            event.latitude,
            event.longitude,
            event.event_picture,
        ]
        )
        .then(({ rows }) => {
        if(!rows.length)
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
        !event.location ||
        !event.latitude ||
        !event.longitude ||
        !event.event_picture
    ) {
        return Promise.reject({ status: 400, msg: "Bad request" });
    }
    return db
        .query(
        "UPDATE events SET event_id = $1, creator_id = $2, date = $3, short_description = $4, description = $5, location = $6, latitude = $7, longitude = $8, event_picture = $9 WHERE event_id = $10 RETURNING *",
        [
            event.event_id,
            event.creator_id,
            event.date,
            event.short_description,
            event.description,
            event.location,
            event.latitude,
            event.longitude,
            event.event_picture,
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