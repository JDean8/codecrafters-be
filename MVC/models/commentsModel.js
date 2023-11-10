const db = require("../../db/connection");

exports.selectAllComments = (event_idParam, limit, page) => {
  const limitAux = limit || 10;
  const pageAux = page || 1;
  const offsetAux = (pageAux - 1) * limitAux;

  let SQL = `SELECT * FROM comments WHERE event_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`;
  return db
    .query(SQL, [event_idParam, limitAux, offsetAux])
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "Comments not found" });
      return rows;
    });
};

exports.selectCommentById = (comment_id) => {
    if (!comment_id) return Promise.reject({ status: 400, msg: "Bad request" });
    return db
        .query("SELECT * FROM comments WHERE comment_id = $1", [comment_id])
        .then(({ rows }) => {
        if (!rows.length)
            return Promise.reject({ status: 404, msg: "Comment not found" });
        return rows[0];
        });
};

exports.insertComment = (comment, event_idParam) => {
  if (
    !comment.body ||
    !comment.user_id ||
    !comment.event_id ||
    !comment.created_at ||
    !comment.comment_id ||
    !event_idParam
  )
    return Promise.reject({ status: 400, msg: "Bad request" });
  return db
    .query(
      "INSERT INTO comments (body, user_id, event_id, created_at, comment_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        comment.body,
        comment.user_id,
        comment.event_id,
        comment.created_at,
        comment.comment_id,
      ]
    )
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "Comment not found" });
      return rows[0];
    });
};

exports.deleteComment = (comment_id) => {
    if (!comment_id) return Promise.reject({ status: 400, msg: "Bad request" });
    return db
        .query("DELETE FROM comments WHERE comment_id = $1 RETURNING *", [comment_id])
        .then(({ rows }) => {
        if (!rows.length)
            return Promise.reject({ status: 404, msg: "Comment not found" });
        return rows[0];
        });
};
