const User = require("../models/user.model.js");

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    else res.send(data);
  });
};
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({

    idUser:req.body.idUser,
    username:req.body.username,
    password:req.body.password,
    email:req.body.email,
    userImage:req.body.userImage,
    about:req.body.about,
    createdAt:req.body.createdAt,
    updatedAt:req.body.updatedAt,
    status: req.body.status,
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(200).json({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// Find a single User with a idUser
exports.findOne = (req, res) => {
  User.findById(req.params.idUser, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.idUser}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.idUser
        });
      }
    } else res.send(data);
  });
};

// Update a User identified by the idUser in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.updateById(
    req.params.idUser,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.idUser}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.idUser
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a User with the specified idUser in the request
exports.delete = (req, res) => {
  User.remove(req.params.idUser, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.idUser}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.idUser
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

// Delete all User from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};
