const login = require("../models/login.model.js");


// // Retrieve all Users from the database.
// exports.LoginUser = (req, res) => {
//   login.Login((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "User and password not valid error occurred while retrieving Users."
//       });
//     else res.send(data);
//   });
// };



exports.LoginUser = (req, res) => {
  let data = {
    "username": req.body.username,
    "password": req.body.password
  }
  login.Login(data,
  (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Invalid user name and password.`
        });
      } else {
        res.status(500).send({
          message: "Invalid user name and password"
        });
      }
    } else res.send(data);
  });
};

