const endPoints = require("../endpoints.json");

exports.describeEndpoints = (req, res, next) => {
  const description = endPoints;
  res.status(200).send({ description }).catch(next);
};
