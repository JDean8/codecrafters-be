const userRouter = require("express").Router();
const {
  getAllUsers,
  getUserById,
  postUser,
  patchUser,
  deleteUser,
} = require("../controllers/userController");

userRouter.route("/").get(getAllUsers).post(postUser);
userRouter.route("/:id").get(getUserById).patch(patchUser).delete(deleteUser);


module.exports = userRouter;
