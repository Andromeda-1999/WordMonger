const sql = require("./db.js");

// constructor
const User  = function(user) {
    this.idUser=user.idUser;
    this.username=user.username;
    this.password=user.password;
    this.email=user.email;
    this.userImage=user.userImage;
    this.about=user.about;
    this.createdAt=user.createdAt;
    this.updatedAt=user.updatedAt;
    this.status=user.status;


};


User .getAll = result => {
  sql.query("SELECT * FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Users: ", res);
    result(null, res);
  });
};
User .create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { idUser: res.idUser, ...newUser });
    result(null, { idUser: res.idUser, ...newUser });
  });
};

User.findById = (idUser, result) => {
  sql.query(`SELECT * FROM user WHERE idUser = ${idUser}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};



User.updateById = (idUser, user, result) => {
  sql.query(
    "UPDATE user SET idUser = ?, username = ? , password = ?, email= ?, userImage= ?, about= ?, createdAt= ?, updatedAt= ?, status= ? WHERE idUser = ?",
    [user.idUser, user.username, user.password, user.email, user.userImage, user.about, user.createdAt, user.updatedAt, user.status, idUser],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { idUser:idUser, ...user });
      result(null, { idUser: idUser, ...user });
    }
  );
};

User.remove = (idUser, result) => {
  sql.query("DELETE FROM user WHERE idUser = ?", idUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows === 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", idUser);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} User`);
    result(null, res);
  });
};

module.exports = User ;
