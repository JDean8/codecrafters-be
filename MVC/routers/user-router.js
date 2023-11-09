const userRouter = require("express").Router();
const { getAllFriendsFromUserByUserId, deleteFriend, getAllFriendRequests } = require("../controllers/friendsController");
const { getUserInterests, postUserInterest, deleteUserInterest } = require("../controllers/interestsUsersController");
const {
  getAllUsers,
  getUserById,
  postUser,
  patchUser,
  deleteUser,
} = require("../controllers/userController");

userRouter.route("/").get(getAllUsers).post(postUser);
userRouter.route("/:id").get(getUserById).patch(patchUser).delete(deleteUser);
userRouter.route("/:id/interests").get(getUserInterests).post(postUserInterest)
userRouter.route("/:user_id/interests/:interest_id").delete(deleteUserInterest)
userRouter.route("/:user_id/friends").get(getAllFriendsFromUserByUserId)
userRouter.route("/:user_id/friends/:friend_id").delete(deleteFriend)
userRouter.route("/friend-request").get(getAllFriendRequests)


module.exports = userRouter;
