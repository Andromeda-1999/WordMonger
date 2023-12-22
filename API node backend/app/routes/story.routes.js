module.exports = app => {
  const story = require("../controllers/story.controller.js");

  //endpoints

  // Retrieve all stories
  app.get("/story", story.findAll);

  // Stories filters
  app.get("/story/filters", story.search);

  // Create a new Story
  app.post("/story", story.create);


  // Retrieve a single Story with idStory
  app.get("/story/:idStory", story.findOne);

  // Update a Story with idStory
  app.put("/story/:idStory", story.update);

  // Delete a Story with idStory
  app.delete("/story/:idStory", story.delete);

  // Create a new Story
  app.delete("/story", story.deleteAll);
};

