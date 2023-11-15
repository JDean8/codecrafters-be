const {
  selectAllComments,
  selectCommentById,
  insertComment,
  deleteComment,
} = require("../models/commentsModel");
const { selectEventById } = require("../models/eventsModel");
const { selectUserById } = require("../models/usersModel");

exports.getAllComments = (req, res, next) => {
  const { event_idParam } = req.params;
  const { limit, page } = req.query;
  const promise = [selectEventById(event_idParam)];
  if (event_idParam)
    promise.push(selectAllComments(event_idParam, limit, page));
  Promise.all(promise)
    .then(([event, comments]) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.getCommentById = (req, res, next) => {
  const { comment_id, event_idParam } = req.params;
  const promise = [selectEventById(event_idParam)];
  if (event_idParam) promise.push(selectCommentById(comment_id));
  Promise.all(promise)
    .then(([event, comment]) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const { event_idParam } = req.params;
  const { body, user_id, event_id, created_at } = req.body;
  const promise = [selectEventById(event_idParam), selectUserById(user_id)];
  if (event_idParam && user_id)
    promise.push(
      insertComment({ body, user_id, event_id, created_at }, event_idParam)
    );
  Promise.all(promise)
    .then(([event, user, comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id, event_idParam } = req.params;
  const promise = [selectEventById(event_idParam)];
  if (event_idParam) promise.push(deleteComment(comment_id));
  Promise.all(promise)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
