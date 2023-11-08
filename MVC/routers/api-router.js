const apiRouter = require("express").Router();
const userRouter = require('./user-router');
const interestsRouter = require('./interests-router');
const cardRouter = require('./card-router');

const eventRouter = require('./event-router');

apiRouter.use("/users", userRouter);
apiRouter.use("/events", eventRouter);
apiRouter.use("/cards", cardRouter);
apiRouter.use("/interests", interestsRouter);

module.exports = apiRouter;