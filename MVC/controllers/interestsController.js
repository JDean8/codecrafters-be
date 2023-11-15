const { selectAllInterests } = require("../models/interestsModel.js");

exports.getAllInterests = (req, res, next) => {
  selectAllInterests()
    .then((interests) => {
      res.status(200).send({
        interests,
      });
    })
    .catch(next);
};
