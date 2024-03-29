require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("../database");
const utils = require("../lib/utils");
const fs = require("fs");
const path = require("path");
const passport = require("passport");
const moment = require("moment");

const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf-8");

//---- USERS MANAGER ----//
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
    const countUsers = await db.query("SELECT COUNT(1) FROM users", []);
    const numUsers = countUsers.rows[0].count;

    const newUser = [username, hash, salt, displayname, house, numUsers == 0];
    const insertUser = await db.query(
      "INSERT INTO users (username, hash, salt, displayname, house, verified, admin) \
        VAlUES($1, $2, $3, $4, $5, false, $6) RETURNING *",
      newUser
    );
    if (insertUser.error) {
      console.error("{Registration Failed}: ", insertUser.error);
      res.status(500).json({ userExists: false, success: false });
    } else {
      console.log("{Registration Success}: New User Added - ", newUser[0]);
      const verifyToken = utils.issueVerifyJWT({ username: newUser[0] }).token;

      try {
        utils.sendVerifyEmail(verifyToken, newUser[0]);
      } catch (err) {
        return res.status(501).json({ success: false, userExists: false });
      }
      return res.status(201).json({ userExists: false, success: true });
    }
  } else {
    console.error("{Registration Failed}: User Exists");
    res.status(200).json({ userExists: true, success: false });
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
      .json({ success: false, user_error: false, msg: "server error" });
    return next(getUser.error);
  }

  if (getUser.rowCount === 0) {
    console.log("{Auth Failed}: User Does Not Exist");
    return res.status(200).json({
      success: false,
      user_error: true,
      msg: "username or password incorrect",
    });
  }

  if (!getUser.rows[0].verified) {
    console.log("{Auth Failed}: User not verified.");
    return res
      .status(200)
      .json({ success: false, verified: false, msg: "user is not verified" });
  }

  const salt = getUser.rows[0].salt;
  const hash = getUser.rows[0].hash;

  const isValid = utils.validPassword(req.body.password, hash, salt);

  if (isValid) {
    const user = {
      username: getUser.rows[0].username,
      displayname: getUser.rows[0].displayname,
      admin: getUser.rows[0].admin,
      house: getUser.rows[0].house,
    };

    const token = utils.issueJWT(user);

    res
      .status(200)
      .json({ success: true, token: token.token, expiresIn: token.expires });
  } else {
    res.status(200).json({
      success: false,
      user_error: true,
      msg: "username or password incorrect",
    });
  }
});

// Resend Email
router.post("/resend", async (req, res, next) => {
  const getUser = await db.query("SELECT * FROM users WHERE username = $1", [
    req.body.username,
  ]);

  if (getUser.error) {
    console.error("{server error}: during resending");
    return res.status(500).json({ success: false });
  }

  if (getUser.rowCount === 0) {
    console.log("{Resend Failed}: User Does Not Exist");
    return res.status(200).json({
      success: false,
    });
  }

  if (!getUser.rows[0].verified) {
    const verifyToken = utils.issueVerifyJWT({ username: req.body.username })
      .token;

    try {
      utils.sendVerifyEmail(verifyToken, req.body.username);
    } catch (err) {
      return res.status(501).json({ success: false });
    }
    return res.status(201).json({ success: true });
  }
});

// Email Confirmation
router.post("/confirm/:token", async (req, res) => {
  var jwtErr = false;
  const token = req.params.token;
  try {
    const { sub, forVer } = jwt.verify(token, PRIV_KEY, {
      algorithms: ["RS256"],
    });

    if (jwtErr) {
      return;
    }

    if (forVer) {
      const getUser = await db.query(
        "SELECT username, verified FROM users WHERE username = $1;",
        [sub]
      );

      if (getUser.error) {
        console.error(getUser.error);
        return res.status(200).json({ success: false, msg: "server error" });
      }

      if (getUser.rowCount == 0) {
        return res
          .status(200)
          .json({ success: false, msg: "user doesn't exist" });
      }

      if (getUser.rows[0].verified == true) {
        return res.status(200).json({
          success: false,
          alreadyVerified: true,
          msg: "Already Verified",
        });
      }

      const update = await db.query(
        "UPDATE users SET verified = true WHERE username = $1",
        [sub]
      );

      if (update.error) {
        return res.status(500).json({ success: false, msg: "server error" });
      }

      return res.status(200).json({ success: true });
    } else {
      return res.status(200).json({ success: false });
    }
  } catch (error) {
    res.status(200).json({ success: false });
    jwtErr = true;
  }
});

// Email Cancel
router.post("/cancel/:token", async (req, res) => {
  const token = req.params.token;
  const { sub, forVer } = jwt.verify(token, PRIV_KEY, {
    algorithms: ["RS256"],
  });

  if (forVer) {
    const getUser = await db.query(
      "SELECT username, verified FROM users WHERE username = $1;",
      [sub]
    );

    if (getUser.error) {
      console.error(getUser.error);
      return res.status(500).json({ success: false, msg: "server error" });
    }

    if (getUser.rowCount == 0) {
      return res
        .status(401)
        .json({ success: false, msg: "user doesn't exist" });
    }

    if (getUser.rows[0].verified == true) {
      return res.status(401).json({
        success: false,
        alreadyVerified: true,
        msg: "Already Verified Cannot Cancel",
      });
    }

    const deleteUser = await db.query("DELETE FROM users WHERE username = $1", [
      sub,
    ]);

    if (deleteUser.error) {
      return res.status(500).json({ success: false, msg: "server error" });
    }

    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false });
  }
});

router.post(
  "/change/details",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { displayName, username, house, password } = req.body;
    const getUser = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (getUser.error) {
      console.error("{server error}: during user detail change");
      res
        .status(500)
        .json({ success: false, user_error: false, msg: "server error" });
      return next(getUser.error);
    }

    if (getUser.rowCount === 0) {
      console.log("{Auth Failed}: User Does Not Exist");
      return res.status(400).json({
        success: false,
        user_error: true,
        msg: "username or password incorrect",
      });
    }

    if (!getUser.rows[0].verified) {
      console.log("{Auth Failed}: User not verified.");
      return res.status(400).json({
        success: false,
        verified: false,
        msg: "user is not verified",
      });
    }

    const salt = getUser.rows[0].salt;
    const hash = getUser.rows[0].hash;

    const isValid = utils.validPassword(password, hash, salt);

    if (isValid) {
      const updateUser = await db.query(
        "UPDATE users SET displayname = $1, house = $2 WHERE username = $3;",
        [displayName, house, username]
      );

      if (updateUser.error) {
        res
          .status(500)
          .json({ success: false, user_error: false, msg: "server error" });
        return next(getUser.error);
      }

      return res.status(200).json({ success: true });
    }

    return res.status(400).json({
      success: false,
      user_error: true,
      msg: "username or password incorrect",
    });
  }
);

router.post(
  "/change/password",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;
    const getUser = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (getUser.error) {
      console.error("{server error}: during user detail change");
      res
        .status(500)
        .json({ success: false, user_error: false, msg: "server error" });
      return next(getUser.error);
    }

    if (getUser.rowCount === 0) {
      console.log("{Auth Failed}: User Does Not Exist");
      return res.status(400).json({
        success: false,
        user_error: true,
        msg: "username or password incorrect",
      });
    }

    if (!getUser.rows[0].verified) {
      console.log("{Auth Failed}: User not verified.");
      return res.status(400).json({
        success: false,
        verified: false,
        msg: "user is not verified",
      });
    }

    const salt = getUser.rows[0].salt;
    const hash = getUser.rows[0].hash;

    const isValid = utils.validPassword(oldPassword, hash, salt);

    if (isValid) {
      const saltHash = utils.genPassword(newPassword);

      const salt = saltHash.salt;
      const hash = saltHash.hash;

      const updateUser = await db.query(
        "UPDATE users SET hash = $1, salt = $2 WHERE username = $3;",
        [hash, salt, username]
      );

      if (updateUser.error) {
        res
          .status(500)
          .json({ success: false, user_error: false, msg: "server error" });
        return next(getUser.error);
      }

      return res.status(200).json({ success: true });
    }

    return res.status(400).json({
      success: false,
      user_error: true,
      msg: "username or password incorrect",
    });
  }
);
//---------------------------------//

//---- USER PROBLEM MANAGEMENT ----//
// ANSWER
router.post(
  "/answer",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { sub, house } = req.user;

    const checkAnswer = await db.query(
      "SELECT * FROM problems WHERE active = true;"
    );

    if (checkAnswer.error) {
      return res.status(500).json({ success: false });
    }

    if (checkAnswer.rowCount === 0) {
      return res.status(401).json({ success: false });
    }

    const currentActiveProblems = await db.query(
      "SELECT problem_id FROM problems WHERE active = true;",
      []
    );

    if (currentActiveProblems.error) {
      return res.status(500).json({ success: false });
    }

    if (currentActiveProblems.rowCount == 0) {
      return res.status(200).json({ success: true, no_active: true });
    }

    const checkAnswered = await db.query(
      "SELECT COUNT(*) FROM attempts WHERE username = $1 AND problem_id = $2 AND \
      (attempt_date + interval '30 minutes') > NOW();",
      [sub, currentActiveProblems.rows[0].problem_id]
    );

    if (checkAnswered.error) {
      return res.status(500).json({ success: false });
    }

    if (checkAnswered.rows[0].count > 0) {
      return res.status(200).json({ success: true, correct: false });
    }

    if (checkAnswer.rows[0].answer == req.body.answer) {
      const successAttemptsQuery = await db.query(
        "SELECT COUNT(1) FROM attempts WHERE problem_id = $1 AND success = true;",
        [currentActiveProblems.rows[0].problem_id]
      );

      if (successAttemptsQuery.error) {
        return res.status(500).json({ success: false });
      }

      const attempt = await db.query(
        "INSERT INTO attempts\
        (problem_id, username, points, house, attempt_date, success) VALUES ($1, $2, $3, $4, $5, $6);",
        [
          checkAnswer.rows[0].problem_id,
          sub,
          utils.calcScore(
            checkAnswer.rows[0].active_date,
            checkAnswer.rows[0].difficulty,
            successAttemptsQuery.rows[0].count
          ),
          house,
          moment().format(),
          true,
        ]
      );

      if (attempt.error) {
        return res.status(500).json({ success: false });
      }

      if (successAttemptsQuery.rows[0].count >= 9) {
        const problem = await db.query(
          "UPDATE problems\
          SET closed = true\
          WHERE problem_id = $1",
          [checkAnswer.rows[0].problem_id]
        );
        if (problem.error) {
          return res.status(500).json({ success: false });
        }
      }

      return res.status(201).json({ success: true, correct: true });
    }

    const attempt = await db.query(
      "INSERT INTO attempts\
      (problem_id, username, points, house, attempt_date, success) VALUES ($1, $2, $3, $4, $5, $6);",
      [checkAnswer.rows[0].problem_id, sub, 0, house, moment().format(), false]
    );

    if (attempt.error) {
      return res.status(500).json({ success: false });
    }

    return res.status(200).json({ success: true, correct: false });
  }
);

// ANSWERABLE
router.get(
  "/answerable",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { sub, house } = req.user;
    const currentActiveProblems = await db.query(
      "SELECT problem_id FROM problems WHERE active = true;",
      []
    );

    if (currentActiveProblems.error) {
      return res.status(500).json({ success: false });
    }

    const checkAnswered = await db.query(
      "SELECT COUNT(0) FROM attempts WHERE username = $1 AND problem_id = $2 AND success = true;",
      [sub, currentActiveProblems.rows[0].problem_id]
    );

    if (checkAnswered.error) {
      return res.status(500).json({ success: false });
    }

    if (checkAnswered.rows[0].count == 0) {
      const checkCooldown = await db.query(
        "SELECT attempt_date FROM attempts WHERE username = $1 AND problem_id = $2 ORDER BY attempt_date DESC",
        [sub, currentActiveProblems.rows[0].problem_id]
      );

      if (checkCooldown.error) {
        return res.status(500).json({ success: false });
      }

      if (
        checkCooldown.rows.length > 0 &&
        moment().isBefore(
          moment(checkCooldown.rows[0].attempt_date).add(30, "minutes")
        )
      ) {
        return res.status(200).json({
          success: true,
          answerable: false,
          cooldown: moment(checkCooldown.rows[0].attempt_date)
            .add(30, "minutes")
            .format(),
        });
      }

      return res.status(200).json({ success: true, answerable: true });
    }

    res.status(200).json({ success: true, answerable: false });
  }
);

//---------------------------------//

module.exports = router;
