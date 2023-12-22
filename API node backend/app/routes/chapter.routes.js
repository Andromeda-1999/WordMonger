module.exports = app => {
  const chapter = require("../controllers/chapter.controller.js");

  // Retrieve all chapters
  app.get("/chapter", chapter.findAll);

  // Create a new chapter
  app.post("/chapter", chapter.create);

  // Retrieve a single chapter with idChapter
  app.get("/chapter/:idChapter", chapter.findOne);

  // Update a chapter with idChapter
  app.put("/chapter/:idChapter", chapter.update);

  // Delete a Chapter with idChapter
  app.delete("/chapter/:idChapter", chapter.delete);

  // Create a new Chapter
  app.delete("/chapter", chapter.deleteAll);
};

