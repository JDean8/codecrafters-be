const userRouter = require("express").Router();
const { getUserInterests, postUserInterest, deleteUserInterest } = require("../controllers/interestsUsersController");
const {
  getAllUsers,
  getUserById,
  postUser,
  patchUser,
  deleteUser,
  getAllEventsToAttendByUserId,
} = require("../controllers/userController");


userRouter.route("/").get(getAllUsers).post(postUser);
userRouter.route("/:id").get(getUserById).patch(patchUser).delete(deleteUser);
userRouter.route("/:id/interests").get(getUserInterests).post(postUserInterest)
userRouter.route("/:user_id/interests/:interest_id").delete(deleteUserInterest)
userRouter.route("/:user_id/events/attending").get(getAllEventsToAttendByUserId);


module.exports = userRouter;
