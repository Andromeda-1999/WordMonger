module.exports = app => {
  const user = require("../controllers/user.controller.js");

  // Retrieve all users
  app.get("/user", user.findAll);

  // Create a new user
  app.post("/user", user.create);

  // Retrieve a single user with idUser
  app.get("/user/:idUser", user.findOne);

  // Update a user with idUser
  app.put("/user/:idUser", user.update);

  // Delete a user with idUser
  app.delete("/user/:idUser", user.delete);

  app.delete("/user", user.deleteAll);
};

