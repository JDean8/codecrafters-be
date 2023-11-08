const {
  selectAllEvents,
  selectEventById,
  insertEvent,
  updateEvent,
  deleteEvent,
} = require("../models/eventsModel");

exports.getAllEvents = (req, res, next) => {
  const { sort_by, order, limit, page } = req.query;
  selectAllEvents(sort_by, order, limit, page)
    .then((events) => {
      res.status(200).send({ events });
    })
    .catch(next);
};

exports.getEventById = (req, res, next) => {
  const { id } = req.params;
  selectEventById(id)
    .then((event) => {
      res.status(200).send({ event });
    })
    .catch(next);
};

exports.postEvent = (req, res, next) => {
  const { event } = req.body;
  insertEvent(event)
    .then((event) => {
      res.status(201).send({ event });
    })
    .catch(next);
};

exports.patchEvent = (req, res, next) => {
  const { id } = req.params;
  const { event } = req.body;
  updateEvent(id, event)
    .then((event) => {
      res.status(200).send({ event });
    })
    .catch(next);
};

exports.deleteEvent = (req, res, next) => {
  const { id } = req.params;
  deleteEvent(id)
    .then((event) => {
      res.sendStatus(204);
    })
    .catch(next);
};
