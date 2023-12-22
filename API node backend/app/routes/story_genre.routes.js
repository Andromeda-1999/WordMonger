module.exports = app => {
  const story_genre = require("../controllers/story_genre.controller.js");

  // Retrieve all story_genre
  app.get("/story_genre", story_genre.findAll);

  // Create a new story_genre
  app.post("/story_genre", story_genre.create);

// Retrieve a single story_genre with idStory_Genre
  app.get("/story_genre/:idStory_Genre", story_genre.findOne);

// Update a story_genre with idStory_Genre
  app.put("/story_genre/:idStory_Genre", story_genre.update);

// Delete a story_genre with idStory_Genre
  app.delete("/story_genre/:idStory_Genre", story_genre.delete);

// Create a new story_genre
  app.delete("/story_genre", story_genre.deleteAll);
};

