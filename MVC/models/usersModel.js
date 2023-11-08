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
    !user.created_at
  ) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  return db
    .query(
      "INSERT INTO users ( username, profile_pic, name, user_id, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        user.username,
        user.profile_pic,
        user.name,
        user.user_id,
        user.created_at,
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

exports.selectAllEventsToAttendByUserId = (
  user_id,
  sort_by,
  order,
  limit,
  page
) => {
  const sortByAux = ["date", "location"].includes(sort_by) ? sort_by : "date";
  const limitAux = limit || 10;
  const offsetAux = (page - 1) * limitAux || 0;
  const orderAux = ["asc", "desc"].includes(order) ? order : "asc";
  return db
    .query(
      `SELECT events.* FROM events JOIN events_users ON events.event_id = events_users.event_id WHERE events_users.user_id = $1 ORDER BY ${sortByAux} ${orderAux} LIMIT $2 OFFSET $3`,
      [user_id, limitAux, offsetAux]
    )
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "Events not found" });
      return rows;
    });
};
