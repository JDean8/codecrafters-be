const cardRouter = require("express").Router();
const {
  getAllCards,
  getCardById,
  postCard,
  patchCard,
  deleteCard,
} = require("../controllers/cardController");

cardRouter.route("/").get(getAllCards).post(postCard);
cardRouter.route("/:id").get(getCardById).patch(patchCard).delete(deleteCard);

module.exports = cardRouter;