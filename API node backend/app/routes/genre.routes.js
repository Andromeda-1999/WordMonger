module.exports = app => {
  const genre = require("../controllers/genre.controller.js");

  // Retrieve all genres
  app.get("/genre", genre.findAll);

  // Create a new genre
  app.post("/genre", genre.create);

// Retrieve a single genre with idGenre
  app.get("/genre/:idGenre", genre.findOne);

// Update a genre with idGenre
  app.put("/genre/:idGenre", genre.update);

// Delete a genre with idGenre
  app.delete("/genre/:idGenre", genre.delete);

// Create a new genre
  app.delete("/genre", genre.deleteAll);
};

