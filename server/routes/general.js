const router = require("express").Router();
const db = require("../database");
const utils = require("../lib/utils");
const moment = require("moment");

//---- General ----//
// Get Problem by ID
router.get("/problems/:id", async (req, res) => {
  const { id } = req.params;
  const problem = await db.query(
    "SELECT problem_id, title, description, type, difficulty, image_url, author\
     FROM problems WHERE problem_id = $1;",
    [id]
  );

  if (problem.error) {
    return res.status(500).json({ success: false });
  }

  if (problem.rowCount == 0) {
    return res
      .status(401)
      .json({ success: false, msg: "problem doesn't exist" });
  }

  return res.status(200).json({ success: true, problem: problem.rows[0] });
});

// Get Solved Problem
router.get("/problem/solved", async (req, res) => {
  const problems = await db.query(
    "SELECT problem_id, title, description, type, difficulty, image_url, answer, author, active_date, solved_date\
     FROM problems WHERE solved = true",
    []
  );

  if (problems.error) {
    return res.status(500).json({ success: false });
  }

  return res.status(200).json({ problems: problems.rows });
});

// Get Active Problem
router.get("/problem/active", async (req, res) => {
  const currentActiveProblems = await db.query(
    "SELECT problem_id, title, description, type, difficulty, image_url, author, active_date\
     FROM problems WHERE active = true;",
    []
  );

  if (currentActiveProblems.error) {
    return res.status(500).json({ success: false });
  }

  if (currentActiveProblems.rowCount == 0) {
    return res.status(200).json({ success: true, no_active: true });
  }

  const activeDate = moment(currentActiveProblems.rows[0].active_date);
  const diff = currentActiveProblems.rows[0].difficulty;
  const nowDate = moment(Date.now());

  if (moment.max([activeDate, nowDate]) === activeDate) {
    return res.status(200).json({
      success: true,
      no_active: false,
      active_date: activeDate,
    });
  }

  const successes = await db.query(
    "SELECT COUNT(0) FROM attempts WHERE problem_id = $1 AND success = true;",
    [currentActiveProblems.rows[0].problem_id]
  );

  if (successes.error) {
    return res.status(500).json({ success: false });
  }

  const users = await db.query(
    "SELECT users.username, users.displayname, users.house, attempts.points FROM attempts INNER JOIN users\
    ON users.username = attempts.username WHERE attempts.problem_id = $1 AND attempts.success = true;",
    [currentActiveProblems.rows[0].problem_id]
  );

  if (users.error) {
    return res.status(500).json({ success: false });
  }

  return res.status(200).json({
    success: true,
    problem: currentActiveProblems.rows[0],
    users: users.rows,
    points: utils.calcScore(activeDate, diff, successes.rows[0].count),
  });
});

//-----------------//

module.exports = router;
