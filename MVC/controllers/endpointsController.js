const endPoints = require("../../endpoint.json");

exports.getAllEndpoints = (req, res, next) => {
  res.status(200).send({ endPoints: endPoints });
};
