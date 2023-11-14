const userRouter = require("express").Router();

const { getAllFriendsFromUserByUserId, deleteFriend, getAllFriendRequests, postFriendRequest, matchFriends } = require("../controllers/friendsController");
const { getUserInterests, postUserInterest, deleteUserInterest } = require("../controllers/interestsUsersController");
const {
  getAllUsers,
  getUserById,
  postUser,
  patchUser,
  deleteUser,
  getUserTrips,
  postUserTrip,
  deleteUserTrip,
} = require("../controllers/userController");
const {
  getEventsUsersByUserId,
  postEventsUsers,
  deleteEventsUsers,
} = require("../controllers/eventsUsersController");
const {
  getAllEventsSavedByUser,
  getEventSavedByByEventId,
  postEventSaved,
  deleteEventSaved,
} = require("../controllers/eventsSavedController");
const { getEventsCreatedByUserId, getEventCreatedByEvent_Id, deleteEventCreatedByEvent_Id } = require("../controllers/eventsCreatedController");


userRouter.route("/").get(getAllUsers).post(postUser);
userRouter.route("/:id").get(getUserById).patch(patchUser).delete(deleteUser);
userRouter.route("/:id/interests").get(getUserInterests).post(postUserInterest);
userRouter.route("/:user_id/interests/:interest_id").delete(deleteUserInterest);
userRouter.route("/:id/interests").get(getUserInterests).post(postUserInterest)
userRouter.route("/:user_id/interests/:interest_id").delete(deleteUserInterest)
userRouter.route("/:user_id/friends").get(getAllFriendsFromUserByUserId)
userRouter.route("/:user_id/friends/:friend_id").delete(deleteFriend)
userRouter.route("/:user_id/friendsrequests").get(getAllFriendRequests).post(postFriendRequest)
userRouter.route("/:user_id/matchfriends").get(matchFriends)
userRouter.route("/:userId/attending-events").get(getEventsUsersByUserId);
userRouter
  .route("/:userId/attending-events/:eventId")
  .delete(deleteEventsUsers)
  .post(postEventsUsers);
userRouter.route("/:user_id/trips").get(getUserTrips).post(postUserTrip);
userRouter.route("/:user_id/trips/:trip_id").delete(deleteUserTrip);
userRouter.route("/:user_id/events-saved").get(getAllEventsSavedByUser);
userRouter
  .route("/:user_id/events-saved/:event_id")
  .get(getEventSavedByByEventId)
  .post(postEventSaved)
  .delete(deleteEventSaved);
userRouter.route("/:user_id/my-events").get(getEventsCreatedByUserId);
userRouter.route("/:user_id/my-events/:event_id").get(getEventCreatedByEvent_Id).delete(deleteEventCreatedByEvent_Id);

module.exports = userRouter;
