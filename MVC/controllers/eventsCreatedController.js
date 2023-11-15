const {
  selectEventsCreatedByUserId,
  selectEventCreatedByEvent_Id,
  eliminateEventCreatedByEvent_Id,
} = require("../models/eventsCreatedModel");
const { selectEventById } = require("../models/eventsModel");
const { selectUserById } = require("../models/usersModel");

exports.getEventsCreatedByUserId = (req, res, next) => {
  const { user_id } = req.params;
  const promise = [selectUserById(user_id)];
  if (user_id) promise.push(selectEventsCreatedByUserId(user_id));
  Promise.all(promise)
    .then(([user, event]) => {
      res.status(200).send({
        event,
      });
    })
    .catch(next);
};

exports.getEventCreatedByEvent_Id = (req, res, next) => {
  const { event_id, user_id } = req.params;
  const promise = [selectUserById(user_id), selectEventById(event_id)];
  if (event_id && user_id)
    promise.push(selectEventCreatedByEvent_Id(user_id, event_id));
  Promise.all(promise)
    .then(([user, event, eventCreated]) => {
      res.status(200).send({
        eventCreated,
      });
    })
    .catch(next);
};

exports.deleteEventCreatedByEvent_Id = (req, res, next) => {
  const { event_id, user_id } = req.params;
  const promise = [selectUserById(user_id), selectEventById(event_id)];
  if (event_id && user_id)
    promise.push(eliminateEventCreatedByEvent_Id(user_id, event_id));
  Promise.all(promise)
    .then(([user, event, eventCreated]) => {
      res.status(200).send({
        eventCreated,
      });
    })
    .catch(next);
};
