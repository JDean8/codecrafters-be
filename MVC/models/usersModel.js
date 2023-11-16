const db = require("../../db/connection");

exports.selectAllUsers = () => {
  return db.query("SELECT * FROM users").then((result) => result.rows);
};

exports.selectUserById = (id) => {
  return db
    .query("SELECT * FROM users WHERE user_id = $1", [id])

    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "User not found" });
      return rows[0];
    });
};

exports.insertUser = (user) => {
  if (
    !user.username ||
    !user.profile_pic ||
    !user.name ||
    !user.user_id ||
    !user.created_at ||
    !user.email
  ) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  return db
    .query(
      "INSERT INTO users ( username, profile_pic, name, user_id, created_at, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        user.username,
        user.profile_pic,
        user.name,
        user.user_id,
        user.created_at,
        user.email,
      ]
    )
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "User not found" });
      return rows[0];
    });
};

exports.updateUser = (id, user) => {
  if (!user.username || !user.profile_pic || !user.name) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  return db
    .query(
      "UPDATE users SET username = $1, profile_pic = $2, name = $3 WHERE user_id = $4 RETURNING *",
      [user.username, user.profile_pic, user.name, id]
    )
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "User not found" });
      return rows[0];
    });
};

exports.deleteUser = (id) => {
  return db
    .query("DELETE FROM users WHERE user_id = $1 RETURNING *", [id])
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "User not found" });
      return rows[0];
    });
};

exports.selectUserTrips = (user_id) => {
  return this.selectUserById(user_id)
    .then(() => {
      return db.query(
        "SELECT * FROM trips WHERE creator_id = $1 ORDER BY start_date DESC",
        [user_id]
      );
    })
    .then(({ rows }) => {
      if (!rows.length) return [];
      return rows;
    });
};

exports.insertUserTrip = (trip) => {
  if (
    !trip.creator_id ||
    !trip.start_date ||
    !trip.end_date ||
    !trip.country ||
    !trip.location ||
    !trip.latitude ||
    !trip.longitude
  ) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  return db
    .query(
      "INSERT INTO trips (creator_id, start_date, end_date, country, location, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        trip.creator_id,
        trip.start_date,
        trip.end_date,
        trip.country,
        trip.location,
        trip.latitude,
        trip.longitude,
      ]
    )
    .then(({ rows }) => {
      const mappedRows = rows.map((row) => {
        if (row.latitude || row.longitude) {
          row.latitude = parseFloat(row.latitude);
          row.longitude = parseFloat(row.longitude);
        }
        return row;
      });
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "User not found" });
      return mappedRows[0];
    });
};

exports.deleteSingleTrip = (user_id, trip_id) => {
  return db.query("DELETE FROM trips WHERE trip_id = $1 AND creator_id = $2", [
    trip_id,
    user_id,
  ]);
};
