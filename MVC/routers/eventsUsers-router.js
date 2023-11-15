const eventsUsersRouter = require("express").Router();
const { getAllEventsUsers } = require("../controllers/eventsUsersController");

eventsUsersRouter.route("/").get(getAllEventsUsers);

module.exports = eventsUsersRouter;
