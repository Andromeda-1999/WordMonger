const Story = require("../models/story.model.js");

// Retrieve all Stories from the database.
exports.findAll = (req, res) => {
  Story.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stories."
      });
    else res.send(data);
  });
};

// Retrieve all Stories with user and chapter.
exports.getview = (req, res) => {
  Story.getview((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stories."
      });
    else res.send(data);
  });
};

// Search Stories from the database.
exports.search = (req, res) => {
  console.log(req.query)
  console.log("Search Controller")
  Story.search(req.query, (err, data) => {
    console.log(req.query)
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stories."
      });
    else res.send(data);
  });
};

// Create and Save a new Story
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Story
  const story = new Story({
    idStory: req.body.idStory,
    storyTitle: req.body.storyTitle,
    storyDescription: req.body.storyDescription,
    storyCover: req.body.storyCover,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    user: req.body.user,
    status: req.body.status,
  });

  // Save Story in the database
  Story.create(story, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Story."
      });
    else res.send(data);
  });
};

// Find a single Story with a idStory
exports.findOne = (req, res) => {
  Story.findById(req.params.idStory, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Story with id ${req.params.idStory}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Story with id " + req.params.idStory
        });
      }
    } else res.send(data);
  });
};

// find all chapters of that story
exports.findALLChapters = (req, res) => {
  Story.findALLChapters(req.params.idStory, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found chapters to with story id ${req.params.idStory}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving chapters with Story id " + req.params.idStory
        });
      }
    } else res.send(data);
  });
};


// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Story.updateById(
    req.params.idStory,
    new Story(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Story with id ${req.params.idStory}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Story with id " + req.params.idStory
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Story with the specified customerId in the request
exports.delete = (req, res) => {
  Story.remove(req.params.idStory, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Story with id ${req.params.idStory}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Story with id " + req.params.idStory
        });
      }
    } else res.send({ message: `Story was deleted successfully!` });
  });
};

// Delete all Story from the database.
exports.deleteAll = (req, res) => {
  Story.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Stories."
      });
    else res.send({ message: `All Stories were deleted successfully!` });
  });
};
