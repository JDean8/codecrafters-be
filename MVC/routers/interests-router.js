const interestsRouter = require("express").Router();
const { getAllInterests } = require("../controllers/interestsController.js");

interestsRouter.route("/").get(getAllInterests);

module.exports = interestsRouter;
