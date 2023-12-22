const Rating = require("../models/rating.model.js");

// Retrieve all Rating from the database.
exports.findAll = (req, res) => {
  Rating.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Ratings."
      });
    else res.send(data);
  });
};
// Create and Save a new Rating
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Rating
  const rating = new Rating({
    idRating:req.body.idRating,
    story:req.body.story,
    user:req.body.user,
    rating:req.body.rating,


  });

  // Save Rating in the database
  Rating.create(rating, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Rating."
      });
    else res.send(data);
  });
};

// Find a single Rating with a idRating
exports.findOne = (req, res) => {
  Rating.findById(req.params.idRating, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Rating with id ${req.params.idRating}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Rating with id " + req.params.idRating
        });
      }
    } else res.send(data);
  });
};

// Update a Rating identified by the idRating in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Rating.updateById(
    req.params.idRating,
    new Rating(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Rating with id ${req.params.idRating}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Rating with id " + req.params.idRating
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Rating with the specified idRating in the request
exports.delete = (req, res) => {
  Rating.remove(req.params.idRating, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Rating with id ${req.params.idRating}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Rating with id " + req.params.idRating
        });
      }
    } else res.send({ message: `Rating was deleted successfully!` });
  });
};

// Delete all Rating from the database.
exports.deleteAll = (req, res) => {
  Rating.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Ratings."
      });
    else res.send({ message: `All Ratings were deleted successfully!` });
  });
};
