const Chapter = require("../models/chapter.model.js");

// Retrieve all Chapter from the database.
exports.findAll = (req, res) => {
  Chapter.getAll(req.query, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Chapters."
      });
    else res.send(data);
  });
};
// Create and Save a new Chapter
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Chapter
  const chapter = new Chapter({
    idChapter: req.body.idChapter,
    chapterImage: req.body.chapterImage,
    chapterTitle: req.body.chapterTitle,
    chapterContent: req.body.chapterContent,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    story: req.body.story,
    status: req.body.status


  });

  // Save Chapter in the database
  Chapter.create(chapter, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the chapter."
      });
    else res.send(data);
  });
};

// Find a single chapter with a idChapter
exports.findOne = (req, res) => {
  Chapter.findById(req.params.idChapter, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Chapter with id ${req.params.idChapter}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Chapter with id " + req.params.idChapter
        });
      }
    } else res.send(data);
  });
};

// Update a Chapter identified by the idChapter in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Chapter.updateById(
    req.params.idChapter,
    new Chapter(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Chapter with id ${req.params.idChapter}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Chapter with id " + req.params.idChapter
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Chapter with the specified idChapter in the request
exports.delete = (req, res) => {
  Chapter.remove(req.params.idChapter, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Chapter with id ${req.params.idChapter}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Chapter with id " + req.params.idChapter
        });
      }
    } else res.send({ message: `Chapter was deleted successfully!` });
  });
};

// Delete all Chapter from the database.
exports.deleteAll = (req, res) => {
  Chapter.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Chapter."
      });
    else res.send({ message: `All Chapter were deleted successfully!` });
  });
};
