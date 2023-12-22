const Genre = require("../models/genre.model.js");

// Retrieve all Genre from the database.
exports.findAll = (req, res) => {
  Genre.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Genre."
      });
    else res.send(data);
  });
};
// Create and Save a new Genre
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Genre
  const genre = new Genre({

    idGenre:req.body.idGenre,
    genreName:req.body.genreName,

  });

  // Save Genre in the database
  Genre.create(genre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Genre."
      });
    else res.send(data);
  });
};

// Find a single Genre with a idGenre
exports.findOne = (req, res) => {
  Genre.findById(req.params.idGenre, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Genre with id ${req.params.idGenre}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Genre with id " + req.params.idGenre
        });
      }
    } else res.send(data);
  });
};

// Update a Genre identified by the idGenre in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Genre.updateById(
    req.params.idGenre,
    new Genre(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Genre with id ${req.params.idGenre}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Genre with id " + req.params.idGenre
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Genre with the specified idGenre in the request
exports.delete = (req, res) => {
  Genre.remove(req.params.idGenre, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Genre with id ${req.params.idGenre}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Genre with id " + req.params.idGenre
        });
      }
    } else res.send({ message: `Genre was deleted successfully!` });
  });
};

// Delete all Genre from the database.
exports.deleteAll = (req, res) => {
  Genre.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Genres."
      });
    else res.send({ message: `All Genres were deleted successfully!` });
  });
};
