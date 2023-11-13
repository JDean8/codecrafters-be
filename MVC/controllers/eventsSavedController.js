const { selectEventById } = require("../models/eventsModel");
const {
  selectAllEventsSavedByUser,
  selectEventSavedByByEventId,
  insertEventSaved,
  deleteEventSavedModel,
} = require("../models/eventsSavedModel");
const { selectUserById } = require("../models/usersModel");

exports.getAllEventsSavedByUser = (req, res, next) => {
  const { user_id } = req.params;
  const { sort_by, order, limit, page } = req.query;
  const promise = [selectUserById(user_id)];
  if (user_id)
    promise.push(
      selectAllEventsSavedByUser(user_id, sort_by, order, limit, page)
    );
  Promise.all(promise)
    .then(([user, eventsSaved]) => {
      res.status(200).send({ eventsSaved });
    })
    .catch(next);
};

exports.getEventSavedByByEventId = (req, res, next) => {
  const { event_id, user_id } = req.params;
  const promise = [selectUserById(user_id), selectEventById(event_id)];
  if (event_id) promise.push(selectEventSavedByByEventId(event_id, user_id));
  Promise.all(promise)
    .then(([user, event, eventSaved]) => {
      res.status(200).send({ eventSaved });
    })
    .catch(next);
};

exports.postEventSaved = (req, res, next) => {
  const { event_id, user_id } = req.params;
  const promise = [selectUserById(user_id), selectEventById(event_id)];
  if (event_id && user_id) promise.push(insertEventSaved(event_id, user_id));
  Promise.all(promise)
    .then(([user, event, eventSaved]) => {
      res.status(201).send({ eventSaved });
    })
    .catch(next);
};

exports.deleteEventSaved = (req, res, next) => {
  const { event_id, user_id } = req.params;
  const promise = [selectUserById(user_id), selectEventById(event_id)];
  if (event_id) promise.push(deleteEventSavedModel(event_id, user_id));
  Promise.all(promise)
    .then(([user, event, eventSaved]) => {
      res.status(204).send();
    })
    .catch(next);
};
