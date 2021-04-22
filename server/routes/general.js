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

  return res.status(200).json({
    success: true,
    problem: currentActiveProblems.rows[0],
    points: utils.calcScore(activeDate, diff),
  });
});

//-----------------//

//----- TEST ------//
router.get("/test", async (req, res) => {
  const points = utils.calcScore(moment(Date.now()).add({ minutes: 4500 }), 3);

  return res.status(200).json({ points: points });
});

module.exports = router;
