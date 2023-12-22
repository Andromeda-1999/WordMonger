const sql = require("./db.js");

// constructor
const User = function (user) {
  this.idUser = user.idUser;
  this.username = user.username;
  this.password = user.password;
  this.email = user.email;
  this.userImage = user.userImage;
  this.about = user.about;
  this.createdAt = user.createdAt;
  this.updatedAt = user.updatedAt;
  this.status = user.status;


};

User.Login = (data, result) => {
  sql.query(`SELECT * FROM user WHERE username = '${data?.username}' AND password = '${data?.password}'  `, (err, res) => {
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
    result({kind: "User Name or Password is incorrect"}, null);
  });
};

module.exports = User;
