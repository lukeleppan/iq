const router = require("express").Router();
const passport = require("passport");
const moment = require("moment");
const utils = require("../lib/utils");
const db = require("../database");

//---- PROBLEM MANAGEMENT ----//
const isAdmin = () => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, msg: "Not Allowed" });
  }

  if (!req.user.admin) {
    return res.status(401).json({ success: false, msg: "Not Allowed" });
  }

  next();
};

// Get All Problems
router.get(
  "/problems",
  passport.authenticate("jwt", { session: false }),
  isAdmin(),
  async (req, res) => {
    const allProblems = await db.query(
      "SELECT ROW_NUMBER() OVER(ORDER BY active DESC, problem_id) - 1 AS index, problem_id, title, description, type, difficulty, image_url, active, author FROM problems ORDER BY active DESC, problem_id;"
    );

    if (allProblems.error) {
      return res.status(500).json({ success: false });
    }

    return res.status(200).json({ success: true, problems: allProblems.rows });
  }
);

// Create Problem
router.post(
  "/problems",
  passport.authenticate("jwt", { session: false }),
  isAdmin(),
  async (req, res) => {
    const {
      title,
      description,
      type,
      difficulty,
      image_url,
      author,
      answer,
    } = req.body;

    const createProblem = await db.query(
      "INSERT INTO problems (title, description, type, difficulty, image_url, author, answer, active, closed) VALUES($1, $2, $3, $4, $5, $6, $7, false, false)",
      [title, description, type, difficulty, image_url, author, answer]
    );

    if (createProblem.error) {
      return res.status(500).json({ success: false });
    }

    res.status(201).json({ success: true });
  }
);

// Update Problem
router.put(
  "/problems/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin(),
  async (req, res, next) => {
    const { id } = req.params;
    const {
      title,
      description,
      type,
      difficulty,
      image_url,
      author,
      answer,
    } = req.body;
    const updateProblem = await db.query(
      "UPDATE problems SET title = $2, description = $3, type = $4, difficulty = $5, Image_url = $6, author = $7, answer = $8 \
      WHERE problem_id = $1",
      [id, title, description, type, difficulty, image_url, author, answer]
    );
    if (updateProblem.error) {
      return res.status(500).json({ success: false });
    }
    return res.status(200).json({ success: true });
  }
);

// Delete Problem
router.delete(
  "/problems/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin(),
  async (req, res, next) => {
    const { id } = req.params;
    const deleteProblem = await db.query(
      "DELETE FROM problems WHERE problem_id = $1",
      [id]
    );

    if (deleteProblem.error) {
      return res.status(500).json({ success: false });
    }
    return res.status(200).json({ success: true });
  }
);

// Set Active Problem
router.put(
  "/problem/activate/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin(),
  async (req, res) => {
    const { id } = req.params;
    const activeProblems = await db.query(
      "SELECT COUNT(1) FROM problems WHERE active = true;",
      []
    );

    if (activeProblems.error) {
      return res.status(500).json({ success: false });
    }

    if (!(activeProblems.rows[0].count == 0)) {
      const deactivateAllProblems = await db.query(
        "UPDATE problems SET active = false, active_date = null WHERE active = true;"
      );

      if (deactivateAllProblems.error) {
        return res.status(500).json({ success: false });
      }
    }

    const activeDate = moment(Date.now())
      .add(1, "day")
      .set({ hour: 15, minute: 0, second: 0 })
      .format();

    const activateProblem = await db.query(
      "UPDATE problems SET active = true, active_date = $2 WHERE problem_id = $1;",
      [id, activeDate]
    );

    if (activateProblem.error) {
      return res.status(500).json({ success: false });
    }

    return res.status(200).json({ success: true });
  }
);
//-------------------------//

//---- USER MANAGEMENT ----//
// Get All Users
router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  isAdmin(),
  async (req, res, next) => {
    const getUsers = await db.query(
      "SELECT username, displayname, house, verified, admin FROM users;",
      []
    );

    if (getUsers.error) {
      console.log(getUsers.error);
      return res.status(500).json({ success: false });
    }

    res.status(200).json({ success: true, users: getUsers.rows });
  }
);

// Search Users
router.post(
  "/users/search",
  passport.authenticate("jwt", { session: false }),
  isAdmin(),
  async (req, res, next) => {
    console.log("{User Search Query}: ", req.body.search);
    const getUsers = await db.query(
      `SELECT ROW_NUMBER() OVER(ORDER BY admin DESC, username) - 1 AS index, username, displayname, house, verified, admin FROM users WHERE username LIKE '%${req.body.search}%' ORDER BY admin DESC, username;`,
      []
    );

    if (getUsers.error) {
      console.log(getUsers.error);
      return res.status(500).json({ success: false });
    }

    res.status(200).json({ success: true, users: getUsers.rows });
  }
);

// Adminify User with username
router.put(
  "/users/adminify/:username",
  passport.authenticate("jwt", { session: false }),
  isAdmin(),
  async (req, res, next) => {
    const { username } = req.params;
    const adminifyUser = await db.query(
      "UPDATE users SET admin = true WHERE username = $1",
      [username]
    );

    if (adminifyUser.error) {
      return res.status(500).json({ success: false });
    }
    return res.status(200).json({ success: true });
  }
);

// Delete User with username
router.delete(
  "/users/delete/:username",
  passport.authenticate("jwt", { session: false }),
  isAdmin(),
  async (req, res, next) => {
    const { username } = req.params;
    const deleteUser = await db.query("DELETE FROM users WHERE username = $1", [
      username,
    ]);

    if (deleteUser.error) {
      return res.status(500).json({ success: false });
    }
    return res.status(200).json({ success: true });
  }
);

//---------------//

module.exports = router;
