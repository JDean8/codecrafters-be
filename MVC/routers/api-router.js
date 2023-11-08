const apiRouter = require("express").Router();
const userRouter = require('./user-router');
const interestsRouter = require('./interests-router');


apiRouter.use("/users", userRouter);
apiRouter.use("/interests", interestsRouter);

module.exports = apiRouter;