const ReadersProgress = require("../models/readersprogress.model.js");

// Retrieve all ReadersProgress from the database.
exports.findAll = (req, res) => {
  ReadersProgress.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ReadersProgress."
      });
    else res.send(data);
  });
};
// Create and Save a new ReadersProgress
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a ReadersProgress
  const readersprogress = new ReadersProgress({
    user: req.body.user,
    chapter: req.body.chapter,
    story: req.body.story,
  });

  // Save ReadersProgress in the database
  ReadersProgress.create(readersprogress, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ReadersProgress."
      });
    else res.send(data);
  });
};

// Find a single ReadersProgress with a idReadersProgress
exports.findOne = (req, res) => {
  ReadersProgress.findById(req.params.idReadersProgress, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ReadersProgress with id ${req.params.idReadersProgress}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving ReadersProgress with id " + req.params.idReadersProgress
        });
      }
    } else res.send(data);
  });
};

// Update a ReadersProgress identified by the idReadersProgress in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  ReadersProgress.updateById(
    req.params.idReadersProgress,
    new ReadersProgress(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ReadersProgress with id ${req.params.idReadersProgress}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating ReadersProgress with id " + req.params.idReadersProgress
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a ReadersProgress with the specified idReadersProgress in the request
exports.delete = (req, res) => {
  ReadersProgress.remove(req.params.idReadersProgress, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ReadersProgress with id ${req.params.idReadersProgress}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete ReadersProgress with id " + req.params.idReadersProgress
        });
      }
    } else res.send({ message: `ReadersProgress was deleted successfully!` });
  });
};

// Delete all ReadersProgress from the database.
exports.deleteAll = (req, res) => {
  ReadersProgress.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all ReadersProgresses."
      });
    else res.send({ message: `All ReadersProgress were deleted successfully!` });
  });
};
