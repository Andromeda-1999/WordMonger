const sql = require("./db.js");

// constructor
const Rating  = function(rating) {
    this.idRating=rating.idRating;
    this.user=rating.user;
    this.story=rating.story;
    this.rating=rating.rating;

};


Rating .getAll = result => {
  sql.query("SELECT * FROM rating", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("ratings: ", res);
    result(null, res);
  });
};
Rating .create = (newRating, result) => {
  sql.query("INSERT INTO rating SET ?", newRating, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Rating: ", { idRating: res.idRating, ...newRating });
    result(null, { idRating: res.idRating, ...newRating });
  });
};

Rating.findById = (idRating, result) => {
  sql.query(`SELECT * FROM rating WHERE idRating = ${idRating}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Rating: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Rating with the id
    result({ kind: "not_found" }, null);
  });
};



Rating.updateById = (idRating, rating, result) => {
  sql.query(
    "UPDATE rating SET idRating = ?, user = ? , story = ?, rating= ? WHERE idRating = ?",
    [rating.idRating, rating.user, rating.story, rating.rating, idRating],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found rating with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated rating: ", { idRating:idRating, ...rating });
      result(null, { idRating: idRating, ...rating });
    }
  );
};

Rating.remove = (idRating, result) => {
  sql.query("DELETE FROM rating WHERE idRating = ?", idRating, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows === 0) {
      // not found Rating with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Rating with id: ", idRating);
    result(null, res);
  });
};

Rating.removeAll = result => {
  sql.query("DELETE FROM rating", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Rating`);
    result(null, res);
  });
};

module.exports = Rating ;
