const sql = require("./db.js");

// constructor
const Story_Genre  = function(story_genre) {
    this.idStory_Genre=story_genre.idStory_Genre;
    this.story_id=story_genre.story_id;
    this.genre_id=story_genre.genre_id;


};


Story_Genre .getAll = result => {
  sql.query("SELECT * FROM story_genre", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Story_Genre: ", res);
    result(null, res);
  });
};
Story_Genre .create = (newStory_Genre, result) => {
  sql.query("INSERT INTO story_genre SET ?", newStory_Genre, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Story_Genre: ", { idStory_Genre: res.idStory_Genre, ...newStory_Genre });
    result(null, { idStory_Genre: res.idStory_Genre, ...newStory_Genre });
  });
};

Story_Genre.findById = (idStory_Genre, result) => {
  sql.query(`SELECT * FROM story_genre WHERE idStory_Genre = ${idStory_Genre}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Story_Genre: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Story_Genre with the id
    result({ kind: "not_found" }, null);
  });
};



Story_Genre.updateById = (idStory_Genre, story_genre, result) => {
  sql.query(
    "UPDATE story_genre SET idStory_Genre = ?, story_id = ? , genre_id = ? WHERE idStory_Genre = ?",
    [story_genre.idStory_Genre, story_genre.story_id, story_genre.genre_id, idStory_Genre],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found Story_Genre with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Story_Genre: ", { idStory_Genre:idStory_Genre, ...story_genre });
      result(null, { idStory_Genre: idStory_Genre, ...story_genre });
    }
  );
};

Story_Genre.remove = (idStory_Genre, result) => {
  sql.query("DELETE FROM story_genre WHERE idStory_Genre = ?", idStory_Genre, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows === 0) {
      // not found Story_Genre with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Story_Genre with id: ", idStory_Genre);
    result(null, res);
  });
};

Story_Genre.removeAll = result => {
  sql.query("DELETE FROM story_genre", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Story_Genre`);
    result(null, res);
  });
};

module.exports = Story_Genre ;
