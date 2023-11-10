const apiRouter = require("express").Router();
const userRouter = require("./user-router");
const eventsUsersRouter = require("./eventsUsers-router");
const interestsRouter = require("./interests-router");
const eventRouter = require("./event-router");
const { getAllEndpoints } = require("../controllers/endpointsController");

apiRouter.use("/", getAllEndpoints);
apiRouter.use("/users", userRouter);
apiRouter.use("/events-users", eventsUsersRouter);
apiRouter.use("/events", eventRouter);
apiRouter.use("/interests", interestsRouter);

module.exports = apiRouter;
