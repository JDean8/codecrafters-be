const apiRouter = require("express").Router();
const userRouter = require('./user-router');
const eventsUsersRouter = require('./eventsUsers-router');


apiRouter.use("/users", userRouter);
apiRouter.use("/events_users", eventsUsersRouter);


module.exports = apiRouter;