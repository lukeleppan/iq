const router = require("express").Router();
const db = require("../database");
const utils = require("../lib/utils");

//---- USERS ----//
// Registration
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

//Authentication
router.post("/login", async (req, res, next) => {
  const getUser = await db.query("SELECT * FROM users WHERE username = $1", [
    req.body.username,
  ]);

  if (getUser.error) {
    console.error("{server error}: during user auth");
    res
      .status(500)
      .json({ success: false, user_error: false, msg: "sever error" });
    return next(getUser.error);
  }

  if (getUser.rowCount === 0) {
    console.log("{Auth Failed}: User Does Not Exist");
    return res.status(401).json({
      success: false,
      user_error: true,
      msg: "username or password incorrect",
    });
  }

  const salt = getUser.rows[0].salt;
  const hash = getUser.rows[0].hash;

  const isValid = utils.validPassword(req.body.password, hash, salt);

  if (isValid) {
    const user = {
      username: getUser.rows[0].username,
      displayname: getUser.rows[0].displayname,
      house: getUser.rows[0].displayname,
    };

    const token = utils.issueJWT(user);

    res
      .status(200)
      .json({ success: true, token: token.token, expiresIn: token.expires });
  } else {
    res.status(401).json({
      success: false,
      user_error: true,
      msg: "username or password incorrect",
    });
  }
});
//---------------//

module.exports = router;
