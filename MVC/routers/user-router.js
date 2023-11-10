const userRouter = require("express").Router();
const {
  getUserInterests,
  postUserInterest,
  deleteUserInterest,
} = require("../controllers/interestsUsersController");
const {
  getAllUsers,
  getUserById,
  postUser,
  patchUser,
  deleteUser,
  getUserTrips,
  postUserTrip,
  deleteUserTrip
} = require("../controllers/userController");
const {
  getEventsUsersByUserId,
  postEventsUsers,
  deleteEventsUsers,
} = require("../controllers/eventsUsersController");

userRouter.route("/").get(getAllUsers).post(postUser);
userRouter.route("/:id").get(getUserById).patch(patchUser).delete(deleteUser);
userRouter.route("/:id/interests").get(getUserInterests).post(postUserInterest)
userRouter.route("/:user_id/interests/:interest_id").delete(deleteUserInterest)
userRouter.route("/:userId/my-events").get(getEventsUsersByUserId);
userRouter.route("/:userId/my-events/:eventId").delete(deleteEventsUsers).post(postEventsUsers);
userRouter.route("/:user_id/trips").get(getUserTrips).post(postUserTrip)
userRouter.route("/:user_id/trips/:trip_id").delete(deleteUserTrip)

module.exports = userRouter;
