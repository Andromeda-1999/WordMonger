const Story_Genre = require("../models/story_genre.model.js");

// Retrieve all Story_Genre from the database.
exports.findAll = (req, res) => {
  Story_Genre.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Story_Genre."
      });
    else res.send(data);
  });
};
// Create and Save a new Story_Genre
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Story_Genre
  const story_genre = new Story_Genre({

    idStory_Genre:req.body.idStory_Genre,
    story_id:req.body.story_id,
    genre_id:req.body.genre_id,

  });

  // Save Story_Genre in the database
  Story_Genre.create(story_genre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Story_Genre."
      });
    else res.send(data);
  });
};

// Find a single Story_Genre with a idStory_Genre
exports.findOne = (req, res) => {
  Story_Genre.findById(req.params.idStory_Genre, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Story_Genre with id ${req.params.idStory_Genre}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Story_Genre with id " + req.params.idStory_Genre
        });
      }
    } else res.send(data);
  });
};

// Update a Story_Genre identified by the idStory_Genre in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Story_Genre.updateById(
    req.params.idStory_Genre,
    new Story_Genre(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Story_Genre with id ${req.params.idStory_Genre}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Story_Genre with id " + req.params.idStory_Genre
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Story_Genre with the specified idStory_Genre in the request
exports.delete = (req, res) => {
  Story_Genre.remove(req.params.idStory_Genre, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Story_Genre with id ${req.params.idStory_Genre}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Story_Genre with id " + req.params.idStory_Genre
        });
      }
    } else res.send({ message: `Story_Genre was deleted successfully!` });
  });
};

// Delete all Story_Genre from the database.
exports.deleteAll = (req, res) => {
  Story_Genre.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Story_Genre."
      });
    else res.send({ message: `All Story_Genre were deleted successfully!` });
  });
};
