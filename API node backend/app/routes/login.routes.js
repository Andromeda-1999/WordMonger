
module.exports = app => {
  const login = require("../controllers/login.controller.js");


  // verify
  app.post("/login", login.LoginUser);



};

