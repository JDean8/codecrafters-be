const eventRouter = require("express").Router();
const {
  getAllEvents,
  getEventById,
  postEvent,
  patchEvent,
  deleteEvent,
} = require("../controllers/eventController");

const {
  getAllComments,
  postComment,
  getCommentById,
  deleteCommentById,
} = require("../controllers/commentsController");


eventRouter.route("/").get(getAllEvents).post(postEvent);
eventRouter
  .route("/:event_idParam")
  .get(getEventById)
  .patch(patchEvent)
  .delete(deleteEvent);
eventRouter
  .route("/:event_idParam/comments")
  .get(getAllComments)
  .post(postComment);
eventRouter
  .route("/:event_idParam/comments/:comment_id")
  .get(getCommentById)
  .delete(deleteCommentById);

module.exports = eventRouter;
