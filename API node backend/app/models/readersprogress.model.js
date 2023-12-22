const sql = require("./db.js");

// constructor
const ReadersProgress = function (readersprogress) {
  this.idReadersProgress = readersprogress.idReadersProgress;
  this.user = readersprogress.user;
  this.chapter = readersprogress.chapter;



};


ReadersProgress.getAll = result => {
  sql.query("SELECT * FROM readersprogress", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("ReadersProgress: ", res);
    result(null, res);
  });
};
ReadersProgress.create = (data, result) => {
  sql.query(`INSERT INTO readersprogress SET user = ${data.user}, chapter = ${data.chapter}`, data, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created ReadersProgress: ", { idReadersProgress: res.idReadersProgress, ...data });
    result(null, { idReadersProgress: res.idReadersProgress, ...data });
  });
};

ReadersProgress.findById = (idReadersProgress, result) => {
  sql.query(`SELECT * FROM readersprogress WHERE idReadersProgress = ${idReadersProgress}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found ReadersProgress: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found ReadersProgress with the id
    result({ kind: "not_found" }, null);
  });
};



ReadersProgress.updateById = (idReadersProgress, readersprogress, result) => {
  sql.query(
    "UPDATE readersprogress SET idReadersProgress = ?, user = ? , chapter = ?  WHERE idReadersProgress = ?",
    [readersprogress.idReadersProgress, readersprogress.user, readersprogress.chapter, idReadersProgress],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found ReadersProgress with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated ReadersProgress: ", { idReadersProgress: idReadersProgress, ...readersprogress });
      result(null, { idReadersProgress: idReadersProgress, ...readersprogress });
    }
  );
};

ReadersProgress.remove = (idReadersProgress, result) => {
  sql.query("DELETE FROM readersprogress WHERE idReadersProgress = ?", idReadersProgress, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows === 0) {
      // not found ReadersProgress with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted ReadersProgress with id: ", idReadersProgress);
    result(null, res);
  });
};

ReadersProgress.removeAll = result => {
  sql.query("DELETE FROM readersprogress", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} ReadersProgress`);
    result(null, res);
  });
};

module.exports = ReadersProgress;
