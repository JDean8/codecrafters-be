const eventsUsersRouter = require("express").Router();
const {
  getAllEventsUsers,
  getEventsUsersByUserId,
  postEventsUsers,
  deleteEventsUsers,
} = require("../controllers/eventsUsersController");

eventsUsersRouter.route("/").get(getAllEventsUsers).post(postEventsUsers);
eventsUsersRouter.route("/:user_id").get(getEventsUsersByUserId);
eventsUsersRouter.route("/:event_id/:user_id").delete(deleteEventsUsers);

module.exports = eventsUsersRouter;