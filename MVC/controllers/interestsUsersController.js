const {
  selectInterestsByUserId,
  postUserInterest,
  deleteInterest,
} = require("../models/interestsUsersModel");

exports.getUserInterests = (req, res) => {
  selectInterestsByUserId(req.params.id)
    .then((userInterests) => {
      res.status(200).send({ userInterests });
    })
    .catch((err) => {
      res.status(404).send({ msg: "User not found" });
    });
};

exports.postUserInterest = (req, res) => {
  postUserInterest(req.params.id, req.body)
    .then((userInterest) => {
      res.status(201).send({ userInterest });
    })
    .catch(({ status, msg }) => {
      res.status(status).send({ msg });
    });
};

exports.deleteUserInterest = (req, res) => {
  deleteInterest(req.params.user_id, req.params.interest_id)
    .then((userInterest) => {
      res.status(204).send({ userInterest });
    })
    .catch(({ status, msg }) => {
      res.status(status).send({ msg });
    });
};
