require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const path = require("path");
const passport = require("passport");

const pool = require("./config/database");
require("./config/passport")(passport);

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//----ROUTES----//
app.use(require("./routes"));
//---------------//

app.listen(5000, () => {
  console.log("Listening on port 5000: http://localhost:5000");
});
