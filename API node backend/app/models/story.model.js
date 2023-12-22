const sql = require("./db.js");

// constructor
const Story = function (story) {

  this.user = story.user;
  this.status = story.status;
  this.storyDescription = story.storyDescription;
  this.storyCover = story.storyCover;
  this.createdAt = story.createdAt;
  this.updatedAt = story.updatedAt;
  this.idStory = story.idStory;
  this.storyTitle = story.storyTitle;

};


Story.getAll = result => {
  sql.query("SELECT * FROM story", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("stories: ", res);
    result(null, res);
  });
};


Story.search = ({ title = "", chapter = "" }, result) => {
  console.log(title)
  sql.query(`
  SELECT  * FROM story 
	LEFT JOIN chapter
    ON story.idStory=chapter.story
	GROUP BY (idStory)
    HAVING storyTitle LIKE '%${title}%' OR chapterTitle LIKE '%${chapter}%'
  `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("stories: ", res);
    result(null, res);
  });
};


Story.create = (newStory, result) => {
  sql.query("INSERT INTO story SET ?", newStory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created story: ", { id: res.idStory, ...newStory });
    result(null, { id: res.idStory, ...newStory });
  });
};

Story.findById = (idStory, result) => {
  sql.query(`SELECT * FROM story WHERE idStory = ${idStory}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Story: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Story with the id
    result({ kind: "not_found" }, null);
  });
};

Story.updateById = (idStory, story, result) => {
  sql.query(
    "UPDATE story SET storyDescription = ?,storyCover = ?,updatedAt = ?,storyTitle = ? ,status =? WHERE idStory = ?",
    [story.storyDescription, story.storyCover, story.updatedAt, story.storyTitle, story.status, idStory],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found Story with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated story: ", { idStory: idStory, ...story });
      result(null, { idStory: idStory, ...story });
    }
  );
};

Story.remove = (idStory, result) => {
  sql.query("DELETE FROM story WHERE idStory = ?", idStory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows === 0) {
      // not found Story with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted story with id: ", idStory);
    result(null, res);
  });
};

Story.removeAll = result => {
  sql.query("DELETE FROM story", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} story`);
    result(null, res);
  });
};

module.exports = Story;
