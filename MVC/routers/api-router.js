const apiRouter = require("express").Router();
const userRouter = require('./user-router');
const eventRouter = require('./event-router');


apiRouter.use("/users", userRouter);
apiRouter.use("/events", eventRouter);


module.exports = apiRouter;