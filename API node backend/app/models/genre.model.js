const sql = require("./db.js");

// constructor
const Genre  = function(genre) {
    this.idGenre=genre.idGenre;
    this.genreName=genre.genreName;

};


Genre .getAll = result => {
  sql.query("SELECT * FROM genre", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Genre: ", res);
    result(null, res);
  });
};
Genre .create = (newGenre, result) => {
  sql.query("INSERT INTO genre SET ?", newGenre, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Genre: ", { idGenre: res.idGenre, ...newGenre });
    result(null, { idGenre: res.idGenre, ...newGenre });
  });
};

Genre.findById = (idGenre, result) => {
  sql.query(`SELECT * FROM genre WHERE idGenre = ${idGenre}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Genre: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Genre with the id
    result({ kind: "not_found" }, null);
  });
};



Genre.updateById = (idGenre, genre, result) => {
  sql.query(
    "UPDATE genre SET idGenre = ?, genreName = ?  WHERE idGenre = ?",
    [genre.idGenre, genre.genreName, idGenre],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found Genre with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Genre: ", { idGenre:idGenre, ...genre });
      result(null, { idGenre: idGenre, ...genre });
    }
  );
};

Genre.remove = (idGenre, result) => {
  sql.query("DELETE FROM genre WHERE idGenre = ?", idGenre, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows === 0) {
      // not found Genre with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Genre with id: ", idGenre);
    result(null, res);
  });
};

Genre.removeAll = result => {
  sql.query("DELETE FROM genre", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Genre`);
    result(null, res);
  });
};

module.exports = Genre ;
