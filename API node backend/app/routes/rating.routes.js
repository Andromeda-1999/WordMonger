module.exports = app => {
  const rating = require("../controllers/rating.controller.js");

  // Retrieve all rating
  app.get("/rating", rating.findAll);

  // Create a new rating
  app.post("/rating", rating.create);

// Retrieve a single rating with idRating
  app.get("/rating/:idRating", rating.findOne);

// Update a rating with idRating
  app.put("/rating/:idRating", rating.update);

// Delete a rating with idRating
  app.delete("/rating/:idRating", rating.delete);

// Create a new rating
  app.delete("/rating", rating.deleteAll);
};

