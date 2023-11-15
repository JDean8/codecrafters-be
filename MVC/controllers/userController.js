const {
  selectAllUsers,
  selectUserById,
  insertUser,
  updateUser,
  deleteUser,
  selectUserTrips,
  insertUserTrip,
  deleteSingleTrip,
} = require("../models/usersModel");

exports.getAllUsers = (req, res, next) => {
  selectAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.getUserById = (req, res, next) => {
  const { id } = req.params;
  selectUserById(id)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  const { user } = req.body;
  insertUser(user)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch(next);
};

exports.patchUser = (req, res, next) => {
  const { id } = req.params;
  const { user } = req.body;
  updateUser(id, user)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.deleteUser = (req, res, next) => {
  const { id } = req.params;
  deleteUser(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};

exports.getUserTrips = (req, res, next) => {
  const { user_id } = req.params;
  selectUserTrips(user_id)
    .then((trips) => {
      res.status(200).send({ trips });
    })
    .catch(next);
};

exports.postUserTrip = (req, res, next) => {
  const { trip } = req.body;
  insertUserTrip(trip)
    .then((trip) => {
      res.status(201).send({ trip });
    })
    .catch(next);
};

exports.deleteUserTrip = (req, res, next) => {
  const { user_id, trip_id } = req.params;
  const parsedTripId = parseInt(trip_id);
  return selectUserById(user_id)
    .then(() => {
      return selectUserTrips(user_id);
    })
    .then((trips) => {
      const tripsArray = trips.map((trip) => {
        return trip.trip_id;
      });
      if (!tripsArray.includes(parsedTripId)) {
        return Promise.reject({ status: 404, msg: "Trip not found" });
      }
    })
    .then(() => {
      return deleteSingleTrip(user_id, parsedTripId);
    })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
