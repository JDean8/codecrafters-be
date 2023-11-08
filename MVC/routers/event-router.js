const eventRouter = require("express").Router();
const {
  getAllEvents,
  getEventById,
  postEvent,
  patchEvent,
  deleteEvent
} = require("../controllers/eventController");

eventRouter.route("/").get(getAllEvents).post(postEvent);
eventRouter.route("/:id").get(getEventById).patch(patchEvent).delete(deleteEvent);

module.exports = eventRouter;