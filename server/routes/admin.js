const router = require("express").Router();
const passport = require("passport");
const utils = require("../lib/utils");
const db = require("../database");

//---- Admin ----//
const isAdmin = () => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, msg: "Not Allowed" });
  }

  if (!req.user.admin) {
    return res.status(401).json({ success: false, msg: "Not Allowed" });
  }

  next();
};

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

    const {
      rows,
    } = await db.query(
      "INSERT INTO problems (title, description, type, difficulty, image_url, answer, author, active, solved) VALUES($1, $2, $3, $4, $5, $6, $7, false, false) RETURNING *",
      [title, description, type, difficulty, image_url, author, answer]
    );
    res.status(201).json({ success: true, record: rows[0] });
  }
);

// Update Problem
router.put("/problems/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      type,
      difficulty,
      image_url,
      answer,
    } = req.body;
    const updateProblem = db.query(
      "UPDATE problems SET title = $2, description = $3, type = $4, difficulty = $5, Image_url = $6, answer = $7 \
      WHERE problem_id = $1",
      [id, title, description, type, difficulty, image_url, answer]
    );

    res.json(updateProblem);
  } catch (error) {
    console.error(error);
  }
});

// Delete Problem

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
router.get(
  "/users/search",
  passport.authenticate("jwt", { session: false }),
  isAdmin(),
  async (req, res, next) => {
    const getUsers = await db.query(
      `SELECT username, displayname, house, verified, admin FROM users WHERE username LIKE '%${req.body.search}%';`,
      []
    );

    if (getUsers.error) {
      console.log(getUsers.error);
      return res.status(500).json({ success: false });
    }

    res.status(200).json({ success: true, users: getUsers.rows });
  }
);

//---------------//

module.exports = router;
