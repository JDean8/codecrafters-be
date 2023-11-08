const {
  selectAllEventsUsers,
  selectEventsUsersByUserId,
  insertEventsUsers,
  deleteEventsUsers,
} = require("../models/eventsUsersModel");

exports.getAllEventsUsers = (req, res, next) => {
  selectAllEventsUsers()
    .then((eventsUsers) => {
      res.status(200).send({ eventsUsers });
    })
    .catch(next);
};

exports.getEventsUsersByUserId = (req, res, next) => {
  const { user_id } = req.params;
  selectEventsUsersByUserId(user_id)
    .then((eventsUsers) => {
      res.status(200).send({ eventsUsers });
    })
    .catch(next);
};

exports.postEventsUsers = (req, res, next) => {
  const { eventsUsers } = req.body;
  insertEventsUsers(eventsUsers)
    .then((eventsUsers) => {
      res.status(201).send({ eventsUsers });
    })
    .catch(next);
};

exports.deleteEventsUsers = (req, res, next) => {
  const { event_id, user_id } = req.params;
  deleteEventsUsers(event_id, user_id)
    .then((eventsUsers) => {
      res.sendStatus(204);
    })
    .catch(next);
};
