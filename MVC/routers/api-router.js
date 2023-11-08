const apiRouter = require("express").Router();
const userRouter = require('./user-router');
const cardRouter = require('./card-router');


apiRouter.use("/users", userRouter);
apiRouter.use("/cards", cardRouter);


module.exports = apiRouter;