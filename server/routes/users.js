const router = require("express").Router();
const db = require("../database");
const utils = require("../lib/utils");

//---- USERS ----//
router.post("/register", async (req, res, next) => {
  const saltHash = utils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const { displayname, house, username } = req.body;

  const checkUser = await db.query(
    "SELECT COUNT(1) FROM users WHERE username = $1",
    [username]
  );
  if (checkUser.error) {
    res.status(500).json({ userExists: null, success: false });
    next(checkUser.error);
  } else if (checkUser.rows[0].count == 0) {
    const newUser = [username, hash, salt, displayname, house];
    const insertUser = await db.query(
      "INSERT INTO users (username, hash, salt, displayname, house) \
        VAlUES($1, $2, $3, $4, $5) RETURNING *",
      newUser
    );
    if (insertUser.error) {
      console.error("{Registration Failed}: ", err);
      res.status(500).json({ userExists: false, success: false });
    } else {
      console.log("{Registration Success}: New User Added - ", newUser[0]);
      res.status(201).json({ userExists: false, success: true });
    }
  } else {
    console.error("{Registration Failed}: User Exists");
    res.status(406).json({ userExists: true, success: false });
  }
});

//---------------//

module.exports = router;
