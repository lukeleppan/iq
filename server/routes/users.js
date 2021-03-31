const router = require("express").Router();
const db = require("../database");
const User = require("../models/user");
const utils = require("../lib/utils");

router.post("/register", function (req, res, next) {
  const saltHash = utils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const { displayname, house, username } = req.body;

  userExists = db.query("SELECT COUNT(1) FROM users WHERE username = $1", [
    username,
  ]).rows[0];

  if (!userExists) {
    const newUser = [username, hash, salt, displayname, house];

    try {
      db.query(
        "INSERT INTO users (username, hash, salt, displayname, house) \
        VAlUES($1, $2, $3, $4, $5)",
        newUser
      );

      res.status(201).json({ userExists: false, success: true });
    } catch (err) {
      console.error("{Registration Failed}: ", err);
      res.status(500).json({ userExists: false, success: false });
    }
  } else {
    console.error("{Registration Failed}: User Exists");
    res.status(406).json({ userExists: true, success: false });
  }
});
