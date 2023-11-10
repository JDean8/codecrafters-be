const e = require("express");
const {
  selectAllEventsUsers,
  selectEventsUsersByUserId,
  insertEventsUsers,
  deleteEventsUsers,
} = require("../models/eventsUsersModel");
const { selectUserById } = require("../models/usersModel");
const { selectEventById } = require("../models/eventsModel");

exports.getAllEventsUsers = (req, res, next) => {
  selectAllEventsUsers()
    .then((eventsUsers) => {
      res.status(200).send({ eventsUsers });
    })
    .catch(next);
};

exports.getEventsUsersByUserId = (req, res, next) => {
  const { userId } = req.params;
  const promise = [selectUserById(userId)];
  if (userId) promise.push(selectEventsUsersByUserId(userId));
  Promise.all(promise)
    .then(([user, eventsUsers]) => {
      res.status(200).send({ eventsUsers });
    })
    .catch(next);
};

exports.postEventsUsers = (req, res, next) => {
  const { eventId, userId } = req.params;
  const promise = [selectUserById(userId), selectEventById(eventId)];
  if (userId) promise.push(insertEventsUsers(eventId, userId));
  Promise.all(promise)
    .then(([user, event, eventsUsers]) => {
      res.status(201).send({ eventsUsers });
    })
    .catch(next);
};

exports.deleteEventsUsers = (req, res, next) => {
  const { eventId, userId } = req.params;
  const promise = [selectUserById(userId), selectEventById(eventId)];
  if (userId) promise.push(deleteEventsUsers(eventId, userId));
  Promise.all(promise)
    .then(([user, event, eventsUsers]) => {
      res.status(204).send({});
    })
    .catch(next);
};
