const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to wordmonger application." });
});


require("./app/routes/story.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/chapter.routes.js")(app);
require("./app/routes/rating.routes.js")(app);
require("./app/routes/genre.routes.js")(app);
require("./app/routes/readersprogress.routes.js")(app);
require("./app/routes/story_genre.routes.js")(app);
require("./app/routes/login.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
