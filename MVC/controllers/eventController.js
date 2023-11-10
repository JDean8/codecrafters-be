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
  const { event_idParam } = req.params;
  selectEventById(event_idParam)
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
  const { event_idParam } = req.params;
  const { event } = req.body;
  updateEvent(event_idParam, event)
    .then((event) => {
      res.status(200).send({ event });
    })
    .catch(next);
};

exports.deleteEvent = (req, res, next) => {
  const { event_idParam } = req.params;
  deleteEvent(event_idParam)
    .then((event) => {
      res.sendStatus(204);
    })
    .catch(next);
};
