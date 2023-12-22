module.exports = app => {
  const readersprogress = require("../controllers/readersprogress.controller.js");

  // Retrieve all readersprogress
  app.get("/readersprogress", readersprogress.findAll);

  // Create a new readersprogress
  app.post("/readersprogress", readersprogress.create);

// Retrieve a single readersprogress with idReadersProgress
  app.get("/readersprogress/:idReadersProgress", readersprogress.findOne);

// Update a readersprogress with idReadersProgress
  app.put("/readersprogress/:idReadersProgress", readersprogress.update);

// Delete a readersprogress with idReadersProgress
  app.delete("/readersprogress/:idReadersProgress", readersprogress.delete);

// Create a new readersprogress
  app.delete("/readersprogress", readersprogress.deleteAll);
};

