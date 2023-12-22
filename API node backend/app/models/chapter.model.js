const sql = require("./db.js");

// constructor
const Chapter = function (chapter) {
  this.idChapter = chapter.idChapter;
  this.chapterImage = chapter.chapterImage;
  this.chapterTitle = chapter.chapterTitle;
  this.chapterContent = chapter.chapterContent;
  this.createdAt = chapter.createdAt;
  this.updatedAt = chapter.updatedAt;
  this.story = chapter.story;
  this.status = chapter.status;


};

Chapter.getAll = ({ storyId = "" }, result) => {
  sql.query(`SELECT * FROM chapter
  LEFT JOIN story ON chapter.story = story.idStory
  WHERE  story.idStory = ${storyId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Chapter: ", res);
    result(null, res);
  });
};

Chapter.create = (newChapter, result) => {
  sql.query("INSERT INTO chapter SET ?", newChapter, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Chapter: ", { idChapter: res.idChapter, ...newChapter });
    result(null, { idChapter: res.idChapter, ...newChapter });
  });
};

Chapter.findById = (idChapter, result) => {
  sql.query(`SELECT * FROM chapter WHERE idChapter = ${idChapter}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Chapter: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Chapter with the id
    result({ kind: "not_found" }, null);
  });
};

Chapter.updateById = (idChapter, chapter, result) => {
  sql.query(
    "UPDATE chapter SET idChapter = ?, chapterImage = ?, chapterTitle = ?, chapterContent = ?, createdAt = ?, updatedAt = ?, story = ?, status = ? WHERE idChapter = ?",
    [chapter.idChapter, chapter.chapterImage, chapter.chapterTitle, chapter.chapterContent, chapter.createdAt, chapter.updatedAt, chapter.story, chapter.status, idChapter],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found Chapter with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Chapter: ", { idChapter: idChapter, ...chapter });
      result(null, { idChapter: idChapter, ...chapter });
    }
  );
};

Chapter.remove = (idChapter, result) => {
  sql.query("DELETE FROM chapter WHERE idChapter = ?", idChapter, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows === 0) {
      // not found Chapter with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Chapter with id: ", idChapter);
    result(null, res);
  });
};

Chapter.removeAll = result => {
  sql.query("DELETE FROM chapter", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Chapter`);
    result(null, res);
  });
};

module.exports = Chapter;
